/**
 * Centralized Image Data System for VELORA BEAUTY
 * High-resolution, reliable luxury beauty editorial imagery
 */

// Universal luxury editorial fallback image (candlelit skincare composition on warm ivory stone)
export const FALLBACK_BEAUTY_IMAGE =
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85';

// Secondary guaranteed SVG data URI in case of remote CDN connection disruption
export const INLINE_FALLBACK_SVG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="%23FAF7F2"/><rect x="250" y="320" width="300" height="420" rx="30" fill="%23EADFD3"/><rect x="350" y="240" width="100" height="90" rx="10" fill="%23BFA37C"/><circle cx="400" cy="210" r="36" fill="%232B231F"/><text x="400" y="550" font-family="serif" font-size="28" fill="%232B231F" text-anchor="middle" letter-spacing="4">VELORA</text><text x="400" y="590" font-family="sans-serif" font-size="14" fill="%238D7F77" text-anchor="middle" letter-spacing="3">COUTURE BEAUTY</text></svg>';

/**
 * Handle image load errors gracefully by substituting fallback
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  customFallback?: string
) => {
  const target = e.currentTarget;
  target.onerror = () => {
    // If even the primary fallback fails, switch to the inline SVG
    target.onerror = null;
    target.src = INLINE_FALLBACK_SVG;
  };
  target.src = customFallback || FALLBACK_BEAUTY_IMAGE;
};

/**
 * Curated Category Images (10 Categories requested by user)
 */
export const beautyImages = {
  // Hero editorial composition (serum bottle, cream jar, lipstick, perfume, brush)
  hero: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=90',
  heroFallback: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=90',

  // 10 Distinct Categories
  skincare: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
  makeup: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
  eyes: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85',
  lips: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=85',
  // Specific requirement for BODY CARE: body lotion, body oil, cream jar, soft beige towel, botanical leaves, warm natural lighting
  bodyCare: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
  fragrance: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
  hairCare: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85',
  essentials: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=85',
  treatments: 'https://images.unsplash.com/photo-1556228722-d0b5de7ed165?auto=format&fit=crop&w=1200&q=85',
  extracts: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=85',

  // Core Signature Products
  products: {
    velvetGlowSerum: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
    velvetGlowSerumAlt: 'https://images.unsplash.com/photo-1608248597359-052445b2e2d0?auto=format&fit=crop&w=1200&q=85',
    lumiereFaceCream: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
    lumiereFaceCreamAlt: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=85',
    nudeSilkLipColor: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=85',
    nudeSilkLipColorAlt: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=1200&q=85',
    roseVeilBlush: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85',
    roseVeilBlushAlt: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85',
    midnightLashMascara: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85',
    midnightLashMascaraAlt: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85',
    softBloomPerfume: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
    softBloomPerfumeAlt: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
    botanicalCleanser: 'https://images.unsplash.com/photo-1556228722-d0b5de7ed165?auto=format&fit=crop&w=1200&q=85',
    hydratingEssence: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
    velvetBodyNectar: 'https://images.unsplash.com/photo-1608248597359-052445b2e2d0?auto=format&fit=crop&w=1200&q=85',
    velvetBodyNectarAlt: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
  },

  // Concerns
  concerns: {
    hydration: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
    brightening: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
    glow: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85',
    calming: 'https://images.unsplash.com/photo-1556228722-d0b5de7ed165?auto=format&fit=crop&w=800&q=85',
    nourishing: 'https://images.unsplash.com/photo-1608248597359-052445b2e2d0?auto=format&fit=crop&w=800&q=85',
  },

  // Ritual steps
  rituals: {
    step1: 'https://images.unsplash.com/photo-1556228722-d0b5de7ed165?auto=format&fit=crop&w=1200&q=85',
    step2: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
    step3: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
    step4: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=85',
  },

  // Editorial Journal
  journal: {
    artOfSkincare: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
    morningRoutine: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
    beautyRitual: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85',
    nudeLip: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85',
  },

  // Brand Story Sanctuary
  brandStory: {
    main: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
    secondary: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
  },
};
