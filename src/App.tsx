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

import {
  Product,
  Coupon,
  Article,
  Review,
  PartnerStore,
} from './types';

import {
  X,
  Bookmark,
  Trash2,
} from 'lucide-react';


/* =========================================================
   URL HELPERS
   ========================================================= */

const getProductIdFromUrl = (): string | null => {
  const match = window.location.pathname.match(/^\/product\/([^/]+)$/);

  if (!match) {
    return null;
  }

  return decodeURIComponent(match[1]);
};


const getArticleSlugFromUrl = (): string | null => {
  const match = window.location.pathname.match(/^\/article\/([^/]+)$/);

  if (!match) {
    return null;
  }

  return decodeURIComponent(match[1]);
};


/* =========================================================
   MAIN APP
   ========================================================= */

export default function App() {

  const [activeTab, setActiveTab] = useState<string>('home');

  const [selectedCategory, setSelectedCategory] =
    useState<string>('all');

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [selectedArticle, setSelectedArticle] =
    useState<Article | null>(null);


  /* =======================================================
     DATA STATES
     ======================================================= */

  const [products, setProducts] =
    useState<Product[]>([]);

  const [coupons, setCoupons] =
    useState<Coupon[]>([]);

  const [articles, setArticles] =
    useState<Article[]>([]);

  const [stores, setStores] =
    useState<PartnerStore[]>([]);

  const [newsletterEmails, setNewsletterEmails] =
    useState<string[]>([]);


  /* =======================================================
     FAVORITES
     ======================================================= */

  const [favorites, setFavorites] =
    useState<string[]>([]);

  const [isFavDrawerOpen, setIsFavDrawerOpen] =
    useState(false);


  /* =======================================================
     SITEMAP
     ======================================================= */

  const [isSitemapOpen, setIsSitemapOpen] =
    useState(false);


  /* =======================================================
     LOAD DATA + RESTORE URL
     ======================================================= */

  useEffect(() => {

    const storedProducts = getStoredProducts();
    const storedCoupons = getStoredCoupons();
    const storedArticles = getStoredArticles();
    const storedStores = getStoredStores();
    const storedNewsletter = getStoredNewsletter();

    setProducts(storedProducts);
    setCoupons(storedCoupons);
    setArticles(storedArticles);
    setStores(storedStores);
    setNewsletterEmails(storedNewsletter);


    /* -------------------------------------------------------
       Restore product page after refresh
       ------------------------------------------------------- */

    const productId = getProductIdFromUrl();

    if (productId) {

      const product = storedProducts.find(
        (p) => p.id === productId
      );

      if (product) {

        setSelectedProduct(product);
        setSelectedArticle(null);
        setActiveTab('product-detail');

      } else {

        /*
         * If the product doesn't exist,
         * return to home.
         */

        window.history.replaceState(
          {},
          '',
          '/'
        );

        setActiveTab('home');
      }

    } else {

      /* -----------------------------------------------------
         Restore article page after refresh
         ----------------------------------------------------- */

      const articleSlug = getArticleSlugFromUrl();

      if (articleSlug) {

        const article = storedArticles.find(
          (a) => a.slug === articleSlug
        );

        if (article) {

          setSelectedArticle(article);
          setSelectedProduct(null);
          setActiveTab('article-detail');

        } else {

          window.history.replaceState(
            {},
            '',
            '/'
          );

          setActiveTab('home');
        }
      }
    }


    /* -------------------------------------------------------
       Favorites
       ------------------------------------------------------- */

    try {

      const favData =
        localStorage.getItem('kharidpro_favs');

      if (favData) {
        setFavorites(JSON.parse(favData));
      }

    } catch (e) {

      console.error(
        'Error loading favorites:',
        e
      );

    }

  }, []);


  /* =======================================================
     BROWSER BACK / FORWARD
     ======================================================= */

  useEffect(() => {

    const handlePopState = () => {

      const pathname =
        window.location.pathname;


      /* -----------------------------------------------------
         PRODUCT URL
         ----------------------------------------------------- */

      const productId =
        getProductIdFromUrl();

      if (productId) {

        const product =
          products.find(
            (p) => p.id === productId
          );

        if (product) {

          setSelectedProduct(product);
          setSelectedArticle(null);
          setActiveTab('product-detail');

          return;
        }
      }


      /* -----------------------------------------------------
         ARTICLE URL
         ----------------------------------------------------- */

      const articleSlug =
        getArticleSlugFromUrl();

      if (articleSlug) {

        const article =
          articles.find(
            (a) => a.slug === articleSlug
          );

        if (article) {

          setSelectedArticle(article);
          setSelectedProduct(null);
          setActiveTab('article-detail');

          return;
        }
      }


      /* -----------------------------------------------------
         NORMAL PAGES
         ----------------------------------------------------- */

      setSelectedProduct(null);
      setSelectedArticle(null);


      if (pathname === '/products') {

        setActiveTab('products');

      } else if (pathname === '/coupons') {

        setActiveTab('coupons');

      } else if (pathname === '/articles') {

        setActiveTab('articles');

      } else if (pathname === '/contact') {

        setActiveTab('contact');

      } else if (pathname === '/about') {

        setActiveTab('about');

      } else if (pathname === '/domain-guide') {

        setActiveTab('domain-guide');

      } else if (pathname === '/admin') {

        setActiveTab('admin');

      } else {

        setActiveTab('home');
      }

    };


    window.addEventListener(
      'popstate',
      handlePopState
    );


    return () => {

      window.removeEventListener(
        'popstate',
        handlePopState
      );

    };

  }, [products, articles]);


  /* =======================================================
     OPEN PRODUCT
     ======================================================= */

  const openProduct = (
    product: Product
  ) => {

    setSelectedProduct(product);
    setSelectedArticle(null);
    setActiveTab('product-detail');

    window.history.pushState(
      {
        type: 'product',
        productId: product.id,
      },
      '',
      `/product/${encodeURIComponent(product.id)}`
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  /* =======================================================
     OPEN ARTICLE
     ======================================================= */

  const openArticle = (
    article: Article
  ) => {

    setSelectedArticle(article);
    setSelectedProduct(null);
    setActiveTab('article-detail');

    window.history.pushState(
      {
        type: 'article',
        articleSlug: article.slug,
      },
      '',
      `/article/${encodeURIComponent(article.slug)}`
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  /* =======================================================
     NAVIGATION
     ======================================================= */

  const navigateTo = (
    tab: string
  ) => {

    setActiveTab(tab);
    setSelectedProduct(null);
    setSelectedArticle(null);


    let url = '/';


    switch (tab) {

      case 'products':
        url = '/products';
        break;

      case 'coupons':
        url = '/coupons';
        break;

      case 'articles':
        url = '/articles';
        break;

      case 'contact':
        url = '/contact';
        break;

      case 'about':
        url = '/about';
        break;

      case 'domain-guide':
        url = '/domain-guide';
        break;

      case 'admin':
        url = '/admin';
        break;

      default:
        url = '/';
    }


    /*
     * Don't create a duplicate history entry
     * if we're already on the same URL.
     */

    if (window.location.pathname !== url) {

      window.history.pushState(
        {
          type: 'page',
          tab,
        },
        '',
        url
      );
    }


    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  /* =======================================================
     UPDATE PRODUCTS
     ======================================================= */

  const handleUpdateProducts = (
    newProds: Product[]
  ) => {

    setProducts(newProds);

    saveStoredProducts(
      newProds
    );
  };


  /* =======================================================
     UPDATE COUPONS
     ======================================================= */

  const handleUpdateCoupons = (
    newCoups: Coupon[]
  ) => {

    setCoupons(newCoups);

    saveStoredCoupons(
      newCoups
    );
  };


  /* =======================================================
     UPDATE ARTICLES
     ======================================================= */

  const handleUpdateArticles = (
    newArts: Article[]
  ) => {

    setArticles(newArts);

    saveStoredArticles(
      newArts
    );
  };


  /* =======================================================
     UPDATE STORES
     ======================================================= */

  const handleUpdateStores = (
    newStores: PartnerStore[]
  ) => {

    setStores(newStores);

    saveStoredStores(
      newStores
    );
  };


  /* =======================================================
     TOGGLE FAVORITE
     ======================================================= */

  const handleToggleFavorite = (
    product: Product,
    e: React.MouseEvent
  ) => {

    e.stopPropagation();

    let updated: string[];


    if (
      favorites.includes(product.id)
    ) {

      updated =
        favorites.filter(
          (id) => id !== product.id
        );

    } else {

      updated = [
        ...favorites,
        product.id,
      ];
    }


    setFavorites(
      updated
    );


    try {

      localStorage.setItem(
        'kharidpro_favs',
        JSON.stringify(updated)
      );

    } catch (err) {

      console.error(
        'Error saving favorites:',
        err
      );

    }
  };


  /* =======================================================
     ADD REVIEW
     ======================================================= */

  const handleAddReview = (
    productId: string,
    review: Review
  ) => {

    const updated =
      products.map((p) => {

        if (p.id === productId) {

          return {
            ...p,
            reviews: [
              review,
              ...p.reviews,
            ],
            reviewsCount:
              p.reviewsCount + 1,
          };
        }

        return p;
      });


    handleUpdateProducts(
      updated
    );


    if (
      selectedProduct &&
      selectedProduct.id === productId
    ) {

      setSelectedProduct({
        ...selectedProduct,

        reviews: [
          review,
          ...selectedProduct.reviews,
        ],

        reviewsCount:
          selectedProduct.reviewsCount + 1,
      });
    }
  };


  /* =======================================================
     FAVORITE PRODUCTS
     ======================================================= */

  const favoriteProducts =
    products.filter(
      (p) =>
        favorites.includes(p.id)
    );


  /* =======================================================
     RENDER
     ======================================================= */

  return (

    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Vazirmatn'] flex flex-col justify-between selection:bg-amber-500 selection:text-white">


      {/* ===================================================
          HEADER
          =================================================== */}

      <Header

        activeTab={activeTab}

        setActiveTab={(tab) => {
          navigateTo(tab);
        }}

        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
        }}

        favoritesCount={
          favorites.length
        }

        onOpenFavorites={() => {
          setIsFavDrawerOpen(true);
        }}

        allProducts={
          products
        }

        onSelectProduct={(p) => {
          openProduct(p);
        }}

      />


      {/* ===================================================
          MAIN CONTENT
          =================================================== */}

      <main className="flex-1">


        {/* -------------------------------------------------
            PRODUCT DETAIL
            ------------------------------------------------- */}

        {selectedProduct ? (

          <ProductDetailPage

            product={
              selectedProduct
            }

            onBack={() => {

              setSelectedProduct(null);

              window.history.pushState(
                {},
                '',
                '/'
              );

              setActiveTab(
                'home'
              );

              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });

            }}

            isFavorite={
              favorites.includes(
                selectedProduct.id
              )
            }

            onToggleFavorite={
              handleToggleFavorite
            }

            onAddReview={
              handleAddReview
            }

          />


        /* -------------------------------------------------
           ARTICLE DETAIL
           ------------------------------------------------- */

        ) : selectedArticle ? (

          <ArticleDetailPage

            article={
              selectedArticle
            }

            allProducts={
              products
            }

            onBack={() => {

              setSelectedArticle(null);

              window.history.pushState(
                {},
                '',
                '/articles'
              );

              setActiveTab(
                'articles'
              );

              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });

            }}

            onSelectProduct={(p) => {

              openProduct(p);

            }}

            favorites={
              favorites
            }

            onToggleFavorite={
              handleToggleFavorite
            }

          />


        /* -------------------------------------------------
           HOME
           ------------------------------------------------- */

        ) : activeTab === 'home' ? (

          <HomePage

            products={
              products
            }

            coupons={
              coupons
            }

            articles={
              articles
            }

            stats={{
              ...INITIAL_STATS,
              testedProducts:
                products.length,
            }}

            onSelectProduct={(p) => {

              openProduct(p);

            }}

            onSelectArticle={(a) => {

              openArticle(a);

            }}

            onSelectCategory={(catId) => {

              setSelectedCategory(
                catId
              );

            }}

            setActiveTab={(tab) => {

              navigateTo(tab);

            }}

            favorites={
              favorites
            }

            onToggleFavorite={
              handleToggleFavorite
            }

          />


        /* -------------------------------------------------
           PRODUCTS
           ------------------------------------------------- */

        ) : activeTab === 'products' ? (

          <ProductsPage

            products={
              products
            }

            stores={
              stores
            }

            selectedCategory={
              selectedCategory
            }

            onSelectCategory={
              setSelectedCategory
            }

            onSelectProduct={(p) => {

              openProduct(p);

            }}

            favorites={
              favorites
            }

            onToggleFavorite={
              handleToggleFavorite
            }

          />


        /* -------------------------------------------------
           COUPONS
           ------------------------------------------------- */

        ) : activeTab === 'coupons' ? (

          <CouponsPage
            coupons={coupons}
            stores={stores}
          />


        /* -------------------------------------------------
           ARTICLES
           ------------------------------------------------- */

        ) : activeTab === 'articles' ? (

          <ArticlesPage

            articles={
              articles
            }

            onSelectArticle={(a) => {

              openArticle(a);

            }}

          />


        /* -------------------------------------------------
           CONTACT
           ------------------------------------------------- */

        ) : activeTab === 'contact' ? (

          <ContactPage />


        /* -------------------------------------------------
           ABOUT
           ------------------------------------------------- */

        ) : activeTab === 'about' ? (

          <AboutPage />


        /* -------------------------------------------------
           DOMAIN GUIDE
           ------------------------------------------------- */

        ) : activeTab === 'domain-guide' ? (

          <DomainGuidePage />


        /* -------------------------------------------------
           ADMIN
           ------------------------------------------------- */

        ) : activeTab === 'admin' ? (

          <AdminPage

            products={
              products
            }

            coupons={
              coupons
            }

            articles={
              articles
            }

            stores={
              stores
            }

            newsletterEmails={
              getStoredNewsletter()
            }

            stats={{
              ...INITIAL_STATS,
              testedProducts:
                products.length,
            }}

            onUpdateProducts={
              handleUpdateProducts
            }

            onUpdateCoupons={
              handleUpdateCoupons
            }

            onUpdateArticles={
              handleUpdateArticles
            }

            onUpdateStores={
              handleUpdateStores
            }

          />


        /* -------------------------------------------------
           FALLBACK HOME
           ------------------------------------------------- */

        ) : (

          <HomePage

            products={
              products
            }

            coupons={
              coupons
            }

            articles={
              articles
            }

            stores={
              stores
            }

            stats={{
              ...INITIAL_STATS,
              testedProducts:
                products.length,
            }}

            onSelectProduct={(p) => {

              openProduct(p);

            }}

            onSelectArticle={(a) => {

              openArticle(a);

            }}

            onSelectCategory={(catId) => {

              setSelectedCategory(
                catId
              );

            }}

            setActiveTab={(tab) => {

              navigateTo(tab);

            }}

            favorites={
              favorites
            }

            onToggleFavorite={
              handleToggleFavorite
            }

          />

        )}

      </main>


      {/* ===================================================
          FAVORITES DRAWER
          =================================================== */}

      {isFavDrawerOpen && (

        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">

          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between animate-slideLeft">


            <div className="space-y-4">

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                <div className="flex items-center gap-2">

                  <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />

                  <h3 className="font-black text-slate-900 text-lg">
                    لیست علاقه‌مندی‌های شما
                  </h3>

                </div>


                <button
                  onClick={() =>
                    setIsFavDrawerOpen(false)
                  }
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
                >

                  <X className="w-5 h-5" />

                </button>

              </div>


              {favoriteProducts.length > 0 ? (

                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">

                  {favoriteProducts.map((p) => {

                    const lowestStore =
                      p.stores.find(
                        (s) => s.isLowest
                      ) ||
                      p.stores[0];


                    return (

                      <div
                        key={p.id}
                        className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 hover:border-amber-400 transition-colors"
                      >

                        <img
                          src={p.image}
                          alt={p.faTitle}
                          className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                        />


                        <div className="flex-1 space-y-1">

                          <h4
                            onClick={() => {

                              openProduct(p);

                              setIsFavDrawerOpen(
                                false
                              );

                            }}

                            className="text-xs font-bold text-slate-900 cursor-pointer hover:text-amber-600 line-clamp-1"
                          >

                            {p.faTitle}

                          </h4>


                          <span className="text-xs font-black text-amber-600 block">

                            {lowestStore?.price.toLocaleString(
                              'fa-IR'
                            )}

                            {' '}تومان

                          </span>

                        </div>


                        <button
                          onClick={(e) =>
                            handleToggleFavorite(
                              p,
                              e
                            )
                          }

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

                  <p className="text-xs">
                    هنوز هیچ محصولی به لیست نشان‌شده‌ها اضافه نکرده‌اید.
                  </p>

                </div>

              )}

            </div>


            <button

              onClick={() =>
                setIsFavDrawerOpen(false)
              }

              className="w-full bg-slate-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >

              بستن پنجره

            </button>

          </div>

        </div>

      )}


      {/* ===================================================
          SITEMAP MODAL
          =================================================== */}

      <SitemapModal

        isOpen={
          isSitemapOpen
        }

        onClose={() =>
          setIsSitemapOpen(false)
        }

      />


      {/* ===================================================
          FOOTER
          =================================================== */}

      <Footer

        setActiveTab={(tab) => {

          navigateTo(tab);

        }}

        onOpenSitemapModal={() =>
          setIsSitemapOpen(true)
        }

      />

    </div>
  );
}
