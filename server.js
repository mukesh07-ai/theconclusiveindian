const path = require("path");
const fs = require("fs");

const frontendStandalone = path.join(__dirname, "frontend", ".next", "standalone", "server.js");
const standalone = path.join(__dirname, ".next", "standalone", "server.js");

if (fs.existsSync(frontendStandalone)) {
  process.chdir(path.join(__dirname, "frontend"));
  require(frontendStandalone);
} else if (fs.existsSync(standalone)) {
  require(standalone);
} else {
  const { createServer } = require("http");
  const { parse } = require("url");
  const next = require("next");

  const port = parseInt(process.env.PORT, 10) || 3000;
  const dev = process.env.NODE_ENV !== "production";
  const app = next({ dev, dir: path.join(__dirname, "frontend") });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> The Conclusive Indian server listening on port ${port}`);
    });
  });
}
