import { Router, Request, Response } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getPriceHistory,
  addPriceHistory,
} from "../repositories/productRepository.js";
import { query } from "../db/index.js";

const router = Router();

/**
 * GET /api/products
 *
 * Optional query parameters:
 * ?search=Samsung
 * ?categoryId=mobile
 */
router.get("/products", async (req: Request, res: Response) => {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : undefined;

    const categoryId =
      typeof req.query.categoryId === "string"
        ? req.query.categoryId.trim()
        : undefined;

    const products = await getProducts({
      search,
      categoryId,
    });

    res.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);

    res.status(500).json({
      error: "Failed to load products",
      message:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * GET /api/products/:id
 */
router.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    return res.json(product);
  } catch (error) {
    console.error("GET /api/products/:id error:", error);

    return res.status(500).json({
      error: "Failed to load product",
      message:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * POST /api/products
 */
router.post("/products", async (req: Request, res: Response) => {
  try {
    const input = req.body;

    if (!input || typeof input !== "object") {
      return res.status(400).json({
        error: "Invalid request body",
      });
    }

    if (!input.id || typeof input.id !== "string") {
      return res.status(400).json({
        error: "Product id is required",
      });
    }

    if (!input.title || typeof input.title !== "string") {
      return res.status(400).json({
        error: "Product title is required",
      });
    }

    const existing = await getProductById(input.id);

    if (existing) {
      return res.status(409).json({
        error: "Product already exists",
      });
    }

    const product = await createProduct(input);

    return res.status(201).json(product);
  } catch (error) {
    console.error("POST /api/products error:", error);

    return res.status(500).json({
      error: "Failed to create product",
      message:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * PUT /api/products/:id
 */
router.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const input = req.body;

    if (!input || typeof input !== "object") {
      return res.status(400).json({
        error: "Invalid request body",
      });
    }

    const product = await updateProduct(req.params.id, input);

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    return res.json(product);
  } catch (error) {
    console.error("PUT /api/products/:id error:", error);

    return res.status(500).json({
      error: "Failed to update product",
      message:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * DELETE /api/products/:id
 */
router.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await deleteProduct(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE /api/products/:id error:", error);

    return res.status(500).json({
      error: "Failed to delete product",
      message:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * GET /api/categories
 */
router.get("/categories", async (_req: Request, res: Response) => {
  try {
    const categories = await getCategories();

    return res.json(categories);
  } catch (error) {
    console.error("GET /api/categories error:", error);

    return res.status(500).json({
      error: "Failed to load categories",
      message:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * GET /api/products/:id/price-history
 */
router.get(
  "/products/:id/price-history",
  async (req: Request, res: Response) => {
    try {
      const product = await getProductById(req.params.id);

      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }

      const history = await getPriceHistory(req.params.id);

      return res.json(history);
    } catch (error) {
      console.error(
        "GET /api/products/:id/price-history error:",
        error
      );

      return res.status(500).json({
        error: "Failed to load price history",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });
    }
  }
);

/**
 * POST /api/products/:id/price-history
 */
router.post(
  "/products/:id/price-history",
  async (req: Request, res: Response) => {
    try {
      const { price, priceDate } = req.body;

      if (
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        price < 0
      ) {
        return res.status(400).json({
          error: "Valid price is required",
        });
      }

      const product = await getProductById(req.params.id);

      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }

      const updatedProduct = await addPriceHistory(
        req.params.id,
        price,
        typeof priceDate === "string"
          ? priceDate
          : undefined
      );

      return res.status(201).json(updatedProduct);
    } catch (error) {
      console.error(
        "POST /api/products/:id/price-history error:",
        error
      );

      return res.status(500).json({
        error: "Failed to add price history",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });
    }
  }
);

/**
 * GET /api/stores
 */
router.get("/stores", async (_req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT
        id,
        name,
        fa_name AS "faName",
        logo,
        website,
        rating,
        trust_badge AS "trustBadge",
        offers_count AS "offersCount"
      FROM partner_stores
      ORDER BY name ASC
    `);

    return res.json(result.rows);
  } catch (error) {
    console.error("GET /api/stores error:", error);

    return res.status(500).json({
      error: "Failed to load stores",
      message:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * POST /api/stores
 */
router.post("/stores", async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      faName,
      logo,
      website,
      rating,
      trustBadge,
      offersCount,
    } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        error: "Store id is required",
      });
    }

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        error: "Store name is required",
      });
    }

    const result = await query(
      `
        INSERT INTO partner_stores (
          id,
          name,
          fa_name,
          logo,
          website,
          rating,
          trust_badge,
          offers_count
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING
          id,
          name,
          fa_name AS "faName",
          logo,
          website,
          rating,
          trust_badge AS "trustBadge",
          offers_count AS "offersCount"
      `,
      [
        id,
        name,
        faName ?? null,
        logo ?? null,
        website ?? null,
        rating ?? 0,
        trustBadge ?? false,
        offersCount ?? 0,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("POST /api/stores error:", error);

    return res.status(500).json({
      error: "Failed to create store",
      message:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * PUT /api/stores/:id
 */
router.put("/stores/:id", async (req: Request, res: Response) => {
  try {
    const {
      name,
      faName,
      logo,
      website,
      rating,
      trustBadge,
      offersCount,
    } = req.body;

    const result = await query(
      `
        UPDATE partner_stores
        SET
          name = $2,
          fa_name = $3,
          logo = $4,
          website = $5,
          rating = $6,
          trust_badge = $7,
          offers_count = $8,
          updated_at = NOW()
        WHERE id = $1
        RETURNING
          id,
          name,
          fa_name AS "faName",
          logo,
          website,
          rating,
          trust_badge AS "trustBadge",
          offers_count AS "offersCount"
      `,
      [
        req.params.id,
        name,
        faName ?? null,
        logo ?? null,
        website ?? null,
        rating ?? 0,
        trustBadge ?? false,
        offersCount ?? 0,
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        error: "Store not found",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT /api/stores/:id error:", error);

    return res.status(500).json({
      error: "Failed to update store",
      message:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * DELETE /api/stores/:id
 */
router.delete("/stores/:id", async (req: Request, res: Response) => {
  try {
    const result = await query(
      `
        DELETE FROM partner_stores
        WHERE id = $1
        RETURNING id
      `,
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        error: "Store not found",
      });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE /api/stores/:id error:", error);

    return res.status(500).json({
      error: "Failed to delete store",
      message:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
