import {
  ACCOUNT_FLAGS,
  accountFields,
  isAccountAction,
  validateAccount,
  type AccountAction,
} from "@/lib/accountForm";

/**
 * Account boundary for login, registration, password reset and username reminder.
 * The live accounts are Joomla users on neurofeedback-info.de; their forms need a
 * session and CSRF token, so the browser cannot post to them from here. This route
 * validates the request again, verifies reCAPTCHA where the live form has it, and
 * forwards to `${IFEN_AUTH_ENDPOINT}/<action>`. It never decides a login itself and
 * never reports success the account service did not confirm.
 *
 * Environment:
 * - IFEN_AUTH_ENDPOINT: base URL of the account service. Unset → 503.
 * - RECAPTCHA_SECRET_KEY: reCAPTCHA v2 secret. Unset → register, reset and remind answer
 *   503, because forwarding them without the check would weaken the live protection.
 * - NEXT_PUBLIC_RECAPTCHA_SITE_KEY: the matching site key, read by the forms.
 */

const TIMEOUT_MS = 10_000;
const CAPTCHA_ACTIONS: AccountAction[] = ["register", "reset", "remind"];
/** Fields sent as typed: passwords are not trimmed. */
const RAW = new Set(["password", "password1"]);
const REDIRECT_HOSTS = new Set(["www.neurofeedback-info.de", "neurofeedback-info.de"]);

const fail = (status: number, error: string, extra?: object) => Response.json({ ok: false, error, ...extra }, { status });

async function verifyCaptcha(token: string, secret: string, ip: string | null) {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/** Only same-site paths or the live IFEN domain; anything else is dropped. */
function safeRedirect(value: unknown) {
  if (typeof value !== "string") return undefined;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && REDIRECT_HOSTS.has(url.hostname) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: Request, ctx: RouteContext<"/api/account/[action]">) {
  const { action } = await ctx.params;
  if (!isAccountAction(action)) return fail(404, "unknown_action");

  let body: { values?: Record<string, unknown>; captcha?: unknown };
  try {
    body = await request.json();
  } catch {
    return fail(400, "invalid_json");
  }

  const raw = body?.values ?? {};
  const values: Record<string, string> = {};
  for (const name of [...accountFields(action), ...(ACCOUNT_FLAGS[action] ?? [])]) {
    if (name === "captcha") continue;
    const v = raw[name];
    values[name] = typeof v === "string" ? (RAW.has(name) ? v : v.trim()) : "";
  }
  const errors = validateAccount(action, values, { captcha: false });
  if (Object.keys(errors).length > 0) return fail(422, "invalid", { errors });
  // The form asks for the password once; the live registration still expects the
  // confirmation field, so it receives the same value.
  if (action === "register") values.password2 = values.password1;

  const endpoint = process.env.IFEN_AUTH_ENDPOINT;
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const needsCaptcha = CAPTCHA_ACTIONS.includes(action);
  if (!endpoint || (needsCaptcha && !secret)) return fail(503, "not_configured");

  if (needsCaptcha) {
    const token = typeof body.captcha === "string" ? body.captcha : "";
    if (!token) return fail(422, "invalid", { errors: { captcha: "Complete the security check." } });
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    if (!(await verifyCaptcha(token, secret!, ip))) return fail(422, "captcha_failed");
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${endpoint.replace(/\/+$/, "")}/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch {
    return fail(502, "upstream_unreachable");
  }

  const data = (await upstream.json().catch(() => null)) as {
    redirect?: unknown;
    message?: unknown;
    errors?: unknown;
  } | null;

  if (upstream.ok) {
    const res = Response.json({
      ok: true,
      redirect: safeRedirect(data?.redirect),
      message: typeof data?.message === "string" ? data.message : undefined,
    });
    // A login session is the account service's to set; pass its cookies through unchanged.
    for (const cookie of upstream.headers.getSetCookie()) res.headers.append("Set-Cookie", cookie);
    return res;
  }

  if (action === "login" && (upstream.status === 401 || upstream.status === 403)) return fail(401, "invalid_credentials");

  if (upstream.status === 409 || upstream.status === 422) {
    const known = new Set(accountFields(action));
    const upstreamErrors =
      data?.errors && typeof data.errors === "object"
        ? Object.fromEntries(
            Object.entries(data.errors as Record<string, unknown>).filter(
              ([k, v]) => known.has(k) && typeof v === "string",
            ) as [string, string][],
          )
        : {};
    return fail(422, "invalid", { errors: upstreamErrors });
  }

  return fail(502, "upstream_error");
}
