const path = require("path");
const fs = require("fs");

// Check if standalone build server exists
const standaloneServer = path.join(__dirname, ".next", "standalone", "server.js");
if (fs.existsSync(standaloneServer)) {
  require(standaloneServer);
} else {
  const { createServer } = require("http");
  const { parse } = require("url");
  const next = require("next");

  const port = parseInt(process.env.PORT, 10) || 3000;
  const dev = process.env.NODE_ENV !== "production";
  const app = next({ dev, dir: __dirname });
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
