// Copies the parent site's licensed hero video into public/ before dev/build
// so the app is self-contained without committing a 20MB duplicate to git.
import { cpSync, existsSync, mkdirSync } from "node:fs";

const src = "../assets/video/hero.mp4";
mkdirSync("public/video", { recursive: true });
if (existsSync(src)) {
  cpSync(src, "public/video/hero.mp4");
  console.log("hero.mp4 copied into public/video/");
} else {
  console.warn("WARNING: ../assets/video/hero.mp4 not found — building without the background video");
}
