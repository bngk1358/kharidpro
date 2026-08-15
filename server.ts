import express from "express";
import path from "path";
import { checkDatabaseConnection } from "./src/server/db/connection";
import { listCategories, listArticles, listCoupons, listStores, getSiteStats } from "./src/server/repositories/contentRepository";
import { findProductById, listProducts } from "./src/server/repositories/productRepository";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

/* =========================================================
   Types
========================================================= */

interface ImportedProduct {
  id: string;
  title: string;
  faTitle: string;
  enTitle?: string;

  brand: string;

  categoryId: string;
  categoryName: string;

  image: string;
  gallery: string[];

  description: string;

  price: number;
  originalPrice?: number;
  discountPercent?: number;

  pros: string[];
  cons: string[];

  rating?: number;
  reviewsCount?: number;

  seller?: {
    id?: number;
    title?: string;
    rating?: number;
    ratingCount?: number;
    commitment?: number;
    onTimeShipping?: number;
    stars?: number;
    grade?: string;
    isTrusted?: boolean;
    isOfficial?: boolean;
  };

  warranty?: string;

  inStock?: boolean;

  specifications: {
    group: string;
    attributes: {
      title: string;
      values: string[];
    }[];
  }[];

  sourceUrl: string;
  affiliateUrl: string;
}

/* =========================================================
   Helpers
========================================================= */

function cleanText(value: unknown): string {
  if (typeof value !== "string") return "";

  return value
    .replace(/\s+/g, " ")
    .replace(/\u200c/g, " ")
    .trim();
}

function extractProductId(url: string): string | null {
  const match = url.match(/dkp-(\d+)/i);

  return match ? match[1] : null;
}

function extractVariantId(url: string): string | null {
  const match = url.match(/[?&]variant_id=(\d+)/i);

  return match ? match[1] : null;
}

function getImageUrl(imageObject: any): string {
  if (!imageObject) return "";

  if (
    Array.isArray(imageObject.url) &&
    imageObject.url.length > 0
  ) {
    return imageObject.url[0];
  }

  if (
    Array.isArray(imageObject.webp_url) &&
    imageObject.webp_url.length > 0
  ) {
    return imageObject.webp_url[0];
  }

  return "";
}

function extractImages(product: any): string[] {
  const images: string[] = [];

  const mainImage = getImageUrl(product.images?.main);

  if (mainImage) {
    images.push(mainImage);
  }

  if (Array.isArray(product.images?.list)) {
    for (const image of product.images.list) {
      const url = getImageUrl(image);

      if (url && !images.includes(url)) {
        images.push(url);
      }
    }
  }

  return images;
}

function extractSpecifications(product: any) {
  if (!Array.isArray(product.specifications)) {
    return [];
  }

  return product.specifications.map((group: any) => ({
    group: cleanText(group?.title),

    attributes: Array.isArray(group?.attributes)
      ? group.attributes.map((attribute: any) => ({
          title: cleanText(attribute?.title),

          values: Array.isArray(attribute?.values)
            ? attribute.values
                .map((value: any) => cleanText(value))
                .filter(Boolean)
            : [],
        }))
      : [],
  }));
}

function extractPros(product: any): string[] {
  if (!Array.isArray(product.pros_and_cons?.advantages)) {
    return [];
  }

  return product.pros_and_cons.advantages
    .map((item: any) => cleanText(item))
    .filter(Boolean);
}

function extractCons(product: any): string[] {
  if (!Array.isArray(product.pros_and_cons?.disadvantages)) {
    return [];
  }

  return product.pros_and_cons.disadvantages
    .map((item: any) => cleanText(item))
    .filter(Boolean);
}

function extractCategory(product: any) {
  const category = product.category;

  if (!category) {
    return {
      categoryId: "other",
      categoryName: "سایر",
    };
  }

  let categoryName = "";

  if (typeof category === "string") {
    categoryName = cleanText(category);
  } else {
    categoryName =
      cleanText(category?.title_fa) ||
      cleanText(category?.title) ||
      "";
  }

  const lower = categoryName.toLowerCase();

  if (
    lower.includes("گوشی") ||
    lower.includes("موبایل") ||
    lower.includes("mobile")
  ) {
    return {
      categoryId: "mobile",
      categoryName: "گوشی موبایل",
    };
  }

  if (
    lower.includes("لپ") ||
    lower.includes("لپ‌تاپ") ||
    lower.includes("laptop")
  ) {
    return {
      categoryId: "laptop",
      categoryName: "لپ تاپ",
    };
  }

  if (
    lower.includes("هدفون") ||
    lower.includes("هندزفری") ||
    lower.includes("headphone")
  ) {
    return {
      categoryId: "audio",
      categoryName: "هدفون و هندزفری",
    };
  }

  return {
    categoryId: "other",
    categoryName: categoryName || "سایر",
  };
}

function extractSeller(variant: any) {
  const seller = variant?.seller;

  if (!seller) {
    return undefined;
  }

  return {
    id: seller.id,

    title: cleanText(seller.title),

    rating:
      typeof seller.rating?.total_rate === "number"
        ? seller.rating.total_rate
        : undefined,

    ratingCount:
      typeof seller.rating?.total_count === "number"
        ? seller.rating.total_count
        : undefined,

    commitment:
      typeof seller.rating?.commitment === "number"
        ? seller.rating.commitment
        : undefined,

    onTimeShipping:
      typeof seller.rating?.on_time_shipping === "number"
        ? seller.rating.on_time_shipping
        : undefined,

    stars:
      typeof seller.stars === "number"
        ? seller.stars
        : undefined,

    grade: cleanText(seller.grade?.label),

    isTrusted:
      seller.properties?.is_trusted === true,

    isOfficial:
      seller.properties?.is_official === true,
  };
}

/* =========================================================
   Digikala API
========================================================= */

async function fetchDigikalaProduct(
  productId: string
) {
  const apiUrl =
    `https://api.digikala.com/v2/product/${productId}/`;

  const response = await fetch(apiUrl, {
    headers: {
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Digikala API returned ${response.status}`
    );
  }

  const json = await response.json();

  if (!json?.data?.product) {
    throw new Error(
      "اطلاعات محصول از API دیجی‌کالا دریافت نشد."
    );
  }

  return json.data.product;
}

/* =========================================================
   Convert Digikala product → KharidPro product
========================================================= */

function convertDigikalaProduct(
  product: any,
  sourceUrl: string,
  variantIdFromUrl?: string | null
): ImportedProduct {
  const variants = Array.isArray(product.variants)
    ? product.variants
    : [];

  let variant = product.default_variant;

  if (variantIdFromUrl) {
    const requestedVariant = variants.find(
      (item: any) =>
        String(item?.id) === String(variantIdFromUrl)
    );

    if (requestedVariant) {
      variant = requestedVariant;
    }
  }

  const images = extractImages(product);

  const category = extractCategory(product);

  const price =
    Number(variant?.price?.selling_price || 0) / 10;

  const originalPrice =
    Number(variant?.price?.rrp_price || 0) / 10;

  const discountPercent =
    Number(variant?.price?.discount_percent || 0);

  const inStock =
    variant?.status === "marketable" &&
    price > 0;

  const rating =
    typeof product.rating?.rate === "number"
      ? product.rating.rate
      : typeof product.rating?.total_rate === "number"
      ? product.rating.total_rate
      : undefined;

  const reviewsCount =
    typeof product.comments_count === "number"
      ? product.comments_count
      : undefined;

  const warranty =
    cleanText(
      variant?.warranty?.title
    ) ||
    cleanText(
      variant?.warranty?.name
    ) ||
    "";

  const title =
    cleanText(product.title_fa) ||
    cleanText(product.title_en) ||
    "محصول بدون نام";

  return {
    id: `import-dkp-${product.id}`,

    title,

    faTitle: cleanText(product.title_fa),

    enTitle: cleanText(product.title_en),

    brand:
      cleanText(product.brand?.title_fa) ||
      cleanText(product.brand?.title) ||
      cleanText(product.data_layer?.brand),

    categoryId: category.categoryId,

    categoryName: category.categoryName,

    image: images[0] || "",

    gallery: images,

    description: title,

    price,

    originalPrice,

    discountPercent,

    pros: extractPros(product),

    cons: extractCons(product),

    rating,

    reviewsCount,

    seller: extractSeller(variant),

    warranty,

    inStock,

    specifications:
      extractSpecifications(product),

    sourceUrl,

    // فعلاً همان لینک اصلی.
    // بعداً لینک افیلیت واقعی جایگزین می‌شود.
    affiliateUrl: sourceUrl,
  };
}

/* =========================================================
   Health
========================================================= */

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    name: "KharidPro Backend Service",
  });
});

/* =========================================================
   Read-only database API
========================================================= */

function sendDatabaseError(res: express.Response, error: unknown) {
  console.error("Database API error:", error);
  return res.status(503).json({
    error: "Database is unavailable. Run migrations and seed data before using this endpoint.",
  });
}

app.get("/api/products", async (req, res) => {
  try {
    return res.json(await listProducts());
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await findProductById(req.params.id);
    return product ? res.json(product) : res.status(404).json({ error: "Product not found." });
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    return res.json(await listCategories());
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

app.get("/api/stores", async (req, res) => {
  try {
    return res.json(await listStores());
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

app.get("/api/coupons", async (req, res) => {
  try {
    return res.json(await listCoupons());
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

app.get("/api/articles", async (req, res) => {
  try {
    return res.json(await listArticles());
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

app.get("/api/stats", async (req, res) => {
  try {
    const stats = await getSiteStats();
    return stats ? res.json(stats) : res.status(404).json({ error: "Site statistics not found." });
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

app.get("/api/database/health", async (req, res) => {
  try {
    await checkDatabaseConnection();
    return res.json({ status: "ok" });
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

/* =========================================================
   Product Import
========================================================= */

app.post(
  "/api/import-product",
  async (req, res) => {
    try {
      const { url } = req.body;

      if (!url || typeof url !== "string") {
        return res.status(400).json({
          success: false,
          error:
            "لطفاً لینک محصول را ارسال کنید.",
        });
      }

      console.log(
        "Product import requested:",
        url
      );

      const productId =
        extractProductId(url);

      if (!productId) {
        return res.status(400).json({
          success: false,
          error:
            "شناسه محصول دیجی‌کالا از لینک استخراج نشد.",
        });
      }

      const variantId =
        extractVariantId(url);

      console.log(
        "Digikala product ID:",
        productId
      );

      console.log(
        "Digikala variant ID:",
        variantId
      );

      const digikalaProduct =
        await fetchDigikalaProduct(
          productId
        );

      const product =
        convertDigikalaProduct(
          digikalaProduct,
          url,
          variantId
        );

      console.log(
        "Product imported:",
        product.title
      );

      return res.json({
        success: true,

        source: "digikala",

        product,
      });
    } catch (error: any) {
      console.error(
        "Product import error:",
        error
      );

      return res.status(500).json({
        success: false,

        error:
          error?.message ||
          "خطا در دریافت اطلاعات محصول.",
      });
    }
  }
);

/* =========================================================
   Sitemap
========================================================= */

app.get("/sitemap.xml", (req, res) => {
  const appUrl =
    process.env.APP_URL ||
    "https://kharidpro.ir";

  const today =
    new Date()
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

/* =========================================================
   Robots
========================================================= */

app.get("/robots.txt", (req, res) => {
  const appUrl =
    process.env.APP_URL ||
    "https://kharidpro.ir";

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

/* =========================================================
   Static React build
========================================================= */

const distPath = path.join(
  process.cwd(),
  "dist"
);

app.use(
  express.static(distPath)
);

/* =========================================================
   React SPA fallback
========================================================= */

app.get("*", (req, res) => {
  res.sendFile(
    path.join(
      distPath,
      "index.html"
    )
  );
});

/* =========================================================
   Start Server
========================================================= */

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `KharidPro server running on port ${PORT}`
    );
  }
);
