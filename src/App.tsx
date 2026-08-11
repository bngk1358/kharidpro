import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SitemapModal } from './components/SitemapModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CouponsPage } from './pages/CouponsPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { DomainGuidePage } from './pages/DomainGuidePage';
import { AdminPage } from './pages/AdminPage';

import {
  getStoredProducts,
  saveStoredProducts,
  getStoredCoupons,
  saveStoredCoupons,
  getStoredArticles,
  saveStoredArticles,
  getStoredStores,
  saveStoredStores,
  getStoredNewsletter,
  INITIAL_STATS,
} from './data/mockData';
import { Product, Coupon, Article, Review, PartnerStore } from './types';
import { X, Bookmark, Trash2, ArrowUpLeft, ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [stores, setStores] = useState<PartnerStore[]>([]);
  const [newsletterEmails, setNewsletterEmails] = useState<string[]>([]);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavDrawerOpen, setIsFavDrawerOpen] = useState(false);

  // Sitemap Modal
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  // Load Initial Data on Mount
  useEffect(() => {
    setProducts(getStoredProducts());
    setCoupons(getStoredCoupons());
    setArticles(getStoredArticles());
    setStores(getStoredStores());
    setNewsletterEmails(getStoredNewsletter());

    try {
      const favData = localStorage.getItem('kharidpro_favs');
      if (favData) setFavorites(JSON.parse(favData));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Update localStorage when state changes
  const handleUpdateProducts = (newProds: Product[]) => {
    setProducts(newProds);
    saveStoredProducts(newProds);
  };

  const handleUpdateCoupons = (newCoups: Coupon[]) => {
    setCoupons(newCoups);
    saveStoredCoupons(newCoups);
  };

  const handleUpdateArticles = (newArts: Article[]) => {
    setArticles(newArts);
    saveStoredArticles(newArts);
  };

  const handleUpdateStores = (newStores: PartnerStore[]) => {
    setStores(newStores);
    saveStoredStores(newStores);
  };

  // Toggle Favorite
  const handleToggleFavorite = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (favorites.includes(product.id)) {
      updated = favorites.filter((id) => id !== product.id);
    } else {
      updated = [...favorites, product.id];
    }
    setFavorites(updated);
    try {
      localStorage.setItem('kharidpro_favs', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Add Review
  const handleAddReview = (productId: string, review: Review) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        return {
          ...p,
          reviews: [review, ...p.reviews],
          reviewsCount: p.reviewsCount + 1,
        };
      }
      return p;
    });
    handleUpdateProducts(updated);
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct({
        ...selectedProduct,
        reviews: [review, ...selectedProduct.reviews],
        reviewsCount: selectedProduct.reviewsCount + 1,
      });
    }
  };

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Vazirmatn'] flex flex-col justify-between selection:bg-amber-500 selection:text-white">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null);
          setSelectedArticle(null);
        }}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavDrawerOpen(true)}
        allProducts={products}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setActiveTab('product-detail');
        }}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            isFavorite={favorites.includes(selectedProduct.id)}
            onToggleFavorite={handleToggleFavorite}
            onAddReview={handleAddReview}
          />
        ) : selectedArticle ? (
          <ArticleDetailPage
            article={selectedArticle}
            allProducts={products}
            onBack={() => setSelectedArticle(null)}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setSelectedArticle(null);
            }}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : activeTab === 'home' ? (
          <HomePage
            products={products}
            coupons={coupons}
            articles={articles}
            stats={{ ...INITIAL_STATS, testedProducts: products.length }}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onSelectArticle={(a) => setSelectedArticle(a)}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
            setActiveTab={setActiveTab}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : activeTab === 'products' ? (
          <ProductsPage
            products={products}
            stores={stores}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : activeTab === 'coupons' ? (
          <CouponsPage coupons={coupons} stores={stores} />
        ) : activeTab === 'articles' ? (
          <ArticlesPage
            articles={articles}
            onSelectArticle={(a) => setSelectedArticle(a)}
          />
        ) : activeTab === 'contact' ? (
          <ContactPage />
        ) : activeTab === 'about' ? (
          <AboutPage />
        ) : activeTab === 'domain-guide' ? (
          <DomainGuidePage />
        ) : activeTab === 'admin' ? (
          <AdminPage
            products={products}
            coupons={coupons}
            articles={articles}
            stores={stores}
            newsletterEmails={getStoredNewsletter()}
            stats={{ ...INITIAL_STATS, testedProducts: products.length }}
            onUpdateProducts={handleUpdateProducts}
            onUpdateCoupons={handleUpdateCoupons}
            onUpdateArticles={handleUpdateArticles}
            onUpdateStores={handleUpdateStores}
          />
        ) : (
          <HomePage
            products={products}
            coupons={coupons}
            articles={articles}
            stores={stores}
            stats={{ ...INITIAL_STATS, testedProducts: products.length }}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onSelectArticle={(a) => setSelectedArticle(a)}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
            setActiveTab={setActiveTab}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      {/* Favorites Drawer Overlay */}
      {isFavDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between animate-slideLeft">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h3 className="font-black text-slate-900 text-lg">لیست علاقه‌مندی‌های شما</h3>
                </div>
                <button
                  onClick={() => setIsFavDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {favoriteProducts.length > 0 ? (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {favoriteProducts.map((p) => {
                    const lowestStore = p.stores.find((s) => s.isLowest) || p.stores[0];

                    return (
                      <div
                        key={p.id}
                        className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 hover:border-amber-400 transition-colors"
                      >
                        <img src={p.image} alt={p.faTitle} className="w-12 h-12 object-contain bg-white rounded-lg p-1" />

                        <div className="flex-1 space-y-1">
                          <h4
                            onClick={() => {
                              setSelectedProduct(p);
                              setIsFavDrawerOpen(false);
                            }}
                            className="text-xs font-bold text-slate-900 cursor-pointer hover:text-amber-600 line-clamp-1"
                          >
                            {p.faTitle}
                          </h4>
                          <span className="text-xs font-black text-amber-600 block">
                            {lowestStore?.price.toLocaleString('fa-IR')} تومان
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleToggleFavorite(p, e)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Bookmark className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-xs">هنوز هیچ محصولی به لیست نشان‌شده‌ها اضافه نکرده‌اید.</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsFavDrawerOpen(false)}
              className="w-full bg-slate-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              بستن پنجره
            </button>

          </div>
        </div>
      )}

      {/* SEO Sitemap & Robots.txt Modal */}
      <SitemapModal isOpen={isSitemapOpen} onClose={() => setIsSitemapOpen(false)} />

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null);
          setSelectedArticle(null);
        }}
        onOpenSitemapModal={() => setIsSitemapOpen(true)}
      />

    </div>
  );
}
