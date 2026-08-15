CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS partner_stores (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    fa_name TEXT,
    logo TEXT,
    website TEXT,
    rating NUMERIC(3,2) NOT NULL DEFAULT 0,
    trust_badge BOOLEAN NOT NULL DEFAULT FALSE,
    offers_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY,
    title TEXT NOT NULL,
    fa_title TEXT,
    brand TEXT,
    category_id VARCHAR(100)
        REFERENCES categories(id)
        ON DELETE SET NULL,
    category_name TEXT,

    image TEXT,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,

    rating NUMERIC(3,2) NOT NULL DEFAULT 0,
    reviews_count INTEGER NOT NULL DEFAULT 0,

    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_price_drop BOOLEAN NOT NULL DEFAULT FALSE,
    is_editor_choice BOOLEAN NOT NULL DEFAULT FALSE,

    price_drop_percentage NUMERIC(7,2),
    editors_note TEXT,
    description TEXT,

    pros JSONB NOT NULL DEFAULT '[]'::jsonb,
    cons JSONB NOT NULL DEFAULT '[]'::jsonb,

    views_count INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_stores (
    id BIGSERIAL PRIMARY KEY,

    product_id VARCHAR(100) NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    store_id VARCHAR(100) NOT NULL
        REFERENCES partner_stores(id)
        ON DELETE CASCADE,

    price BIGINT NOT NULL DEFAULT 0,
    old_price BIGINT,

    in_stock BOOLEAN NOT NULL DEFAULT TRUE,

    warranty TEXT,
    affiliate_url TEXT,

    is_lowest BOOLEAN NOT NULL DEFAULT FALSE,

    UNIQUE(product_id, store_id)
);

CREATE TABLE IF NOT EXISTS product_specs (
    id BIGSERIAL PRIMARY KEY,

    product_id VARCHAR(100) NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,
    value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS product_reviews (
    id VARCHAR(100) PRIMARY KEY,

    product_id VARCHAR(100) NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    user_name TEXT NOT NULL,
    rating NUMERIC(3,2) NOT NULL DEFAULT 0,
    review_date TEXT,
    comment TEXT,

    verified_buy BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS product_price_history (
    id BIGSERIAL PRIMARY KEY,

    product_id VARCHAR(100) NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    price BIGINT NOT NULL,
    price_date TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category_id
    ON products(category_id);

CREATE INDEX IF NOT EXISTS idx_products_brand
    ON products(brand);

CREATE INDEX IF NOT EXISTS idx_product_stores_product_id
    ON product_stores(product_id);

CREATE INDEX IF NOT EXISTS idx_product_stores_store_id
    ON product_stores(store_id);

CREATE INDEX IF NOT EXISTS idx_product_specs_product_id
    ON product_specs(product_id);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id
    ON product_reviews(product_id);

CREATE INDEX IF NOT EXISTS idx_product_price_history_product_id
    ON product_price_history(product_id);
