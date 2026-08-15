import { PoolClient } from "pg";
import { pool, query, withTransaction } from "../db/index.js";

export interface ProductStoreInput {
  storeId: string;
  price: number;
  oldPrice?: number | null;
  inStock?: boolean;
  warranty?: string | null;
  affiliateUrl?: string | null;
  isLowest?: boolean;
}

export interface ProductSpecInput {
  title: string;
  value: string;
}

export interface ProductReviewInput {
  id: string;
  userName: string;
  rating: number;
  reviewDate?: string | null;
  comment?: string | null;
  verifiedBuy?: boolean;
}

export interface ProductInput {
  id: string;
  title: string;
  faTitle?: string | null;
  brand?: string | null;
  categoryId?: string | null;
  categoryName?: string | null;
  image?: string | null;
  gallery?: unknown[];
  rating?: number;
  reviewsCount?: number;
  isFeatured?: boolean;
  isPriceDrop?: boolean;
  isEditorChoice?: boolean;
  priceDropPercentage?: number | null;
  editorsNote?: string | null;
  description?: string | null;
  pros?: unknown[];
  cons?: unknown[];
  viewsCount?: number;
  stores?: ProductStoreInput[];
  specs?: ProductSpecInput[];
  reviews?: ProductReviewInput[];
}

function mapProduct(row: any) {
  return {
    id: row.id,
    title: row.title,
    faTitle: row.fa_title,
    brand: row.brand,
    categoryId: row.category_id,
    categoryName: row.category_name,
    image: row.image,
    gallery: row.gallery || [],
    rating: Number(row.rating || 0),
    reviewsCount: Number(row.reviews_count || 0),
    isFeatured: row.is_featured,
    isPriceDrop: row.is_price_drop,
    isEditorChoice: row.is_editor_choice,
    priceDropPercentage:
      row.price_drop_percentage === null
        ? null
        : Number(row.price_drop_percentage),
    editorsNote: row.editors_note,
    description: row.description,
    pros: row.pros || [],
    cons: row.cons || [],
    viewsCount: Number(row.views_count || 0),
    updatedAt: row.updated_at,
    stores: row.stores || [],
    specs: row.specs || [],
    reviews: row.reviews || [],
    priceHistory: row.price_history || [],
  };
}

const PRODUCT_SELECT = `
  SELECT
    p.id,
    p.title,
    p.fa_title,
    p.brand,
    p.category_id,
    p.category_name,
    p.image,
    p.gallery,
    p.rating,
    p.reviews_count,
    p.is_featured,
    p.is_price_drop,
    p.is_editor_choice,
    p.price_drop_percentage,
    p.editors_note,
    p.description,
    p.pros,
    p.cons,
    p.views_count,
    p.updated_at,

    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', ps.id,
            'storeId', ps.store_id,
            'storeName', s.name,
            'storeFaName', s.fa_name,
            'logo', s.logo,
            'website', s.website,
            'rating', s.rating,
            'trustBadge', s.trust_badge,
            'offersCount', s.offers_count,
            'price', ps.price,
            'oldPrice', ps.old_price,
            'inStock', ps.in_stock,
            'warranty', ps.warranty,
            'affiliateUrl', ps.affiliate_url,
            'isLowest', ps.is_lowest
          )
          ORDER BY ps.price ASC
        )
        FROM product_stores ps
        JOIN partner_stores s ON s.id = ps.store_id
        WHERE ps.product_id = p.id
      ),
      '[]'::jsonb
    ) AS stores,

    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', spec.id,
            'title', spec.title,
            'value', spec.value
          )
          ORDER BY spec.id
        )
        FROM product_specs spec
        WHERE spec.product_id = p.id
      ),
      '[]'::jsonb
    ) AS specs,

    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', r.id,
            'userName', r.user_name,
            'rating', r.rating,
            'reviewDate', r.review_date,
            'comment', r.comment,
            'verifiedBuy', r.verified_buy
          )
          ORDER BY r.id
        )
        FROM product_reviews r
        WHERE r.product_id = p.id
      ),
      '[]'::jsonb
    ) AS reviews,

    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', ph.id,
            'price', ph.price,
            'date', ph.price_date
          )
          ORDER BY ph.created_at ASC
        )
        FROM product_price_history ph
        WHERE ph.product_id = p.id
      ),
      '[]'::jsonb
    ) AS price_history

  FROM products p
`;

export async function getProducts(options?: {
  search?: string;
  categoryId?: string;
}) {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (options?.search) {
    params.push(`%${options.search}%`);
    conditions.push(
      `(p.title ILIKE $${params.length} OR p.fa_title ILIKE $${params.length} OR p.brand ILIKE $${params.length})`
    );
  }

  if (options?.categoryId) {
    params.push(options.categoryId);
    conditions.push(`p.category_id = $${params.length}`);
  }

  const where = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const result = await query(
    `${PRODUCT_SELECT} ${where} ORDER BY p.updated_at DESC`,
    params
  );

  return result.rows.map(mapProduct);
}

export async function getProductById(id: string) {
  const result = await query(
    `${PRODUCT_SELECT} WHERE p.id = $1`,
    [id]
  );

  if (!result.rows.length) {
    return null;
  }

  return mapProduct(result.rows[0]);
}

async function insertStores(
  client: PoolClient,
  productId: string,
  stores: ProductStoreInput[]
) {
  for (const store of stores) {
    await client.query(
      `
        INSERT INTO product_stores (
          product_id,
          store_id,
          price,
          old_price,
          in_stock,
          warranty,
          affiliate_url,
          is_lowest
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        ON CONFLICT (product_id, store_id)
        DO UPDATE SET
          price = EXCLUDED.price,
          old_price = EXCLUDED.old_price,
          in_stock = EXCLUDED.in_stock,
          warranty = EXCLUDED.warranty,
          affiliate_url = EXCLUDED.affiliate_url,
          is_lowest = EXCLUDED.is_lowest
      `,
      [
        productId,
        store.storeId,
        store.price,
        store.oldPrice ?? null,
        store.inStock ?? true,
        store.warranty ?? null,
        store.affiliateUrl ?? null,
        store.isLowest ?? false,
      ]
    );
  }
}

async function insertSpecs(
  client: PoolClient,
  productId: string,
  specs: ProductSpecInput[]
) {
  for (const spec of specs) {
    await client.query(
      `
        INSERT INTO product_specs (
          product_id,
          title,
          value
        )
        VALUES ($1,$2,$3)
      `,
      [productId, spec.title, spec.value]
    );
  }
}

async function insertReviews(
  client: PoolClient,
  productId: string,
  reviews: ProductReviewInput[]
) {
  for (const review of reviews) {
    await client.query(
      `
        INSERT INTO product_reviews (
          id,
          product_id,
          user_name,
          rating,
          review_date,
          comment,
          verified_buy
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        ON CONFLICT (id)
        DO UPDATE SET
          user_name = EXCLUDED.user_name,
          rating = EXCLUDED.rating,
          review_date = EXCLUDED.review_date,
          comment = EXCLUDED.comment,
          verified_buy = EXCLUDED.verified_buy
      `,
      [
        review.id,
        productId,
        review.userName,
        review.rating,
        review.reviewDate ?? null,
        review.comment ?? null,
        review.verifiedBuy ?? false,
      ]
    );
  }
}

export async function createProduct(input: ProductInput) {
  await withTransaction(async (client) => {
    await client.query(
      `
        INSERT INTO products (
          id,
          title,
          fa_title,
          brand,
          category_id,
          category_name,
          image,
          gallery,
          rating,
          reviews_count,
          is_featured,
          is_price_drop,
          is_editor_choice,
          price_drop_percentage,
          editors_note,
          description,
          pros,
          cons,
          views_count
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
          $11,$12,$13,$14,$15,$16,$17,$18,$19
        )
      `,
      [
        input.id,
        input.title,
        input.faTitle ?? null,
        input.brand ?? null,
        input.categoryId ?? null,
        input.categoryName ?? null,
        input.image ?? null,
        JSON.stringify(input.gallery ?? []),
        input.rating ?? 0,
        input.reviewsCount ?? 0,
        input.isFeatured ?? false,
        input.isPriceDrop ?? false,
        input.isEditorChoice ?? false,
        input.priceDropPercentage ?? null,
        input.editorsNote ?? null,
        input.description ?? null,
        JSON.stringify(input.pros ?? []),
        JSON.stringify(input.cons ?? []),
        input.viewsCount ?? 0,
      ]
    );

    if (input.stores?.length) {
      await insertStores(client, input.id, input.stores);
    }

    if (input.specs?.length) {
      await insertSpecs(client, input.id, input.specs);
    }

    if (input.reviews?.length) {
      await insertReviews(client, input.id, input.reviews);
    }
  });

  return getProductById(input.id);
}

export async function updateProduct(
  id: string,
  input: Partial<ProductInput>
) {
  const existing = await getProductById(id);

  if (!existing) {
    return null;
  }

  const merged = {
    ...existing,
    ...input,
  };

  await withTransaction(async (client) => {
    await client.query(
      `
        UPDATE products
        SET
          title = $2,
          fa_title = $3,
          brand = $4,
          category_id = $5,
          category_name = $6,
          image = $7,
          gallery = $8,
          rating = $9,
          reviews_count = $10,
          is_featured = $11,
          is_price_drop = $12,
          is_editor_choice = $13,
          price_drop_percentage = $14,
          editors_note = $15,
          description = $16,
          pros = $17,
          cons = $18,
          views_count = $19,
          updated_at = NOW()
        WHERE id = $1
      `,
      [
        id,
        merged.title,
        merged.faTitle ?? null,
        merged.brand ?? null,
        merged.categoryId ?? null,
        merged.categoryName ?? null,
        merged.image ?? null,
        JSON.stringify(merged.gallery ?? []),
        merged.rating ?? 0,
        merged.reviewsCount ?? 0,
        merged.isFeatured ?? false,
        merged.isPriceDrop ?? false,
        merged.isEditorChoice ?? false,
        merged.priceDropPercentage ?? null,
        merged.editorsNote ?? null,
        merged.description ?? null,
        JSON.stringify(merged.pros ?? []),
        JSON.stringify(merged.cons ?? []),
        merged.viewsCount ?? 0,
      ]
    );

    if (input.stores) {
      await client.query(
        `DELETE FROM product_stores WHERE product_id = $1`,
        [id]
      );

      await insertStores(client, id, input.stores);
    }

    if (input.specs) {
      await client.query(
        `DELETE FROM product_specs WHERE product_id = $1`,
        [id]
      );

      await insertSpecs(client, id, input.specs);
    }

    if (input.reviews) {
      await client.query(
        `DELETE FROM product_reviews WHERE product_id = $1`,
        [id]
      );

      await insertReviews(client, id, input.reviews);
    }
  });

  return getProductById(id);
}

export async function deleteProduct(id: string) {
  const result = await query(
    `DELETE FROM products WHERE id = $1 RETURNING id`,
    [id]
  );

  return result.rowCount === 1;
}

export async function addPriceHistory(
  productId: string,
  price: number,
  priceDate?: string
) {
  await query(
    `
      INSERT INTO product_price_history (
        product_id,
        price,
        price_date
      )
      VALUES ($1,$2,$3)
    `,
    [productId, price, priceDate ?? null]
  );

  return getProductById(productId);
}

export async function getPriceHistory(productId: string) {
  const result = await query(
    `
      SELECT
        id,
        price,
        price_date AS "date",
        created_at
      FROM product_price_history
      WHERE product_id = $1
      ORDER BY created_at ASC
    `,
    [productId]
  );

  return result.rows;
}

export async function getCategories() {
  const result = await query(`
    SELECT
      id,
      name,
      slug,
      icon
    FROM categories
    ORDER BY name ASC
  `);

  return result.rows;
}
