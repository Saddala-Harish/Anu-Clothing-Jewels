import { Product, StoreSettings } from '../types';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  boutiqueName: 'Varam Vastra & Jewels',
  tagline: 'Handcrafted Heritage Weaves & 1-Gram Temple Jewellery',
  whatsappNumber: '919876543210',
  displayPhone: '+91 98765 43210',
  email: 'care@varamvastra.com',
  storeAddress: 'Shop #14, Royal Arcade, Road No. 36, Jubilee Hills',
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '500033',
  businessHours: 'Mon - Sat: 10:30 AM to 8:30 PM | Sun: 11:00 AM to 7:00 PM IST',
  upiId: 'varamvastra@icici',
  freeShippingThreshold: 1999,
  standardShippingFee: 99,
  codFee: 49,
  announcementText: '✨ Festive Wedding Season: Flat 10% OFF with code VARAM10 | Free Shipping across India above ₹1,999!',
  showAnnouncement: true,
  aboutStory: 'Founded in 2021 as a cherished home boutique curating exquisite Kanjivarams and heirloom temple jewellery for family weddings, Varam Vastra & Jewels grew through the love of hundreds of patrons across WhatsApp Status showcases. Today, we bring our hand-selected pure silks and artisanal 1-gram gold jewellery online, maintaining the same warm, personalized video-call shopping and genuine trust.',
  instagramHandle: '@varamvastrajewels'
};

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Sarees
  {
    id: 'prod-saree-01',
    name: 'Maharani Crimson Kanjivaram Pure Silk Saree',
    sku: 'VVJ-SAR-001',
    category: 'Sarees',
    subCategory: 'Kanjivaram Silk',
    price: 4899,
    originalPrice: 6499,
    discountPercent: 25,
    description: 'An ethereal crimson red pure mulberry silk Kanjivaram saree featuring heavy antique gold zari Korvai borders, peacock buttis, and an opulent royal brocade pallu. Comes with an unstitched contrast blouse piece.',
    fabric: '100% Pure Mulberry Silk with Handwoven Antique Zari',
    zariType: 'Tested Half-Fine Antique Gold Zari',
    careInstructions: 'Dry clean only. Store wrapped in pure muslin cloth.',
    occasion: 'Bridal & Royal Celebrations',
    images: [
      '/src/assets/images/saree_crimson_kanjivaram_1791904272322.jpg',
      '/src/assets/images/hero_regal_boutique_1791904272171.jpg'
    ],
    inStock: true,
    stockCount: 4,
    isBestseller: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 38,
    availableSizes: ['Free Size (6.3m with Blouse)'],
    availableColors: [
      { name: 'Crimson Red', hex: '#8B1E3F' },
      { name: 'Deep Maroon', hex: '#58111A' }
    ]
  },
  {
    id: 'prod-saree-02',
    name: 'Peacock Blue Banarasi Katan Silk Saree',
    sku: 'VVJ-SAR-002',
    category: 'Sarees',
    subCategory: 'Banarasi Silk',
    price: 3699,
    originalPrice: 4999,
    discountPercent: 26,
    description: 'Graceful peacock blue handloom Banarasi Katan silk saree woven with intricate floral jaal in antique sona-rupa zari. A timeless drape for festivals and weddings.',
    fabric: 'Pure Katan Silk with Kadwa Weave Zari',
    zariType: 'Gold & Silver Dual Tone (Ganga Jamuna)',
    careInstructions: 'Professional dry clean only.',
    occasion: 'Festive & Reception',
    images: [
      '/src/assets/images/saree_crimson_kanjivaram_1791904272322.jpg'
    ],
    inStock: true,
    stockCount: 6,
    isBestseller: false,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 24,
    availableSizes: ['Free Size (6.3m with Blouse)'],
    availableColors: [
      { name: 'Peacock Blue', hex: '#004F77' },
      { name: 'Teal Green', hex: '#005D5B' }
    ]
  },
  {
    id: 'prod-saree-03',
    name: 'Temple Gold Mustard Tissue Chanderi Saree',
    sku: 'VVJ-SAR-003',
    category: 'Sarees',
    subCategory: 'Chanderi Tissue',
    price: 2499,
    originalPrice: 3299,
    discountPercent: 24,
    description: 'Featherlight metallic mustard gold tissue Chanderi saree adorned with subtle floral bootis and woven zari border. Drapes with effortless royal sheen.',
    fabric: 'Silk Tissue blend with delicate handloom finish',
    zariType: 'Micro-woven Metallic Sheen Zari',
    careInstructions: 'Dry clean only. Iron on reverse low heat.',
    occasion: 'Haldi, Pooja & Day Festivities',
    images: [
      '/src/assets/images/saree_crimson_kanjivaram_1791904272322.jpg'
    ],
    inStock: true,
    stockCount: 8,
    isBestseller: true,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.7,
    reviewsCount: 19,
    availableSizes: ['Free Size (6.3m with Blouse)'],
    availableColors: [
      { name: 'Mustard Gold', hex: '#D4AF37' },
      { name: 'Warm Copper', hex: '#B87333' }
    ]
  },
  {
    id: 'prod-saree-04',
    name: 'Emerald Green Soft Silk Wedding Saree',
    sku: 'VVJ-SAR-004',
    category: 'Sarees',
    subCategory: 'Soft Silk',
    price: 2999,
    originalPrice: 3999,
    discountPercent: 25,
    description: 'Rich emerald green lightweight soft silk saree featuring contemporary floral vines and a grand contrast magenta pink zari border and pallu.',
    fabric: 'High-Density Soft Art Silk',
    zariType: 'Polished Yellow Gold Zari',
    careInstructions: 'Dry clean or gentle cold hand wash.',
    occasion: 'Engagements, Poojas & Muhurtham',
    images: [
      '/src/assets/images/saree_crimson_kanjivaram_1791904272322.jpg'
    ],
    inStock: true,
    stockCount: 5,
    isBestseller: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 31,
    availableSizes: ['Free Size (6.3m with Blouse)'],
    availableColors: [
      { name: 'Emerald Green', hex: '#1C543B' }
    ]
  },

  // 2. 1-Gram Gold Jewellery
  {
    id: 'prod-jewel-01',
    name: 'Lakshmi Temple Choker & Jhumka Set (1-Gram Gold)',
    sku: 'VVJ-JWL-001',
    category: '1-Gram Gold',
    subCategory: 'Necklaces & Chokers',
    price: 2799,
    originalPrice: 3799,
    discountPercent: 26,
    description: 'Exquisite antique handcrafted 1-gram micro gold plated temple jewellery choker featuring Goddess Lakshmi motif, studded with unheated ruby kemp stones and natural freshwater seed pearl droplets. Comes with matching jhumkas.',
    fabric: 'Brass/Copper Alloy with 24K Micro Gold Plating & Kemp Stones',
    zariType: 'Antique Matte Gold Finish with Anti-Tarnish Coating',
    careInstructions: 'Keep away from water, perfumes, and sprays. Store in airtight zip pouch.',
    occasion: 'Bridal, Seemantham & Classical Events',
    images: [
      '/src/assets/images/jewel_temple_choker_1791904273999.jpg'
    ],
    inStock: true,
    stockCount: 5,
    isBestseller: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 5.0,
    reviewsCount: 47,
    availableSizes: ['Adjustable Dori / Thread'],
    availableColors: [
      { name: 'Ruby Kemp Gold', hex: '#A31D38' },
      { name: 'Ruby-Emerald Kemp', hex: '#1F5B41' }
    ]
  },
  {
    id: 'prod-jewel-02',
    name: 'Peacock Royal Long Haram Set (1-Gram Gold)',
    sku: 'VVJ-JWL-002',
    category: '1-Gram Gold',
    subCategory: 'Long Harams',
    price: 3499,
    originalPrice: 4599,
    discountPercent: 24,
    description: 'Magnificent 26-inch royal peacock motif long haram with double chain detailing, carved Nakshi motifs, and sparkling green emerald doublet stones.',
    fabric: '1-Gram 24K Micron Gold Plated Copper Base',
    zariType: 'Authentic 22K Look Antique Polish',
    careInstructions: 'Wipe with soft cotton cloth after wear.',
    occasion: 'Wedding Grand Occasions',
    images: [
      '/src/assets/images/jewel_temple_choker_1791904273999.jpg'
    ],
    inStock: true,
    stockCount: 3,
    isBestseller: true,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 29,
    availableSizes: ['Standard 26-inch with Extender Link'],
    availableColors: [
      { name: 'Antique Gold', hex: '#D4AF37' }
    ]
  },
  {
    id: 'prod-jewel-03',
    name: 'Traditional Kasu Mala Coin Necklace Set',
    sku: 'VVJ-JWL-003',
    category: '1-Gram Gold',
    subCategory: 'Necklaces & Chokers',
    price: 2199,
    originalPrice: 2899,
    discountPercent: 24,
    description: 'Classic heritage Kasumala necklace crafted with stamped Lakshmi coins and red kemp stone spacers. An essential bridal heirloom silhouette.',
    fabric: '24K Micro Gold Plated Brass Base',
    zariType: 'Traditional South Indian Yellow Gold Finish',
    careInstructions: 'Wipe dry and store in cotton-lined box.',
    occasion: 'Temple Visits, Poojas & Festivals',
    images: [
      '/src/assets/images/jewel_temple_choker_1791904273999.jpg'
    ],
    inStock: true,
    stockCount: 7,
    isBestseller: false,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 15,
    availableSizes: ['Adjustable Back Chain'],
    availableColors: [
      { name: 'Traditional Gold', hex: '#E5C158' }
    ]
  },
  {
    id: 'prod-jewel-04',
    name: 'Kemp Stone Chandbali Jhumka Earrings',
    sku: 'VVJ-JWL-004',
    category: '1-Gram Gold',
    subCategory: 'Earrings & Jhumkas',
    price: 1199,
    originalPrice: 1599,
    discountPercent: 25,
    description: 'Statement crescent Chandbali jhumkas with carved floral crest, ruby-green kemp cluster, and jingling mini pearl ghungroos.',
    fabric: 'Micron Gold Plated Metal Alloy',
    zariType: 'Antique Matte Polish',
    careInstructions: 'Avoid direct moisture and sanitizers.',
    occasion: 'Festive Celebrations & Gifting',
    images: [
      '/src/assets/images/jewel_temple_choker_1791904273999.jpg'
    ],
    inStock: true,
    stockCount: 12,
    isBestseller: true,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 22,
    availableSizes: ['Standard Pierced (Screw Back)'],
    availableColors: [
      { name: 'Ruby Kemp', hex: '#A31D38' },
      { name: 'Emerald Kemp', hex: '#1F5B41' }
    ]
  },

  // 3. Bangles
  {
    id: 'prod-bangle-01',
    name: 'Heritage Temple Peacock Kemp Bangles (Set of 4)',
    sku: 'VVJ-BNG-001',
    category: 'Bangles',
    subCategory: 'Temple Bangles',
    price: 1899,
    originalPrice: 2499,
    discountPercent: 24,
    description: 'Stunning set of 4 openable antique temple bangles with high-relief embossed peacock carvings, bezel-set ruby kemp crystals, and side-screw safety clasp.',
    fabric: '1-Gram Gold Plated Brass with Kemp Stones',
    zariType: 'Heritage Matte Antique Finish',
    careInstructions: 'Keep dry. Store individually in velvet roll.',
    occasion: 'Weddings & Classical Dance',
    images: [
      '/src/assets/images/bangles_kemp_gold_1791904309371.jpg'
    ],
    inStock: true,
    stockCount: 9,
    isBestseller: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 35,
    availableSizes: ['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)'],
    availableColors: [
      { name: 'Antique Ruby Gold', hex: '#A31D38' }
    ]
  },
  {
    id: 'prod-bangle-02',
    name: 'Matte Finish Floral Kada Bangles (Set of 2)',
    sku: 'VVJ-BNG-002',
    category: 'Bangles',
    subCategory: 'Kada Bangles',
    price: 1499,
    originalPrice: 1999,
    discountPercent: 25,
    description: 'Bold pair of broad single-line floral kadas with antique micro gold polish. Perfect as statement centerpiece bangles beside silk sarees.',
    fabric: 'Brass Alloy with 1-Gram Gold Electroplating',
    zariType: 'Velvety Matte Finish',
    careInstructions: 'Wipe with lint-free cloth after wear.',
    occasion: 'Festivals & Daily Festive Wear',
    images: [
      '/src/assets/images/bangles_kemp_gold_1791904309371.jpg'
    ],
    inStock: true,
    stockCount: 6,
    isBestseller: false,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.7,
    reviewsCount: 16,
    availableSizes: ['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)', '2.10 (Extra Large)'],
    availableColors: [
      { name: 'Warm Matte Gold', hex: '#C5A059' }
    ]
  },
  {
    id: 'prod-bangle-03',
    name: 'Velvet Glass & Zari Bangle Bridal Set (Set of 24)',
    sku: 'VVJ-BNG-003',
    category: 'Bangles',
    subCategory: 'Glass Bangles',
    price: 899,
    originalPrice: 1199,
    discountPercent: 25,
    description: 'Traditional 24-piece bridal bangle set combining deep maroon velvet glass bangles with shimmering gold zari and kemp spacer bangles for auspicious celebrations.',
    fabric: 'Flocked Velvet Glass with Metallic Zari Bands',
    zariType: 'Sparkle Gold Thread Bands',
    careInstructions: 'Handle with care to prevent glass breakage.',
    occasion: 'Bridal Choora, Baby Shower & Karwa Chauth',
    images: [
      '/src/assets/images/bangles_kemp_gold_1791904309371.jpg'
    ],
    inStock: true,
    stockCount: 14,
    isBestseller: true,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 42,
    availableSizes: ['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)'],
    availableColors: [
      { name: 'Maroon & Gold', hex: '#63101E' },
      { name: 'Bottle Green & Gold', hex: '#133E2B' }
    ]
  },

  // 4. Women's Clothing
  {
    id: 'prod-cloth-01',
    name: 'Royal Wine Zardozi Embroidered Anarkali Gown',
    sku: 'VVJ-WCL-001',
    category: 'Women\'s Clothing',
    subCategory: 'Anarkalis & Gowns',
    price: 4299,
    originalPrice: 5999,
    discountPercent: 28,
    description: 'A breathtaking floor-length Anarkali set in royal wine velvet and silk georgette with elaborate hand zardozi, dabka, and pearl work. Includes heavy embroidered organza dupatta and churidar pants.',
    fabric: 'Micro Velvet Bodice with Fine Silk Georgette Flare',
    zariType: 'Hand Zardozi with Metallic Gold Threadwork',
    careInstructions: 'Professional dry clean only.',
    occasion: 'Weddings, Sangeet & Receptions',
    images: [
      '/src/assets/images/clothing_wine_anarkali_1791904274140.jpg'
    ],
    inStock: true,
    stockCount: 4,
    isBestseller: true,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 33,
    availableSizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    availableColors: [
      { name: 'Royal Wine', hex: '#58111A' },
      { name: 'Midnight Blue', hex: '#132238' }
    ]
  },
  {
    id: 'prod-cloth-02',
    name: 'Rani Pink Chanderi Silk Kurta & Sharara Set',
    sku: 'VVJ-WCL-002',
    category: 'Women\'s Clothing',
    subCategory: 'Kurtis & Suits',
    price: 2899,
    originalPrice: 3899,
    discountPercent: 25,
    description: 'Festive rani pink pure Chanderi silk straight kurta with gota patti neckline, paired with a flared tiered sharara and gold scalloped organza dupatta.',
    fabric: 'Pure Chanderi Silk with Cotton Mulmul Lining',
    zariType: 'Artisanal Gold Gota Patti Work',
    careInstructions: 'Dry clean recommended.',
    occasion: 'Diwali, Mehendi & Family Gatherings',
    images: [
      '/src/assets/images/clothing_wine_anarkali_1791904274140.jpg'
    ],
    inStock: true,
    stockCount: 7,
    isBestseller: false,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 20,
    availableSizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    availableColors: [
      { name: 'Rani Pink', hex: '#C2185B' },
      { name: 'Turmeric Yellow', hex: '#D49B00' }
    ]
  },
  {
    id: 'prod-cloth-03',
    name: 'Forest Green Banarasi Brocade Semi-Stitched Lehenga',
    sku: 'VVJ-WCL-003',
    category: 'Women\'s Clothing',
    subCategory: 'Lehengas',
    price: 5499,
    originalPrice: 7499,
    discountPercent: 26,
    description: 'Opulent forest green Banarasi woven brocade lehenga skirt with a 4.5m flare, paired with an unstitched brocade blouse fabric and contrast blush pink dupatta.',
    fabric: 'Pure Handloom Woven Banarasi Silk Brocade',
    zariType: 'Heavy Weft Golden Zari',
    careInstructions: 'Dry clean only.',
    occasion: 'Bridal Sangeet & Reception',
    images: [
      '/src/assets/images/clothing_wine_anarkali_1791904274140.jpg'
    ],
    inStock: true,
    stockCount: 3,
    isBestseller: true,
    isFeatured: false,
    isNewArrival: false,
    rating: 5.0,
    reviewsCount: 18,
    availableSizes: ['Semi-Stitched (Fits up to 42 waist)'],
    availableColors: [
      { name: 'Forest Green', hex: '#1B4D3E' }
    ]
  },

  // 5. Girls' Dresses
  {
    id: 'prod-dress-01',
    name: 'Magenta & Mustard Traditional Pattu Pavadai Set',
    sku: 'VVJ-GRL-001',
    category: 'Girls\' Dresses',
    subCategory: 'Pattu Pavadai',
    price: 1899,
    originalPrice: 2499,
    discountPercent: 24,
    description: 'Authentic South Indian pure art silk Pattu Pavadai lehenga set for girls in royal magenta pink with broad gold peacock zari border and a mustard yellow puff-sleeve top.',
    fabric: 'Soft Art Silk with Pure Cotton Inner Lining',
    zariType: 'Woven Temple Peacock Border Zari',
    careInstructions: 'Gentle hand wash in cold water or mild dry clean.',
    occasion: 'Naming Ceremonies, Poojas & Festivals',
    images: [
      '/src/assets/images/dress_pattu_pavadai_1791904274251.jpg'
    ],
    inStock: true,
    stockCount: 8,
    isBestseller: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 41,
    availableSizes: ['1 - 2 Years', '3 - 4 Years', '5 - 6 Years', '7 - 8 Years', '9 - 10 Years'],
    availableColors: [
      { name: 'Magenta & Mustard', hex: '#C2185B' },
      { name: 'Royal Blue & Green', hex: '#1A365D' }
    ]
  },
  {
    id: 'prod-dress-02',
    name: 'Teal & Gold Brocade Festive Ethnic Gown',
    sku: 'VVJ-GRL-002',
    category: 'Girls\' Dresses',
    subCategory: 'Ethnic Gowns',
    price: 1699,
    originalPrice: 2299,
    discountPercent: 26,
    description: 'Festive princess flare ethnic gown for young girls crafted in teal blue Jacquard brocade with golden zari yoke, flared can-can net underlayer, and soft lining.',
    fabric: 'Jacquard Silk Brocade with Cotton Lining',
    zariType: 'Woven Shimmer Zari',
    careInstructions: 'Dry clean recommended.',
    occasion: 'Weddings & Festive Parties',
    images: [
      '/src/assets/images/dress_pattu_pavadai_1791904274251.jpg'
    ],
    inStock: true,
    stockCount: 5,
    isBestseller: false,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.7,
    reviewsCount: 14,
    availableSizes: ['2 - 3 Years', '4 - 5 Years', '6 - 7 Years', '8 - 9 Years'],
    availableColors: [
      { name: 'Teal Blue & Gold', hex: '#0B6477' }
    ]
  },
  {
    id: 'prod-dress-03',
    name: 'Baby Girl Green & Rani Pattu Langa (6M - 2Y)',
    sku: 'VVJ-GRL-003',
    category: 'Girls\' Dresses',
    subCategory: 'Pattu Pavadai',
    price: 1399,
    originalPrice: 1799,
    discountPercent: 22,
    description: 'Specially crafted ultra-soft festive Pattu Langa set for toddlers and infants. Zero scratchy seams, 100% breathable organic cotton lining, and adjustable elastic waistband.',
    fabric: 'Soft Silk with 100% Pure Organic Cotton Soft Lining',
    zariType: 'Soft Woven Zari (Baby Safe)',
    careInstructions: 'Gentle hand wash with baby detergent.',
    occasion: 'Annaprashan, Cradle Ceremony & Poojas',
    images: [
      '/src/assets/images/dress_pattu_pavadai_1791904274251.jpg'
    ],
    inStock: true,
    stockCount: 11,
    isBestseller: true,
    isFeatured: false,
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 27,
    availableSizes: ['6 - 12 Months', '12 - 18 Months', '18 - 24 Months'],
    availableColors: [
      { name: 'Parrot Green & Rani', hex: '#4C9A2A' }
    ]
  }
];

export const CATEGORIES_LIST = [
  {
    name: 'Sarees',
    subtitle: 'Kanjivaram, Banarasi, Chanderi & Soft Silk',
    count: '42+ Designs',
    image: '/src/assets/images/saree_crimson_kanjivaram_1791904272322.jpg',
    tag: 'Handloom Pure'
  },
  {
    name: '1-Gram Gold',
    subtitle: 'Temple Chokers, Harams, Jhumkas & Sets',
    count: '65+ Designs',
    image: '/src/assets/images/jewel_temple_choker_1791904273999.jpg',
    tag: '24K Micro Plated'
  },
  {
    name: 'Women\'s Clothing',
    subtitle: 'Zardozi Anarkalis, Lehengas & Festive Suits',
    count: '38+ Designs',
    image: '/src/assets/images/clothing_wine_anarkali_1791904274140.jpg',
    tag: 'Royal Designer'
  },
  {
    name: 'Girls\' Dresses',
    subtitle: 'Pattu Pavadai, Ethnic Gowns & Frocks',
    count: '24+ Designs',
    image: '/src/assets/images/dress_pattu_pavadai_1791904274251.jpg',
    tag: 'Traditional'
  },
  {
    name: 'Bangles',
    subtitle: 'Temple Kemp, Matte Kada & Velvet Sets',
    count: '50+ Sets',
    image: '/src/assets/images/bangles_kemp_gold_1791904309371.jpg',
    tag: 'Antique Finish'
  }
];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Chandigarh', 'Puducherry'
];
