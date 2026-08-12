import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      name: "KharidPro Backend Service",
    });
  });

  // Automatic SEO sitemap.xml route
  app.get("/sitemap.xml", (req, res) => {
    const appUrl =
      process.env.APP_URL || "https://kharidpro.ir";

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${appUrl}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>${appUrl}/products</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${appUrl}/coupons</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${appUrl}/articles</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  // Automatic SEO robots.txt route
  app.get("/robots.txt", (req, res) => {
    const appUrl =
      process.env.APP_URL || "https://kharidpro.ir";

    const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${appUrl}/sitemap.xml`;

    res.header("Content-Type", "text/plain");
    res.send(robots);
  });

  // Serve Vite production build
  const distPath = path.join(process.cwd(), "dist");

  app.use(express.static(distPath));

  // React SPA fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  // Start server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `KharidPro server running on http://localhost:${PORT}`
    );
  });
}

startServer();
