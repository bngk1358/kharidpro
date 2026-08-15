import express from "express";
import path from "path";

import productRoutes from "./server/routes/productRoutes.js";
import { checkDatabase } from "./server/db/index.js";

async function startServer() {
  const app = express();

  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "2mb" }));

  /*
   * ---------------------------------------------------------
   * Basic API health
   * ---------------------------------------------------------
   */
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      name: "KharidPro Backend Service",
    });
  });

  /*
   * ---------------------------------------------------------
   * Database health
   * ---------------------------------------------------------
   */
  app.get("/api/health/db", async (_req, res) => {
    try {
      await checkDatabase();

      res.json({
        status: "ok",
        database: "connected",
      });
    } catch (error) {
      console.error("Database health check failed:", error);

      res.status(503).json({
        status: "error",
        database: "disconnected",
        message:
          error instanceof Error
            ? error.message
            : "Unknown database error",
      });
    }
  });

  /*
   * ---------------------------------------------------------
   * Product / Store / Category API
   * ---------------------------------------------------------
   *
   * Routes include:
   *
   * GET    /api/products
   * GET    /api/products/:id
   * POST   /api/products
   * PUT    /api/products/:id
   * DELETE /api/products/:id
   *
   * GET    /api/categories
   *
   * GET    /api/stores
   * POST   /api/stores
   * PUT    /api/stores/:id
   * DELETE /api/stores/:id
   *
   * GET    /api/products/:id/price-history
   * POST   /api/products/:id/price-history
   */
  app.use("/api", productRoutes);

  /*
   * ---------------------------------------------------------
   * SEO sitemap
   * ---------------------------------------------------------
   */
  app.get("/sitemap.xml", (_req, res) => {
    const appUrl =
      process.env.APP_URL || "https://kharidpro.ir";

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${appUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>${appUrl}/products</loc>
    <lastmod>${today}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${appUrl}/coupons</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${appUrl}/articles</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>`;

    res.header(
      "Content-Type",
      "application/xml"
    );

    res.send(xml);
  });

  /*
   * ---------------------------------------------------------
   * SEO robots.txt
   * ---------------------------------------------------------
   */
  app.get("/robots.txt", (_req, res) => {
    const appUrl =
      process.env.APP_URL || "https://kharidpro.ir";

    const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${appUrl}/sitemap.xml`;

    res.header(
      "Content-Type",
      "text/plain"
    );

    res.send(robots);
  });

  /*
   * ---------------------------------------------------------
   * Serve Vite production build
   * ---------------------------------------------------------
   */
  const distPath = path.join(
    process.cwd(),
    "dist"
  );

  app.use(express.static(distPath));

  /*
   * ---------------------------------------------------------
   * React SPA fallback
   * ---------------------------------------------------------
   */
  app.get("*", (_req, res) => {
    res.sendFile(
      path.join(distPath, "index.html")
    );
  });

  /*
   * ---------------------------------------------------------
   * API error handler
   * ---------------------------------------------------------
   */
  app.use(
    (
      error: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error(
        "Unhandled server error:",
        error
      );

      if (res.headersSent) {
        return;
      }

      res.status(500).json({
        error: "Internal server error",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });
    }
  );

  /*
   * ---------------------------------------------------------
   * Start server
   * ---------------------------------------------------------
   */
  app.listen(
    PORT,
    "0.0.0.0",
    () => {
      console.log(
        `KharidPro server running on port ${PORT}`
      );
    }
  );
}

startServer().catch((error) => {
  console.error(
    "Failed to start KharidPro server:",
    error
  );

  process.exit(1);
});
