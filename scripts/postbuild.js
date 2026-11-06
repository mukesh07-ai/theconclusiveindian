const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const srcNext = path.join(rootDir, "frontend", ".next");
const destNext = path.join(rootDir, ".next");
const srcPublic = path.join(rootDir, "frontend", "public");
const destPublic = path.join(rootDir, "public");

console.log("==> Hostinger Post-Build: Staging build output and static assets...");

try {
  if (!fs.existsSync(srcNext)) {
    console.error("ERROR: frontend/.next does not exist after build!");
    process.exit(1);
  }

  // Next.js standalone server requires .next/static and public in standalone directory
  const srcStatic = path.join(srcNext, "static");
  const standaloneDir = path.join(srcNext, "standalone");
  const standaloneNext = path.join(standaloneDir, ".next");
  const standaloneStatic = path.join(standaloneNext, "static");
  const standalonePublic = path.join(standaloneDir, "public");

  if (fs.existsSync(srcStatic) && fs.existsSync(standaloneNext)) {
    if (fs.existsSync(standaloneStatic)) {
      fs.rmSync(standaloneStatic, { recursive: true, force: true });
    }
    fs.cpSync(srcStatic, standaloneStatic, { recursive: true });
    console.log("✓ Copied frontend/.next/static -> frontend/.next/standalone/.next/static");
  }

  if (fs.existsSync(srcPublic) && fs.existsSync(standaloneDir)) {
    if (fs.existsSync(standalonePublic)) {
      fs.rmSync(standalonePublic, { recursive: true, force: true });
    }
    fs.cpSync(srcPublic, standalonePublic, { recursive: true });
    console.log("✓ Copied frontend/public -> frontend/.next/standalone/public");
  }

  // Stage build to repository root for Hostinger's build system
  if (fs.existsSync(destNext)) {
    fs.rmSync(destNext, { recursive: true, force: true });
  }
  fs.cpSync(srcNext, destNext, { recursive: true });
  console.log("✓ Copied frontend/.next -> .next (Hostinger outputDirectory ready)");

  if (fs.existsSync(destPublic)) {
    fs.rmSync(destPublic, { recursive: true, force: true });
  }
  if (fs.existsSync(srcPublic)) {
    fs.cpSync(srcPublic, destPublic, { recursive: true });
    console.log("✓ Copied frontend/public -> public");
  }

  console.log("==> Hostinger Post-Build: Ready for publish!");
} catch (err) {
  console.error("Error during Hostinger post-build sync:", err);
  process.exit(1);
}
