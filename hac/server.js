// server.js
// Node 18+ (uses global fetch). Starts a small proxy on http://localhost:3000
import http from "http";
import { readFile } from "fs/promises";
const PORT = 3000;

// Replace with your cookie string (keep secure)
const COOKIE =
  "PHPSESSID=19m24v8rjp02qiiq051dc7tdgn; _gid=GA1.2.2013674784.1779019082; cf_clearance=cT6ZZv8Y5_W7bn4Jsv1g9TIfFFYv9AlpSANIyUQx.go-1779019081-1.2.1.1-u0OEv6xPEpwiy057F5xbWVhVOe4xeN7aMXvR6WnoEtSB115RHIey4GZ2rT8uBRRhC8.yKuxXRvLVDrHrSPajfL9298SHP0CUwLeM96GxsZfksq3kRzxIkxpuIDR2loLLgVFvspT5DjPAgAF5YaDS6AAy.kYPs95fVIMqtVjFeYnexYsqe1xaSDruOrsucpzD92sDqaAPHmTWqZiwzUspdRWPb1K8oV7gWxdjiwPp6pPtGwbUp6Rzv_kuaarLXqbo7fT6oEzn9dmiggrNMNZok5wsjVojUptRHNqE0Nw3GQy8l0nd1sDHUDbmeMP3wj1HHxKIpt0R.bU0UsiGsOiQsA; __cf_bm=MBc4cpoQ256qZfTTAmXPyPgBtKvv413KptvjPE51I7Y-1779019081.8850062-1.0.1.1-6QF708tiSmCSc4YY7yqkxKeq8zku.qgChnYipiLlM_FExZYjfCSvvfwJ7Xaw2O.LWcCf4jUJfeQ13ERf7W4iiegqs026.dTFGRFj4krK3AJhoxnzqBMMtxQVwWQJkBM1; _gat_gtag_UA_109814872_1=1; _ga_D0BQXRE67D=GS2.1.s1779019081$o8$g1$t1779019693$j1$l0$h0; _ga=GA1.1.1758881059.1762297336";

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  if (req.url === "/export-classes" && req.method === "POST") {
    try {
      const body = await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => resolve(data));
        req.on("error", (err) => reject(err));
      });
      const parsed = body ? JSON.parse(body) : {};
      const date = parsed.date || new Date().toISOString().slice(0, 10);

      const upstreamRes = await fetch(
        "https://harborathletic.clubautomation.com/calendar/classes-by-date",
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/json;charset=UTF-8",
            Origin: "https://harborathletic.clubautomation.com",
            Referer: "https://harborathletic.clubautomation.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            Cookie: COOKIE,
          },
          body: JSON.stringify({
            date,
            locationId: null,
            classTypeId: null,
            instructorId: null,
          }),
        },
      );

      const text = await upstreamRes.text();
      // Forward upstream status and body
      res.writeHead(upstreamRes.status, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      return res.end(text);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Error: " + String(err));
    }
  }

  // serve export.html for convenience
  if ((req.url === "/" || req.url === "/export.html") && req.method === "GET") {
    try {
      const html = await readFile(
        new URL("./export.html", import.meta.url),
        "utf8",
      );
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(html);
    } catch {
      res.writeHead(404);
      return res.end("export.html not found");
    }
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () =>
  console.log("Server listening on http://localhost:" + PORT),
);
