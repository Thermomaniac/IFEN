// Builds web-ready assets in public/ from the canonical sources in "Media Asset/".
// Sources are never modified. Re-run after any source asset changes:
//   npm run assets          (images + svg)
//   npm run assets -- --video   (also re-encodes the hero video, slow)
import { execFileSync } from "node:child_process";
import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import ffmpeg from "ffmpeg-static";

const root = path.resolve(import.meta.dirname, "..");
const SRC = path.join(root, "Media Asset");
const EXPORT = path.join(SRC, "Paper Export");
const OUT = path.join(root, "public");

// [source, output, max width, options]
const images = [
  ["logo-ifen.png", "brand/logo-ifen.png", 640],
  ["hero-avatar-1.jpg", "hero/avatar-1.jpg", 128],
  ["hero-avatar-2.jpg", "hero/avatar-2.jpg", 128],
  ["hero-avatar-3.jpg", "hero/avatar-3.jpg", 128],
  ["about-metric-tile.jpg", "about/metric-tile.jpg", 1400],
  ["training-course.jpg", "training/course.jpg", 1024],
  ["board-member-1.png", "board/member-1.png", 400],
  ["board-member-2.png", "board/member-2.png", 400],
  ["board-member-3.png", "board/member-3.png", 400],
  ["video-bg.jpg", "video/poster.jpg", 2880],
  ["cta-bg.jpg", "cta/background.jpg", 2880],
  ["badge-isnr-2025.png", "badges/isnr-2025.png", 200],
  ["badge-bcia.png", "badges/bcia.png", 200],
  ["flag-en.png", "flags/en.png", 64],
  ["flag-de.png", "flags/de.png", 64],
  ["flag-es.png", "flags/es.png", 64],
  // flags/el.svg is hand-authored in public/: the Paper file has no Greek flag.
  // Partner logos ship with large baked-in padding, so trim to the mark.
  ["partner-bed-ev.png", "partners/bed-ev.png", 400, { trim: true }],
  ["partner-bcia.png", "partners/bcia.png", 400, { trim: true }],
  ["partner-nepsa.png", "partners/nepsa.png", 400, { trim: true }],
  ["partner-medbo.png", "partners/medbo.png", 400, { trim: true }],
  ["partner-gni.png", "partners/gni.png", 400, { trim: true }],
  ["partner-upsa-salamanca.png", "partners/upsa-salamanca.png", 400, { trim: true }],
  ["partner-san-valero.png", "partners/san-valero.png", 400, { trim: true }],
  ["partner-uporto.png", "partners/uporto.png", 400, { trim: true }],
];

const svgs = [
  ["1.svg", "svg/module-1.svg"],
  ["2.svg", "svg/module-2.svg"],
  ["3.svg", "svg/module-3.svg"],
  ["4.svg", "svg/module-4.svg"],
  ["Brain connection.svg", "svg/brain-connection.svg"],
  ["Dotted Brain.svg", "svg/dotted-brain.svg"],
  ["arrow-upward-alt.svg", "svg/arrow-upward-alt.svg"],
];

const ensureDir = (file) => mkdir(path.dirname(file), { recursive: true });
const kb = async (file) => `${Math.round((await stat(file)).size / 1024)}KB`;

for (const [src, out, width, opts = {}] of images) {
  const dest = path.join(OUT, out);
  await ensureDir(dest);
  let img = sharp(path.join(EXPORT, src));
  if (opts.trim) img = img.trim({ threshold: 10 });
  img = img.resize({ width, withoutEnlargement: true });
  img = out.endsWith(".png")
    ? img.png({ compressionLevel: 9, palette: false })
    : img.jpeg({ quality: 82, mozjpeg: true });
  await img.toFile(dest);
  console.log(`img  ${out.padEnd(28)} ${await kb(dest)}`);
}

for (const [src, out] of svgs) {
  const dest = path.join(OUT, out);
  await ensureDir(dest);
  await copyFile(path.join(SRC, src), dest);
  console.log(`svg  ${out}`);
}

if (process.argv.includes("--video")) {
  const input = path.join(SRC, "Hero Video 2.mp4");
  const dir = path.join(OUT, "hero");
  await mkdir(dir, { recursive: true });
  const run = (args) => execFileSync(ffmpeg, ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });

  run(["-i", input, "-vf", "scale=1920:-2", "-c:v", "libx264", "-preset", "slow", "-crf", "27",
    "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", path.join(dir, "hero.mp4")]);
  run(["-i", input, "-vf", "scale=1920:-2", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "38",
    "-row-mt", "1", "-an", path.join(dir, "hero.webm")]);
  run(["-ss", "0", "-i", input, "-frames:v", "1", "-vf", "scale=1920:-2", "-q:v", "4",
    path.join(dir, "hero-poster.jpg")]);
  for (const f of ["hero.mp4", "hero.webm", "hero-poster.jpg"]) {
    console.log(`vid  hero/${f.padEnd(23)} ${await kb(path.join(dir, f))}`);
  }
}
