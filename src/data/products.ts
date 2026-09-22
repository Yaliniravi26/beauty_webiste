import { Product, Category, Testimonial, JournalArticle } from '../types';
import { beautyImages } from './images';

export const PRODUCTS: Product[] = [
  {
    id: 'velvet-glow-serum',
    name: 'Velvet Glow Serum',
    subtitle: 'Triple Hyaluronic & Niacinamide Radiance Elixir',
    category: 'Skincare',
    concern: 'Glow',
    price: 88,
    rating: 4.9,
    reviewsCount: 342,
    description: 'An architectural formulation designed to awaken dormant radiance. Triple-molecular hyaluronic acid delivers deep multi-depth hydration while lipid-soluble vitamin C and golden camellia seed oil leave an ethereal, velvet-soft luminous veil.',
    benefits: [
      'Multi-depth hydration that plumps without weight',
      'Visibly evens tone and refines pores in 7 days',
      'Primes skin with a supple, candlelit glow under makeup',
      'Antioxidant shield against urban stressors'
    ],
    ingredients: 'Camellia Japonica Seed Oil, Squalane, Niacinamide (5%), Triple-Weight Sodium Hyaluronate, Ascorbyl Tetraisopalmitate, Rosa Damascena Flower Water, Centella Asiatica Leaf Extract, Colloidal Gold, Peptides-8.',
    howToUse: 'Warm 3 to 4 drops between the palms. Gently press onto cleansed face, neck, and décolletage morning and evening before creams.',
    volume: '30 ml / 1.0 fl. oz.',
    imageUrl: beautyImages.products.velvetGlowSerum,
    hoverImageUrl: beautyImages.products.velvetGlowSerumAlt,
    isBestseller: true,
    isNew: false,
    notes: ['Velvet finish', 'Fast absorbing', 'Fragrance-free']
  },
  {
    id: 'lumiere-face-cream',
    name: 'Lumière Face Cream',
    subtitle: 'Ceramide Rich Lipid-Restorative Crème',
    category: 'Skincare',
    concern: 'Hydration',
    price: 94,
    rating: 4.8,
    reviewsCount: 218,
    description: 'A sumptuous cashmere-textured cream enriched with biomimetic ceramides, squalane, and white truffle extract. Melts effortlessly into the skin to seal moisture barriers and impart lasting firmness.',
    benefits: [
      'Restores the lipid barrier within 24 hours',
      'Silky, non-greasy cashmere dry-down',
      'Soothes redness and calms environmental irritation',
      'Locks in hydration for up to 48 hours'
    ],
    ingredients: 'Aqua, Shea Butter Ethyl Esters, Squalane, Ceramide NP, Ceramide AP, Phytosphingosine, Tuber Magnatum (White Truffle) Extract, Edelweiss Meristem Cell Culture, Tocopherol, Bisabolol.',
    howToUse: 'Using the golden spatula, smooth a pearl-sized amount over the face and neck using upward sweeping motions.',
    volume: '50 ml / 1.7 oz.',
    imageUrl: beautyImages.products.lumiereFaceCream,
    hoverImageUrl: beautyImages.products.lumiereFaceCreamAlt,
    isBestseller: true,
    isNew: false,
    notes: ['Barrier support', 'Plumping', 'Deep comfort']
  },
  {
    id: 'nude-silk-lip-color',
    name: 'Nude Silk Lip Color',
    subtitle: 'Satin Weightless Couture Lipstick',
    category: 'Lip',
    concern: 'Nourishing',
    price: 44,
    rating: 4.9,
    reviewsCount: 412,
    description: 'Couture color meets treatment serum. Infused with cold-pressed marula oil and hyaluronic spheres, Nude Silk blankets lips in cushiony, satin pigment that never feathers or dries.',
    benefits: [
      'Featherlight satin finish with rich color payoff',
      'Hyaluronic filling spheres visibly plump lip contour',
      'Infused with nourishing marula and jojoba butter',
      'Refillable brushed brass case with magnetic closure'
    ],
    ingredients: 'Ricinus Communis Seed Oil, Octyldodecanol, Cera Microcristallina, Marula Seed Oil, Simmondsia Chinensis Seed Oil, Hyaluronic Spheres, Tocopheryl Acetate, CI 77891, CI 77491, CI 77492.',
    howToUse: 'Glide directly onto lips starting from the cupid’s bow outward. Blot lightly with tissue for a blurred editorial stain.',
    volume: '3.8 g / 0.13 oz.',
    imageUrl: beautyImages.products.nudeSilkLipColor,
    hoverImageUrl: beautyImages.products.nudeSilkLipColorAlt,
    isBestseller: true,
    isNew: true,
    shade: 'Petal 02 — Soft Warm Terracotta',
    notes: ['Satin finish', 'Refillable', 'No feathering']
  },
  {
    id: 'rose-veil-blush',
    name: 'Rose Veil Blush',
    subtitle: 'Baked Silk Radiant Marble Powder',
    category: 'Makeup',
    concern: 'Glow',
    price: 48,
    rating: 4.8,
    reviewsCount: 189,
    description: 'Swirled with micro-milled champagne pearls and dusty rose pigments, this terracotta baked blush creates a lit-from-within flush that blends seamlessly into bare skin or foundation.',
    benefits: [
      'Seamless luminous diffusion with zero powdery kickback',
      'Multi-dimensional marbleized pigments flatter all undertones',
      'Long-wearing botanical pigments resist fading',
      'Infused with organic rosehip seed oil'
    ],
    ingredients: 'Mica, Talc, Rosa Canina (Rosehip) Fruit Oil, Lauroyl Lysine, Dimethicone, Zinc Stearate, Caprylic/Capric Triglyceride, Phenoxyethanol, Iron Oxides (CI 77491, CI 77499), Red 7 Lake.',
    howToUse: 'Sweep onto the high apples of the cheeks and blend upward along the cheekbones with a fluffy powder brush.',
    volume: '8.5 g / 0.3 oz.',
    imageUrl: beautyImages.products.roseVeilBlush,
    hoverImageUrl: beautyImages.products.roseVeilBlushAlt,
    isBestseller: true,
    isNew: false,
    shade: 'Sienne 04 — Warm Rose Champagne',
    notes: ['Micro-milled pearls', 'Buildable color', 'Second-skin texture']
  },
  {
    id: 'midnight-lash-mascara',
    name: 'Midnight Lash Mascara',
    subtitle: 'Tubing Clean Lash Sculptor',
    category: 'Eyes',
    concern: 'Calming',
    price: 38,
    rating: 4.7,
    reviewsCount: 156,
    description: 'A revolutionary conditioning tubing formula with Japanese camellia extract and plant waxes. Wraps each lash in 360-degree polymers that lengthen, lift, and remove effortlessly with warm water.',
    benefits: [
      'Zero smudging, flaking, or raccoon eyes through humidity',
      'Patented micro-comb wand defines even the finest corner lashes',
      'Clean removal with warm water—no tugging or harsh removers',
      'Enriched with panthenol and biotinoyl tripeptide'
    ],
    ingredients: 'Aqua, Acrylates Copolymer, Synthetic Beeswax, Copernicia Cerifera Cera, Stearic Acid, Camellia Japonica Seed Oil, Biotinoyl Tripeptide-1, Panthenol, Iron Oxides (CI 77499).',
    howToUse: 'Wiggle wand at the base of the lash line and sweep upward to the tips. Add a second coat before drying for dramatic editorial fanning.',
    volume: '10 ml / 0.34 fl. oz.',
    imageUrl: beautyImages.products.midnightLashMascara,
    hoverImageUrl: beautyImages.products.midnightLashMascaraAlt,
    isBestseller: true,
    isNew: true,
    shade: 'Obsidian Noir',
    notes: ['Tubing technology', 'Warm water rinse', 'Lash conditioning']
  },
  {
    id: 'soft-bloom-perfume',
    name: 'Soft Bloom Eau de Parfum',
    subtitle: 'Warm Solar Iris, Golden Amber & White Musk Extrait',
    category: 'Fragrance',
    concern: 'Calming',
    price: 135,
    rating: 4.9,
    reviewsCount: 298,
    description: 'An intimate, second-skin fragrance capturing the quiet euphoria of dawn. Velvety Tuscan orris butter blends into sunlit bergamot, creamy sandalwood, and clean white ambergris.',
    benefits: [
      'Long-wearing 24% extrait de parfum concentration',
      'Natural grain alcohol infused with wild-harvested botanicals',
      'Skin-adaptive aroma that creates a bespoke personal trail',
      'Encased in fluted crystal with a hand-polished cap'
    ],
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Alpha-Isomethyl Ionone, Limonene, Linalool, Coumarin, Citronellol, Benzyl Benzoate.',
    howToUse: 'Mist onto pulse points—inside wrists, hollow of the neck, and behind ears. Avoid rubbing wrists together to preserve delicate top notes.',
    volume: '50 ml / 1.7 fl. oz.',
    imageUrl: beautyImages.products.softBloomPerfume,
    hoverImageUrl: beautyImages.products.softBloomPerfumeAlt,
    isBestseller: true,
    isNew: false,
    notes: ['Extrait concentration', 'Solar warmth', 'Skin intimate']
  },
  {
    id: 'botanical-cleansing-elixir',
    name: 'Botanical Cleansing Elixir',
    subtitle: 'Nourishing Melting Oil-to-Milk Cleanser',
    category: 'Skincare',
    concern: 'Calming',
    price: 52,
    rating: 4.8,
    reviewsCount: 145,
    description: 'A transformative golden botanical oil that effortlessly dissolves waterproof makeup, sunscreen, and daily pollutants while calming skin barrier lipid reserves.',
    benefits: [
      'Emulsifies instantly into a light, rinseable milk',
      'Leaves skin conditioned without oily film',
      'Gentle around delicate eye contours',
      'Rich in cold-pressed sweet almond and jojoba lipids'
    ],
    ingredients: 'Caprylic/Capric Triglyceride, Prunus Amygdalus Dulcis Oil, Polyglyceryl-4 Oleate, Simmondsia Chinensis Seed Oil, Chamomilla Recutita Flower Extract, Tocopherol.',
    howToUse: 'Massage 2-3 pumps onto dry skin. Add a splash of warm water to transform into milk, then rinse thoroughly.',
    volume: '150 ml / 5.1 fl. oz.',
    imageUrl: beautyImages.products.botanicalCleanser,
    hoverImageUrl: beautyImages.products.lumiereFaceCream,
    isBestseller: false,
    isNew: false,
    notes: ['Non-stripping', 'Chamomile aroma', 'Melt texture']
  },
  {
    id: 'lumiere-hydrating-essence',
    name: 'Lumière Hydrating Essence',
    subtitle: 'Micro-Electrolyte & Rose Damascena Water',
    category: 'Skincare',
    concern: 'Hydration',
    price: 62,
    rating: 4.9,
    reviewsCount: 178,
    description: 'An ethereal prep mist and splash essence. Drenches cellular pathways in bio-compatible mineral waters and organic rose damascena distillates for lasting cushion.',
    benefits: [
      'Boosts absorption of subsequent serums by 40%',
      'Cools and de-stresses reactive, heated skin',
      'Balancing pH formulation',
      'Delicate, natural floral scent'
    ],
    ingredients: 'Rosa Damascena Flower Water, Glycerin, Sodium Hyaluronate, Magnesium Aspartate, Zinc Gluconate, Copper Gluconate, Phenoxyethanol.',
    howToUse: 'Press into cleansed skin with flat palms morning and night before serum application.',
    volume: '120 ml / 4.0 fl. oz.',
    imageUrl: beautyImages.products.hydratingEssence,
    hoverImageUrl: beautyImages.products.velvetGlowSerum,
    isBestseller: false,
    isNew: true,
    notes: ['pH balanced', 'Rose distillates', 'Rapid hydration']
  },
  {
    id: 'velvet-body-nectar',
    name: 'Velvet Body Nectar',
    subtitle: 'Nourishing Dry Body Oil with Warm Vanilla & Tonka',
    category: 'Body',
    concern: 'Nourishing',
    price: 68,
    rating: 4.9,
    reviewsCount: 167,
    description: 'A decadent dry body treatment that absorbs in seconds, leaving arms, legs, and collarbones bathed in a satin sheen with notes of golden tonka and Madagascar vanilla.',
    benefits: [
      'Instantly hydrates without any greasy after-feel',
      'Primes skin with a radiant, sun-warmed sheen',
      'Enriched with cold-pressed marula, argan, and camellia oils',
      'Subtle long-lasting gourmand fragrance'
    ],
    ingredients: 'Coco-Caprylate/Caprate, Argania Spinosa Kernel Oil, Camellia Oleifera Seed Oil, Sclerocarya Birrea Seed Oil, Parfum (Fragrance), Tocopherol, Helianthus Annuus Seed Oil.',
    howToUse: 'Smooth generously over damp skin immediately following bath or shower to lock in essential hydration.',
    volume: '100 ml / 3.4 fl. oz.',
    imageUrl: beautyImages.products.velvetBodyNectar,
    hoverImageUrl: beautyImages.products.velvetBodyNectarAlt,
    isBestseller: false,
    isNew: false,
    notes: ['Dry oil touch', 'Non-staining', 'Satin glow']
  }
];

/**
 * 10 Specific Categories Requested by User:
 * EYES, BODY CARE, FRAGRANCE, SKINCARE, MAKEUP, LIP, HAIR CARE, ESSENTIALS, TREATMENTS, EXTRACTS
 */
export const CATEGORIES: Category[] = [
  {
    id: 'skincare',
    name: 'SKINCARE',
    tagline: 'Cellular Restoration & Deep Hydration',
    description: 'Transformative serums, restorative creams, and pure botanical balms engineered to nurture skin vitality.',
    imageUrl: beautyImages.skincare,
    count: '08 Formulas'
  },
  {
    id: 'makeup',
    name: 'MAKEUP',
    tagline: 'Luminous Pigments, Weightless Finishes',
    description: 'Breathable, skin-first cosmetics formulated to enhance natural contours rather than mask them.',
    imageUrl: beautyImages.makeup,
    count: '12 Formulations'
  },
  {
    id: 'eyes',
    name: 'EYES',
    tagline: 'Sculptural Precision & Velvet Shadows',
    description: 'Tubing mascaras and micro-milled mineral pigments designed for effortless editorial definition.',
    imageUrl: beautyImages.eyes,
    count: '04 Essentials'
  },
  {
    id: 'lip',
    name: 'LIPS',
    tagline: 'Satin Silk Couture & Barrier Balms',
    description: 'Nutrient-saturated lip pigments and conditioning oils with cushiony, long-wearing comfort.',
    imageUrl: beautyImages.lips,
    count: '06 Shades'
  },
  {
    id: 'body',
    name: 'BODY CARE',
    tagline: 'Silken Dry Oils & Nourishing Soufflés',
    description: 'Sensorial body rituals with body lotion, body oil, cream jars, and soft warm lighting.',
    imageUrl: beautyImages.bodyCare,
    count: '05 Treatments'
  },
  {
    id: 'fragrance',
    name: 'FRAGRANCE',
    tagline: 'Intimate Sillage & Pure Botanical Extractions',
    description: 'Modern artisanal perfumes created with high concentrations of rare florals and comforting woods.',
    imageUrl: beautyImages.fragrance,
    count: '03 Extraits'
  },
  {
    id: 'haircare',
    name: 'HAIR CARE',
    tagline: 'Weightless Lipid Gloss & Botanical Elixirs',
    description: 'Ultra-nourishing scalp drops and glossing serums infused with cold-pressed abyssinian oils.',
    imageUrl: beautyImages.hairCare,
    count: '04 Formulations'
  },
  {
    id: 'essentials',
    name: 'ESSENTIALS',
    tagline: 'The Daily Curated Minimal Capsule',
    description: 'Foundational multi-tasking essentials arranged in a luxury editorial flat-lay.',
    imageUrl: beautyImages.essentials,
    count: '06 Curations'
  },
  {
    id: 'treatments',
    name: 'TREATMENTS',
    tagline: 'Concentrated Actives & Clinical Restoratives',
    description: 'Intensive overnight ampoules and enzyme treatments targeted at cell renewal.',
    imageUrl: beautyImages.treatments,
    count: '05 Solutions'
  },
  {
    id: 'extracts',
    name: 'EXTRACTS',
    tagline: 'Single-Origin Botanical Extractions',
    description: 'Pure bio-fermented flora, squalane derivatives, and cold-pressed botanical lipids.',
    imageUrl: beautyImages.extracts,
    count: '07 Extractions'
  }
];

export const CONCERNS = [
  {
    id: 'HYDRATION',
    title: 'HYDRATION',
    subtitle: 'Replenish deep water reservoirs',
    description: 'Triple-weight hyaluronic acids and biomimetic squalane to quench parched lipid layers.',
    imageUrl: beautyImages.concerns.hydration
  },
  {
    id: 'BRIGHTENING',
    title: 'BRIGHTENING',
    subtitle: 'Even tone & fade stubborn spots',
    description: 'Stable lipid vitamin C and cold-pressed camellia to clarify and restore uniform luminosity.',
    imageUrl: beautyImages.concerns.brightening
  },
  {
    id: 'GLOW',
    title: 'GLOW',
    subtitle: 'Awaken luminous lit-from-within vitality',
    description: 'Light-scattering golden peptides and botanical lipids that impart a candlelit veil.',
    imageUrl: beautyImages.concerns.glow
  },
  {
    id: 'CALMING',
    title: 'CALMING',
    subtitle: 'Soothe redness & reinforce resilience',
    description: 'Centella asiatica, bisabolol, and blue chamomile to quiet environmental flare-ups.',
    imageUrl: beautyImages.concerns.calming
  },
  {
    id: 'NOURISHING',
    title: 'NOURISHING',
    subtitle: 'Restorative barrier lipids & fatty acids',
    description: 'Ceramide NP and rich seed butters that rebuild defensive lipid architecture overnight.',
    imageUrl: beautyImages.concerns.nourishing
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Camille Laurent',
    location: 'Paris, France',
    review: 'The Velvet Glow Serum completely replaced three steps in my morning routine. My skin has that quiet, filterless sheen you only see in film photography.',
    productUsed: 'Velvet Glow Serum',
    rating: 5,
    skinType: 'Combination / Sensitive'
  },
  {
    id: 't-2',
    name: 'Aria Thorne',
    location: 'New York, USA',
    review: 'Lumière Cream has the most luxurious dry-down I have ever experienced. Rich, but never heavy. It leaves you feeling like you just walked out of a private facial.',
    productUsed: 'Lumière Face Cream',
    rating: 5,
    skinType: 'Dry / Dehydrated'
  },
  {
    id: 't-3',
    name: 'Mei Lin Chen',
    location: 'Kyoto, Japan',
    review: 'Nude Silk Lip Color is the first lipstick I have purchased twice in one year. The magnetic weight of the casing and the cushiony pigment are pure perfection.',
    productUsed: 'Nude Silk Lip Color',
    rating: 5,
    skinType: 'All Skin Types'
  },
  {
    id: 't-4',
    name: 'Sienna Sterling',
    location: 'London, UK',
    review: 'Soft Bloom is so intimate and sophisticated. People constantly ask what fragrance I’m wearing without it ever feeling overpowering or synthetic.',
    productUsed: 'Soft Bloom Perfume',
    rating: 5,
    skinType: 'Normal'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'j-1',
    title: 'THE ART OF SKINCARE',
    category: 'Philosophy',
    readTime: '4 Min Read',
    excerpt: 'Why slowing down your evening application alters cellular absorption and invites emotional calm.',
    imageUrl: beautyImages.journal.artOfSkincare,
    date: 'OCTOBER 2026',
    author: 'Elena Vane'
  },
  {
    id: 'j-2',
    title: '5 MINUTE MORNING ROUTINE',
    category: 'Rituals',
    readTime: '3 Min Read',
    excerpt: 'Streamlining your sunrise regimen to three essential steps: cleanse, awaken with lipids, and shield.',
    imageUrl: beautyImages.journal.morningRoutine,
    date: 'SEPTEMBER 2026',
    author: 'Clara Delacroix'
  },
  {
    id: 'j-3',
    title: 'HOW TO BUILD YOUR BEAUTY RITUAL',
    category: 'Guide',
    readTime: '5 Min Read',
    excerpt: 'Listening to seasonal changes in your skin’s barrier before selecting active botanical concentrations.',
    imageUrl: beautyImages.journal.beautyRitual,
    date: 'AUGUST 2026',
    author: 'Dr. Vivienne Moreau'
  },
  {
    id: 'j-4',
    title: 'THE PERFECT NUDE LIP',
    category: 'Editorial',
    readTime: '3 Min Read',
    excerpt: 'Matching undertones to natural lip blush contours rather than skin shade for an effortless look.',
    imageUrl: beautyImages.journal.nudeLip,
    date: 'JULY 2026',
    author: 'Sora Tanaka'
  }
];
