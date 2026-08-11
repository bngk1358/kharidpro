import { Product, Category, PartnerStore, Coupon, Article, SiteStats } from '../types';

export const INITIAL_STATS: SiteStats = {
  testedProducts: 1480,
  categoriesCount: 6,
  partnerStoresCount: 14,
  trackedPriceDrops: 385,
  totalCoupons: 42,
};

export const STORES: PartnerStore[] = [
  {
    id: 'digikala',
    name: 'Digikala',
    faName: 'دیجی‌کالا',
    logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
    website: 'https://www.digikala.com',
    rating: 4.8,
    trustBadge: 'فروشگاه تاییدشده خرید پرو',
    offersCount: 1250,
  },
  {
    id: 'technolife',
    name: 'Technolife',
    faName: 'تکنولایف',
    logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
    website: 'https://www.technolife.ir',
    rating: 4.7,
    trustBadge: 'ضمانت اصالت کالا',
    offersCount: 890,
  },
  {
    id: 'mobit',
    name: 'Mobit',
    faName: 'موبیت',
    logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&auto=format&fit=crop&q=80',
    website: 'https://www.mobit.ir',
    rating: 4.6,
    trustBadge: 'ارسال سریع سراسری',
    offersCount: 450,
  },
  {
    id: 'meghdadit',
    name: 'MeghdadIT',
    faName: 'مقداد آی‌تی',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80',
    website: 'https://meghdadit.com',
    rating: 4.5,
    trustBadge: 'ارائه‌دهنده گارانتی اصلی',
    offersCount: 320,
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 'mobile',
    name: 'گوشی موبایل',
    iconName: 'Smartphone',
    description: 'مقایسه قیمت و مشخصات تخصصی انواع گوشی سامسونگ، آیفون، شیائومی و honor',
    productCount: 420,
    bannerImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'laptop',
    name: 'لپ‌تاپ و کامپیوتر',
    iconName: 'Laptop',
    description: 'بهترین لپ‌تاپ‌های گیمینگ، مهندسی، برنامه‌نویسی و دانشجویی با گارانتی معتبر',
    productCount: 280,
    bannerImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'tablet',
    name: 'تبلت',
    iconName: 'Tablet',
    description: 'بررسی آی‌پد اپل، تبلت‌های سامسونگ و شیائومی مناسب طراحی و مطالعه',
    productCount: 140,
    bannerImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'headphones',
    name: 'هدفون و هندزفری',
    iconName: 'Headphones',
    description: 'هندزفری‌های بلوتوثی بی سیم، هدفون‌های نویزکنسلینگ و گیمینگ با کیفیت صدا عالی',
    productCount: 310,
    bannerImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'smartwatch',
    name: 'ساعت هوشمند',
    iconName: 'Watch',
    description: 'اپل واچ، گلکسی واچ، امیزفیت و مچ‌بندهای ورزشی با سنسورهای دقیق سلامتی',
    productCount: 190,
    bannerImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'accessories',
    name: 'لوازم جانبی',
    iconName: 'Plug',
    description: 'پاوربانک، شارژر دیواری، کابل‌های فست شارژ و ماوس‌های ارگونومیک حرفه‌ای',
    productCount: 260,
    bannerImage: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  // MOBILE CATEGORY
  {
    id: 'p-mob-1',
    title: 'Samsung Galaxy S24 Ultra 5G (512GB / 12GB RAM)',
    faTitle: 'گوشی موبایل سامسونگ مدل Galaxy S24 Ultra ظرفیت 512 گیگابایت',
    brand: 'Samsung',
    categoryId: 'mobile',
    categoryName: 'گوشی موبایل',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 4.9,
    reviewsCount: 184,
    isFeatured: true,
    isPriceDrop: true,
    isEditorChoice: true,
    priceDropPercentage: 8,
    editorsNote: 'ارزشمندترین پرچمدار اندروید در بازار با قلم S-Pen فوق‌العاده و دوربین ۲۰۰ مگاپیکسلی با پردازش تصویر AI.',
    description: 'سامسونگ گلکسی S24 اولترا با فریم تیتانیومی مقاوم، تراشه اسنپدراگون 8 نسل 3 سفارشی و صفحه نمایش روشنایی 2600 نیت یکی از کامل‌ترین گوشی‌های هوشمند دنیاست.',
    pros: [
      'بدنه تیتانیومی فوق‌العاده مقاوم و باکیفیت',
      'نمایشگر ۲۶۰۰ نیتی با روکش ضد بازتاب Gorilla Armor',
      'دوربین ۲۰۰ مگاپیکسلی با زوم ۱۰ برابری باکیفیت بالا',
      'پشتیبانی نرم‌افزاری ۷ ساله و هوش مصنوعی پیشرفته Galaxy AI',
    ],
    cons: [
      'وزن ۲۳۲ گرمی نسبت به رقبا کمی سنگین است',
      'سرعت شارژ ۴۵ وات در برابر رقبا معمولی است',
    ],
    stores: [
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 68500000,
        oldPrice: 74200000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی شرکتی + کد رجیستری',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: false,
      },
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 66900000,
        oldPrice: 72900000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی همراه‌تل + مهلت تست ۷ روزه',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'mobit',
        storeName: 'موبیت',
        logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&auto=format&fit=crop&q=80',
        price: 67300000,
        oldPrice: 73500000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی رسمی مایکروتل',
        affiliateUrl: 'https://www.mobit.ir?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'صفحه نمایش', value: '6.8 اینچ Dynamic AMOLED 2X (120Hz)' },
      { title: 'پردازنده', value: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy' },
      { title: 'حافظه رم', value: '12 گیگابایت LPDDR5X' },
      { title: 'حافظه داخلی', value: '512 گیگابایت UFS 4.0' },
      { title: 'دوربین اصلی', value: '200 + 50 + 12 + 10 مگاپیکسل' },
      { title: 'باتری', value: '5000 میلی‌آمپر ساعت با شارژ 45 وات' },
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'امین رضایی',
        rating: 5,
        date: '۱۴۰۳/۰۵/۱۵',
        comment: 'کیفیت ساخت تیتانیومی بی‌نظیره. صفحه‌نمایشش بدون کوچکترین بازتاب نوره.',
        verifiedBuy: true,
      },
      {
        id: 'r2',
        userName: 'سارا کاظمی',
        rating: 5,
        date: '۱۴۰۳/۰۵/۰۲',
        comment: 'با قیمت تکنولایف خریدم و ۲ روزه رسید. زوم دوربینش واقعا جادوییه.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 74200000 },
      { date: '۱۵ تیر', price: 71500000 },
      { date: '۱ مرداد', price: 68900000 },
      { date: '۲۰ مرداد', price: 66900000 },
    ],
    viewsCount: 4520,
    updatedAt: '۱۴۰۳/۰۵/۲۰',
  },
  {
    id: 'p-mob-2',
    title: 'Apple iPhone 15 Pro Max (256GB)',
    faTitle: 'گوشی موبایل اپل مدل iPhone 15 Pro Max ظرفیت 256 گیگابایت',
    brand: 'Apple',
    categoryId: 'mobile',
    categoryName: 'گوشی موبایل',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 230,
    isFeatured: true,
    isPriceDrop: false,
    isEditorChoice: false,
    description: 'پرچمدار بی‌رقیب اپل با بدنه تیتانیومی، پورت تایپ سی با سرعت USB 3، دوربین پریسکوپ ۵ برابری و چیپست A17 Pro.',
    pros: [
      'بدنه تیتانیوم سبک و بسیار شیک',
      'تراشه A17 Pro فوق‌العاده قوی برای اجرای بازی‌های کنسولی',
      'پورت USB-C و دکمه اکشن (Action Button) جدید',
      'کیفیت ضبط ویدیو حرفه‌ای با ProRes',
    ],
    cons: [
      'قیمت بالا در بازار ایران',
      'محدودیت‌های ثبت آنتن در مدل‌های مسافری',
    ],
    stores: [
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 89000000,
        oldPrice: 91000000,
        inStock: true,
        warranty: 'ضمانت اصالت و سلامت فیزیکی کالا',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 89800000,
        oldPrice: 92000000,
        inStock: true,
        warranty: 'گارانتی ۱۸ ماهه سیب طلایی',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'صفحه نمایش', value: '6.7 اینچ Super Retina XDR OLED (120Hz)' },
      { title: 'پردازنده', value: 'Apple A17 Pro (3nm)' },
      { title: 'حافظه رم', value: '8 گیگابایت' },
      { title: 'حافظه داخلی', value: '256 گیگابایت' },
      { title: 'دوربین اصلی', value: '48 + 12 + 12 مگاپیکسل با زوم 5x اپتیکال' },
      { title: 'باتری', value: '4422 میلی‌آمپر ساعت' },
    ],
    reviews: [
      {
        id: 'r3',
        userName: 'پویامهر',
        rating: 5,
        date: '۱۴۰۳/۰۵/۱۰',
        comment: 'دوربین در حالت شب معجزه می‌کنه. وزن تیتانیوم حس خیلی خوبی داره.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 92000000 },
      { date: '۱۵ تیر', price: 90500000 },
      { date: '۲۰ مرداد', price: 89000000 },
    ],
    viewsCount: 5210,
    updatedAt: '۱۴۰۳/۰۵/۱۹',
  },
  {
    id: 'p-mob-3',
    title: 'Xiaomi 14 Ultra (512GB / 16GB RAM)',
    faTitle: 'گوشی موبایل شیائومی مدل Xiaomi 14 Ultra ظرفیت 512 گیگابایت',
    brand: 'Xiaomi',
    categoryId: 'mobile',
    categoryName: 'گوشی موبایل',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 95,
    isFeatured: false,
    isPriceDrop: true,
    priceDropPercentage: 11,
    description: 'غول عکاسی با لنزهای لایکا، سنسور ۱ اینچی لایت فیوژن ۹۰۰، لنزهای با دیافراگم متغیر و شارژ فوق سریع ۹۰ وات.',
    pros: [
      'چهار دوربین ۵۰ مگاپیکسلی با تنظیمات حرفه‌ای Leica',
      'شارژر ۹۰ وات داخل جعبه + شارژ بی سیم ۸۰ وات',
      'نمایشگر با روشنایی ۳۰۰۰ نیت',
      'رم ۱۶ گیگابایت بسیار پرسرعت',
    ],
    cons: [
      'برآمدگی قابل توجه دوربین',
      'رابط کاربری HyperOS نیاز به بهینه‌سازی بیشتر دارد',
    ],
    stores: [
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 58900000,
        oldPrice: 65900000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی تسکو سرویس',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 60200000,
        oldPrice: 66000000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی شرکتی',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'صفحه نمایش', value: '6.73 اینچ LTPO AMOLED (120Hz)' },
      { title: 'پردازنده', value: 'Qualcomm Snapdragon 8 Gen 3' },
      { title: 'حافظه رم', value: '16 گیگابایت' },
      { title: 'حافظه داخلی', value: '512 گیگابایت' },
      { title: 'دوربین اصلی', value: '50 + 50 + 50 + 50 مگاپیکسل با لنز Leica' },
      { title: 'باتری', value: '5000 میلی‌آمپر با شارژ 90W' },
    ],
    reviews: [
      {
        id: 'r4',
        userName: 'کیوان محمدی',
        rating: 5,
        date: '۱۴۰۳/۰۴/۲۸',
        comment: 'برای عکاسی حرفه‌ای بهترین گزینه کنونی بازاره. رنگ‌های لایکا محشره.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 65900000 },
      { date: '۱۵ تیر', price: 62000000 },
      { date: '۲۰ مرداد', price: 58900000 },
    ],
    viewsCount: 3100,
    updatedAt: '۱۴۰۳/۰۵/۱۸',
  },

  // LAPTOP CATEGORY
  {
    id: 'p-lap-1',
    title: 'Apple MacBook Pro 16" M3 Pro (18GB RAM / 512GB SSD)',
    faTitle: 'لپ‌تاپ ۱۶ اینچی اپل مدل MacBook Pro M3 Pro ظرفیت ۵۱۲ گیگابایت',
    brand: 'Apple',
    categoryId: 'laptop',
    categoryName: 'لپ‌تاپ و کامپیوتر',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 112,
    isFeatured: true,
    isPriceDrop: true,
    isEditorChoice: true,
    priceDropPercentage: 6,
    editorsNote: 'بهترین لپ‌تاپ حرفه‌ای برای ادیتورهای ویدیو، برنامه‌نویسان و طراحان با شارژدهی بیش از ۲۲ ساعت.',
    description: 'مک‌بوک پرو ۱۶ اینچی با پردازنده جادویی M3 Pro، صفحه نمایش Liquid Retina XDR و اسپیکرهای ۶ گانه فوق‌العاده استاندارد جدیدی برای لپ‌تاپ‌های حرفه‌ای ایجاد کرده است.',
    pros: [
      'شارژدهی واقعی باتری تا ۲۲ ساعت کاربری سنگین',
      'نمایشگر Liquid Retina XDR با روشنایی ۱۶۰۰ نیت در محتوای HDR',
      'عملکرد کاملاً بی‌صدا و بدون افت قدرت در حالت باتری',
      'بدنه آلومینیومی شیک در رنگ Space Black جدید',
    ],
    cons: [
      'عدم امکان ارتقای رم و اس‌اس‌دی بعد از خرید',
      'قیمت بالا قطعات و لوازم جانبی',
    ],
    stores: [
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 124500000,
        oldPrice: 132000000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی امرتات + ضمانت اصالت',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 126900000,
        oldPrice: 133000000,
        inStock: true,
        warranty: 'ضمانت اصالت و گارانتی شرکتی',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'پردازنده', value: 'Apple M3 Pro (12-Core CPU / 18-Core GPU)' },
      { title: 'حافظه رم', value: '18 گیگابایت unified memory' },
      { title: 'حافظه ذخیره‌سازی', value: '512 گیگابایت SSD NVMe' },
      { title: 'صفحه نمایش', value: '16.2 اینچ Mini-LED (120Hz ProMotion)' },
      { title: 'وزن', value: '2.14 کیلوگرم' },
    ],
    reviews: [
      {
        id: 'r5',
        userName: 'فرزاد افشار',
        rating: 5,
        date: '۱۴۰۳/۰۵/۰۵',
        comment: 'برای رندرینگ خروجی ۴K فوق‌العاده سریع عمل می‌کنه. صفحه نمایشش رو با هیچ لپ‌تاپ دیگه‌ای نمیشه مقایسه کرد.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 132000000 },
      { date: '۱۵ تیر', price: 128000000 },
      { date: '۲۰ مرداد', price: 124500000 },
    ],
    viewsCount: 3890,
    updatedAt: '۱۴۰۳/۰۵/۲۰',
  },
  {
    id: 'p-lap-2',
    title: 'ASUS ROG Strix G16 (i7 13650HX / RTX 4060 / 16GB / 1TB)',
    faTitle: 'لپ‌تاپ گیمینگ ایسوس مدل ROG Strix G16 کد G614JV',
    brand: 'ASUS',
    categoryId: 'laptop',
    categoryName: 'لپ‌تاپ و کامپیوتر',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 88,
    isFeatured: true,
    isPriceDrop: false,
    description: 'لپ‌تاپ گیمینگ قدرتمند ایسوس با پردازنده سری HX اینتل نسل ۱۳، گرافیک RTX 4060 با توان ۱۴۰ وات و سیستم خنک‌کننده سه فن خمیر فلز مایع.',
    pros: [
      'گرافیک قدرتمند RTX 4060 با حداکثر توان ۱۴۰ وات',
      'پردازنده نسل ۱۳ قدرتمند مناسب بازی و رندرینگ',
      'نمایشگر ۱۶ اینچ ۱۶۵ هرتزی با پوشش رنگی ۱۰۰٪ sRGB',
      'کیبورد گیمینگ با نورپردازی Per-Key RGB',
    ],
    cons: [
      'وزن ۲.۵ کیلوگرمی و آداپتور نسبتا بزرگ',
      'شارژدهی باتری محدود در بازی (حدود ۱.۵ ساعت)',
    ],
    stores: [
      {
        storeId: 'meghdadit',
        storeName: 'مقداد آی‌تی',
        logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80',
        price: 73800000,
        oldPrice: 76500000,
        inStock: true,
        warranty: '۲۴ ماه گارانتی اصلی سازگار / حامی',
        affiliateUrl: 'https://meghdadit.com?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 74900000,
        oldPrice: 77000000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی یکپارچه ایسوس',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'پردازنده', value: 'Intel Core i7 13650HX (14 Cores / 20 Threads)' },
      { title: 'کارت گرافیک', value: 'NVIDIA GeForce RTX 4060 (8GB GDDR6 140W)' },
      { title: 'حافظه رم', value: '16 گیگابایت DDR5 (قابلیت ارتقا تا 64GB)' },
      { title: 'حافظه SSD', value: '1 ترابایت NVMe PCIe Gen4' },
      { title: 'صفحه نمایش', value: '16 اینچ FHD+ (165Hz / 7ms / G-Sync)' },
    ],
    reviews: [
      {
        id: 'r6',
        userName: 'رضا نوری',
        rating: 5,
        date: '۱۴۰۳/۰۴/۱۸',
        comment: 'تمامی بازی‌های جدید مثل Cyberpunk رو روی تنظیمات Ultra بدون لگ ۵۰ تا ۷۰ فریم میده.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 76500000 },
      { date: '۲۰ مرداد', price: 73800000 },
    ],
    viewsCount: 2940,
    updatedAt: '۱۴۰۳/۰۵/۱۷',
  },
  {
    id: 'p-lap-3',
    title: 'Lenovo IdeaPad Slim 3 (Core i5 13420H / 16GB / 512GB)',
    faTitle: 'لپ‌تاپ ۱۵.۶ اینچی لنوو مدل IdeaPad Slim 3-A13',
    brand: 'Lenovo',
    categoryId: 'laptop',
    categoryName: 'لپ‌تاپ و کامپیوتر',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewsCount: 140,
    isFeatured: false,
    isPriceDrop: true,
    priceDropPercentage: 9,
    description: 'بهترین لپ‌تاپ اقتصادی خوش‌قیمت برای کارهای روزمره، وبگردی، دانشجویی و حسابداری با بدنه باریک.',
    pros: [
      'وزن سبک ۱.۶۲ کیلوگرمی مناسب جابجایی راحت',
      'پردازنده قدرتمند نسل ۱۳ اینتل در این رده قیمتی',
      'حافظه رم ۱۶ گیگابایت پرسرعت',
      'قیمت بسیار مناسب در مقابل مشخصات',
    ],
    cons: [
      'پنل نمایشگر TN زوایای دید محدودی دارد',
      'بدنه پلاستیکی',
    ],
    stores: [
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 23900000,
        oldPrice: 26300000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی سازگار ارقام',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 24200000,
        oldPrice: 26500000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی حامی',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'پردازنده', value: 'Intel Core i5 13420H' },
      { title: 'حافظه رم', value: '16 گیگابایت LPDDR5' },
      { title: 'حافظه داخلی', value: '512 گیگابایت SSD Gen 4' },
      { title: 'صفحه نمایش', value: '15.6 اینچ Full HD (1920x1080)' },
      { title: 'وزن', value: '1.62 کیلوگرم' },
    ],
    reviews: [
      {
        id: 'r7',
        userName: 'زهرا موسوی',
        rating: 5,
        date: '۱۴۰۳/۰۵/۰۱',
        comment: 'برای کارهای کلاسی دانشگاه خریدم، سرعت بالا بالا میاد و لنگت نمی‌ذاره.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 26300000 },
      { date: '۲۰ مرداد', price: 23900000 },
    ],
    viewsCount: 4120,
    updatedAt: '۱۴۰۳/۰۵/۱۹',
  },

  // HEADPHONES CATEGORY
  {
    id: 'p-head-1',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    faTitle: 'هدفون بی‌سیم سونی مدل WH-1000XM5',
    brand: 'Sony',
    categoryId: 'headphones',
    categoryName: 'هدفون و هندزفری',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 162,
    isFeatured: true,
    isPriceDrop: true,
    isEditorChoice: true,
    priceDropPercentage: 12,
    editorsNote: 'پادشاه نویزکنسلینگ دنیا با راحتی فوق‌العاده روی گوش و شفافیت صوتی استثنایی.',
    description: 'هدفون پرچمدار سونی با پردازنده اختصاصی V1 و QN1 برای حذف نویز هوشمند، ۸ میکروفون نویزگیر و ۳۰ ساعت شارژدهی باتری.',
    pros: [
      'بهترین حذف نویز اکتیو (ANC) در کل صنعت صدا',
      'شارژ سریع (۳ دقیقه شارژ = ۳ ساعت پخش موسیقی)',
      'میکروفون‌های شفاف برای مکالمات در محیط شلوغ',
      'طراحی ارگونومیک فوق‌العاده سبُک',
    ],
    cons: [
      'طراحی تاشو ندارد و کیف حمل آن کمی بزرگ است',
      'گواهی ضد آب ندارد',
    ],
    stores: [
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 18900000,
        oldPrice: 21500000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی ایران سونی + ضمانت اصالت',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 19500000,
        oldPrice: 21800000,
        inStock: true,
        warranty: 'ضمانت ۷ روزه بازگشت کالا',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'نوع اتصال', value: 'بلوتوث 5.2 و جک 3.5 میلی‌متری' },
      { title: 'عمر باتری', value: 'تا 30 ساعت با ANC روشن (40 ساعت بدون ANC)' },
      { title: 'درایور صدا', value: '30 میلی‌متری با طراحی ویژه فیبر کربن' },
      { title: 'وزن', value: '250 گرم' },
    ],
    reviews: [
      {
        id: 'r8',
        userName: 'مجید بهرامی',
        rating: 5,
        date: '۱۴۰۳/۰۵/۱۱',
        comment: 'توی هواپیما و محیط کار شلوغ انگار دنیا سکوت می‌کنه. کیفیت بیس عمیق و تفکیک عالی.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 21500000 },
      { date: '۲۰ مردad', price: 18900000 },
    ],
    viewsCount: 3620,
    updatedAt: '۱۴۰۳/۰۵/۲۰',
  },
  {
    id: 'p-head-2',
    title: 'Apple AirPods Pro 2nd Gen (USB-C)',
    faTitle: 'هندزفری بلوتوثی اپل مدل AirPods Pro (نسل دوم) با کیس USB-C',
    brand: 'Apple',
    categoryId: 'headphones',
    categoryName: 'هدفون و هندزفری',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 210,
    isFeatured: true,
    isPriceDrop: false,
    description: 'هندزفری نویزکنسلینگ اپل با چیپست H2، قابلیت صدای فضایی Spatial Audio با تعقیب سر، کیس با اسپیکر داخلی برای پیدا کردن از طریق Find My.',
    pros: [
      'حذف نویز ۲ برابر قوی‌تر نسبت به نسل قبل',
      'حالت صدای محیطی هوشمند Adaptive Audio',
      'کیس ضد آب IP54 با درگاه USB-C',
      'هماهنگی بی‌نظیر با اکوسیستم آیفون و مک',
    ],
    cons: [
      'امکانات کامل تنها در اکوسیستم اپل فعال می‌شود',
    ],
    stores: [
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 13900000,
        oldPrice: 14500000,
        inStock: true,
        warranty: 'ضمانت اصالت و سلامت کالا',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 14150000,
        oldPrice: 14700000,
        inStock: true,
        warranty: 'گارانتی اصالت اپل',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'چیپست', value: 'Apple H2 در گوشی‌ها / Apple U1 در کیس' },
      { title: 'شارژدهی', value: '۶ ساعت گوشی‌ها + ۲۴ ساعت با کیس' },
      { title: 'مقاومت در برابر آب', value: 'گواهی IP54' },
      { title: 'وزن هر گوشی', value: '5.3 گرم' },
    ],
    reviews: [
      {
        id: 'r9',
        userName: 'مهدی کشاورز',
        rating: 5,
        date: '۱۴۰۳/۰۴/۳۰',
        comment: 'قابلیت Adaptive Audio موقع صحبت کردن با دیگران صدا رو خودکار کم می‌کنه عالیه.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 14500000 },
      { date: '۲۰ مرداد', price: 13900000 },
    ],
    viewsCount: 4890,
    updatedAt: '۱۴۰۳/۰۵/۱۸',
  },

  // TABLET CATEGORY
  {
    id: 'p-tab-1',
    title: 'Apple iPad Pro 11" M4 (256GB / Wi-Fi)',
    faTitle: 'تبلت ۱۱ اینچی اپل مدل iPad Pro M4 ظرفیت ۲۵۶ گیگابایت',
    brand: 'Apple',
    categoryId: 'tablet',
    categoryName: 'تبلت',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 74,
    isFeatured: true,
    isPriceDrop: true,
    isEditorChoice: true,
    priceDropPercentage: 7,
    editorsNote: 'باریک‌ترین محصول تاریخ اپل با پردازنده M4 و صفحه نمایش فوق‌العاده Ultra Retina Tandem OLED.',
    description: 'باریک‌ترین تبلت دنیا با ضخامت ۵.۳ میلی‌متر، پردازنده نسل جدید M4، نمایشگر دو لایه OLED و پشتیبانی از قلم جدید Apple Pencil Pro.',
    pros: [
      'نمایشگر Tandem OLED با کنتراست بی‌نهایت و روشنایی ۱۶۰۰ نیت',
      'تراشه M4 با قدرت پردازشی بالاتر از اکثر لپ‌تاپ‌ها',
      'طراحی به شدت باریک و سبک ۵.۳ میلی‌متری',
    ],
    cons: [
      'قیمت بالا قلم Apple Pencil Pro و Magic Keyboard به صورت جداگانه',
    ],
    stores: [
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 63500000,
        oldPrice: 68500000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی شرکتی پارت نامبر LLA',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 64800000,
        oldPrice: 69000000,
        inStock: true,
        warranty: 'ضمانت اصالت و سلامت کالا',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'صفحه نمایش', value: '11 اینچ Ultra Retina Tandem OLED (120Hz)' },
      { title: 'پردازنده', value: 'Apple M4 (9-Core CPU / 10-Core GPU)' },
      { title: 'حافظه رم', value: '8 گیگابایت' },
      { title: 'حافظه داخلی', value: '256 گیگابایت' },
      { title: 'ضخامت و وزن', value: '5.3 میلی‌متر / 444 گرم' },
    ],
    reviews: [
      {
        id: 'r10',
        userName: 'داریوش راد',
        rating: 5,
        date: '۱۴۰۳/۰۵/۰۸',
        comment: 'کیفیت صفحه‌نمایش مشکی مطلق رو نشون میده. وزن کمش باعث میشه بتونی ساعت‌ها توی دست نگه داری.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 68500000 },
      { date: '۲۰ مرداد', price: 63500000 },
    ],
    viewsCount: 2890,
    updatedAt: '۱۴۰۳/۰۵/۱۹',
  },
  {
    id: 'p-tab-2',
    title: 'Samsung Galaxy Tab S9 Ultra 5G (512GB)',
    faTitle: 'تبلت ۱۴.۶ اینچی سامسونگ مدل Galaxy Tab S9 Ultra',
    brand: 'Samsung',
    categoryId: 'tablet',
    categoryName: 'تبلت',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 62,
    isFeatured: false,
    isPriceDrop: true,
    priceDropPercentage: 10,
    description: 'بزرگترین تبلت اندرویدی با صفحه نمایش ۱۴.۶ اینچ AMOLED، قلم S-Pen رایگان داخل جعبه، مقاوم در برابر آب و گرد و غبار IP68.',
    pros: [
      'صفحه نمایش غول‌پیکر ۱۴.۶ اینچی فوق‌العاده برای طراحی و فیلم',
      'قلم S-Pen هوشمند بدون نیاز به هزینه جداگانه داخل جعبه',
      'گواهی ضد آب کامل IP68 برای تبلت و قلم',
      'قابلیت Samsung DeX برای تبدیل تبلت به محیط ویندوزی',
    ],
    cons: [
      'اندازه بزرگ جابجایی آن را با یک دست سخت می‌کند',
    ],
    stores: [
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 57900000,
        oldPrice: 64500000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی رسمی مایکروتل',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'mobit',
        storeName: 'موبیت',
        logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&auto=format&fit=crop&q=80',
        price: 58500000,
        oldPrice: 65000000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی همراه‌تل',
        affiliateUrl: 'https://www.mobit.ir?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'صفحه نمایش', value: '14.6 اینچ Dynamic AMOLED 2X (120Hz)' },
      { title: 'پردازنده', value: 'Snapdragon 8 Gen 2 for Galaxy' },
      { title: 'حافظه رم', value: '12 گیگابایت' },
      { title: 'باتری', value: '11200 میلی‌آمپر ساعت با شارژ 45W' },
      { title: 'استاندارد مقاومت', value: 'IP68 مقاوم در برابر نفوذ آب' },
    ],
    reviews: [
      {
        id: 'r11',
        userName: 'سیامک نامجو',
        rating: 5,
        date: '۱۴۰۳/۰۴/۲۲',
        comment: 'برای طراحی گرافیک با نرم‌افزار Clip Studio فوق‌العاده عمل میکنه.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 64500000 },
      { date: '۲۰ مرداد', price: 57900000 },
    ],
    viewsCount: 2150,
    updatedAt: '۱۴۰۳/۰۵/۱۷',
  },

  // SMARTWATCH CATEGORY
  {
    id: 'p-watch-1',
    title: 'Apple Watch Series 9 GPS 45mm',
    faTitle: 'ساعت هوشمند اپل مدل Series 9 آلومینیوم سایز 45 میلی‌متر',
    brand: 'Apple',
    categoryId: 'smartwatch',
    categoryName: 'ساعت هوشمند',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 142,
    isFeatured: true,
    isPriceDrop: true,
    isEditorChoice: true,
    priceDropPercentage: 8,
    editorsNote: 'بهترین ساعت هوشمند تمام عیار برای دارندگان آیفون با اشاره جادویی Double Tap و سنسورهای سلامتی دقیق.',
    description: 'اپل واچ سری ۹ با تراشه S9 قدرتمند، ژست حرکتی جدید دوبار زدن انگشتان، صفحه نمایش بسیار روشن ۲۰۰۰ نیتی و دستیار سیری آفلاین.',
    pros: [
      'ژست حرکتی Double Tap برای پاسخگویی تک‌دست بدون لمس صفحه',
      'نمایشگر روشن ۲۰۰۰ نیت قابل مطالعه در زیر نور مستقیم خورشید',
      'سنسورهای سنجش اکسیژن خون، نوار قلب ECG و تشخیص تصادف',
      'تراشه قدرتمند S9 و حافظه داخلی ۶۴ گیگابایت',
    ],
    cons: [
      'شارژدهی باتری حداکثر ۱.۵ روز کاری است',
    ],
    stores: [
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 21900000,
        oldPrice: 23800000,
        inStock: true,
        warranty: 'ضمانت اصالت و گارانتی شرکتی',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 22300000,
        oldPrice: 24000000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی الماس پایتخت',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'پردازنده', value: 'Apple S9 SiP با پردازنده ۴ هسته‌ای عصبی' },
      { title: 'صفحه نمایش', value: 'Retina LTPO OLED (2000 nits)' },
      { title: 'مقاومت در برابر آب', value: '50 متر (WR50)' },
      { title: 'حافظه', value: '64 گیگابایت' },
    ],
    reviews: [
      {
        id: 'r12',
        userName: 'آرش کیانی',
        rating: 5,
        date: '۱۴۰۳/۰۵/۰۴',
        comment: 'ویژگی دبل تپ واقعا کاربردیه وقتی دستت بنده میتونی زنگ رو جواب بدی.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 23800000 },
      { date: '۲۰ مرداد', price: 21900000 },
    ],
    viewsCount: 3410,
    updatedAt: '۱۴۰۳/۰۵/۲۰',
  },
  {
    id: 'p-watch-2',
    title: 'Samsung Galaxy Watch 6 Classic 47mm',
    faTitle: 'ساعت هوشمند سامسونگ مدل Galaxy Watch 6 Classic سایز 47 میلی‌متر',
    brand: 'Samsung',
    categoryId: 'smartwatch',
    categoryName: 'ساعت هوشمند',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 98,
    isFeatured: false,
    isPriceDrop: true,
    priceDropPercentage: 11,
    description: 'ساعت کلاسیک و محبوب سامسونگ با زه چرخنده فیزیکی محبوب، بدنه استیل ضد زنگ و سنسور آنالیز ترکیب بافت بدن (BIA).',
    pros: [
      'حلقه گردان فیزیکی بسیار لذت‌بخش و دقیق برای پیمایش',
      'صفحه نمایش بزرگتر با حاشیه باریک‌تر',
      'آنالیز دقیق خواب، فشار خون و سنجش درصد چربی و عضله بدن',
      'سیستم‌عامل Wear OS 4 با قابلیت نصب تمام برنامه‌ها',
    ],
    cons: [
      'شارژدهی باتری حدود ۳۰ تا ۴۰ ساعت',
    ],
    stores: [
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 13800000,
        oldPrice: 15500000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی هماهنگ + کد رجیستری',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'mobit',
        storeName: 'موبیت',
        logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&auto=format&fit=crop&q=80',
        price: 14100000,
        oldPrice: 15800000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی شرکتی',
        affiliateUrl: 'https://www.mobit.ir?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'جنس بدنه', value: 'استیل ضد زنگ با کریستال یاقوت کبود' },
      { title: 'صفحه نمایش', value: '1.5 اینچ Super AMOLED (2000 nits)' },
      { title: 'پردازنده', value: 'Exynos W930 Dual-Core 1.4GHz' },
      { title: 'باتری', value: '425 میلی‌آمپر ساعت' },
    ],
    reviews: [
      {
        id: 'r13',
        userName: 'نیما همتی',
        rating: 5,
        date: '۱۴۰۳/۰۴/۲۵',
        comment: 'حلقه چرخنده‌اش حس فوق‌العاده‌ای داره و طراحی کاملاً کلاسیک و شیکی داره.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 15500000 },
      { date: '۲۰ مرداد', price: 13800000 },
    ],
    viewsCount: 2750,
    updatedAt: '۱۴۰۳/۰۵/۱۶',
  },

  // ACCESSORIES CATEGORY
  {
    id: 'p-acc-1',
    title: 'Anker 737 Power Bank (PowerCore 24K) 140W',
    faTitle: 'پاوربانک انکر مدل 737 ظرفیت 24000 میلی‌آمپر ساعت توان 140 وات',
    brand: 'Anker',
    categoryId: 'accessories',
    categoryName: 'لوازم جانبی',
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 105,
    isFeatured: true,
    isPriceDrop: true,
    isEditorChoice: true,
    priceDropPercentage: 14,
    editorsNote: 'قدرتمندترین پاوربانک دنیا با توان خروجی ۱۴۰ وات قابل شارژ همزمان مک‌بوک و گوشی با نمایشگر رنگی جزییات.',
    description: 'پاوربانک حرفه‌ای انکر با پورت دوطرفه Power Delivery 3.1، صفحه نمایش رنگی هوشمند جهت مشاهده توان شارژ لحظه‌ای، دمای باتری و سلامت سلول‌ها.',
    pros: [
      'توان خروجی فوق‌العاده ۱۴۰ وات مناسب شارژ سریع مک‌بوک پرو',
      'صفحه نمایش اسمارت رنگی با نمایش توان شارژ ورودی و خروجی',
      'ورودی ۱۴۰ وات (شارژ کامل پاوربانک در کمتر از ۵۲ دقیقه)',
      'تکنولوژی ایمنی ActiveShield 2.0 برای کنترل دقیق دما',
    ],
    cons: [
      'وزن ۶۳۵ گرمی و ضخامت نسبتا زیاد',
    ],
    stores: [
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 6800000,
        oldPrice: 7900000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی ایستا / متین',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 7100000,
        oldPrice: 8100000,
        inStock: true,
        warranty: '۱۸ ماه گارانتی آواژنگ',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'ظرفیت', value: '24,000 میلی‌آمپر ساعت (86.4Wh)' },
      { title: 'حداکثر توان', value: '140W PD 3.1' },
      { title: 'پورت‌ها', value: '2x USB-C (140W) + 1x USB-A (18W)' },
      { title: 'وزن', value: '635 گرم' },
    ],
    reviews: [
      {
        id: 'r14',
        userName: 'پیمان حسینی',
        rating: 5,
        date: '۱۴۰۳/۰۵/۱۴',
        comment: 'صفحه نمایشش میزان توان لحظه‌ای شارژ رو نشون میده که عالیه. مک بوکم رو با سرعت کامل شارژ میکنه.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 7900000 },
      { date: '۲۰ مرداد', price: 6800000 },
    ],
    viewsCount: 3120,
    updatedAt: '۱۴۰۳/۰۵/۲۰',
  },
  {
    id: 'p-acc-2',
    title: 'Logitech MX Master 3S Wireless Mouse',
    faTitle: 'ماوس بی سیم لوجیتک مدل MX Master 3S',
    brand: 'Logitech',
    categoryId: 'accessories',
    categoryName: 'لوازم جانبی',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 156,
    isFeatured: false,
    isPriceDrop: true,
    priceDropPercentage: 10,
    description: 'بهترین ماوس ارگونومیک دنیا برای برنامه‌نویسان و طراحان با کلیک‌های فوق بی‌صدا (Quiet Clicks)، اسکرول مغناطیسی ۱۰۰۰ خط بر ثانیه و سنسور 8000DPI.',
    pros: [
      'کلیک‌های ۹۰٪ بی‌صداتر نسبت به نسل قبل',
      'اسکرول هوشمند مغناطیسی MagSpeed الکترومغناطیسی',
      'طراحی ارگونومیک بی‌نظیر که مانع خستگی مچ دست می‌شود',
      'کارکرد روی تمام سطوح حتی شیشه شفاف',
    ],
    cons: [
      'تنها برای افراد راست‌دست طراحی شده است',
    ],
    stores: [
      {
        storeId: 'technolife',
        storeName: 'تکنولایف',
        logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
        price: 5350000,
        oldPrice: 5950000,
        inStock: true,
        warranty: '۲۴ ماه گارانتی اسپیرو / آواژنگ',
        affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
        isLowest: true,
      },
      {
        storeId: 'digikala',
        storeName: 'دیجی‌کالا',
        logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
        price: 5500000,
        oldPrice: 6100000,
        inStock: true,
        warranty: 'ضمانت اصالت و سلامت',
        affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
        isLowest: false,
      },
    ],
    specs: [
      { title: 'دقت سنسور', value: '8000 DPI Darkfield' },
      { title: 'نوع اتصال', value: 'Bluetooth + دانگل Logi Bolt' },
      { title: 'عمر باتری', value: 'تا 70 روز با یک بار شارژ کامل' },
      { title: 'وزن', value: '141 گرم' },
    ],
    reviews: [
      {
        id: 'r15',
        userName: 'کیارش شایان',
        rating: 5,
        date: '۱۴۰۳/۰۵/۰۹',
        comment: 'برای کدنویسی طولانی‌مدت عالیه. اسکرول مغناطیسیش واقعا جادوییه.',
        verifiedBuy: true,
      },
    ],
    priceHistory: [
      { date: '۱ تیر', price: 5950000 },
      { date: '۲۰ مرداد', price: 5350000 },
    ],
    viewsCount: 2980,
    updatedAt: '۱۴۰۳/۰۵/۱۹',
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c1',
    storeId: 'digikala',
    storeName: 'دیجی‌کالا',
    storeLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
    code: 'DK-PRO2024',
    discountTitle: 'کد تخفیف ۱۵۰ هزار تومانی ویژه دیجی‌کالا',
    discountDescription: 'قابل استفاده برای خریدهای بالای ۱ میلیون تومان دیجیتال و موبایل',
    discountAmount: '۱۵۰,۰۰۰ تومان',
    expiryDate: '۱۴۰۳/۰۶/۳۰',
    isVerified: true,
    affiliateUrl: 'https://www.digikala.com?aff=kharidpro',
    usesCount: 1420,
    category: 'موبایل و کالای دیجیتال',
  },
  {
    id: 'c2',
    storeId: 'technolife',
    storeName: 'تکنولایف',
    storeLogo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120&auto=format&fit=crop&q=80',
    code: 'TECHNO-VIP',
    discountTitle: 'کد تخفیف ۵ درصدی خرید لپ‌تاپ و هدفون',
    discountDescription: 'سقف تخفیف ۵۰۰ هزار تومان برای خریدهای تکنولایف',
    discountAmount: '۵٪ تخفیف',
    expiryDate: '۱۴۰۳/۰۶/۱۵',
    isVerified: true,
    affiliateUrl: 'https://www.technolife.ir?aff=kharidpro',
    usesCount: 980,
    category: 'لپ‌تاپ و هدفون',
  },
  {
    id: 'c3',
    storeId: 'mobit',
    storeName: 'موبیت',
    storeLogo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&auto=format&fit=crop&q=80',
    code: 'MOBIT-FREE',
    discountTitle: 'کد ارسال رایگان کلیه سفارشات بالای ۵۰۰ هزار تومان',
    discountDescription: 'ارسال پیشتاز سراسر ایران بدون محدودیت وزن',
    discountAmount: 'ارسال رایگان',
    expiryDate: '۱۴۰۳/۰۷/۰۱',
    isVerified: true,
    affiliateUrl: 'https://www.mobit.ir?aff=kharidpro',
    usesCount: 610,
    category: 'لوازم جانبی',
  },
  {
    id: 'c4',
    storeId: 'meghdadit',
    storeName: 'مقداد آی‌تی',
    storeLogo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80',
    code: 'MEGHDAD-200',
    discountTitle: 'تخفیف ۲۰۰ هزار تومانی قطعات کامپیوتر',
    discountDescription: 'ویژه خریدهای سیستم گیمینگ و قطعات سخت‌افزار',
    discountAmount: '۲۰۰,۰۰۰ تومان',
    expiryDate: '۱۴۰۳/۰۶/۱۰',
    isVerified: true,
    affiliateUrl: 'https://meghdadit.com?aff=kharidpro',
    usesCount: 430,
    category: 'قطعات و سخت‌افزار',
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'راهنمای جامع خرید گوشی موبایل تا ۱۵ میلیون تومان (مرداد ۱۴۰۳)',
    slug: 'mobile-buying-guide-under-15m',
    categoryId: 'mobile',
    categoryName: 'گوشی موبایل',
    author: 'مهندس رضا باقری',
    authorRole: 'سردبیر تخصصی کالای دیجیتال',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    publishDate: '۱۴۰۳/۰۵/۱۸',
    readTime: '۸ دقیقه',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    summary: 'اگر با بودجه ۱۰ تا ۱۵ میلیون تومان قصد خرید گوشی هوشمند دارید، در این مقاله بهترین گزینه‌های سامسونگ و شیائومی را از نظر ارزش خرید مقایسه کرده‌ایم.',
    content: `
در بازار فعلی ایران، بازه قیمتی ۱۰ تا ۱۵ میلیون تومان پررقابت‌ترین بخش بازار گوشی‌های هوشمند میان‌رده است. کمپانی‌های سامسونگ و شیائومی با معرفی مدل‌های متنوع تلاش می‌کنند نظر کاربران را جلب نمایند.

### نکات کلیدی که قبل از خرید باید بدانید:
۱. **صفحه نمایش:** حتماً به سراغ مدل‌های با پنل Super AMOLED یا OLED با نرخ نوسازی ۱۲۰ هرتز بروید.
۲. **پردازنده:** تراشه‌های سری Snapdragon 7 یا Dimensity 8000 بهترین تعادل میان مصرف انرژی و قدرت پردازشی را ارائه می‌کنند.
۳. **باتری و شارژر:** وجود شارژر فست ۳۳ یا ۶۷ وات درون جعبه یک مزیت بزرگ اقتصادی محسوب می‌شود.

### پیشنهاد شماره ۱: Samsung Galaxy A55
اگر به دنبال پشتیبانی نرم‌افزاری ۵ ساله، بدنه شیشه‌ای با فریم آلومینیومی و گواهی ضدآب IP67 هستید، گلکسی A55 بی‌رقیب‌ترین انتخاب شما خواهد بود.

### پیشنهاد شماره ۲: Poco X6 Pro شیائومی
برای گیمرها که اولویت اول آن‌ها سخت‌افزار قدرتمند است، Poco X6 Pro با حافظه UFS 4.0 و چیپست Dimensity 8300 Ultra قدرت پردازشی در حد پرچمداران سال گذشته را با نصف قیمت ارائه می‌کند.
    `,
    recommendedProductIds: ['p-mob-1', 'p-mob-3'],
    viewsCount: 6840,
  },
  {
    id: 'a2',
    title: 'بهترین لپ‌تاپ‌های دانشجویی و برنامه‌نویسی با بودجه زیر ۴۰ میلیون تومان',
    slug: 'best-student-laptops-under-40m',
    categoryId: 'laptop',
    categoryName: 'لپ‌تاپ و کامپیوتر',
    author: 'علی زمانی',
    authorRole: 'کارشناس سخت‌افزار',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    publishDate: '۱۴۰۳/۰۵/۱۴',
    readTime: '۱۰ دقیقه',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    summary: 'راهنمای گام به گام انتخاب لپ‌تاپ سبک، با شارژدهی بالا و رم حداقل ۱۶ گیگابایت مناسب کارهای دانشگاهی و کدنویسی.',
    content: `
خرید لپ‌تاپ مناسب دانشگاه و برنامه‌نویسی نیازمند توجه به سه فاکتور اساسی است: وزن سبک، کیبورد باکیفیت و رم کافی برای اجرای Docker و برنامه‌های سنگین.

### معیارهای ضروری لپ‌تاپ دانشجویی:
- **وزن:** کمتر از ۱.۸ کیلوگرم برای حمل آسان در کوله‌پشتی
- **رم:** حداقل ۱۶ گیگابایت ( ترجیحاً DDR5 )
- **حافظه:** اس‌اس‌دی NVMe با ظرفیت حداقل ۵۱۲ گیگابایت

### مدل‌های برتر پیشنهادی:
۱. **Lenovo IdeaPad Slim 3:** پردازنده i5 نسل ۱۳ با رم ۱۶ گیگابایت یکی از بهترین گزینه‌ها از نظر ارزش خرید است.
۲. **ASUS Vivobook 15:** با صفحه نمایش FHD و بدنه ظریف انتخاب عالی برای دانشجویان مهندسی و مدیریت.
    `,
    recommendedProductIds: ['p-lap-3'],
    viewsCount: 5210,
  },
  {
    id: 'a3',
    title: 'راهنمای خرید هدفون و هندزفری نویزکنسلینگ (ANC)؛ کدام برند بهتر است؟',
    slug: 'anc-headphones-buying-guide',
    categoryId: 'headphones',
    categoryName: 'هدفون و هندزفری',
    author: 'سارا امینی',
    authorRole: 'بررسی‌کننده تجهیزات صوتی',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    publishDate: '۱۴۰۳/۰۵/۱۰',
    readTime: '۶ دقیقه',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    summary: 'مقایسه سیستم حذف نویز سونی، اپل و انکر و معرفی بهترین هندزفری‌ها برای مکالمه در محیط شلوغ و سفر.',
    content: `
فناوری حذف نویز اکتیو (ANC) نحوه گوش دادن ما به موسیقی را تغییر داده است. اما همه حذف نویزها یکسان کار نمی‌کنند.

### سونی یا اپل؟
سونی با مدل **WH-1000XM5** در زمینه حذف فرکانس‌های صدای پایین و بم مثل موتور هواپیما بی‌رقیب است. در سمت مقابل، **AirPods Pro 2** هماهنگی بی‌نظیری با آیفون دارد و حالت شفافیت صدای آن شفاف‌ترین حس ممکن را منتقل می‌کند.
    `,
    recommendedProductIds: ['p-head-1', 'p-head-2'],
    viewsCount: 4190,
  },
  {
    id: 'a4',
    title: 'راهنمای خرید ساعت هوشمند؛ بررسی قابلیت‌های سلامتی و شارژدهی',
    slug: 'smartwatch-buying-guide-health-battery',
    categoryId: 'smartwatch',
    categoryName: 'ساعت هوشمند',
    author: 'مهندس رضا باقری',
    authorRole: 'سردبیر تخصصی کالای دیجیتال',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    publishDate: '۱۴۰۳/۰۵/۰۲',
    readTime: '۷ دقیقه',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    summary: 'چگونه بهترین ساعت هوشمند را متناسب با سیستم‌عامل آیفون یا اندروید انتخاب کنیم؟ نکات کلیدی پایش خواب و ضربان قلب.',
    content: `
ساعت‌های هوشمند فراتر از یک اکسسوری زیبایی، دستیار سلامتی شما روی مچ دست هستند. اگر آیفون دارید، اپل واچ کامل‌ترین انتخاب شماست، در حالی که کاربران اندروید با گلکسی واچ سامسونگ یا ساعت‌های امیزفیت تجربه بسیار روانی خواهند داشت.
    `,
    recommendedProductIds: ['p-watch-1', 'p-watch-2'],
    viewsCount: 3880,
  },
];

// LocalStorage Persistence Helpers for Live Admin Editing
const STORAGE_KEYS = {
  PRODUCTS: 'kharidpro_products',
  COUPONS: 'kharidpro_coupons',
  ARTICLES: 'kharidpro_articles',
  NEWSLETTER: 'kharidpro_newsletter',
  STORES: 'kharidpro_stores',
  STATS: 'kharidpro_stats',
};

export const getStoredProducts = (): Product[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving products:', e);
  }
};

export const getStoredCoupons = (): Coupon[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COUPONS);
    return data ? JSON.parse(data) : INITIAL_COUPONS;
  } catch {
    return INITIAL_COUPONS;
  }
};

export const saveStoredCoupons = (coupons: Coupon[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  } catch (e) {
    console.error('Error saving coupons:', e);
  }
};

export const getStoredArticles = (): Article[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    return data ? JSON.parse(data) : INITIAL_ARTICLES;
  } catch {
    return INITIAL_ARTICLES;
  }
};

export const saveStoredArticles = (articles: Article[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  } catch (e) {
    console.error('Error saving articles:', e);
  }
};

export const getStoredStores = (): PartnerStore[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STORES);
    return data ? JSON.parse(data) : STORES;
  } catch {
    return STORES;
  }
};

export const saveStoredStores = (stores: PartnerStore[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.STORES, JSON.stringify(stores));
  } catch (e) {
    console.error('Error saving stores:', e);
  }
};

export const getStoredNewsletter = (): string[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
    return data ? JSON.parse(data) : ['sample1@example.com', 'user2@gmail.com'];
  } catch {
    return [];
  }
};

export const saveNewsletterEmail = (email: string): boolean => {
  try {
    const list = getStoredNewsletter();
    if (list.includes(email)) return false; // already exists
    list.push(email);
    localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
};

// Format currency helper to Persian Tomans
export const formatToman = (amount: number): string => {
  const formatted = amount.toLocaleString('fa-IR');
  return `${formatted} تومان`;
};

// Convert English numbers to Persian digits
export const toFaDigit = (num: number | string): string => {
  const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (x) => faDigits[parseInt(x)]);
};
