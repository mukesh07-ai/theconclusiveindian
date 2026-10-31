const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const srcNext = path.join(rootDir, "frontend", ".next");
const destNext = path.join(rootDir, ".next");
const srcPublic = path.join(rootDir, "frontend", "public");
const destPublic = path.join(rootDir, "public");

console.log("==> Hostinger Post-Build: Staging build output to repository root...");

try {
  if (fs.existsSync(destNext)) {
    fs.rmSync(destNext, { recursive: true, force: true });
  }
  if (fs.existsSync(srcNext)) {
    fs.cpSync(srcNext, destNext, { recursive: true });
    console.log("✓ Copied frontend/.next -> .next (Hostinger outputDirectory found)");
  } else {
    console.error("ERROR: frontend/.next does not exist after build!");
    process.exit(1);
  }

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
