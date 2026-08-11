import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product, FilterState, CategoryId, PartnerStore } from '../types';
import { CATEGORIES, STORES, toFaDigit } from '../data/mockData';
import { SlidersHorizontal, Search, RotateCcw, LayoutGrid, List, Check, TrendingDown, ArrowUpDown } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  stores?: PartnerStore[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectProduct: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (product: Product, e: React.MouseEvent) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  stores,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  favorites,
  onToggleFavorite,
}) => {
  const storeList = stores && stores.length > 0 ? stores : STORES;
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [onlyPriceDrop, setOnlyPriceDrop] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(150000000);
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('lowestPrice');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand)));
    return list;
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.faTitle.includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.includes(q)
      );
    }

    // Brand
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Store
    if (selectedStore !== 'all') {
      result = result.filter((p) => p.stores.some((s) => s.storeId === selectedStore));
    }

    // Price Drop Only
    if (onlyPriceDrop) {
      result = result.filter((p) => p.isPriceDrop);
    }

    // Max Price
    result = result.filter((p) => {
      const lowest = p.stores[0]?.price || 0;
      return lowest <= maxPrice;
    });

    // Sorting
    result.sort((a, b) => {
      const lowestA = a.stores.find((s) => s.isLowest)?.price || a.stores[0]?.price || 0;
      const lowestB = b.stores.find((s) => s.isLowest)?.price || b.stores[0]?.price || 0;

      if (sortBy === 'lowestPrice') return lowestA - lowestB;
      if (sortBy === 'highestPrice') return lowestB - lowestA;
      if (sortBy === 'priceDrop') return (b.priceDropPercentage || 0) - (a.priceDropPercentage || 0);
      if (sortBy === 'popularity') return b.viewsCount - a.viewsCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [products, selectedCategory, search, selectedBrand, selectedStore, onlyPriceDrop, maxPrice, sortBy]);

  const resetFilters = () => {
    onSelectCategory('all');
    setSearch('');
    setSelectedBrand('all');
    setSelectedStore('all');
    setOnlyPriceDrop(false);
    setOnlyInStock(false);
    setMaxPrice(150000000);
    setSortBy('lowestPrice');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & Breadcrumb */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-3 shadow-lg border border-slate-800">
        <h1 className="text-2xl sm:text-4xl font-black">همه محصولات و مقایسه قیمت لحظه‌ای</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          لیست کامل محصولات به همراه استعلام قیمت بروز از فروشگاه‌های دیجی‌کالا، تکنولایف، موبیت و مقداد آی‌تی.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filter Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-6 sticky top-28">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-base">فیلترهای پیشرفته</h3>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>حذف فیلترها</span>
              </button>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">دسته‌بندی تخصصی:</label>
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-amber-400"
              >
                <option value="all">همه دسته‌بندی‌ها</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({toFaDigit(c.productCount)})
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">برند کالا:</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-amber-400"
              >
                <option value="all">همه برندها</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Store Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">فروشگاه عرضه کننده:</label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-amber-400"
              >
                <option value="all">همه فروشگاه‌ها</option>
                {storeList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.faName}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">سقف قیمت:</span>
                <span className="font-black text-amber-600">
                  {toFaDigit(maxPrice.toLocaleString('fa-IR'))} تومان
                </span>
              </div>
              <input
                type="range"
                min={5000000}
                max={150000000}
                step={5000000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Checkbox Toggles */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={onlyPriceDrop}
                  onChange={(e) => setOnlyPriceDrop(e.target.checked)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-400 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                  <span>فقط محصولات با افت قیمت</span>
                </span>
              </label>
            </div>

          </div>
        </div>

        {/* Products Grid Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Controls Bar (Search + Sort + View Mode) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="w-full sm:w-auto flex-1 max-w-sm relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                placeholder="جستجو در بین نتایج..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Sort & Layout Controls */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
                <span>مرتب‌سازی:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as FilterState['sortBy'])}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="lowestPrice">ارزان‌ترین قیمت</option>
                  <option value="highestPrice">گران‌ترین قیمت</option>
                  <option value="priceDrop">بیشترین درصد افت قیمت</option>
                  <option value="popularity">پربازدیدترین‌ها</option>
                  <option value="rating">بالاترین امتیاز کاربران</option>
                </select>
              </div>

              {/* View Layout Toggles */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="نمایش شبکه‌ای"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="نمایش لیستی"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Results Count Bar */}
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between px-2">
            <span>نمایش {toFaDigit(filteredProducts.length)} محصول یافت‌شده</span>
          </div>

          {/* Products Render */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <p className="text-base font-bold text-slate-700">هیچ محصولی با فیلترهای انتخابی یافت نشد.</p>
              <button
                onClick={resetFilters}
                className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs hover:bg-amber-400 transition-colors"
              >
                حذف همه فیلترها
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
