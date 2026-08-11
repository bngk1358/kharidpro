import React, { useState } from 'react';
import { Product, Coupon, Article, SiteStats, StorePrice, CategoryId, PartnerStore } from '../types';
import { CATEGORIES, STORES, formatToman, toFaDigit } from '../data/mockData';
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  BookOpen,
  Mail,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  ShieldAlert,
  AlertCircle,
  ShieldCheck,
  Sliders,
  Store,
  ExternalLink,
  Star
} from 'lucide-react';

interface AdminPageProps {
  products: Product[];
  coupons: Coupon[];
  articles: Article[];
  stores?: PartnerStore[];
  newsletterEmails: string[];
  stats: SiteStats;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateCoupons: (coupons: Coupon[]) => void;
  onUpdateArticles: (articles: Article[]) => void;
  onUpdateStores?: (stores: PartnerStore[]) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  coupons,
  articles,
  stores,
  newsletterEmails,
  stats,
  onUpdateProducts,
  onUpdateCoupons,
  onUpdateArticles,
  onUpdateStores,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kharidpro_admin_authed') === 'true';
    } catch {
      return false;
    }
  });

  const [adminUsername, setAdminUsername] = useState<string>(() => {
    try {
      return localStorage.getItem('kharidpro_admin_username') || 'admin';
    } catch {
      return 'admin';
    }
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem('kharidpro_admin_password') || 'admin';
    } catch {
      return 'admin';
    }
  });

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'coupons' | 'newsletter' | 'stores' | 'security'>('overview');
  const [successMsg, setSuccessMsg] = useState('');

  // Stores Management State
  const activeStores = stores && stores.length > 0 ? stores : STORES;
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [editingStore, setEditingStore] = useState<PartnerStore | null>(null);

  // New Store Form State
  const [newStoreFaName, setNewStoreFaName] = useState('');
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreWebsite, setNewStoreWebsite] = useState('');
  const [newStoreLogo, setNewStoreLogo] = useState('');
  const [newStoreRating, setNewStoreRating] = useState('4.8');
  const [newStoreTrustBadge, setNewStoreTrustBadge] = useState('فروشگاه تاییدشده خرید پرو');
  const [newStoreOffersCount, setNewStoreOffersCount] = useState('500');

  // Edit Store Form State
  const [editStoreFaName, setEditStoreFaName] = useState('');
  const [editStoreName, setEditStoreName] = useState('');
  const [editStoreWebsite, setEditStoreWebsite] = useState('');
  const [editStoreLogo, setEditStoreLogo] = useState('');
  const [editStoreRating, setEditStoreRating] = useState('4.8');
  const [editStoreTrustBadge, setEditStoreTrustBadge] = useState('');
  const [editStoreOffersCount, setEditStoreOffersCount] = useState('500');

  // Password Change State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [newUsernameInput, setNewUsernameInput] = useState(adminUsername);
  const [changePassError, setChangePassError] = useState('');
  const [changePassSuccess, setChangePassSuccess] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Add Product State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdFaTitle, setNewProdFaTitle] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('Samsung');
  const [newProdCategory, setNewProdCategory] = useState<CategoryId>('mobile');
  const [newProdImg, setNewProdImg] = useState('https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80');
  const [newProdDigiPrice, setNewProdDigiPrice] = useState(50000000);
  const [newProdTechnoPrice, setNewProdTechnoPrice] = useState(48500000);
  const [newProdDesc, setNewProdDesc] = useState('');

  // Edit Product State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editFaTitle, setEditFaTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBrand, setEditBrand] = useState('');
  const [editCategory, setEditCategory] = useState<CategoryId>('mobile');
  const [editImage, setEditImage] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIsFeatured, setEditIsFeatured] = useState(false);
  const [editIsPriceDrop, setEditIsPriceDrop] = useState(false);
  const [editIsEditorChoice, setEditIsEditorChoice] = useState(false);
  const [editPriceDropPercentage, setEditPriceDropPercentage] = useState(0);
  const [editPros, setEditPros] = useState('');
  const [editCons, setEditCons] = useState('');

  // Edit Product Stores State
  const [editStoresList, setEditStoresList] = useState<StorePrice[]>([]);
  const [addStoreSelectId, setAddStoreSelectId] = useState<string>('digikala');
  const [addStorePriceInput, setAddStorePriceInput] = useState<string>('');
  const [addStoreWarrantyInput, setAddStoreWarrantyInput] = useState<string>('ضمانت اصالت و سلامت کالا');
  const [addStoreAffiliateUrlInput, setAddStoreAffiliateUrlInput] = useState<string>('');

  // Coupon Editing State
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponStore, setNewCouponStore] = useState('digikala');
  const [newCouponTitle, setNewCouponTitle] = useState('');
  const [newCouponDesc, setNewCouponDesc] = useState('');
  const [newCouponAmount, setNewCouponAmount] = useState('۱۰۰,۰۰۰ تومان');

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (loginUsername.trim() === adminUsername && loginPassword === adminPassword) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('kharidpro_admin_authed', 'true');
      } catch (e) {
        console.error(e);
      }
      showSuccess('ورود با موفقیت انجام شد. خوش آمدید مدیر گرامی.');
    } else {
      setLoginError('نام کاربری یا رمز عبور اشتباه است.');
    }
  };

  // Change Password Handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePassError('');
    setChangePassSuccess('');

    if (currentPassInput !== adminPassword) {
      setChangePassError('رمز عبور فعلی وارد شده اشتباه است.');
      return;
    }

    if (!newPassInput || newPassInput.length < 4) {
      setChangePassError('رمز عبور جدید باید حداقل ۴ کاراکتر باشد.');
      return;
    }

    if (newPassInput !== confirmPassInput) {
      setChangePassError('رمز عبور جدید و تکرار آن یکسان نیستند.');
      return;
    }

    const updatedUsername = newUsernameInput.trim() || 'admin';
    setAdminUsername(updatedUsername);
    setAdminPassword(newPassInput);

    try {
      localStorage.setItem('kharidpro_admin_username', updatedUsername);
      localStorage.setItem('kharidpro_admin_password', newPassInput);
    } catch (e) {
      console.error(e);
    }

    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setChangePassSuccess('اطلاعات ورود و رمز عبور مدیر با موفقیت به‌روزرسانی شد.');
    showSuccess('رمز عبور مدیریت تغییر یافت.');
  };

  // Logout Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('kharidpro_admin_authed');
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    if (confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      const updated = products.filter((p) => p.id !== id);
      onUpdateProducts(updated);
      showSuccess('محصول با موفقیت حذف شد.');
    }
  };

  // Toggle Property directly in table
  const handleToggleProductProp = (id: string, prop: 'isFeatured' | 'isPriceDrop' | 'isEditorChoice') => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, [prop]: !p[prop] };
      }
      return p;
    });
    onUpdateProducts(updated);
    showSuccess('تغییرات محصول با موفقیت ذخیره شد.');
  };

  // Start Edit Product
  const handleStartEditProduct = (p: Product) => {
    setEditingProduct(p);
    setEditFaTitle(p.faTitle || '');
    setEditTitle(p.title || '');
    setEditBrand(p.brand || '');
    setEditCategory(p.categoryId || 'mobile');
    setEditImage(p.image || '');
    setEditDescription(p.description || '');
    setEditIsFeatured(!!p.isFeatured);
    setEditIsPriceDrop(!!p.isPriceDrop);
    setEditIsEditorChoice(!!p.isEditorChoice);
    setEditPriceDropPercentage(p.priceDropPercentage || 0);

    const initialStores: StorePrice[] = p.stores && p.stores.length > 0
      ? JSON.parse(JSON.stringify(p.stores))
      : [];
    setEditStoresList(initialStores);

    setEditPros(p.pros ? p.pros.join('\n') : '');
    setEditCons(p.cons ? p.cons.join('\n') : '');

    // Reset add store inputs
    const unaddedStore = activeStores.find((s) => !initialStores.some((es) => es.storeId === s.id)) || activeStores[0];
    if (unaddedStore) {
      setAddStoreSelectId(unaddedStore.id);
      setAddStoreAffiliateUrlInput(unaddedStore.website);
    }
    setAddStorePriceInput('');
    setAddStoreWarrantyInput('ضمانت اصالت و سلامت کالا');
  };

  // Store Management Handlers for Product Edit
  const handleRemoveStoreFromEdit = (storeId: string) => {
    setEditStoresList((prev) => prev.filter((s) => s.storeId !== storeId));
  };

  const handleUpdateStoreInEdit = (storeId: string, field: keyof StorePrice, value: any) => {
    setEditStoresList((prev) =>
      prev.map((s) => (s.storeId === storeId ? { ...s, [field]: value } : s))
    );
  };

  const handleAddStoreToEdit = () => {
    const pVal = parseFloat(addStorePriceInput);
    if (!addStorePriceInput || isNaN(pVal) || pVal <= 0) {
      alert('لطفاً قیمت معتبری (به تومان) وارد کنید.');
      return;
    }

    const storeObj = activeStores.find((s) => s.id === addStoreSelectId);
    const sName = storeObj ? storeObj.faName : addStoreSelectId;
    const sLogo = storeObj ? storeObj.logo : 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80';
    const sAffiliate = addStoreAffiliateUrlInput.trim() || (storeObj ? storeObj.website : 'https://example.com');

    const existingIdx = editStoresList.findIndex((s) => s.storeId === addStoreSelectId);
    if (existingIdx >= 0) {
      setEditStoresList((prev) =>
        prev.map((s, idx) =>
          idx === existingIdx
            ? {
                ...s,
                price: pVal,
                warranty: addStoreWarrantyInput.trim() || s.warranty,
                affiliateUrl: sAffiliate,
              }
            : s
        )
      );
    } else {
      const newStoreEntry: StorePrice = {
        storeId: addStoreSelectId,
        storeName: sName,
        logo: sLogo,
        price: pVal,
        inStock: true,
        warranty: addStoreWarrantyInput.trim() || 'ضمانت اصالت و سلامت کالا',
        affiliateUrl: sAffiliate,
        isLowest: false,
      };
      setEditStoresList((prev) => [...prev, newStoreEntry]);
    }

    setAddStorePriceInput('');
  };

  // Save Edit Product
  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const catObj = CATEGORIES.find((c) => c.id === editCategory);

    const validPrices = editStoresList.filter((s) => s.price > 0).map((s) => s.price);
    const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;

    const finalStores = editStoresList.map((s) => ({
      ...s,
      isLowest: s.price > 0 && s.price === minPrice,
    }));

    const prosArr = editPros.split('\n').map((s) => s.trim()).filter(Boolean);
    const consArr = editCons.split('\n').map((s) => s.trim()).filter(Boolean);

    const newPriceHistory = [...(editingProduct.priceHistory || [])];
    if (minPrice > 0) {
      newPriceHistory.push({ date: 'امروز', price: minPrice });
    }

    const updatedProduct: Product = {
      ...editingProduct,
      faTitle: editFaTitle,
      title: editTitle,
      brand: editBrand,
      categoryId: editCategory,
      categoryName: catObj?.name || editingProduct.categoryName,
      image: editImage,
      description: editDescription,
      isFeatured: editIsFeatured,
      isPriceDrop: editIsPriceDrop,
      isEditorChoice: editIsEditorChoice,
      priceDropPercentage: Number(editPriceDropPercentage) || 0,
      stores: finalStores,
      pros: prosArr.length > 0 ? prosArr : editingProduct.pros,
      cons: consArr.length > 0 ? consArr : editingProduct.cons,
      priceHistory: newPriceHistory,
      updatedAt: 'امروز',
    };

    const updatedList = products.map((item) => (item.id === editingProduct.id ? updatedProduct : item));
    onUpdateProducts(updatedList);
    setEditingProduct(null);
    showSuccess(`محصول «${editFaTitle}» با موفقیت ویرایش شد.`);
  };

  // Save New Product
  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdFaTitle || !newProdTitle) return;

    const catObj = CATEGORIES.find((c) => c.id === newProdCategory);

    const created: Product = {
      id: `p-custom-${Date.now()}`,
      title: newProdTitle,
      faTitle: newProdFaTitle,
      brand: newProdBrand,
      categoryId: newProdCategory,
      categoryName: catObj?.name || 'کالای دیجیتال',
      image: newProdImg,
      rating: 4.8,
      reviewsCount: 1,
      isFeatured: true,
      isPriceDrop: true,
      priceDropPercentage: 5,
      description: newProdDesc || 'توضیحات محصول اضافه شده توسط مدیر سیستم.',
      pros: ['کیفیت ساخت بالا', 'ارزش خرید مناسب'],
      cons: ['محدودیت تعداد در انبار'],
      stores: [
        {
          storeId: 'technolife',
          storeName: 'تکنولایف',
          logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
          price: newProdTechnoPrice,
          inStock: true,
          warranty: '۱۸ ماه گارانتی شرکتی',
          affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
          isLowest: newProdTechnoPrice <= newProdDigiPrice,
        },
        {
          storeId: 'digikala',
          storeName: 'دیجی‌کالا',
          logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
          price: newProdDigiPrice,
          inStock: true,
          warranty: 'ضمانت اصالت و سلامت کالا',
          affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
          isLowest: newProdDigiPrice < newProdTechnoPrice,
        },
      ],
      specs: [{ title: 'گارانتی', value: 'اصلی شرکتی' }],
      reviews: [],
      priceHistory: [{ date: 'امروز', price: Math.min(newProdDigiPrice, newProdTechnoPrice) }],
      viewsCount: 100,
      updatedAt: 'امروز',
    };

    onUpdateProducts([created, ...products]);
    setIsAddingProduct(false);
    setNewProdFaTitle('');
    setNewProdTitle('');
    setNewProdDesc('');
    showSuccess('محصول جدید با موفقیت اضافه شد.');
  };

  // Coupon Actions
  const handleSaveNewCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponTitle) return;

    const storeObj = activeStores.find((s) => s.id === newCouponStore) || activeStores[0];

    const createdCoupon: Coupon = {
      id: `c-${Date.now()}`,
      storeId: storeObj.id,
      storeName: storeObj.faName,
      storeLogo: storeObj.logo,
      code: newCouponCode,
      discountTitle: newCouponTitle,
      discountDescription: newCouponDesc || 'کد تخفیف اختصاصی خرید پرو',
      discountAmount: newCouponAmount,
      expiryDate: '۱۴۰۳/۰۷/۳۰',
      isVerified: true,
      affiliateUrl: storeObj.website,
      usesCount: 1,
    };

    onUpdateCoupons([createdCoupon, ...coupons]);
    setIsAddingCoupon(false);
    setNewCouponCode('');
    setNewCouponTitle('');
    setNewCouponDesc('');
    showSuccess('کد تخفیف جدید با موفقیت ثبت شد.');
  };

  const handleDeleteCoupon = (id: string) => {
    if (confirm('حذف کد تخفیف؟')) {
      onUpdateCoupons(coupons.filter((c) => c.id !== id));
      showSuccess('کد تخفیف حذف شد.');
    }
  };

  // Store CRUD Handlers
  const handleSaveNewStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreFaName.trim()) return;

    const enName = newStoreName.trim() || newStoreFaName.trim();
    const storeId = enName.toLowerCase().replace(/[^a-z0-9]/g, '') || `store-${Date.now()}`;

    const newStore: PartnerStore = {
      id: storeId,
      name: enName,
      faName: newStoreFaName.trim(),
      logo: newStoreLogo.trim() || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
      website: newStoreWebsite.trim().startsWith('http') ? newStoreWebsite.trim() : `https://${newStoreWebsite.trim() || 'example.com'}`,
      rating: parseFloat(newStoreRating) || 4.8,
      trustBadge: newStoreTrustBadge.trim() || 'فروشگاه تاییدشده خرید پرو',
      offersCount: parseInt(newStoreOffersCount, 10) || 100,
    };

    const updated = [newStore, ...activeStores];
    if (onUpdateStores) {
      onUpdateStores(updated);
    }
    setIsAddingStore(false);
    setNewStoreFaName('');
    setNewStoreName('');
    setNewStoreWebsite('');
    setNewStoreLogo('');
    setNewStoreRating('4.8');
    setNewStoreTrustBadge('فروشگاه تاییدشده خرید پرو');
    setNewStoreOffersCount('500');
    showSuccess('فروشگاه جدید با موفقیت اضافه شد.');
  };

  const handleStartEditStore = (store: PartnerStore) => {
    setEditingStore(store);
    setEditStoreFaName(store.faName);
    setEditStoreName(store.name);
    setEditStoreWebsite(store.website);
    setEditStoreLogo(store.logo);
    setEditStoreRating(String(store.rating));
    setEditStoreTrustBadge(store.trustBadge);
    setEditStoreOffersCount(String(store.offersCount));
  };

  const handleSaveEditStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStore || !editStoreFaName.trim()) return;

    const updatedStores = activeStores.map((s) => {
      if (s.id === editingStore.id) {
        return {
          ...s,
          faName: editStoreFaName.trim(),
          name: editStoreName.trim() || s.name,
          website: editStoreWebsite.trim().startsWith('http') ? editStoreWebsite.trim() : `https://${editStoreWebsite.trim()}`,
          logo: editStoreLogo.trim() || s.logo,
          rating: parseFloat(editStoreRating) || s.rating,
          trustBadge: editStoreTrustBadge.trim() || s.trustBadge,
          offersCount: parseInt(editStoreOffersCount, 10) || s.offersCount,
        };
      }
      return s;
    });

    if (onUpdateStores) {
      onUpdateStores(updatedStores);
    }
    setEditingStore(null);
    showSuccess('اطلاعات فروشگاه با موفقیت به‌روزرسانی شد.');
  };

  const handleDeleteStore = (id: string, name: string) => {
    if (confirm(`آیا از حذف فروشگاه "${name}" اطمینان دارید؟`)) {
      const updated = activeStores.filter((s) => s.id !== id);
      if (onUpdateStores) {
        onUpdateStores(updated);
      }
      showSuccess(`فروشگاه "${name}" با موفقیت حذف شد.`);
    }
  };

  // UNAUTHENTICATED LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 animate-scaleIn">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20 shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black">احراز هویت مدیر سیستم</h1>
            <p className="text-xs text-slate-400">برای دسترسی به پنل مدیریت لطفا نام کاربری و رمز عبور را وارد کنید.</p>
          </div>

          {loginError && (
            <div className="bg-rose-500/20 border border-rose-500/40 text-rose-300 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-right">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">نام کاربری:</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="نام کاربری"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">رمز عبور:</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-amber-500 transition-colors pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3.5 text-slate-400 hover:text-white"
                  title={showPassword ? 'پنهان کردن' : 'نمایش'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>ورود به پنل مدیریت</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN PANEL VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
              ADMIN CONTROL PANEL
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              احراز هویت شده
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">پنل مدیریت وب‌سایت خرید پرو</h1>
          <p className="text-xs text-slate-400">مدیریت کامل محصولات، قیمت فروشگاه‌ها، کدهای تخفیف و خبرنامه</p>
        </div>

        <div className="flex items-center gap-3">
          {successMsg && (
            <div className="bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 animate-fadeIn shadow-md">
              <CheckCircle2 className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            onClick={() => setActiveTab('security')}
            className={`text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow border ${
              activeTab === 'security'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
            }`}
            title="تغییر رمز عبور مدیریت"
          >
            <KeyRound className="w-4 h-4" />
            <span>تغییر رمز عبور</span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow"
            title="خروج از پنل مدیریت"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>آمار و داشبورد کلی</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'products' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>مدیریت و ویرایش محصولات ({toFaDigit(products.length)})</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'coupons' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>مدیریت کدهای تخفیف ({toFaDigit(coupons.length)})</span>
        </button>

        <button
          onClick={() => setActiveTab('newsletter')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'newsletter' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>اعضای خبرنامه ({toFaDigit(newsletterEmails.length)})</span>
        </button>

        <button
          onClick={() => setActiveTab('stores')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'stores' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>مدیریت فروشگاه‌ها ({toFaDigit(activeStores.length)})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'security' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>تنظیمات امنیتی و رمز عبور</span>
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">تعداد کل محصولات فعال:</span>
              <div className="text-3xl font-black text-slate-900">{toFaDigit(products.length)}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">کدهای تخفیف فعال:</span>
              <div className="text-3xl font-black text-amber-600">{toFaDigit(coupons.length)}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">مقالات راهنمای خرید:</span>
              <div className="text-3xl font-black text-slate-900">{toFaDigit(articles.length)}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">مشترکین خبرنامه:</span>
              <div className="text-3xl font-black text-emerald-600">{toFaDigit(newsletterEmails.length)}</div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">لیست و ویرایش محصولات</h2>
            <button
              onClick={() => {
                setIsAddingProduct(!isAddingProduct);
                setEditingProduct(null);
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن محصول جدید</span>
            </button>
          </div>

          {/* Add Product Form */}
          {isAddingProduct && (
            <form onSubmit={handleSaveNewProduct} className="bg-white p-6 rounded-2xl border border-amber-400/60 shadow-lg space-y-4 animate-fadeIn">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">ثبت مشخصات محصول جدید</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">عنوان فارسی محصول:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثلا: گوشی سامسونگ S24 Ultra"
                    value={newProdFaTitle}
                    onChange={(e) => setNewProdFaTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">عنوان انگلیسی (مدل):</label>
                  <input
                    type="text"
                    required
                    placeholder="Samsung Galaxy S24 Ultra"
                    value={newProdTitle}
                    onChange={(e) => setNewProdTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">برند:</label>
                  <input
                    type="text"
                    required
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">قیمت دیجی‌کالا (تومان):</label>
                  <input
                    type="number"
                    required
                    value={newProdDigiPrice}
                    onChange={(e) => setNewProdDigiPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">قیمت تکنولایف (تومان):</label>
                  <input
                    type="number"
                    required
                    value={newProdTechnoPrice}
                    onChange={(e) => setNewProdTechnoPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">دسته‌بندی:</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as CategoryId)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none font-bold"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  ذخیره محصول
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  انصراف
                </button>
              </div>
            </form>
          )}

          {/* Products Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs text-slate-700">
                <thead className="bg-slate-900 text-white font-bold">
                  <tr>
                    <th className="p-4">محصول</th>
                    <th className="p-4">فروشگاه‌های عرضه‌کننده</th>
                    <th className="p-4">کمترین قیمت</th>
                    <th className="p-4">ویژگی‌های ویترین</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => {
                    const validPrices = (p.stores || []).filter((s) => s.price > 0).map((s) => s.price);
                    const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;

                    return (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                          <img src={p.image} alt={p.faTitle} className="w-12 h-12 object-contain rounded-xl bg-slate-50 p-1 border border-slate-200/60 shrink-0" />
                          <div>
                            <div className="text-sm font-black text-slate-900">{p.faTitle}</div>
                            <span className="text-[10px] text-slate-400 font-normal">{p.brand} | {p.categoryName}</span>
                          </div>
                        </td>

                        <td className="p-4 font-medium text-slate-700">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {p.stores && p.stores.length > 0 ? (
                              p.stores.map((st) => (
                                <span
                                  key={st.storeId}
                                  className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-slate-200"
                                >
                                  <img src={st.logo} alt={st.storeName} className="w-3.5 h-3.5 object-cover rounded-full" />
                                  <span>{st.storeName}</span>
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400 text-xs">بدون فروشگاه</span>
                            )}
                          </div>
                        </td>

                        <td className="p-4 font-black text-amber-600 text-sm">
                          {minPrice > 0 ? `${toFaDigit(minPrice.toLocaleString('fa-IR'))} تومان` : 'ناموجود'}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                              onClick={() => handleToggleProductProp(p.id, 'isFeatured')}
                              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                p.isFeatured ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                              }`}
                            >
                              پیشنهاد ویژه
                            </button>
                            <button
                              onClick={() => handleToggleProductProp(p.id, 'isPriceDrop')}
                              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                p.isPriceDrop ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                              }`}
                            >
                              افت قیمت
                            </button>
                            <button
                              onClick={() => handleToggleProductProp(p.id, 'isEditorChoice')}
                              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                p.isEditorChoice ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                              }`}
                            >
                              انتخاب سردبیر
                            </button>
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleStartEditProduct(p)}
                              className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-colors border border-amber-200/60 shadow-sm flex items-center gap-1 text-xs font-bold"
                              title="ویرایش کامل محصول"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>ویرایش</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200/60"
                              title="حذف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white max-w-3xl w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8 animate-scaleIn">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg">ویرایش کامل محصول</h3>
                  <p className="text-xs text-slate-400">{editingProduct.faTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveProductEdit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Section 1: Basic Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-amber-600 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Sliders className="w-4 h-4" />
                  اطلاعات اصلی محصول
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">عنوان فارسی محصول:</label>
                    <input
                      type="text"
                      required
                      value={editFaTitle}
                      onChange={(e) => setEditFaTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">عنوان انگلیسی (مدل):</label>
                    <input
                      type="text"
                      required
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">برند:</label>
                    <input
                      type="text"
                      required
                      value={editBrand}
                      onChange={(e) => setEditBrand(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">دسته‌بندی:</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as CategoryId)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-amber-500"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">لینک تصویر اصلی محصول:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                    />
                    {editImage && (
                      <img src={editImage} alt="پیش‌نمایش" className="w-10 h-10 object-contain rounded-lg border border-slate-200 bg-slate-50" />
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Store Prices */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-black text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4" />
                    <span>فروشگاه‌های عرضه‌کننده و قیمت‌ها ({toFaDigit(editStoresList.length)})</span>
                  </h4>
                </div>

                {/* List of current stores in editStoresList */}
                {editStoresList.length === 0 ? (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-4 rounded-2xl text-center font-medium">
                    هیچ فروشگاهی برای این محصول ثبت نشده است. از کادر زیر می‌توانید فروشگاه اضافه کنید.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {editStoresList.map((st) => (
                      <div
                        key={st.storeId}
                        className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-3 relative group"
                      >
                        {/* Header of store card */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <img src={st.logo} alt={st.storeName} className="w-8 h-8 object-cover rounded-xl border border-slate-200 bg-white" />
                            <span className="font-black text-slate-900 text-xs">{st.storeName}</span>
                            {st.isLowest && (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                                ارزان‌ترین پیشنهاد
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveStoreFromEdit(st.storeId)}
                            className="text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 font-bold px-2.5 py-1 rounded-xl text-xs flex items-center gap-1 transition-colors"
                            title="حذف این فروشگاه از محصول"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف فروشگاه</span>
                          </button>
                        </div>

                        {/* Form fields for this store */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 block">قیمت (تومان) *</label>
                            <input
                              type="number"
                              required
                              value={st.price}
                              onChange={(e) => handleUpdateStoreInEdit(st.storeId, 'price', Number(e.target.value))}
                              className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                            />
                            <p className="text-[10px] text-slate-400">
                              {st.price > 0 ? `${toFaDigit(st.price.toLocaleString('fa-IR'))} تومان` : 'ناموجود'}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 block">گارانتی / وضعیت</label>
                            <input
                              type="text"
                              value={st.warranty}
                              onChange={(e) => handleUpdateStoreInEdit(st.storeId, 'warranty', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 block">لینک خرید / افیلیت</label>
                            <input
                              type="text"
                              value={st.affiliateUrl}
                              onChange={(e) => handleUpdateStoreInEdit(st.storeId, 'affiliateUrl', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Form to add a new store to editStoresList */}
                <div className="bg-amber-500/5 border border-amber-300/60 p-4 rounded-2xl space-y-3">
                  <h5 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-amber-600" />
                    <span>افزودن فروشگاه جدید به این محصول</span>
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">انتخاب فروشگاه:</label>
                      <select
                        value={addStoreSelectId}
                        onChange={(e) => {
                          const stId = e.target.value;
                          setAddStoreSelectId(stId);
                          const foundObj = activeStores.find((s) => s.id === stId);
                          if (foundObj) {
                            setAddStoreAffiliateUrlInput(foundObj.website);
                          }
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                      >
                        {activeStores.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.faName} ({s.name})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">قیمت (تومان):</label>
                      <input
                        type="number"
                        placeholder="مثلاً ۵۰۰۰۰۰۰۰"
                        value={addStorePriceInput}
                        onChange={(e) => setAddStorePriceInput(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">گارانتی:</label>
                      <input
                        type="text"
                        placeholder="ضمانت اصالت کالا"
                        value={addStoreWarrantyInput}
                        onChange={(e) => setAddStoreWarrantyInput(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">لینک خرید / افیلیت:</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={addStoreAffiliateUrlInput}
                        onChange={(e) => setAddStoreAffiliateUrlInput(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handleAddStoreToEdit}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>افزودن این فروشگاه به محصول</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 3: Badges and Flags */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-amber-600 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Tag className="w-4 h-4" />
                  ویژگی‌ها و برچسب‌های نمایش در سایت
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2 transition-all ${
                    editIsFeatured ? 'bg-amber-500/10 border-amber-500 text-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <input
                      type="checkbox"
                      checked={editIsFeatured}
                      onChange={(e) => setEditIsFeatured(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-amber-400"
                    />
                    <span className="text-xs">پیشنهاد ویژه (ویترین)</span>
                  </label>

                  <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2 transition-all ${
                    editIsPriceDrop ? 'bg-emerald-500/10 border-emerald-500 text-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <input
                      type="checkbox"
                      checked={editIsPriceDrop}
                      onChange={(e) => setEditIsPriceDrop(e.target.checked)}
                      className="rounded text-emerald-500 focus:ring-emerald-400"
                    />
                    <span className="text-xs">برچسب افت قیمت</span>
                  </label>

                  <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2 transition-all ${
                    editIsEditorChoice ? 'bg-purple-500/10 border-purple-500 text-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <input
                      type="checkbox"
                      checked={editIsEditorChoice}
                      onChange={(e) => setEditIsEditorChoice(e.target.checked)}
                      className="rounded text-purple-500 focus:ring-purple-400"
                    />
                    <span className="text-xs">انتخاب سردبیر</span>
                  </label>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-xs font-bold text-slate-700 block">درصد افت قیمت / تخفیف (%):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editPriceDropPercentage}
                    onChange={(e) => setEditPriceDropPercentage(Number(e.target.value))}
                    className="w-full sm:w-1/2 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 4: Descriptions, Pros, Cons */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-amber-600 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  توضیحات و نقد و بررسی
                </h4>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">توضیحات کلی محصول:</label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-emerald-700 block">نقاط قوت (هر مورد در یک سطر):</label>
                    <textarea
                      rows={3}
                      value={editPros}
                      onChange={(e) => setEditPros(e.target.value)}
                      placeholder="کیفیت صفحه نمایش فوق العاده&#10;پردازنده قدرتمند"
                      className="w-full bg-emerald-50/40 border border-emerald-200/80 rounded-xl p-2.5 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-rose-700 block">نقاط ضعف (هر مورد در یک سطر):</label>
                    <textarea
                      rows={3}
                      value={editCons}
                      onChange={(e) => setEditCons(e.target.value)}
                      placeholder="وزن نسبتا بالا&#10;سرعت شارژ معمولی"
                      className="w-full bg-rose-50/40 border border-rose-200/80 rounded-xl p-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>ذخیره تغییرات محصول</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* COUPONS TAB */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">مدیریت کدهای تخفیف</h2>
            <button
              onClick={() => setIsAddingCoupon(!isAddingCoupon)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن کد تخفیف جدید</span>
            </button>
          </div>

          {isAddingCoupon && (
            <form onSubmit={handleSaveNewCoupon} className="bg-white p-6 rounded-2xl border border-amber-400/60 shadow-lg space-y-4 animate-fadeIn">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">ثبت کد تخفیف جدید</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">کد تخفیف (Code):</label>
                  <input
                    type="text"
                    required
                    placeholder="DK-OFF2024"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">عنوان تخفیف:</label>
                  <input
                    type="text"
                    required
                    placeholder="کد تخفیف ۱۵۰ هزار تومانی"
                    value={newCouponTitle}
                    onChange={(e) => setNewCouponTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">فروشگاه:</label>
                  <select
                    value={newCouponStore}
                    onChange={(e) => setNewCouponStore(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none font-bold"
                  >
                    {STORES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.faName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  ذخیره کد تخفیف
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCoupon(false)}
                  className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  انصراف
                </button>
              </div>
            </form>
          )}

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-right text-xs text-slate-700">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-4">فروشگاه</th>
                  <th className="p-4">کد (Code)</th>
                  <th className="p-4">عنوان تخفیف</th>
                  <th className="p-4">مقدار تخفیف</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">{c.storeName}</td>
                    <td className="p-4 font-mono font-bold text-amber-600">{c.code}</td>
                    <td className="p-4">{c.discountTitle}</td>
                    <td className="p-4 font-bold text-emerald-600">{c.discountAmount}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDeleteCoupon(c.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* NEWSLETTER TAB */}
      {activeTab === 'newsletter' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">ایمیل‌های ثبت‌شده در خبرنامه</h2>
          <div className="space-y-2">
            {newsletterEmails.map((email, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-xs text-slate-800 flex items-center justify-between">
                <span>{email}</span>
                <span className="text-[10px] text-slate-400 font-sans">ثبت شده</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STORES TAB */}
      {activeTab === 'stores' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div>
              <h2 className="text-xl font-black text-slate-900">مدیریت فروشگاه‌های همکار</h2>
              <p className="text-xs text-slate-500 mt-1">
                فروشگاه‌های فعال جهت مقایسه قیمت، نمایش لوگو و تخصیص کدهای تخفیف.
              </p>
            </div>
            <button
              onClick={() => {
                setIsAddingStore(!isAddingStore);
                setEditingStore(null);
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن فروشگاه جدید</span>
            </button>
          </div>

          {/* Form to Add New Store */}
          {isAddingStore && (
            <div className="bg-white rounded-3xl border-2 border-amber-400 p-6 shadow-lg space-y-4 animate-scaleIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Store className="w-5 h-5 text-amber-500" />
                  <span>ثبت فروشگاه جدید</span>
                </h3>
                <button onClick={() => setIsAddingStore(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNewStore} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">نام فارسی فروشگاه *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثلاً: تکنولایف"
                      value={newStoreFaName}
                      onChange={(e) => setNewStoreFaName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">نام انگلیسی / شناسه *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثلاً: Technolife"
                      value={newStoreName}
                      onChange={(e) => setNewStoreName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">آدرس وب‌سایت *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://www.technolife.ir"
                      value={newStoreWebsite}
                      onChange={(e) => setNewStoreWebsite(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">آدرس لوگو / تصویر</label>
                    <input
                      type="text"
                      placeholder="آدرس اینترنتی لوگو (URL)"
                      value={newStoreLogo}
                      onChange={(e) => setNewStoreLogo(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">امتیاز (از ۵)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={newStoreRating}
                      onChange={(e) => setNewStoreRating(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">نشان اعتماد / نماد</label>
                    <input
                      type="text"
                      placeholder="مثلاً: ضمانت اصالت کالا"
                      value={newStoreTrustBadge}
                      onChange={(e) => setNewStoreTrustBadge(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingStore(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2 rounded-xl text-xs transition-colors shadow-sm"
                  >
                    ذخیره فروشگاه
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Form to Edit Store Modal */}
          {editingStore && (
            <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-xl w-full shadow-2xl space-y-4 animate-scaleIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-amber-500" />
                    <span>ویرایش فروشگاه {editingStore.faName}</span>
                  </h3>
                  <button onClick={() => setEditingStore(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveEditStore} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">نام فارسی فروشگاه</label>
                      <input
                        type="text"
                        required
                        value={editStoreFaName}
                        onChange={(e) => setEditStoreFaName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">نام انگلیسی</label>
                      <input
                        type="text"
                        required
                        value={editStoreName}
                        onChange={(e) => setEditStoreName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block">آدرس وب‌سایت</label>
                      <input
                        type="url"
                        required
                        value={editStoreWebsite}
                        onChange={(e) => setEditStoreWebsite(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block">آدرس تصویر لوگو (URL)</label>
                      <input
                        type="text"
                        value={editStoreLogo}
                        onChange={(e) => setEditStoreLogo(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">امتیاز (از ۵)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={editStoreRating}
                        onChange={(e) => setEditStoreRating(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">نشان اعتماد</label>
                      <input
                        type="text"
                        value={editStoreTrustBadge}
                        onChange={(e) => setEditStoreTrustBadge(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingStore(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2 rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>ذخیره تغییرات</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Stores List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeStores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={store.logo}
                      alt={store.faName}
                      className="w-14 h-14 object-cover rounded-2xl border border-slate-100 shadow-sm shrink-0"
                    />
                    <div>
                      <h3 className="font-black text-slate-900 text-base">{store.faName}</h3>
                      <span className="text-xs font-mono text-slate-400 block">{store.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60 text-amber-700 text-xs font-black shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{toFaDigit(store.rating)}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-medium">نشان اعتماد:</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {store.trustBadge}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/60">
                    <span className="font-medium">آدرس وب‌سایت:</span>
                    <a
                      href={store.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-amber-600 hover:underline flex items-center gap-1 dir-ltr text-[11px]"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{store.website.replace(/^https?:\/\//, '')}</span>
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleStartEditStore(store)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                    <span>ویرایش</span>
                  </button>
                  <button
                    onClick={() => handleDeleteStore(store.id, store.faName)}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECURITY & CHANGE PASSWORD TAB */}
      {activeTab === 'security' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-500/20 shrink-0">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">تغییر رمز عبور و اطلاعات مدیریت</h2>
              <p className="text-xs text-slate-500">برای امنیت بیشتر می‌توانید نام کاربری و رمز عبور جدید خود را مشخص کنید.</p>
            </div>
          </div>

          {changePassError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{changePassError}</span>
            </div>
          )}

          {changePassSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{changePassSuccess}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">نام کاربری مدیریت:</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={newUsernameInput}
                  onChange={(e) => setNewUsernameInput(e.target.value)}
                  placeholder="نام کاربری (مثلاً admin)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">رمز عبور فعلی:</label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={currentPassInput}
                  onChange={(e) => setCurrentPassInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500 transition-colors pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute left-3 top-3.5 text-slate-400 hover:text-slate-700"
                  title={showCurrentPass ? 'پنهان کردن' : 'نمایش'}
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">رمز عبور جدید:</label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    placeholder="حداقل ۴ کاراکتر"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500 transition-colors pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute left-3 top-3.5 text-slate-400 hover:text-slate-700"
                    title={showNewPass ? 'پنهان کردن' : 'نمایش'}
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">تکرار رمز عبور جدید:</label>
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  value={confirmPassInput}
                  onChange={(e) => setConfirmPassInput(e.target.value)}
                  placeholder="تکرار رمز عبور جدید"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>ذخیره و تغییر رمز عبور</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
