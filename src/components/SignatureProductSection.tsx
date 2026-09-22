import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Product } from '../types';
import { Droplets, Sparkles, Feather, ShoppingBag, Eye, Check } from 'lucide-react';
import { handleImageError, beautyImages } from '../data/images';

interface SignatureProductSectionProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export default function SignatureProductSection({
  product,
  onAddToCart,
  onQuickView
}: SignatureProductSectionProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = useState<number>(0);
  const [added, setAdded] = useState(false);
  const [webGLError, setWebGLError] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = container.clientWidth || 420;
    let height = container.clientHeight || 520;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number;
    let resizeObserver: ResizeObserver | null = null;

    try {
      // 1. Scene
      const scene = new THREE.Scene();

      // 2. Camera with cinematic focal length
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0.4, 7.8);

      // 3. Renderer with ACES Tone Mapping & high-performance WebGL
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // ==========================================
      // ROOT DISPLAY GROUP
      // ==========================================
      const displayGroup = new THREE.Group();
      scene.add(displayGroup);

      // Product Bottle Group (rotates on drag & subtle floating levitation)
      const bottleGroup = new THREE.Group();
      bottleGroup.position.set(0, 0.1, 0);
      displayGroup.add(bottleGroup);

      // ==========================================
      // 1. REALISTIC PHYSICAL LABEL TEXTURE (Canvas)
      // ==========================================
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 1024;
      labelCanvas.height = 1024;
      const ctx = labelCanvas.getContext('2d');

      if (ctx) {
        // Luxury matte warm-cream paper background
        ctx.fillStyle = '#FAF7F0';
        ctx.fillRect(0, 0, 1024, 1024);

        // Delicate inner gold border framing
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 4;
        ctx.strokeRect(36, 36, 952, 952);

        ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(46, 46, 932, 932);

        // Subtle geometric top emblem
        ctx.strokeStyle = '#C5A880';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(512, 95);
        ctx.lineTo(528, 115);
        ctx.lineTo(512, 135);
        ctx.lineTo(496, 115);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = '#D4AF37';
        ctx.beginPath();
        ctx.arc(512, 115, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Brand Name
        ctx.textAlign = 'center';
        ctx.fillStyle = '#1D1614';
        ctx.font = '600 68px "Cormorant Garamond", Georgia, serif';
        ctx.letterSpacing = '18px';
        ctx.fillText('VELORA', 512, 230);

        // Sub-brand / Line
        ctx.fillStyle = '#4A3B32';
        ctx.font = '400 36px "Italiana", serif';
        ctx.letterSpacing = '10px';
        ctx.fillText('GLOW SERUM', 512, 290);

        // Thin divider
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(340, 340);
        ctx.lineTo(684, 340);
        ctx.stroke();

        // Key Actives Section
        ctx.fillStyle = '#221915';
        ctx.font = '600 34px "Plus Jakarta Sans", -apple-system, sans-serif';
        ctx.letterSpacing = '5px';
        ctx.fillText('HYALURONIC ACID', 512, 430);

        ctx.fillStyle = '#B38B4D';
        ctx.font = '500 28px "Plus Jakarta Sans", sans-serif';
        ctx.letterSpacing = '4px';
        ctx.fillText('+ CAMELLIA SEED OIL', 512, 485);

        // Secondary Actives Divider
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(400, 535);
        ctx.lineTo(624, 535);
        ctx.stroke();

        // Benefit Claim
        ctx.fillStyle = '#5A4A3E';
        ctx.font = '500 24px "Plus Jakarta Sans", -apple-system, sans-serif';
        ctx.letterSpacing = '5px';
        ctx.fillText('DEEP HYDRATION • RADIANT SKIN', 512, 600);

        ctx.fillStyle = '#7A685B';
        ctx.font = 'italic 26px "Cormorant Garamond", serif';
        ctx.letterSpacing = '2px';
        ctx.fillText('Cellular Radiance & Barrier Support', 512, 650);

        // Micro seal
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(512, 750, 42, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#D4AF37';
        ctx.font = '600 15px "Plus Jakarta Sans", monospace';
        ctx.letterSpacing = '3px';
        ctx.fillText('BIO-LIPID', 512, 745);
        ctx.fillText('COMPLEX', 512, 765);

        // Bottom Volume & Origin
        ctx.fillStyle = '#261C18';
        ctx.font = '600 26px "Plus Jakarta Sans", monospace';
        ctx.letterSpacing = '4px';
        ctx.fillText('30 ml / 1.0 FL.OZ.', 512, 860);

        ctx.fillStyle = '#8C7768';
        ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
        ctx.letterSpacing = '5px';
        ctx.fillText('PARIS • GENÈVE', 512, 905);
      }

      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      labelTexture.colorSpace = THREE.SRGBColorSpace;
      labelTexture.anisotropy = 8;

      // ==========================================
      // 2. LUXURY BOTTLE MESHES
      // ==========================================

      // A. Outer Translucent Frosted Glass Cylinder
      const glassGeo = new THREE.CylinderGeometry(1.08, 1.08, 3.2, 64, 1, false);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xFCF8F2,
        transmission: 0.88,
        opacity: 0.92,
        transparent: true,
        roughness: 0.12,
        ior: 1.52,
        thickness: 0.95,
        reflectivity: 0.96,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      bottleGroup.add(glassMesh);

      // B. Glass Base Bottom Bevel Ring
      const baseRingGeo = new THREE.TorusGeometry(0.96, 0.12, 24, 64);
      baseRingGeo.rotateX(Math.PI / 2);
      baseRingGeo.translate(0, -1.55, 0);
      const baseRingMesh = new THREE.Mesh(baseRingGeo, glassMat);
      bottleGroup.add(baseRingMesh);

      // C. Inner Amber-Golden Serum Fluid
      const fluidGeo = new THREE.CylinderGeometry(0.96, 0.96, 2.75, 48);
      const fluidMat = new THREE.MeshPhysicalMaterial({
        color: 0xDFA253,
        roughness: 0.15,
        metalness: 0.05,
        transmission: 0.55,
        opacity: 0.92,
        transparent: true,
        ior: 1.38,
        clearcoat: 0.8,
      });
      const fluidMesh = new THREE.Mesh(fluidGeo, fluidMat);
      fluidMesh.position.y = -0.2;
      bottleGroup.add(fluidMesh);

      // D. Realistic Glass Dropper Pipette Tube inside the liquid
      const tubeGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.8, 16);
      const tubeMat = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        transmission: 0.9,
        transparent: true,
        roughness: 0.05,
        ior: 1.5,
        thickness: 0.2
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubeMesh.position.y = 0.2;
      bottleGroup.add(tubeMesh);

      // E. Physical Curvature Label Mesh (wrapped cleanly on bottle surface)
      const labelGeometry = new THREE.CylinderGeometry(
        1.092,
        1.092,
        1.75,
        64,
        1,
        true,
        -Math.PI * 0.38,
        Math.PI * 0.76
      );
      const labelMaterial = new THREE.MeshStandardMaterial({
        map: labelTexture,
        transparent: true,
        roughness: 0.42,
        metalness: 0.08,
        bumpScale: 0.02,
        side: THREE.DoubleSide
      });
      const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
      labelMesh.position.y = -0.22;
      bottleGroup.add(labelMesh);

      // F. Champagne Gold Metallic Collar Ring
      const collarGeo = new THREE.CylinderGeometry(0.72, 1.02, 0.46, 48);
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xE6C785,
        metalness: 0.88,
        roughness: 0.22,
      });
      const collarMesh = new THREE.Mesh(collarGeo, goldMat);
      collarMesh.position.y = 1.8;
      bottleGroup.add(collarMesh);

      // Collar Accent Rings (Precision CNC detail)
      const ringGeo1 = new THREE.TorusGeometry(0.74, 0.035, 16, 48);
      ringGeo1.rotateX(Math.PI / 2);
      ringGeo1.translate(0, 1.95, 0);
      const ring1 = new THREE.Mesh(ringGeo1, goldMat);
      bottleGroup.add(ring1);

      const ringGeo2 = new THREE.TorusGeometry(0.88, 0.035, 16, 48);
      ringGeo2.rotateX(Math.PI / 2);
      ringGeo2.translate(0, 1.62, 0);
      const ring2 = new THREE.Mesh(ringGeo2, goldMat);
      bottleGroup.add(ring2);

      // G. Cream-Colored Velvet Dropper Bulb / Cap
      const bulbGeo = new THREE.SphereGeometry(0.48, 36, 28);
      bulbGeo.scale(1, 1.45, 1);
      const bulbMat = new THREE.MeshStandardMaterial({
        color: 0xFAF7F2,
        roughness: 0.75,
        metalness: 0.04,
      });
      const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
      bulbMesh.position.y = 2.45;
      bottleGroup.add(bulbMesh);

      // ==========================================
      // 3. DECORATIVE BEAUTY ELEMENTS
      // White Camellia flower, resting petals, glossy leaves & podium
      // ==========================================

      // A. Dark Luxury Circular Podium
      const podiumGeo = new THREE.CylinderGeometry(2.7, 2.85, 0.22, 64);
      const podiumMat = new THREE.MeshStandardMaterial({
        color: 0x1A1310,
        roughness: 0.25,
        metalness: 0.65,
      });
      const podiumMesh = new THREE.Mesh(podiumGeo, podiumMat);
      podiumMesh.position.set(0, -1.72, 0);
      podiumMesh.receiveShadow = true;
      displayGroup.add(podiumMesh);

      // Podium Champagne Gold Rim
      const rimRingGeo = new THREE.TorusGeometry(2.72, 0.03, 16, 64);
      rimRingGeo.rotateX(Math.PI / 2);
      rimRingGeo.translate(0, -1.61, 0);
      const rimRing = new THREE.Mesh(rimRingGeo, goldMat);
      displayGroup.add(rimRing);

      // Contact Shadow Plane
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = 256;
      shadowCanvas.height = 256;
      const sCtx = shadowCanvas.getContext('2d');
      if (sCtx) {
        const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
        grad.addColorStop(0.45, 'rgba(0, 0, 0, 0.35)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, 256, 256);
      }
      const shadowTex = new THREE.CanvasTexture(shadowCanvas);
      const shadowPlaneGeo = new THREE.PlaneGeometry(3.6, 3.6);
      shadowPlaneGeo.rotateX(-Math.PI / 2);
      const shadowPlaneMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      });
      const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
      shadowMesh.position.set(0, -1.59, 0);
      displayGroup.add(shadowMesh);

      // B. Sculpted White Camellia Flower
      const camelliaGroup = new THREE.Group();
      camelliaGroup.position.set(-1.45, -1.48, 0.85);
      camelliaGroup.rotation.set(-0.35, 0.45, -0.2);
      camelliaGroup.scale.set(0.68, 0.68, 0.68);
      displayGroup.add(camelliaGroup);

      const petalMat = new THREE.MeshStandardMaterial({
        color: 0xFAF7F2,
        roughness: 0.45,
        metalness: 0.05,
        side: THREE.DoubleSide,
      });

      // Petal creation helper
      const createPetal = (w: number, h: number, curve: number) => {
        const petalShape = new THREE.Shape();
        petalShape.moveTo(0, 0);
        petalShape.bezierCurveTo(-w * 0.7, h * 0.3, -w * 0.8, h * 0.8, 0, h);
        petalShape.bezierCurveTo(w * 0.8, h * 0.8, w * 0.7, h * 0.3, 0, 0);
        const geo = new THREE.ShapeGeometry(petalShape, 16);
        // Add curvature to vertices
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const y = pos.getY(i);
          const factor = (y / h);
          pos.setZ(i, Math.sin(factor * Math.PI) * curve);
        }
        geo.computeVertexNormals();
        return geo;
      };

      // Outer petals ring
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2;
        const petalGeo = createPetal(0.48, 0.75, 0.16);
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.rotation.z = angle;
        petal.rotation.x = 0.85;
        petal.position.x = Math.sin(angle) * 0.12;
        petal.position.y = Math.cos(angle) * 0.12;
        camelliaGroup.add(petal);
      }

      // Middle petals ring
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + 0.35;
        const petalGeo = createPetal(0.42, 0.62, 0.18);
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.rotation.z = angle;
        petal.rotation.x = 0.65;
        petal.position.z = 0.08;
        camelliaGroup.add(petal);
      }

      // Inner cupped petals ring
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + 0.65;
        const petalGeo = createPetal(0.32, 0.48, 0.18);
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.rotation.z = angle;
        petal.rotation.x = 0.45;
        petal.position.z = 0.14;
        camelliaGroup.add(petal);
      }

      // Golden Stamen center
      const stamenMat = new THREE.MeshStandardMaterial({
        color: 0xE5B84B,
        roughness: 0.3,
        metalness: 0.6,
      });
      for (let i = 0; i < 14; i++) {
        const sGeo = new THREE.SphereGeometry(0.032, 8, 8);
        const stamen = new THREE.Mesh(sGeo, stamenMat);
        const r = 0.08 * Math.random();
        const th = Math.random() * Math.PI * 2;
        stamen.position.set(Math.cos(th) * r, Math.sin(th) * r, 0.22 + Math.random() * 0.04);
        camelliaGroup.add(stamen);
      }

      // C. Glossy Botanical Camellia Leaves
      const leafMat = new THREE.MeshStandardMaterial({
        color: 0x2A3E26,
        roughness: 0.28,
        metalness: 0.12,
        side: THREE.DoubleSide
      });

      const leafGeo1 = createPetal(0.55, 1.05, 0.12);
      const leaf1 = new THREE.Mesh(leafGeo1, leafMat);
      leaf1.position.set(-1.85, -1.6, 0.55);
      leaf1.rotation.set(-1.2, 0.3, -1.9);
      leaf1.scale.set(0.7, 0.7, 0.7);
      displayGroup.add(leaf1);

      const leafGeo2 = createPetal(0.48, 0.95, 0.1);
      const leaf2 = new THREE.Mesh(leafGeo2, leafMat);
      leaf2.position.set(-1.1, -1.62, 1.45);
      leaf2.rotation.set(-1.3, -0.4, -0.8);
      leaf2.scale.set(0.65, 0.65, 0.65);
      displayGroup.add(leaf2);

      // D. Delicate Loose Petals on Floor
      const loosePetalGeo1 = createPetal(0.44, 0.65, 0.14);
      const loosePetal1 = new THREE.Mesh(loosePetalGeo1, petalMat);
      loosePetal1.position.set(1.4, -1.6, 0.6);
      loosePetal1.rotation.set(-Math.PI / 2 + 0.15, 0.2, 0.8);
      loosePetal1.scale.set(0.65, 0.65, 0.65);
      displayGroup.add(loosePetal1);

      const loosePetalGeo2 = createPetal(0.38, 0.55, 0.12);
      const loosePetal2 = new THREE.Mesh(loosePetalGeo2, petalMat);
      loosePetal2.position.set(1.1, -1.61, 1.1);
      loosePetal2.rotation.set(-Math.PI / 2 + 0.1, -0.3, 2.1);
      loosePetal2.scale.set(0.55, 0.55, 0.55);
      displayGroup.add(loosePetal2);

      // ==========================================
      // 4. FLOATING PARTICLES & LUMINOUS RIBBON
      // ==========================================

      // Subtle Golden Ambient Floating Bokeh Particles
      const particlesCount = 28;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 6;
        particlePositions[i + 1] = (Math.random() - 0.4) * 5;
        particlePositions[i + 2] = (Math.random() - 0.5) * 4;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xE6C892,
        size: 0.05,
        transparent: true,
        opacity: 0.55,
      });
      const particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      // Curved Golden Ribbon of Light (CatmullRom Curve)
      const ribbonCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.6, -1.5, 0.8),
        new THREE.Vector3(-1.4, -0.6, -0.8),
        new THREE.Vector3(0.1, 0.2, -1.4),
        new THREE.Vector3(1.5, 0.8, -0.4),
        new THREE.Vector3(1.3, 1.8, 0.6),
        new THREE.Vector3(0.0, 2.6, 1.1),
      ]);
      const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 48, 0.022, 12, false);
      const ribbonMat = new THREE.MeshBasicMaterial({
        color: 0xFDE3AA,
        transparent: true,
        opacity: 0.45,
      });
      const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
      displayGroup.add(ribbonMesh);

      // ==========================================
      // 5. CINEMATIC STUDIO LIGHTING
      // ==========================================

      // Ambient warm fill
      const ambientLight = new THREE.AmbientLight(0x281B15, 2.2);
      scene.add(ambientLight);

      // Studio Key Light (Top-Right Front)
      const keyLight = new THREE.DirectionalLight(0xFFF0DD, 3.4);
      keyLight.position.set(4, 5, 5);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      scene.add(keyLight);

      // Warm Golden Rim Light (Rear-Left) - creates the gorgeous glowing glass contour
      const rimLight = new THREE.DirectionalLight(0xE0AC63, 4.8);
      rimLight.position.set(-4.5, 3.2, -4);
      scene.add(rimLight);

      // Front Soft Specular Fill
      const fillLight = new THREE.PointLight(0xFCE8D0, 1.8, 12);
      fillLight.position.set(0, -0.5, 3.5);
      scene.add(fillLight);

      // Floor Reflection Accent Light
      const floorLight = new THREE.PointLight(0xD8A86C, 2.0, 8);
      floorLight.position.set(-1.2, -1.2, 1.5);
      scene.add(floorLight);

      // ==========================================
      // 6. INTERACTION (DRAG & PARALLAX)
      // ==========================================
      let isDragging = false;
      let previousMouseX = 0;
      let previousMouseY = 0;
      let targetRotationY = 0;
      let targetRotationX = 0;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) {
          const rect = container.getBoundingClientRect();
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;
          targetRotationY = normX * 0.7;
          targetRotationX = normY * 0.3;
          return;
        }
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        bottleGroup.rotation.y += deltaX * 0.012;
        bottleGroup.rotation.x = Math.max(-0.25, Math.min(0.25, bottleGroup.rotation.x + deltaY * 0.008));
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      // Touch handlers for mobile
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          isDragging = true;
          previousMouseX = e.touches[0].clientX;
          previousMouseY = e.touches[0].clientY;
        }
      };

      const onTouchMove = (e: TouchEvent) => {
        if (isDragging && e.touches.length === 1) {
          const deltaX = e.touches[0].clientX - previousMouseX;
          const deltaY = e.touches[0].clientY - previousMouseY;
          bottleGroup.rotation.y += deltaX * 0.012;
          bottleGroup.rotation.x = Math.max(-0.25, Math.min(0.25, bottleGroup.rotation.x + deltaY * 0.008));
          previousMouseX = e.touches[0].clientX;
          previousMouseY = e.touches[0].clientY;
        }
      };

      const onTouchEnd = () => {
        isDragging = false;
      };

      container.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      container.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);

      // ==========================================
      // 7. RESIZE OBSERVER (NO RELOAD, NO FREEZE)
      // ==========================================
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: w, height: h } = entry.contentRect;
          if (w > 0 && h > 0 && renderer && camera) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
          }
        }
      });
      resizeObserver.observe(container);

      // ==========================================
      // 8. ANIMATION LOOP
      // ==========================================
      const clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Subtle floating levitation
        bottleGroup.position.y = 0.1 + Math.sin(elapsed * 1.35) * 0.08;

        // Subtle idle rotation when not dragging
        if (!isDragging) {
          bottleGroup.rotation.y += (targetRotationY - bottleGroup.rotation.y) * 0.05 + 0.0035;
          bottleGroup.rotation.x += (targetRotationX - bottleGroup.rotation.x) * 0.05;
        }

        // Shimmering ribbon & particles
        ribbonMesh.rotation.y = elapsed * 0.05;
        particleSystem.rotation.y = elapsed * 0.02;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animId);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        container.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);

        if (renderer && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to editorial imagery:', err);
      setWebGLError(true);
    }
  }, []);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section
      id="signature-glow"
      className="py-24 md:py-36 bg-[#120D0B] text-[#FAF7F2] relative overflow-hidden border-t border-[#2A1D18]"
    >
      {/* Cinematic Radial Spotlight Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,_rgba(95,64,43,0.38)_0%,_rgba(35,22,17,0.72)_52%,_rgba(15,10,8,0.98)_100%)] pointer-events-none" />

      {/* Atmospheric Gold Light Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-radial from-[#C5A880]/14 via-[#D4AF37]/5 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span>THE ARCHITECTURAL HERO</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#FAF7F2] tracking-tight font-normal">
            VELORA GLOW SERUM
          </h2>
          <p className="text-sm sm:text-base text-[#C2B4AA] font-sans font-light">
            Formulated with triple-molecular hyaluronic acid and golden camellia seed lipid reserves.
          </p>
        </div>

        {/* 3D Product Campaign Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Information Cards */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            
            {/* Card 01 — HYDRATION */}
            <div
              id="glow-point-01"
              onMouseEnter={() => setActivePoint(0)}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activePoint === 0
                  ? 'bg-[#221815] border-[#C5A880]/80 shadow-[0_16px_36px_rgba(0,0,0,0.5)]'
                  : 'bg-[#18110E]/80 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#C5A880] mb-2.5">
                <span>01 — HYDRATION</span>
                <Droplets className="w-4 h-4 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-2xl text-[#FAF7F2] font-medium tracking-wide">
                DEEP HYDRATION
              </h3>
              <p className="text-xs text-[#BFAFA5] mt-2 font-sans leading-relaxed">
                “Triple-molecular hyaluronic acid locks in moisture for softer, healthier-looking skin.”
              </p>
            </div>

            {/* Card 02 — GLOW */}
            <div
              id="glow-point-02"
              onMouseEnter={() => setActivePoint(1)}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activePoint === 1
                  ? 'bg-[#221815] border-[#C5A880]/80 shadow-[0_16px_36px_rgba(0,0,0,0.5)]'
                  : 'bg-[#18110E]/80 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#C5A880] mb-2.5">
                <span>02 — GLOW</span>
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-2xl text-[#FAF7F2] font-medium tracking-wide">
                NATURAL RADIANCE
              </h3>
              <p className="text-xs text-[#BFAFA5] mt-2 font-sans leading-relaxed">
                “Golden camellia seed oil helps reveal a healthy, luminous glow.”
              </p>
            </div>

          </div>

          {/* CENTER: 3D Interactive Bottle Ad Stage */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
            {webGLError ? (
              <div className="w-full max-w-[440px] aspect-[4/5] rounded-[28px] overflow-hidden border border-[#312520] relative shadow-2xl">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover block filter brightness-95"
                  onError={(e) => handleImageError(e, beautyImages.products.velvetGlowSerum)}
                />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-dark text-[10px] font-mono tracking-widest text-[#FAF7F2] uppercase whitespace-nowrap">
                  HAUTE COUTURE SERUM
                </div>
              </div>
            ) : (
              <div
                ref={mountRef}
                className="w-full max-w-[480px] h-[480px] sm:h-[540px] cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none"
              >
                {/* 360 Badge Plaque */}
                <div className="absolute bottom-2 px-3.5 py-1.5 rounded-full glass-dark text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase pointer-events-none flex items-center space-x-1.5 border border-[#C5A880]/30 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span>360° INTERACTIVE 3D CAMPAIGN</span>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <button
                id="signature-add-btn"
                onClick={handleAdd}
                className="px-8 py-3.5 bg-[#C5A880] text-[#181311] hover:bg-[#DBC19D] font-mono text-xs uppercase tracking-[0.24em] font-semibold transition-all duration-300 shadow-lg flex items-center space-x-2 cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-[#181311]" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#181311]" />
                    <span>CLAIM YOUR GLOW — ${product.price}</span>
                  </>
                )}
              </button>

              <button
                id="signature-details-btn"
                onClick={() => onQuickView(product)}
                className="px-6 py-3.5 border border-white/20 text-[#FAF7F2] hover:bg-white/10 text-xs font-mono uppercase tracking-[0.2em] transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>SPECIFICATIONS</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Information Card & Clinical Study */}
          <div className="lg:col-span-3 space-y-6 order-3">
            
            {/* Card 03 — FORMULATION */}
            <div
              id="glow-point-03"
              onMouseEnter={() => setActivePoint(2)}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activePoint === 2
                  ? 'bg-[#221815] border-[#C5A880]/80 shadow-[0_16px_36px_rgba(0,0,0,0.5)]'
                  : 'bg-[#18110E]/80 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#C5A880] mb-2.5">
                <span>03 — FORMULATION</span>
                <Feather className="w-4 h-4 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-2xl text-[#FAF7F2] font-medium tracking-wide">
                LIGHTWEIGHT
              </h3>
              <p className="text-xs text-[#BFAFA5] mt-2 font-sans leading-relaxed">
                “Silky texture designed for everyday use.”
              </p>
            </div>

            {/* CLINICAL STUDY Badge */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#1A120F]/90 border border-[#C5A880]/30 space-y-2.5 shadow-lg">
              <div className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] font-semibold flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>CLINICAL STUDY</span>
              </div>
              <div className="font-serif text-2xl text-white font-normal leading-snug">
                98% Noticed Increased Luminosity
              </div>
              <p className="text-xs text-[#A8988C] font-sans leading-relaxed">
                Independent blind test across 120 women over 28 days.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
