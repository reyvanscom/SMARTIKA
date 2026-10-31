import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Flag, Gauge, Zap, Camera, ChevronDown, ChevronUp, Flame, Sparkles } from 'lucide-react';

export interface RobotRaceArena3DProps {
  blueName: string;
  redName: string;
  /** Progress from 0 to 100 (100 = Garis Finish) */
  blueProgress: number;
  redProgress: number;
  blueHp: number;
  redHp: number;
  activeTurn: 'blue' | 'red' | 'both';
  raceEvent: {
    id: number;
    type: 'blue-boost' | 'red-boost' | 'both-boost';
  } | null;
}

const _camTargetPos = new THREE.Vector3();
const _camTargetLook = new THREE.Vector3();
const _camCurrentLook = new THREE.Vector3(0, 1.3, 8);

interface FuturisticMoto3D {
  root: THREE.Group;
  leanGroup: THREE.Group;
  chassis: THREE.Group;
  riderHead: THREE.Group;
  frontFork: THREE.Group;
  wheelMeshes: THREE.Object3D[];
  nitroFlames: THREE.Group;
  plasmaCore: THREE.Mesh;
  laneX: number;
  currentZ: number;
  spunOut: boolean;
}

interface RaceDebris {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  rotVel: THREE.Vector3;
  active: boolean;
}

interface RaceParticle {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
}

function createTrackTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  // Smooth Cyber Grand Prix Dark Asphalt
  ctx.fillStyle = '#090f1e';
  ctx.fillRect(0, 0, 512, 2048);

  // Subtle Cyber Hex/Grid Lines on Asphalt
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
  ctx.lineWidth = 2;
  for (let y = 0; y < 2048; y += 64) {
    ctx.beginPath();
    ctx.moveTo(36, y);
    ctx.lineTo(476, y);
    ctx.stroke();
  }

  // Red & Cyan Neon Racing Kerbs on Left and Right Edges
  const kerbHeight = 48;
  for (let y = 0; y < 2048; y += kerbHeight) {
    const isEven = Math.floor(y / kerbHeight) % 2 === 0;
    ctx.fillStyle = isEven ? '#0ea5e9' : '#f8fafc';
    ctx.fillRect(0, y, 26, kerbHeight);
    ctx.fillStyle = isEven ? '#f43f5e' : '#f8fafc';
    ctx.fillRect(486, y, 26, kerbHeight);
  }

  // Neon Lane Side Lines
  ctx.fillStyle = '#00f5ff';
  ctx.fillRect(30, 0, 6, 2048);
  ctx.fillStyle = '#ff2a85';
  ctx.fillRect(476, 0, 6, 2048);

  // Center Dashed Cyber Divider
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 8;
  ctx.setLineDash([44, 32]);
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 2048);
  ctx.stroke();
  ctx.setLineDash([]);

  // Glowing Boost Pad Chevrons on Left & Right Lanes
  for (let y = 120; y < 2000; y += 256) {
    [140, 372].forEach((lx, idx) => {
      ctx.strokeStyle = idx === 0 ? 'rgba(0, 245, 255, 0.65)' : 'rgba(255, 42, 133, 0.65)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(lx - 48, y + 34);
      ctx.lineTo(lx, y);
      ctx.lineTo(lx + 48, y + 34);
      ctx.stroke();
    });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 2);
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createFinishBannerTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1024, 256);

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#facc15' : '#1e293b';
      ctx.fillRect(c * 48, r * 64, 48, 64);
      ctx.fillRect(1024 - (c + 1) * 48, r * 64, 48, 64);
    }
  }

  ctx.strokeStyle = '#00f5ff';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 1016, 248);

  ctx.fillStyle = '#facc15';
  ctx.font = '900 66px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🏁 GARIS FINISH 🏁', 512, 102);

  ctx.fillStyle = '#00f5ff';
  ctx.font = '800 31px sans-serif';
  ctx.fillText('SIRKUIT BALAP MOTOR FUTURISTIK 3D · INFORMATIKA', 512, 192);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/**
 * Builds a Sleek Futuristic 3D Cyber-Moto Superbike (Tron Lightcycle + MotoGP Prototype)
 * Faces -Z (toward the Finish Line)
 */
function buildFuturisticCyberMoto3D(
  theme: 'blue' | 'red',
  laneX: number,
  startZ: number
): FuturisticMoto3D {
  const root = new THREE.Group();
  root.position.set(laneX, 0, startZ);

  const leanGroup = new THREE.Group();
  root.add(leanGroup);

  const bodyHex = theme === 'blue' ? 0x0284c7 : 0xe11d48;
  const neonHex = theme === 'blue' ? 0x00f5ff : 0xffbe0b;
  const secondaryNeonHex = theme === 'blue' ? 0x38bdf8 : 0xff2a85;
  const trimHex = theme === 'blue' ? 0xe0f2fe : 0xffe4e6;

  const fairingPaintMat = new THREE.MeshPhysicalMaterial({
    color: bodyHex,
    metalness: 0.65,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06
  });
  const carbonFrameMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.85,
    roughness: 0.35
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.95,
    roughness: 0.1
  });
  const tireRubberMat = new THREE.MeshStandardMaterial({
    color: 0x090d16,
    metalness: 0.25,
    roughness: 0.75
  });
  const neonGlowMat = new THREE.MeshStandardMaterial({
    color: neonHex,
    emissive: neonHex,
    emissiveIntensity: 2.6,
    roughness: 0.15
  });
  const plasmaGlowMat = new THREE.MeshStandardMaterial({
    color: secondaryNeonHex,
    emissive: secondaryNeonHex,
    emissiveIntensity: 2.2,
    roughness: 0.2
  });
  const visorMat = new THREE.MeshPhysicalMaterial({
    color: 0x020617,
    metalness: 0.2,
    roughness: 0.05,
    clearcoat: 1.0,
    transparent: true,
    opacity: 0.9
  });
  const suitMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.4,
    roughness: 0.45
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: trimHex,
    metalness: 0.5,
    roughness: 0.25
  });

  // Main Chassis Group (pivots on rear axle for awesome Wheelies!)
  const chassis = new THREE.Group();
  chassis.position.set(0, 0.48, 0);
  leanGroup.add(chassis);

  const wheelMeshes: THREE.Object3D[] = [];

  // Helper to build a Futuristic Hubless Cyber Motorcycle Wheel with Neon Rims & Blades
  const createCyberWheel = (radius: number, tireWidth: number) => {
    const wheelGroup = new THREE.Group();

    // Slick Racing Tire
    const tireGeo = new THREE.CylinderGeometry(radius, radius, tireWidth, 28);
    tireGeo.rotateZ(Math.PI / 2);
    const tireMesh = new THREE.Mesh(tireGeo, tireRubberMat);
    tireMesh.castShadow = true;
    wheelGroup.add(tireMesh);

    // Dual Glowing Neon Sidewall Rings (Tron Lightcycle aesthetic)
    [-tireWidth * 0.51, tireWidth * 0.51].forEach((sideX) => {
      const ringGeo = new THREE.RingGeometry(radius * 0.56, radius * 0.78, 28);
      ringGeo.rotateY(sideX > 0 ? Math.PI / 2 : -Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, neonGlowMat);
      ringMesh.position.x = sideX;
      wheelGroup.add(ringMesh);
    });

    // Inner Metallic Cyber Hub & Turbine Spokes (makes rotation super visible)
    const hubGeo = new THREE.CylinderGeometry(radius * 0.32, radius * 0.32, tireWidth * 1.06, 16);
    hubGeo.rotateZ(Math.PI / 2);
    const hubMesh = new THREE.Mesh(hubGeo, chromeMat);
    wheelGroup.add(hubMesh);

    for (let i = 0; i < 3; i++) {
      const spoke = new THREE.Mesh(
        new THREE.BoxGeometry(tireWidth * 1.04, radius * 1.38, 0.07),
        neonGlowMat
      );
      spoke.rotation.x = (i * Math.PI) / 3;
      wheelGroup.add(spoke);
    }

    return wheelGroup;
  };

  // 1. FRONT STEERING FORK & FRONT CYBER WHEEL
  const frontFork = new THREE.Group();
  frontFork.position.set(0, -0.04, -1.12);
  chassis.add(frontFork);

  const frontWheel = createCyberWheel(0.44, 0.34);
  frontFork.add(frontWheel);
  wheelMeshes.push(frontWheel);

  // Dual Inverted Cyber Fork Tubes + Front Aero Fender
  [-0.22, 0.22].forEach((fx) => {
    const forkTube = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.038, 0.92, 12), chromeMat);
    forkTube.position.set(fx, 0.38, 0.16);
    forkTube.rotation.x = -0.36;
    frontFork.add(forkTube);

    const forkGlow = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.65, 0.06), neonGlowMat);
    forkGlow.position.set(fx * 1.15, 0.36, 0.14);
    forkGlow.rotation.x = -0.36;
    frontFork.add(forkGlow);
  });

  const frontFender = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.56), fairingPaintMat);
  frontFender.position.set(0, 0.38, -0.05);
  frontFender.rotation.x = 0.25;
  frontFork.add(frontFender);

  // 2. REAR FAT SUPERBIKE WHEEL & SWINGARM
  const rearWheel = createCyberWheel(0.48, 0.48);
  rearWheel.position.set(0, 0.0, 1.06);
  chassis.add(rearWheel);
  wheelMeshes.push(rearWheel);

  // Cyber Swingarm connecting frame to rear wheel
  [-0.28, 0.28].forEach((sx) => {
    const swingarm = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.14, 0.95), carbonFrameMat);
    swingarm.position.set(sx, 0.06, 0.62);
    swingarm.rotation.x = -0.1;
    chassis.add(swingarm);

    const swingNeon = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.85), plasmaGlowMat);
    swingNeon.position.set(sx, 0.06, 0.62);
    swingNeon.rotation.x = -0.1;
    chassis.add(swingNeon);
  });

  // 3. SCULPTED FUTURISTIC AERODYNAMIC FAIRING & TANK
  // Lower Belly Pan & Nose Cone
  const mainBody = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.46, 1.55), fairingPaintMat);
  mainBody.position.set(0, 0.32, -0.15);
  mainBody.rotation.x = 0.12;
  mainBody.castShadow = true;
  chassis.add(mainBody);

  // Sharp Aerodynamic Front Nose Cowl
  const noseConeGeo = new THREE.ConeGeometry(0.36, 0.75, 6);
  noseConeGeo.rotateX(-Math.PI / 2);
  const noseCone = new THREE.Mesh(noseConeGeo, fairingPaintMat);
  noseCone.scale.set(1.15, 0.8, 1.1);
  noseCone.position.set(0, 0.48, -1.12);
  noseCone.castShadow = true;
  chassis.add(noseCone);

  // Glowing Cyber Laser Headlight Visor on Nose
  const headlightStrip = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.1, 0.18), neonGlowMat);
  headlightStrip.position.set(0, 0.46, -1.36);
  headlightStrip.rotation.x = 0.25;
  chassis.add(headlightStrip);

  // Forward Bubble Racing Windshield
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.26, 0.68), visorMat);
  windshield.position.set(0, 0.68, -0.78);
  windshield.rotation.x = 0.52;
  chassis.add(windshield);

  // Sculpted Fuel Tank & Side Aero Winglets (MotoGP / Cyber Style)
  const fuelTank = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.34, 0.78), fairingPaintMat);
  fuelTank.position.set(0, 0.62, -0.12);
  fuelTank.castShadow = true;
  chassis.add(fuelTank);

  const tankStripe = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.36, 0.8), trimMat);
  tankStripe.position.set(0, 0.63, -0.12);
  chassis.add(tankStripe);

  // Side Neon Energy Light Strips & Aero Winglets
  [-0.31, 0.31].forEach((wx) => {
    const sideNeon = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.1, 1.5), neonGlowMat);
    sideNeon.position.set(wx, 0.42, -0.15);
    sideNeon.rotation.x = 0.15;
    chassis.add(sideNeon);

    // MotoGP Futuristic Downforce Winglet
    const winglet = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.05, 0.36), fairingPaintMat);
    winglet.position.set(wx * 1.35, 0.48, -0.82);
    winglet.rotation.z = wx < 0 ? 0.25 : -0.25;
    chassis.add(winglet);

    const wingTip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.38), neonGlowMat);
    wingTip.position.set(wx * 1.75, 0.46, -0.82);
    chassis.add(wingTip);
  });

  // 4. GLOWING PLASMA REACTOR ENGINE CORE IN FRAME
  const plasmaCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.58, 16),
    plasmaGlowMat
  );
  plasmaCore.rotation.z = Math.PI / 2;
  plasmaCore.position.set(0, 0.22, -0.05);
  chassis.add(plasmaCore);

  // High-Tech Raised Tail Cowl
  const tailCowl = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.78), fairingPaintMat);
  tailCowl.position.set(0, 0.66, 0.72);
  tailCowl.rotation.x = -0.28;
  tailCowl.castShadow = true;
  chassis.add(tailCowl);

  // Clip-On Handlebars with Neon Grips
  const handlebarBar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.78, 10), chromeMat);
  handlebarBar.rotation.z = Math.PI / 2;
  handlebarBar.position.set(0, 0.64, -0.62);
  chassis.add(handlebarBar);

  // 5. FUTURISTIC CYBER RIDER IN FULL AERO TUCK POSTURE
  const riderGroup = new THREE.Group();
  riderGroup.position.set(0, 0.66, 0.18);
  chassis.add(riderGroup);

  // Leaning Armored Torso
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.36, 0.68), suitMat);
  torso.position.set(0, 0.22, -0.18);
  torso.rotation.x = 0.55;
  torso.castShadow = true;
  riderGroup.add(torso);

  // Glowing Spine Armor Strip on Rider's Back
  const spineArmor = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.62), neonGlowMat);
  spineArmor.position.set(0, 0.38, -0.16);
  spineArmor.rotation.x = 0.55;
  riderGroup.add(spineArmor);

  // Rider Arms reaching to Handlebars
  [-0.24, 0.24].forEach((ax) => {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.62, 10), fairingPaintMat);
    arm.position.set(ax, 0.14, -0.52);
    arm.rotation.x = 1.25;
    arm.rotation.z = ax < 0 ? -0.15 : 0.15;
    riderGroup.add(arm);

    // Rider Legs hugging tank
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.065, 0.58, 10), suitMat);
    leg.position.set(ax * 1.05, -0.18, 0.02);
    leg.rotation.x = -0.65;
    riderGroup.add(leg);
  });

  // Rider Cyber Helmet & Glowing Visor
  const riderHead = new THREE.Group();
  riderHead.position.set(0, 0.42, -0.52);
  riderGroup.add(riderHead);

  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.23, 18, 18), fairingPaintMat);
  helmet.scale.set(0.95, 1.0, 1.18);
  helmet.castShadow = true;
  riderHead.add(helmet);

  const helmetCrest = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.36), trimMat);
  helmetCrest.position.set(0, 0.2, 0.02);
  riderHead.add(helmetCrest);

  const helmetVisor = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.18), neonGlowMat);
  helmetVisor.position.set(0, 0.02, -0.19);
  helmetVisor.rotation.x = 0.15;
  riderHead.add(helmetVisor);

  // 6. TWIN UNDER-TAIL PLASMA THRUSTERS & NITRO AFTERBURNER FLAMES
  const nitroFlames = new THREE.Group();
  nitroFlames.position.set(0, 0.58, 1.12);
  chassis.add(nitroFlames);

  [-0.14, 0.14].forEach((nx) => {
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.34, 14), chromeMat);
    nozzle.rotation.x = Math.PI / 2;
    nozzle.position.set(nx, 0.58, 1.02);
    chassis.add(nozzle);

    const flameGeo = new THREE.ConeGeometry(0.14, 1.35, 14);
    flameGeo.rotateX(Math.PI / 2);
    const flameMat = new THREE.MeshBasicMaterial({
      color: theme === 'blue' ? 0x00f5ff : 0xfacc15,
      transparent: true,
      opacity: 0.92
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(nx, 0, 0.62);
    nitroFlames.add(flame);
  });

  return {
    root,
    leanGroup,
    chassis,
    riderHead,
    frontFork,
    wheelMeshes,
    nitroFlames,
    plasmaCore,
    laneX,
    currentZ: startZ,
    spunOut: false
  };
}

export const RobotRaceArena3D: React.FC<RobotRaceArena3DProps> = ({
  blueName,
  redName,
  blueProgress,
  redProgress,
  blueHp,
  redHp,
  activeTurn,
  raceEvent
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [cameraMode, setCameraMode] = useState<'chase' | 'helicopter' | 'finish'>('chase');
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [turboBanner, setTurboBanner] = useState<string | null>(null);

  const stateRef = useRef({
    blueProgress,
    redProgress,
    blueHp,
    redHp,
    activeTurn,
    cameraMode,
    blueBoostTimer: 0,
    redBoostTimer: 0
  });

  useEffect(() => {
    stateRef.current.blueProgress = blueProgress;
    stateRef.current.redProgress = redProgress;
    stateRef.current.blueHp = blueHp;
    stateRef.current.redHp = redHp;
    stateRef.current.activeTurn = activeTurn;
  }, [blueProgress, redProgress, blueHp, redHp, activeTurn]);

  useEffect(() => {
    stateRef.current.cameraMode = cameraMode;
  }, [cameraMode]);

  const triggerManualNitro = (who: 'blue' | 'red') => {
    if (who === 'blue') stateRef.current.blueBoostTimer = 1.4;
    else stateRef.current.redBoostTimer = 1.4;
    setTurboBanner(
      who === 'blue'
        ? '🏍️⚡ NITRO PLASMA MOTOR BIRU AKTIF!'
        : '🏍️🔥 NITRO PLASMA MOTOR MERAH AKTIF!'
    );
    setTimeout(() => setTurboBanner(null), 1300);
  };

  useEffect(() => {
    if (raceEvent) {
      if (raceEvent.type === 'blue-boost' || raceEvent.type === 'both-boost') {
        triggerManualNitro('blue');
      }
      if (raceEvent.type === 'red-boost' || raceEvent.type === 'both-boost') {
        triggerManualNitro('red');
      }
    }
  }, [raceEvent]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 420;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060b18);
    scene.fog = new THREE.FogExp2(0x060b18, 0.02);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 160);
    camera.position.set(0, 4.4, 20.5);

    // Grand Prix Cyber Stadium Lighting
    const hemi = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.05);
    scene.add(hemi);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.35);
    sunLight.position.set(8, 16, 12);
    sunLight.castShadow = !isSoftwareGl;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.shadow.camera.left = -12;
    sunLight.shadow.camera.right = 12;
    sunLight.shadow.camera.top = 24;
    sunLight.shadow.camera.bottom = -24;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const trackTex = createTrackTexture(maxAniso);
    const bannerTex = createFinishBannerTexture(maxAniso);

    const START_Z = 14;
    const FINISH_Z = -16;

    // 3D Cyber Grand Prix Track (Extended length for seamless high-speed scrolling)
    const roadGeo = new THREE.PlaneGeometry(8.8, 72);
    roadGeo.rotateX(-Math.PI / 2);
    const roadMat = new THREE.MeshStandardMaterial({
      map: trackTex,
      roughness: 0.35,
      metalness: 0.45
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.position.set(0, 0, -2);
    roadMesh.receiveShadow = true;
    scene.add(roadMesh);

    // Surrounding Cyber Stadium Ground
    const groundGeo = new THREE.PlaneGeometry(140, 140);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x050914,
      roughness: 0.85,
      metalness: 0.2
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.y = -0.04;
    scene.add(groundMesh);

    // Moving Overhead Neon Speed Arches Along the Track (Loops continuously toward +Z!)
    const archRings: THREE.Mesh[] = [];
    const archGeo = new THREE.TorusGeometry(4.8, 0.11, 12, 32, Math.PI);
    for (let i = 0; i < 8; i++) {
      const z = 18 - i * 5.8;
      const archRing = new THREE.Mesh(
        archGeo,
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x00f5ff : 0xf43f5e,
          emissive: i % 2 === 0 ? 0x0ea5e9 : 0xe11d48,
          emissiveIntensity: 1.25,
          roughness: 0.2
        })
      );
      archRing.position.set(0, 0, z);
      scene.add(archRing);
      archRings.push(archRing);
    }

    // 3D High-Speed Wind / Neon Speed Streaks Rushing Past the Motorcycles
    const speedStreaks: { mesh: THREE.Mesh; speedMul: number; baseX: number; baseY: number }[] = [];
    const streakGeo = new THREE.BoxGeometry(0.045, 0.045, 3.6);
    for (let i = 0; i < 24; i++) {
      const isLeft = i % 2 === 0;
      const laneBand = i % 3 === 0 ? (isLeft ? -0.1 : 0.1) : isLeft ? -3.6 - (i % 3) * 0.45 : 3.6 + (i % 3) * 0.45;
      const baseY = 0.25 + (i % 5) * 0.48;
      const streakMat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xfacc15 : isLeft ? 0x00f5ff : 0xff2a85,
        transparent: true,
        opacity: 0.65
      });
      const streakMesh = new THREE.Mesh(streakGeo, streakMat);
      streakMesh.position.set(laneBand, baseY, -24 + (i * 2.1));
      scene.add(streakMesh);
      speedStreaks.push({
        mesh: streakMesh,
        speedMul: 0.85 + (i % 4) * 0.18,
        baseX: laneBand,
        baseY
      });
    }

    // Grand 3D Checkered Finish Line Archway at FINISH_Z (-16)
    const finishArchGroup = new THREE.Group();
    finishArchGroup.position.set(0, 0, FINISH_Z);
    scene.add(finishArchGroup);

    // 3D Checkered Finish Strip on the Asphalt at FINISH_Z
    const finishStripCanvas = document.createElement('canvas');
    finishStripCanvas.width = 512;
    finishStripCanvas.height = 128;
    const fCtx = finishStripCanvas.getContext('2d')!;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 16; c++) {
        fCtx.fillStyle = (r + c) % 2 === 0 ? '#ffffff' : '#090d16';
        fCtx.fillRect(c * 32, r * 32, 32, 32);
      }
    }
    const finishStripTex = new THREE.CanvasTexture(finishStripCanvas);
    finishStripTex.colorSpace = THREE.SRGBColorSpace;
    const finishStripMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8.2, 1.8).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ map: finishStripTex })
    );
    finishStripMesh.position.set(0, 0.02, 0);
    finishArchGroup.add(finishStripMesh);

    const archPillarMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      metalness: 0.8,
      roughness: 0.2
    });
    [-4.4, 4.4].forEach((px) => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.4, 5.2, 16), archPillarMat);
      pillar.position.set(px, 2.6, 0);
      pillar.castShadow = true;
      finishArchGroup.add(pillar);
    });

    const bannerGeo = new THREE.BoxGeometry(9.6, 1.55, 0.36);
    const bannerMat = new THREE.MeshStandardMaterial({
      map: bannerTex,
      roughness: 0.25,
      metalness: 0.3,
      emissive: 0xffffff,
      emissiveMap: bannerTex,
      emissiveIntensity: 0.4
    });
    const bannerMesh = new THREE.Mesh(bannerGeo, bannerMat);
    bannerMesh.position.set(0, 4.6, 0);
    finishArchGroup.add(bannerMesh);

    // Build Blue & Red Futuristic 3D Cyber Motorcycles
    const blueMoto = buildFuturisticCyberMoto3D('blue', -1.85, START_Z);
    const redMoto = buildFuturisticCyberMoto3D('red', 1.85, START_Z);
    scene.add(blueMoto.root);
    scene.add(redMoto.root);

    // Debris & Exhaust Sparks Pool
    const debrisList: RaceDebris[] = [];
    const debGeo = new THREE.BoxGeometry(0.22, 0.18, 0.26);
    for (let i = 0; i < 22; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x00f5ff : 0xe11d48,
        metalness: 0.8,
        roughness: 0.25
      });
      const mesh = new THREE.Mesh(debGeo, mat);
      mesh.visible = false;
      scene.add(mesh);
      debrisList.push({
        mesh,
        vel: new THREE.Vector3(),
        rotVel: new THREE.Vector3(),
        active: false
      });
    }

    const particles: RaceParticle[] = [];
    const partGeo = new THREE.OctahedronGeometry(0.11, 0);
    for (let i = 0; i < 42; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f5ff : 0xfacc15,
        transparent: true,
        opacity: 0
      });
      const mesh = new THREE.Mesh(partGeo, mat);
      mesh.visible = false;
      scene.add(mesh);
      particles.push({
        mesh,
        vel: new THREE.Vector3(),
        life: 0,
        maxLife: 0.55
      });
    }

    const spawnRaceSparks = (x: number, y: number, z: number, count: number, backwardJet = false) => {
      let n = 0;
      for (let i = 0; i < particles.length && n < count; i++) {
        const p = particles[i];
        if (p.life <= 0) {
          p.maxLife = backwardJet ? 0.35 : 0.65;
          p.life = p.maxLife;
          p.mesh.visible = true;
          p.mesh.position.set(x + (Math.random() - 0.5) * 0.28, y, z);
          if (backwardJet) {
            p.vel.set((Math.random() - 0.5) * 1.8, 0.4 + Math.random() * 1.4, 8 + Math.random() * 8);
          } else {
            p.vel.set((Math.random() - 0.5) * 6, 2 + Math.random() * 5, (Math.random() - 0.5) * 6);
          }
          n++;
        }
      }
    };

    const triggerSpinOut = (moto: FuturisticMoto3D, isBlue: boolean) => {
      moto.spunOut = true;
      debrisList.forEach((d, idx) => {
        d.active = true;
        d.mesh.visible = true;
        (d.mesh.material as THREE.MeshStandardMaterial).color.setHex(
          idx % 2 === 0 ? (isBlue ? 0x00f5ff : 0xe11d48) : 0xfacc15
        );
        d.mesh.position.set(moto.laneX, 0.9, moto.currentZ);
        d.vel.set((Math.random() - 0.5) * 8, 3.5 + Math.random() * 5.5, (Math.random() - 0.5) * 8);
        d.rotVel.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
      });
      spawnRaceSparks(moto.laneX, 1.1, moto.currentZ, 24, false);
    };

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const clock = new THREE.Clock();
    let frameId = 0;
    let sparkAccumulator = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function updateCyberMoto(
      moto: FuturisticMoto3D,
      progress: number,
      hp: number,
      boostTimer: number,
      isBlue: boolean,
      isRacingActive: boolean,
      elapsed: number,
      dt: number
    ) {
      const clampedProg = Math.max(0, Math.min(100, progress));
      const baseTargetZ = THREE.MathUtils.lerp(START_Z, FINISH_Z, clampedProg / 100);
      const phase = isBlue ? 0 : Math.PI;
      // Add dynamic high-speed jockeying surge while racing so bikes visibly battle forward!
      const highSpeedSurgeZ =
        isRacingActive && hp > 0
          ? Math.sin(elapsed * 3.2 + phase) * 0.42 + (boostTimer > 0 ? -0.95 : 0)
          : 0;
      const targetZ = baseTargetZ + highSpeedSurgeZ;

      const prevZ = moto.currentZ;
      moto.currentZ = THREE.MathUtils.damp(moto.currentZ, targetZ, 4.8, dt);
      moto.root.position.z = moto.currentZ;

      const deltaSpeed = Math.abs(prevZ - moto.currentZ) / Math.max(dt, 0.001);

      if (hp > 0 && moto.spunOut) {
        moto.spunOut = false;
        moto.root.rotation.y = 0;
        moto.leanGroup.rotation.z = 0;
        moto.chassis.rotation.x = 0;
        debrisList.forEach((d) => {
          d.active = false;
          d.mesh.visible = false;
        });
      }

      if (hp <= 0 && !moto.spunOut) {
        triggerSpinOut(moto, isBlue);
      }

      if (moto.spunOut) {
        moto.nitroFlames.visible = false;
        moto.root.rotation.y = THREE.MathUtils.damp(moto.root.rotation.y, Math.PI * 0.85, 4, dt);
        moto.leanGroup.rotation.z = THREE.MathUtils.damp(moto.leanGroup.rotation.z, 0.65, 5, dt);
        return;
      }

      // Continuous high-speed wheel rotation when race is active!
      const cruiseWheelSpeed = isRacingActive ? 22.0 : 4.0;
      const wheelSpin = (cruiseWheelSpeed + deltaSpeed * 4.2 + (boostTimer > 0 ? 18.0 : 0)) * dt;
      moto.wheelMeshes.forEach((w) => {
        w.rotation.x -= wheelSpin;
      });

      // Dynamic MotoGP High-Speed Suspension Vibration & Aero Tuck
      const vibFreq = isRacingActive ? 24 : 8;
      const suspensionBounce = Math.abs(Math.sin(elapsed * vibFreq + phase)) * (isRacingActive ? 0.038 : 0.015);
      moto.chassis.position.y = 0.48 + suspensionBounce;
      moto.riderHead.rotation.z = Math.sin(elapsed * 7.5 + phase) * 0.12;

      const weaveAngle = Math.sin(elapsed * 4.6 + phase) * (isRacingActive ? 0.18 : 0.05);
      moto.frontFork.rotation.y = weaveAngle * 0.55;

      // Pulse plasma engine core intensity
      const coreMat = moto.plasmaCore.material as THREE.MeshStandardMaterial;
      coreMat.emissiveIntensity = boostTimer > 0 ? 3.8 : 2.2 + Math.sin(elapsed * 18 + phase) * 0.5;

      // Nitro Boost Superbike Wheelie + Plasma Thruster Surge vs High-Speed Cruising!
      if (boostTimer > 0 || deltaSpeed > 1.8) {
        moto.nitroFlames.visible = true;
        const pulse = 1.45 + Math.sin(elapsed * 48) * 0.5;
        moto.nitroFlames.scale.set(1.3, 1.3, pulse * 2.1);
        // Dramatic MotoGP Front-Wheel Wheelie Tilt!
        moto.chassis.rotation.x = THREE.MathUtils.damp(moto.chassis.rotation.x, 0.28, 9, dt);
        // Dynamic aerodynamic bank lean during boost
        const bankLean = Math.sin(elapsed * 11 + phase) * 0.24;
        moto.leanGroup.rotation.z = THREE.MathUtils.damp(moto.leanGroup.rotation.z, bankLean, 8, dt);
        moto.root.position.x = moto.laneX + Math.sin(elapsed * 8 + phase) * 0.24;
      } else if (isRacingActive) {
        // Active High-Speed Cruising (195+ km/h): visible pulsing plasma flames & slight forward aero pitch
        moto.nitroFlames.visible = true;
        const cruiseFlamePulse = 0.95 + Math.sin(elapsed * 32 + phase) * 0.28;
        moto.nitroFlames.scale.set(0.95, 0.95, cruiseFlamePulse * 1.15);
        const subtleWheelie = Math.max(0, Math.sin(elapsed * 3.2 + phase) * 0.06);
        moto.chassis.rotation.x = THREE.MathUtils.damp(moto.chassis.rotation.x, subtleWheelie, 8, dt);
        moto.leanGroup.rotation.z = THREE.MathUtils.damp(
          moto.leanGroup.rotation.z,
          weaveAngle * 0.85,
          7,
          dt
        );
        moto.root.position.x = THREE.MathUtils.damp(
          moto.root.position.x,
          moto.laneX + Math.sin(elapsed * 4.6 + phase) * 0.16,
          8,
          dt
        );
      } else {
        moto.nitroFlames.visible = true;
        moto.nitroFlames.scale.set(0.6, 0.6, 0.4 + Math.sin(elapsed * 15) * 0.1);
        moto.chassis.rotation.x = THREE.MathUtils.damp(moto.chassis.rotation.x, 0, 8, dt);
        moto.leanGroup.rotation.z = THREE.MathUtils.damp(moto.leanGroup.rotation.z, 0, 6, dt);
        moto.root.position.x = THREE.MathUtils.damp(moto.root.position.x, moto.laneX, 8, dt);
      }
    }

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      if (stateRef.current.blueBoostTimer > 0) {
        stateRef.current.blueBoostTimer = Math.max(0, stateRef.current.blueBoostTimer - dt);
      }
      if (stateRef.current.redBoostTimer > 0) {
        stateRef.current.redBoostTimer = Math.max(0, stateRef.current.redBoostTimer - dt);
      }

      const isRacingActive =
        stateRef.current.blueProgress < 100 &&
        stateRef.current.redProgress < 100 &&
        (stateRef.current.blueHp > 0 || stateRef.current.redHp > 0);
      const anyBoostActive =
        stateRef.current.blueBoostTimer > 0 || stateRef.current.redBoostTimer > 0;

      // 1. CONTINUOUS HIGH-SPEED TRACK SCROLLING & TUNNEL ARCH MOTION!
      const worldSpeedMultiplier = isRacingActive ? (anyBoostActive ? 2.35 : 1.35) : 0.18;
      trackTex.offset.y -= dt * 1.45 * worldSpeedMultiplier;

      // Move Overhead Neon Speed Arches toward +Z (past camera) and loop back to -28
      const archMoveSpeed = 16.5 * worldSpeedMultiplier;
      for (let i = 0; i < archRings.length; i++) {
        const arch = archRings[i];
        arch.position.z += archMoveSpeed * dt;
        if (arch.position.z > 22) {
          arch.position.z -= 8 * 5.8;
        }
      }

      // Move 3D Wind / Speed Streaks rushing past the motorcycles
      const streakMoveSpeed = 28.0 * worldSpeedMultiplier;
      for (let i = 0; i < speedStreaks.length; i++) {
        const s = speedStreaks[i];
        s.mesh.visible = isRacingActive;
        if (isRacingActive) {
          s.mesh.position.z += streakMoveSpeed * s.speedMul * dt;
          s.mesh.scale.z = anyBoostActive ? 1.85 : 1.0;
          if (s.mesh.position.z > 22) {
            s.mesh.position.z = -26 - Math.random() * 6;
          }
        }
      }

      // Periodic high-speed plasma exhaust sparks while racing
      if (isRacingActive) {
        sparkAccumulator += dt * (anyBoostActive ? 28 : 12);
        if (sparkAccumulator >= 1) {
          sparkAccumulator = 0;
          if (stateRef.current.blueHp > 0) {
            spawnRaceSparks(blueMoto.root.position.x, 0.55, blueMoto.currentZ + 1.2, 1, true);
          }
          if (stateRef.current.redHp > 0) {
            spawnRaceSparks(redMoto.root.position.x, 0.55, redMoto.currentZ + 1.2, 1, true);
          }
        }
      }

      updateCyberMoto(
        blueMoto,
        stateRef.current.blueProgress,
        stateRef.current.blueHp,
        stateRef.current.blueBoostTimer,
        true,
        isRacingActive,
        elapsed,
        dt
      );
      updateCyberMoto(
        redMoto,
        stateRef.current.redProgress,
        stateRef.current.redHp,
        stateRef.current.redBoostTimer,
        false,
        isRacingActive,
        elapsed,
        dt
      );

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.life > 0) {
          p.life -= dt;
          if (p.life <= 0) {
            p.mesh.visible = false;
          } else {
            p.mesh.position.addScaledVector(p.vel, dt);
            p.vel.y -= 9.8 * dt;
            (p.mesh.material as THREE.MeshBasicMaterial).opacity = p.life / p.maxLife;
          }
        }
      }

      for (let i = 0; i < debrisList.length; i++) {
        const d = debrisList[i];
        if (d.active) {
          d.mesh.position.addScaledVector(d.vel, dt);
          d.vel.y -= 14 * dt;
          d.mesh.rotation.x += d.rotVel.x * dt;
          d.mesh.rotation.y += d.rotVel.y * dt;
          if (d.mesh.position.y < 0.14) {
            d.mesh.position.y = 0.14;
            d.vel.y = Math.abs(d.vel.y) * 0.4;
            d.vel.x *= 0.8;
            d.vel.z *= 0.8;
          }
        }
      }

      // Dynamic Camera Tracking + subtle high-speed camera shake
      const leadZ = Math.min(blueMoto.currentZ, redMoto.currentZ);
      const avgZ = (blueMoto.currentZ + redMoto.currentZ) * 0.5;
      const mode = stateRef.current.cameraMode;
      const camVibX = isRacingActive ? Math.sin(elapsed * 26) * (anyBoostActive ? 0.06 : 0.02) : 0;
      const camVibY = isRacingActive ? Math.cos(elapsed * 31) * (anyBoostActive ? 0.05 : 0.015) : 0;

      if (mode === 'finish') {
        _camTargetPos.set(0, 4.2, FINISH_Z - 7.5);
        _camTargetLook.set(0, 1.4, FINISH_Z + 4);
      } else if (mode === 'helicopter') {
        _camTargetPos.set(7.5, 6.8, avgZ + 4.5);
        _camTargetLook.set(0, 1.0, avgZ - 2.5);
      } else {
        _camTargetPos.set(camVibX, 3.35 + camVibY, Math.max(leadZ + 5.8, FINISH_Z + 4.8));
        _camTargetLook.set(0, 1.15, leadZ - 5.5);
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, _camTargetPos.x, 5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _camTargetPos.y, 5, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _camTargetPos.z, 5, dt);

      _camCurrentLook.x = THREE.MathUtils.damp(_camCurrentLook.x, _camTargetLook.x, 6, dt);
      _camCurrentLook.y = THREE.MathUtils.damp(_camCurrentLook.y, _camTargetLook.y, 6, dt);
      _camCurrentLook.z = THREE.MathUtils.damp(_camCurrentLook.z, _camTargetLook.z, 6, dt);
      camera.lookAt(_camCurrentLook);

      renderer.render(scene, camera);

      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    }

    tick();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    const resizeObs = new ResizeObserver(() => handleResize());
    resizeObs.observe(container);

    return () => {
      resizeObs.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      renderer.dispose();
    };
  }, []);

  const blueDist = Math.min(100, Math.max(0, Math.round(blueProgress)));
  const redDist = Math.min(100, Math.max(0, Math.round(redProgress)));
  const isRaceOngoing = blueDist < 100 && redDist < 100;
  const blueKmh = !isRaceOngoing
    ? blueDist >= 100
      ? 310
      : 0
    : blueHp <= 0
    ? 0
    : turboBanner?.includes('BIRU')
    ? 318
    : 196 + (blueDist % 17);
  const redKmh = !isRaceOngoing
    ? redDist >= 100
      ? 310
      : 0
    : redHp <= 0
    ? 0
    : turboBanner?.includes('MERAH')
    ? 318
    : 194 + (redDist % 19);

  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] flex-1 rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl select-none">
      {/* Dedicated WebGL Mount */}
      <div ref={canvasMountRef} className="absolute inset-0 w-full h-full" />

      {/* Nitro Callout Banner (Non-blocking position) */}
      {turboBanner && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
          <div className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 text-slate-950 font-black text-xs sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(0,245,255,0.8)] border-2 border-white whitespace-nowrap">
            {turboBanner}
          </div>
        </div>
      )}

      {/* Sleek Proportional Top HUD Progress & Speedometer */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex flex-col gap-1.5 pointer-events-none">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {/* Blue Cyber Moto Progress */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-sky-500/50 text-white shadow-lg">
            <div className="flex items-center justify-between gap-1 text-[11px] sm:text-xs font-extrabold">
              <span className="text-sky-300 flex items-center gap-1 truncate">
                <Gauge className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">🏍️ {blueName}</span>
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="px-1.5 py-0.2 rounded bg-sky-500/25 border border-sky-400/40 font-mono text-[10px] text-cyan-300 font-black">
                  {blueKmh} KM/J
                </span>
                <span className="font-mono text-sky-200">{blueDist}m</span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-300"
                style={{ width: `${blueDist}%` }}
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-300">
              <span className="truncate">
                {blueDist >= 100
                  ? '🏁 JUARA GARIS FINISH!'
                  : '⚡ Melaju Kencang di Sirkuit'}
              </span>
              {activeTurn === 'blue' && isRaceOngoing && (
                <span className="px-1.5 py-0.2 rounded bg-sky-500/30 text-sky-200 font-bold shrink-0">
                  GILIRAN PACU
                </span>
              )}
            </div>
          </div>

          {/* Red Cyber Moto Progress */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-rose-500/50 text-white shadow-lg">
            <div className="flex items-center justify-between gap-1 text-[11px] sm:text-xs font-extrabold">
              <span className="text-rose-300 flex items-center gap-1 truncate">
                <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="truncate">🏍️ {redName}</span>
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="px-1.5 py-0.2 rounded bg-rose-500/25 border border-rose-400/40 font-mono text-[10px] text-amber-300 font-black">
                  {redKmh} KM/J
                </span>
                <span className="font-mono text-rose-200">{redDist}m</span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
                style={{ width: `${redDist}%` }}
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-300">
              <span className="truncate">
                {redDist >= 100
                  ? '🏁 JUARA GARIS FINISH!'
                  : '🔥 Melaju Kencang di Sirkuit'}
              </span>
              {activeTurn === 'red' && isRaceOngoing && (
                <span className="px-1.5 py-0.2 rounded bg-rose-500/30 text-rose-200 font-bold shrink-0">
                  GILIRAN PACU
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Compact Collapsible Bottom Camera & Nitro Dock */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center max-w-[96%]">
        <button
          type="button"
          onClick={() => setControlsCollapsed((prev) => !prev)}
          className="px-2.5 py-0.5 rounded-t-lg bg-slate-900/90 border border-b-0 border-slate-700 text-[10px] font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          {controlsCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3" />
              <span>Kamera & Nitro</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              <span>Tutup Kontrol</span>
            </>
          )}
        </button>

        {!controlsCollapsed && (
          <div className="px-2.5 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700 shadow-xl flex flex-wrap items-center justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 hidden sm:flex items-center gap-1 mr-0.5">
              <Camera className="w-3 h-3 text-amber-400" />
              <span>Kamera:</span>
            </span>

            {(
              [
                { id: 'chase', label: 'Belakang' },
                { id: 'helicopter', label: 'Helikopter' },
                { id: 'finish', label: 'Finish' }
              ] as const
            ).map((cam) => (
              <button
                key={cam.id}
                type="button"
                onClick={() => setCameraMode(cam.id)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                  cameraMode === cam.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cam.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => triggerManualNitro('blue')}
              className="px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Zap className="w-3 h-3" />
              <span>Nitro Biru</span>
            </button>

            <button
              type="button"
              onClick={() => triggerManualNitro('red')}
              className="px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Nitro Merah</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
