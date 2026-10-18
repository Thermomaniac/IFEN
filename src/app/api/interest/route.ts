import { INTEREST_FIELDS, validateInterest, type InterestPayload } from "@/lib/interestForm";

/**
 * Interest list boundary. The live interest lists are Seminarman prospect lists in
 * Joomla, which need a session and CSRF token, so the browser cannot post to them
 * directly. This route validates the submission again and forwards it to the
 * service named in IFEN_INTEREST_ENDPOINT (optionally with IFEN_INTEREST_TOKEN as a
 * bearer token). Without that variable it answers 503, and the form says so: it
 * never reports a submission it could not deliver.
 */

const TIMEOUT_MS = 10_000;

const fail = (status: number, error: string, extra?: object) => Response.json({ ok: false, error, ...extra }, { status });

export async function POST(request: Request) {
  let body: Partial<InterestPayload>;
  try {
    body = await request.json();
  } catch {
    return fail(400, "invalid_json");
  }

  const raw = body?.values ?? {};
  const values: Record<string, string> = {};
  for (const name of INTEREST_FIELDS) {
    const v = raw[name];
    values[name] = typeof v === "string" ? v.trim() : "";
  }
  const errors = validateInterest(values);
  if (Object.keys(errors).length > 0) return fail(422, "invalid", { errors });

  const course = body?.course;
  if (!course || typeof course.title !== "string" || !course.title.trim() || typeof course.path !== "string") {
    return fail(422, "invalid_course");
  }

  const endpoint = process.env.IFEN_INTEREST_ENDPOINT;
  if (!endpoint) return fail(503, "not_configured");

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.IFEN_INTEREST_TOKEN) headers.Authorization = `Bearer ${process.env.IFEN_INTEREST_TOKEN}`;

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        course: { title: course.title.trim(), code: course.code || undefined, path: course.path },
        salutation: values.salutation || undefined,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        termsAccepted: true,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!upstream.ok) return fail(502, "upstream_error");
  } catch {
    return fail(502, "upstream_unreachable");
  }

  return Response.json({ ok: true });
}
