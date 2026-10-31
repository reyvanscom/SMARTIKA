import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Shield, Zap, Flame, Camera, ChevronDown, ChevronUp, Sparkles, Swords } from 'lucide-react';

export interface RobotBattleArena3DProps {
  blueName: string;
  redName: string;
  blueHp: number;
  redHp: number;
  maxHp?: number;
  activeTurn: 'blue' | 'red' | 'both';
  /** Triggered when a robot launches a boxing combo: 'blue' means Blue punches Red; 'red' means Red punches Blue */
  attackTrigger: {
    id: number;
    attacker: 'blue' | 'red';
    damage: number;
  } | null;
  subtitle?: string;
}

// Pre-allocated math helpers at module scope (Zero GC in render loop)
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(0, 1.7, 0);

interface DebrisPiece {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  rotVel: THREE.Vector3;
  active: boolean;
}

interface SparkParticle {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
  isStar: boolean;
}

interface CuteBoxerBot {
  root: THREE.Group;
  pelvis: THREE.Group;
  torso: THREE.Group;
  head: THREE.Group;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  leftGlove: THREE.Group;
  rightGlove: THREE.Group;
  leftBoot: THREE.Mesh;
  rightBoot: THREE.Mesh;
  coreMesh: THREE.Mesh;
  eyeLeft: THREE.Mesh;
  eyeRight: THREE.Mesh;
  browLeft: THREE.Mesh;
  browRight: THREE.Mesh;
  dizzyCrown: THREE.Group;
  turnRing: THREE.Mesh;
  armorMaterials: THREE.MeshStandardMaterial[];
  emissiveMaterial: THREE.MeshStandardMaterial;
  baseX: number;
  facingDir: number; // +1 for left bot facing right, -1 for right bot facing left
  knockedOut: boolean;
}

function createBoxingCanvasTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Championship Blue-Slate Mat Base
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle canvas weave grid
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
  ctx.lineWidth = 2;
  for (let i = 0; i <= 1024; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 1024);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(1024, i);
    ctx.stroke();
  }

  // Blue Corner & Red Corner Triangles
  ctx.fillStyle = 'rgba(2, 132, 199, 0.35)';
  ctx.beginPath();
  ctx.moveTo(64, 64);
  ctx.lineTo(340, 64);
  ctx.lineTo(64, 340);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(225, 29, 72, 0.35)';
  ctx.beginPath();
  ctx.moveTo(960, 960);
  ctx.lineTo(684, 960);
  ctx.lineTo(960, 684);
  ctx.closePath();
  ctx.fill();

  // Outer Ring Apron Border Line
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 10;
  ctx.strokeRect(72, 72, 880, 880);

  // Inner Fighting Ring Circle
  ctx.beginPath();
  ctx.arc(512, 512, 330, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Center Ring Emblem
  ctx.beginPath();
  ctx.arc(512, 512, 130, 0, Math.PI * 2);
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#38bdf8';
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.font = '900 54px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('REAL BOT', 512, 490);
  ctx.fillStyle = '#38bdf8';
  ctx.font = '800 32px sans-serif';
  ctx.fillText('BOXING 3D', 512, 542);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 118);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.72)');
  grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.28)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Builds a Cute Chibi "Real Steel" Boxing Robot (12+ composite parts)
 * With oversized padded 3D boxing gloves, cute expressive LED eyes & eyebrows, championship belt, and dizzy stars!
 */
function buildCuteBoxerBot(
  colorTheme: 'blue' | 'red',
  baseX: number,
  facingDir: number,
  shadowTex: THREE.CanvasTexture
): CuteBoxerBot {
  const root = new THREE.Group();
  root.position.set(baseX, 0, 0);
  root.rotation.y = facingDir > 0 ? Math.PI * 0.5 : -Math.PI * 0.5;

  const primaryHex = colorTheme === 'blue' ? 0x0ea5e9 : 0xf43f5e;
  const secondaryHex = colorTheme === 'blue' ? 0x38bdf8 : 0xfb7185;
  const gloveHex = colorTheme === 'blue' ? 0x0284c7 : 0xe11d48;
  const emissiveHex = colorTheme === 'blue' ? 0x00f5ff : 0xffbe0b;

  const primaryArmorMat = new THREE.MeshStandardMaterial({
    color: primaryHex,
    metalness: 0.65,
    roughness: 0.24
  });
  const secondaryArmorMat = new THREE.MeshStandardMaterial({
    color: secondaryHex,
    metalness: 0.5,
    roughness: 0.45
  });
  const gloveLeatherMat = new THREE.MeshPhysicalMaterial({
    color: gloveHex,
    metalness: 0.15,
    roughness: 0.32,
    clearcoat: 0.85,
    clearcoatRoughness: 0.15
  });
  const goldChampMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    metalness: 0.88,
    roughness: 0.18
  });
  const darkFrameMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.8,
    roughness: 0.5
  });
  const chromeJointMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.92,
    roughness: 0.14
  });
  const visorMat = new THREE.MeshPhysicalMaterial({
    color: 0x090d16,
    metalness: 0.1,
    roughness: 0.08,
    clearcoat: 1.0
  });
  const emissiveMat = new THREE.MeshStandardMaterial({
    color: emissiveHex,
    emissive: emissiveHex,
    emissiveIntensity: 2.5,
    roughness: 0.2
  });

  const armorMaterials = [primaryArmorMat, secondaryArmorMat, darkFrameMat];

  // Ground contact shadow
  const shadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 2.6),
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.58
    })
  );
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.02;
  root.add(shadowMesh);

  // Active Turn Floor Ring
  const turnRing = new THREE.Mesh(
    new THREE.RingGeometry(1.1, 1.28, 36),
    new THREE.MeshBasicMaterial({
      color: emissiveHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    })
  );
  turnRing.rotation.x = -Math.PI / 2;
  turnRing.position.y = 0.03;
  root.add(turnRing);

  // 1. Pelvis, Championship Belt & Cute Chunky Boxer Boots
  const pelvis = new THREE.Group();
  pelvis.position.y = 0.92;
  root.add(pelvis);

  const trunks = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.5, 0.44, 20), secondaryArmorMat);
  trunks.castShadow = true;
  pelvis.add(trunks);

  // Golden Championship Belt + Buckle
  const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.16, 24), goldChampMat);
  belt.position.y = 0.15;
  pelvis.add(belt);

  const buckle = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 16), goldChampMat);
  buckle.rotation.x = Math.PI / 2;
  buckle.position.set(0, 0.15, 0.57);
  pelvis.add(buckle);

  const buildBoot = (xPos: number) => {
    const bootGroup = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.34, 0.68), primaryArmorMat);
    bootGroup.position.set(xPos, -0.74, 0.08);
    bootGroup.castShadow = true;

    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.1, 0.72), goldChampMat);
    sole.position.set(0, -0.14, 0);
    bootGroup.add(sole);

    const legCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.48, 14), chromeJointMat);
    legCyl.position.set(0, 0.36, -0.05);
    bootGroup.add(legCyl);

    pelvis.add(bootGroup);
    return bootGroup;
  };

  const leftBoot = buildBoot(-0.32);
  const rightBoot = buildBoot(0.32);

  // 2. Chubby Heroic Brawler Torso (Rounded Cylinder + Chest Plates)
  const torso = new THREE.Group();
  torso.position.y = 0.24;
  pelvis.add(torso);

  const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.54, 0.95, 24), primaryArmorMat);
  chest.position.y = 0.48;
  chest.castShadow = true;
  torso.add(chest);

  // Glowing Heart / Arc Energy Core on Chest
  const coreRing = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.045, 12, 24), goldChampMat);
  coreRing.position.set(0, 0.54, 0.62);
  torso.add(coreRing);

  const coreMesh = new THREE.Mesh(new THREE.SphereGeometry(0.16, 18, 18), emissiveMat);
  coreMesh.position.set(0, 0.54, 0.62);
  torso.add(coreMesh);

  // Cute Rounded Shoulder Pads
  [-0.76, 0.76].forEach((sx) => {
    const pad = new THREE.Mesh(new THREE.SphereGeometry(0.32, 18, 18), secondaryArmorMat);
    pad.scale.set(1.0, 0.85, 1.0);
    pad.position.set(sx, 0.82, 0);
    pad.castShadow = true;
    torso.add(pad);
  });

  // 3. Articulated Boxer Arms + Oversized Padded 3D Boxing Gloves
  const buildBoxerArm = (isLeft: boolean) => {
    const side = isLeft ? -1 : 1;
    const armGroup = new THREE.Group();
    armGroup.position.set(side * 0.78, 0.78, 0.1);
    torso.add(armGroup);

    const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.42, 12), chromeJointMat);
    upperArm.position.set(0, -0.18, 0.12);
    upperArm.rotation.x = -0.5;
    armGroup.add(upperArm);

    // Oversized 3D Padded Boxing Glove Group
    const gloveGroup = new THREE.Group();
    gloveGroup.position.set(side * -0.12, -0.22, 0.62);
    armGroup.add(gloveGroup);

    // Wrist tape cuff
    const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.24, 16), goldChampMat);
    cuff.rotation.x = Math.PI / 2;
    cuff.position.z = -0.22;
    gloveGroup.add(cuff);

    // Main padded boxing glove fist
    const fist = new THREE.Mesh(new THREE.SphereGeometry(0.38, 22, 22), gloveLeatherMat);
    fist.scale.set(0.95, 0.88, 1.18);
    fist.castShadow = true;
    gloveGroup.add(fist);

    // Cute padded thumb on inside of glove
    const thumb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), gloveLeatherMat);
    thumb.position.set(side * -0.26, 0.12, -0.05);
    gloveGroup.add(thumb);

    // Glowing impact knuckle stripe
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.08), emissiveMat);
    stripe.position.set(0, 0.05, 0.41);
    gloveGroup.add(stripe);

    return { armGroup, gloveGroup };
  };

  const { armGroup: leftArm, gloveGroup: leftGlove } = buildBoxerArm(true);
  const { armGroup: rightArm, gloveGroup: rightGlove } = buildBoxerArm(false);

  // 4. Big Cute Chibi Robot Head with Expressive Eyes & Eyebrows
  const head = new THREE.Group();
  head.position.set(0, 1.06, 0);
  torso.add(head);

  const neckSpring = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.18, 14), chromeJointMat);
  neckSpring.position.y = 0.04;
  head.add(neckSpring);

  // Rounded Chibi Helmet
  const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.72, 0.76), primaryArmorMat);
  helmet.position.y = 0.42;
  helmet.castShadow = true;
  head.add(helmet);

  // Cute Top Boxing Headgear / Crest
  const headgearTop = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.16, 0.8), secondaryArmorMat);
  headgearTop.position.set(0, 0.76, 0);
  head.add(headgearTop);

  // Cute Ear Pods + Springy Antennas
  [-0.48, 0.48].forEach((ex) => {
    const earCup = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16), goldChampMat);
    earCup.rotation.z = Math.PI / 2;
    earCup.position.set(ex, 0.42, 0);
    head.add(earCup);

    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.35, 8), chromeJointMat);
    ant.position.set(ex * 0.85, 0.92, 0);
    head.add(ant);

    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), emissiveMat);
    bulb.position.set(ex * 0.85, 1.12, 0);
    head.add(bulb);
  });

  // Glossy Black Face Screen
  const faceScreen = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.46, 0.1), visorMat);
  faceScreen.position.set(0, 0.4, 0.36);
  head.add(faceScreen);

  // Big Cute Glowing LED Eyes
  const eyeGeo = new THREE.SphereGeometry(0.11, 16, 16);
  const eyeLeft = new THREE.Mesh(eyeGeo, emissiveMat);
  eyeLeft.scale.set(1.0, 1.25, 0.35);
  eyeLeft.position.set(-0.18, 0.38, 0.41);
  head.add(eyeLeft);

  const eyeRight = new THREE.Mesh(eyeGeo, emissiveMat);
  eyeRight.scale.set(1.0, 1.25, 0.35);
  eyeRight.position.set(0.18, 0.38, 0.41);
  head.add(eyeRight);

  // Expressive Determined LED Eyebrows
  const browGeo = new THREE.BoxGeometry(0.2, 0.045, 0.04);
  const browLeft = new THREE.Mesh(browGeo, goldChampMat);
  browLeft.position.set(-0.18, 0.54, 0.42);
  browLeft.rotation.z = -0.18;
  head.add(browLeft);

  const browRight = new THREE.Mesh(browGeo, goldChampMat);
  browRight.position.set(0.18, 0.54, 0.42);
  browRight.rotation.z = 0.18;
  head.add(browRight);

  // 5. Dizzy Stars Crown (spins above head when low HP or knocked down)
  const dizzyCrown = new THREE.Group();
  dizzyCrown.position.set(0, 1.22, 0);
  dizzyCrown.visible = false;
  head.add(dizzyCrown);

  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), goldChampMat);
    star.position.set(Math.cos(angle) * 0.55, 0, Math.sin(angle) * 0.55);
    dizzyCrown.add(star);
  }

  return {
    root,
    pelvis,
    torso,
    head,
    leftArm,
    rightArm,
    leftGlove,
    rightGlove,
    leftBoot,
    rightBoot,
    coreMesh,
    eyeLeft,
    eyeRight,
    browLeft,
    browRight,
    dizzyCrown,
    turnRing,
    armorMaterials,
    emissiveMaterial: emissiveMat,
    baseX,
    facingDir,
    knockedOut: false
  };
}

export const RobotBattleArena3D: React.FC<RobotBattleArena3DProps> = ({
  blueName,
  redName,
  blueHp,
  redHp,
  maxHp = 100,
  activeTurn,
  attackTrigger,
  subtitle
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [cameraPreset, setCameraPreset] = useState<'wide' | 'cinematic' | 'blue' | 'red'>('wide');
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [comicBanner, setComicBanner] = useState<{ text: string; color: string } | null>(null);

  const stateRef = useRef({
    blueHp,
    redHp,
    maxHp,
    activeTurn,
    cameraPreset,
    activeAttack: null as {
      attacker: 'blue' | 'red';
      moveType: 'jab' | 'hook' | 'uppercut';
      progress: number;
      hit1: boolean;
      hit2: boolean;
    } | null,
    blueHitTimer: 0,
    redHitTimer: 0
  });

  useEffect(() => {
    stateRef.current.blueHp = blueHp;
    stateRef.current.redHp = redHp;
    stateRef.current.maxHp = maxHp;
    stateRef.current.activeTurn = activeTurn;
  }, [blueHp, redHp, maxHp, activeTurn]);

  useEffect(() => {
    stateRef.current.cameraPreset = cameraPreset;
  }, [cameraPreset]);

  const launchBoxingCombo = (
    attacker: 'blue' | 'red',
    moveType: 'jab' | 'hook' | 'uppercut' = 'uppercut'
  ) => {
    stateRef.current.activeAttack = {
      attacker,
      moveType,
      progress: 0,
      hit1: false,
      hit2: false
    };

    const callouts =
      moveType === 'jab'
        ? ['JAB KILAT! 🥊', 'DOUBLE JAB! 💥']
        : moveType === 'hook'
        ? ['HOOK PETIR! ⚡', 'SMASH HOOK! 🔥']
        : ['MEGA UPPERCUT! 🥊💥', 'REAL STEEL COMBO! ⚡'];
    const pick = callouts[Math.floor(Math.random() * callouts.length)];
    setComicBanner({
      text: pick,
      color: attacker === 'blue' ? 'from-sky-500 to-cyan-400' : 'from-rose-600 to-amber-500'
    });
    setTimeout(() => setComicBanner(null), 1300);
  };

  useEffect(() => {
    if (attackTrigger) {
      const moves: ('jab' | 'hook' | 'uppercut')[] = ['jab', 'hook', 'uppercut'];
      const chosen = moves[attackTrigger.id % moves.length];
      launchBoxingCombo(attackTrigger.attacker, chosen);
    }
  }, [attackTrigger]);

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
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060b16);
    scene.fog = new THREE.FogExp2(0x060b16, 0.028);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 120);
    camera.position.set(0, 4.4, 9.6);
    camera.lookAt(0, 1.6, 0);

    // Stadium Boxing Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.0);
    scene.add(hemiLight);

    const ringSpotLight = new THREE.DirectionalLight(0xfffbeb, 2.5);
    ringSpotLight.position.set(5, 13, 7);
    ringSpotLight.castShadow = !isSoftwareGl;
    ringSpotLight.shadow.mapSize.set(1024, 1024);
    ringSpotLight.shadow.camera.left = -7;
    ringSpotLight.shadow.camera.right = 7;
    ringSpotLight.shadow.camera.top = 7;
    ringSpotLight.shadow.camera.bottom = -7;
    ringSpotLight.shadow.bias = -0.0005;
    scene.add(ringSpotLight);

    const blueCornerLight = new THREE.PointLight(0x0ea5e9, 4, 14);
    blueCornerLight.position.set(-5, 4, 3);
    scene.add(blueCornerLight);

    const redCornerLight = new THREE.PointLight(0xf43f5e, 4, 14);
    redCornerLight.position.set(5, 4, 3);
    scene.add(redCornerLight);

    // 3D Championship Boxing Ring Platform & Ropes
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const matTex = createBoxingCanvasTexture(maxAniso);
    const shadowTex = createContactShadowTexture();

    const ringBase = new THREE.Mesh(
      new THREE.BoxGeometry(10.4, 0.8, 8.4),
      new THREE.MeshStandardMaterial({
        map: matTex,
        roughness: 0.4,
        metalness: 0.3
      })
    );
    ringBase.position.y = -0.4;
    ringBase.receiveShadow = true;
    scene.add(ringBase);

    // 4 Corner Turnbuckle Posts + 3 Glowing Boxing Ring Ropes
    const corners: [number, number, number][] = [
      [-4.8, 0, -3.8],
      [4.8, 0, -3.8],
      [4.8, 0, 3.8],
      [-4.8, 0, 3.8]
    ];
    corners.forEach(([cx, _, cz], idx) => {
      const postColor = idx === 0 || idx === 3 ? 0x0284c7 : 0xe11d48;
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.22, 2.6, 16),
        new THREE.MeshStandardMaterial({ color: postColor, metalness: 0.8, roughness: 0.2 })
      );
      post.position.set(cx, 1.3, cz);
      post.castShadow = true;
      scene.add(post);

      // Turnbuckle Top Cap
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 14, 14),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.15 })
      );
      cap.position.set(cx, 2.65, cz);
      scene.add(cap);
    });

    // 3 Horizontal Ring Ropes around Back, Left, and Right sides (Front rope lowered slightly for clear camera view)
    [0.7, 1.35, 2.0].forEach((ropeY, rIdx) => {
      const ropeColor = rIdx === 0 ? 0x38bdf8 : rIdx === 1 ? 0xf8fafc : 0xf43f5e;
      const ropeMat = new THREE.MeshStandardMaterial({
        color: ropeColor,
        emissive: ropeColor,
        emissiveIntensity: 0.45,
        roughness: 0.3
      });

      // Back rope
      const backRope = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 9.6, 10), ropeMat);
      backRope.rotation.z = Math.PI / 2;
      backRope.position.set(0, ropeY, -3.8);
      scene.add(backRope);

      // Left & Right ropes
      [-4.8, 4.8].forEach((rx) => {
        const sideRope = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 7.6, 10), ropeMat);
        sideRope.rotation.x = Math.PI / 2;
        sideRope.position.set(rx, ropeY, 0);
        scene.add(sideRope);
      });
    });

    // Build Left (Blue "Atom" Bot) & Right (Red "Zeus" Bot) Cute Boxing Robots
    const blueBot = buildCuteBoxerBot('blue', -2.35, 1, shadowTex);
    const redBot = buildCuteBoxerBot('red', 2.35, -1, shadowTex);
    scene.add(blueBot.root);
    scene.add(redBot.root);

    // 3D Punch Impact Shockwave Ring
    const punchRingGeo = new THREE.TorusGeometry(0.45, 0.09, 12, 28);
    punchRingGeo.rotateY(Math.PI / 2);
    const punchRingMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0
    });
    const punchRingMesh = new THREE.Mesh(punchRingGeo, punchRingMat);
    punchRingMesh.visible = false;
    scene.add(punchRingMesh);

    // Sparks & Comic Stars Pool
    const sparks: SparkParticle[] = [];
    const starGeo = new THREE.OctahedronGeometry(0.12, 0);
    for (let i = 0; i < 40; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xfacc15 : 0x38bdf8,
        transparent: true,
        opacity: 0
      });
      const mesh = new THREE.Mesh(starGeo, mat);
      mesh.visible = false;
      scene.add(mesh);
      sparks.push({
        mesh,
        vel: new THREE.Vector3(),
        life: 0,
        maxLife: 0.7,
        isStar: i % 2 === 0
      });
    }

    const debrisPool: DebrisPiece[] = [];
    const debGeo = new THREE.BoxGeometry(0.24, 0.2, 0.24);
    for (let i = 0; i < 20; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xfacc15 : 0xe11d48,
        metalness: 0.85,
        roughness: 0.2
      });
      const mesh = new THREE.Mesh(debGeo, mat);
      mesh.visible = false;
      scene.add(mesh);
      debrisPool.push({
        mesh,
        vel: new THREE.Vector3(),
        rotVel: new THREE.Vector3(),
        active: false
      });
    }

    const spawnPunchImpact = (x: number, y: number, count: number, isBlueAttacker: boolean) => {
      punchRingMesh.visible = true;
      punchRingMesh.position.set(x, y, 0.2);
      punchRingMesh.scale.set(0.3, 0.3, 0.3);
      punchRingMat.color.setHex(isBlueAttacker ? 0x38bdf8 : 0xfacc15);
      punchRingMat.opacity = 1.0;

      let spawned = 0;
      for (let i = 0; i < sparks.length && spawned < count; i++) {
        const sp = sparks[i];
        if (sp.life <= 0) {
          sp.maxLife = 0.65;
          sp.life = sp.maxLife;
          sp.mesh.visible = true;
          sp.mesh.position.set(x, y, (Math.random() - 0.5) * 0.5);
          (sp.mesh.material as THREE.MeshBasicMaterial).color.setHex(
            Math.random() > 0.4 ? 0xfacc15 : isBlueAttacker ? 0x00f5ff : 0xf43f5e
          );
          sp.vel.set(
            (Math.random() - 0.5) * 7.5,
            2.2 + Math.random() * 5.0,
            (Math.random() - 0.5) * 7.5
          );
          spawned++;
        }
      }
    };

    const triggerKnockout = (bot: CuteBoxerBot, isBlue: boolean) => {
      bot.knockedOut = true;
      bot.dizzyCrown.visible = true;
      spawnPunchImpact(bot.baseX, 1.8, 28, !isBlue);

      debrisPool.forEach((d, idx) => {
        d.active = true;
        d.mesh.visible = true;
        (d.mesh.material as THREE.MeshStandardMaterial).color.setHex(
          idx % 2 === 0 ? (isBlue ? 0x0ea5e9 : 0xf43f5e) : 0xfacc15
        );
        d.mesh.position.set(bot.baseX, 1.4, 0);
        d.vel.set((Math.random() - 0.5) * 8, 3.5 + Math.random() * 5.5, (Math.random() - 0.5) * 8);
        d.rotVel.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12);
      });
    };

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const clock = new THREE.Clock();
    let frameId = 0;

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

    function updateBoxerBot(
      bot: CuteBoxerBot,
      hp: number,
      maxHpVal: number,
      isBlue: boolean,
      hitTimer: number,
       isAttackingNow: boolean,
      elapsed: number,
      dt: number
    ) {
      const hpRatio = Math.max(0, Math.min(1, hp / maxHpVal));
      const isDizzy = hpRatio < 0.45 && hpRatio > 0;
      const isDead = hp <= 0;

      // Reset K.O. state if game restarted
      if (!isDead && bot.knockedOut) {
        bot.knockedOut = false;
        bot.root.rotation.z = 0;
        bot.root.position.y = 0;
        bot.dizzyCrown.visible = false;
        debrisPool.forEach((d) => {
          d.active = false;
          d.mesh.visible = false;
        });
      }

      if (isDead && !bot.knockedOut) {
        triggerKnockout(bot, isBlue);
      }

      if (bot.knockedOut) {
        // Cute K.O. fall backward onto the boxing canvas with spinning dizzy stars!
        const targetFallZ = isBlue ? Math.PI * 0.44 : -Math.PI * 0.44;
        bot.root.rotation.z = THREE.MathUtils.damp(bot.root.rotation.z, targetFallZ, 6, dt);
        bot.dizzyCrown.visible = true;
        bot.dizzyCrown.rotation.y = elapsed * 5.5;
        bot.turnRing.visible = false;
        return;
      }

      // Active turn floor ring
      const activeTurnVal = stateRef.current.activeTurn;
      bot.turnRing.visible =
        activeTurnVal === 'both' ||
        (isBlue && activeTurnVal === 'blue') ||
        (!isBlue && activeTurnVal === 'red');
      bot.turnRing.rotation.z = elapsed * 1.6 * bot.facingDir;

      // Cute Real Steel Rhythmic Boxing Bounce & Bob-and-Weave Footwork!
      const phase = isBlue ? 0 : Math.PI * 0.75;
      const bounce = Math.abs(Math.sin(elapsed * 6.5 + phase)) * 0.14;
      const weaveZ = Math.sin(elapsed * 3.25 + phase) * 0.12;
      bot.pelvis.position.y = 0.92 + bounce;
      bot.torso.rotation.z = weaveZ;

      // Alternating cute footwork hops
      bot.leftBoot.position.y = -0.74 + Math.max(0, Math.sin(elapsed * 6.5 + phase)) * 0.08;
      bot.rightBoot.position.y = -0.74 + Math.max(0, -Math.sin(elapsed * 6.5 + phase)) * 0.08;

      // Peek-a-boo Boxing Guard Bobbing (when not throwing a punch)
      if (!isAttackingNow) {
        bot.leftGlove.position.set(0.14, -0.1 + Math.sin(elapsed * 7 + phase) * 0.06, 0.62);
        bot.rightGlove.position.set(-0.14, -0.14 + Math.cos(elapsed * 7 + phase) * 0.06, 0.58);
        bot.leftArm.rotation.x = THREE.MathUtils.damp(bot.leftArm.rotation.x, -0.35, 10, dt);
        bot.rightArm.rotation.x = THREE.MathUtils.damp(bot.rightArm.rotation.x, -0.35, 10, dt);
        bot.torso.rotation.y = THREE.MathUtils.damp(
          bot.torso.rotation.y,
          Math.sin(elapsed * 3.25 + phase) * 0.18,
          8,
          dt
        );
      }

      // Cute Blinking & Dizzy Expression
      const blink = Math.sin(elapsed * 2.3 + phase) > 0.96 ? 0.15 : 1.25;
      bot.eyeLeft.scale.y = blink;
      bot.eyeRight.scale.y = blink;

      if (isDizzy) {
        bot.dizzyCrown.visible = true;
        bot.dizzyCrown.rotation.y = elapsed * 4.5;
        bot.head.rotation.z = Math.sin(elapsed * 10) * 0.16;
      } else {
        bot.dizzyCrown.visible = false;
        bot.head.rotation.z = Math.sin(elapsed * 3.25 + phase) * 0.06;
      }

      // Hit Reaction (Chin snaps back & orange flash when punched!)
      if (hitTimer > 0) {
        const shake = Math.sin(hitTimer * 60) * 0.24;
        bot.root.position.x = bot.baseX - bot.facingDir * 0.45 + shake;
        bot.head.rotation.x = -0.48;
        bot.torso.rotation.x = -0.26;
        bot.armorMaterials.forEach((m) => {
          m.emissive.setHex(0xf97316);
          m.emissiveIntensity = 1.4;
        });
      } else if (!isAttackingNow) {
        bot.root.position.x = THREE.MathUtils.damp(bot.root.position.x, bot.baseX, 8, dt);
        bot.head.rotation.x = THREE.MathUtils.damp(bot.head.rotation.x, 0, 8, dt);
        bot.torso.rotation.x = THREE.MathUtils.damp(bot.torso.rotation.x, 0.08, 8, dt);
        bot.armorMaterials.forEach((m) => {
          m.emissive.setHex(0x000000);
          m.emissiveIntensity = 0;
        });
      }
    }

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      if (stateRef.current.blueHitTimer > 0) {
        stateRef.current.blueHitTimer = Math.max(0, stateRef.current.blueHitTimer - dt);
      }
      if (stateRef.current.redHitTimer > 0) {
        stateRef.current.redHitTimer = Math.max(0, stateRef.current.redHitTimer - dt);
      }

      // Real Steel Dash-In & Multi-Punch Boxing Combo Choreography
      const atk = stateRef.current.activeAttack;
      if (atk) {
        atk.progress += dt * 1.45;
        const attacker = atk.attacker === 'blue' ? blueBot : redBot;
        const defender = atk.attacker === 'blue' ? redBot : blueBot;
        const dir = attacker.facingDir;

        // Target close-quarters boxing position right in front of defender
        const closeX = defender.baseX - dir * 1.45;

        if (atk.progress < 0.25) {
          // 1. Dash forward across the ring!
          const t = atk.progress / 0.25;
          attacker.root.position.x = THREE.MathUtils.lerp(attacker.baseX, closeX, t);
          attacker.torso.rotation.x = 0.22;
        } else if (atk.progress < 0.55) {
          // 2. First Punch: Fast Left Jab!
          const p1 = (atk.progress - 0.25) / 0.3;
          attacker.root.position.x = closeX;
          const jabExtend = Math.sin(p1 * Math.PI);
          attacker.leftGlove.position.z = 0.62 + jabExtend * 0.95;
          attacker.leftGlove.scale.setScalar(1 + jabExtend * 0.35);
          attacker.torso.rotation.y = -0.35 * jabExtend;

          if (p1 > 0.45 && !atk.hit1) {
            atk.hit1 = true;
            if (atk.attacker === 'blue') stateRef.current.redHitTimer = 0.35;
            else stateRef.current.blueHitTimer = 0.35;
            spawnPunchImpact(defender.baseX - dir * 0.4, 1.75, 14, atk.attacker === 'blue');
          }
        } else if (atk.progress < 0.92) {
          // 3. Second Punch: Giant Right Hook / Jumping Uppercut!
          const p2 = (atk.progress - 0.55) / 0.37;
          const powExtend = Math.sin(p2 * Math.PI);
          attacker.leftGlove.scale.setScalar(1);
          attacker.rightGlove.position.z = 0.58 + powExtend * 1.15;
          attacker.rightGlove.position.y = -0.14 + powExtend * 0.55;
          attacker.rightGlove.scale.setScalar(1 + powExtend * 0.55);
          attacker.torso.rotation.y = 0.48 * powExtend;
          attacker.pelvis.position.y = 0.92 + powExtend * 0.42; // Jumping uppercut hop!

          if (p2 > 0.45 && !atk.hit2) {
            atk.hit2 = true;
            if (atk.attacker === 'blue') stateRef.current.redHitTimer = 0.55;
            else stateRef.current.blueHitTimer = 0.55;
            spawnPunchImpact(defender.baseX - dir * 0.3, 2.0, 22, atk.attacker === 'blue');
          }
        } else {
          // 4. Hop back to corner guard stance
          attacker.rightGlove.scale.setScalar(1);
          attacker.leftGlove.scale.setScalar(1);
          attacker.root.position.x = THREE.MathUtils.damp(
            attacker.root.position.x,
            attacker.baseX,
            10,
            dt
          );
          if (atk.progress >= 1.2) {
            stateRef.current.activeAttack = null;
          }
        }
      }

      updateBoxerBot(
        blueBot,
        stateRef.current.blueHp,
        stateRef.current.maxHp,
        true,
        stateRef.current.blueHitTimer,
        atk?.attacker === 'blue',
        elapsed,
        dt
      );
      updateBoxerBot(
        redBot,
        stateRef.current.redHp,
        stateRef.current.maxHp,
        false,
        stateRef.current.redHitTimer,
        atk?.attacker === 'red',
        elapsed,
        dt
      );

      // Update Punch Shockwave Ring
      if (punchRingMesh.visible) {
        punchRingMesh.scale.addScalar(dt * 12);
        punchRingMat.opacity = Math.max(0, punchRingMat.opacity - dt * 2.4);
        if (punchRingMat.opacity <= 0.01) punchRingMesh.visible = false;
      }

      // Update Sparks & Stars
      for (let i = 0; i < sparks.length; i++) {
        const sp = sparks[i];
        if (sp.life > 0) {
          sp.life -= dt;
          if (sp.life <= 0) {
            sp.mesh.visible = false;
          } else {
            sp.mesh.position.addScaledVector(sp.vel, dt);
            sp.vel.y -= 11.0 * dt;
            sp.mesh.rotation.y += 8 * dt;
            sp.mesh.rotation.z += 6 * dt;
            (sp.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, sp.life / sp.maxLife);
          }
        }
      }

      // Update K.O. Debris
      for (let i = 0; i < debrisPool.length; i++) {
        const d = debrisPool[i];
        if (d.active) {
          d.mesh.position.addScaledVector(d.vel, dt);
          d.vel.y -= 14.0 * dt;
          d.mesh.rotation.x += d.rotVel.x * dt;
          d.mesh.rotation.y += d.rotVel.y * dt;
          if (d.mesh.position.y < 0.14) {
            d.mesh.position.y = 0.14;
            d.vel.y = Math.abs(d.vel.y) * 0.45;
            d.vel.x *= 0.8;
            d.vel.z *= 0.8;
          }
        }
      }

      // Camera Tracking
      const preset = stateRef.current.cameraPreset;
      if (preset === 'cinematic') {
        _targetCamPos.set(Math.sin(elapsed * 0.5) * 3.4, 3.1, 7.8);
        _targetLookAt.set(0, 1.5, 0);
      } else if (preset === 'blue') {
        _targetCamPos.set(-4.8, 2.8, 4.8);
        _targetLookAt.set(1.0, 1.6, 0);
      } else if (preset === 'red') {
        _targetCamPos.set(4.8, 2.8, 4.8);
        _targetLookAt.set(-1.0, 1.6, 0);
      } else {
        _targetCamPos.set(0, 3.9, 8.6);
        _targetLookAt.set(0, 1.55, 0);
      }

      // Impact camera punch-shake
      if (stateRef.current.blueHitTimer > 0.15 || stateRef.current.redHitTimer > 0.15) {
        _targetCamPos.x += Math.sin(elapsed * 70) * 0.22;
        _targetCamPos.y += Math.cos(elapsed * 65) * 0.15;
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCamPos.x, 5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCamPos.y, 5, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetCamPos.z, 5, dt);

      _currentLookAt.x = THREE.MathUtils.damp(_currentLookAt.x, _targetLookAt.x, 6, dt);
      _currentLookAt.y = THREE.MathUtils.damp(_currentLookAt.y, _targetLookAt.y, 6, dt);
      _currentLookAt.z = THREE.MathUtils.damp(_currentLookAt.z, _targetLookAt.z, 6, dt);
      camera.lookAt(_currentLookAt);

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

  const bluePercent = Math.max(0, Math.min(100, Math.round((blueHp / maxHp) * 100)));
  const redPercent = Math.max(0, Math.min(100, Math.round((redHp / maxHp) * 100)));

  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] flex-1 rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl select-none">
      {/* Dedicated WebGL Mount */}
      <div ref={canvasMountRef} className="absolute inset-0 w-full h-full" />

      {/* Comic Punch Callout Overlay ("JAB!", "MEGA UPPERCUT!") */}
      {comicBanner && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
          <div
            className={`px-4 py-1.5 rounded-xl bg-gradient-to-r ${comicBanner.color} text-white font-black text-xs sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(250,204,21,0.7)] border-2 border-white -rotate-2 whitespace-nowrap`}
          >
            {comicBanner.text}
          </div>
        </div>
      )}

      {/* Sleek Proportional Top HUD Boxing Championship Bar */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start justify-between gap-2 sm:gap-3 pointer-events-none">
        {/* Blue Boxer Card */}
        <div className="w-[48%] sm:w-60 p-2 sm:p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-sky-500/50 text-white shadow-lg">
          <div className="flex items-center justify-between gap-1 text-[11px] sm:text-xs font-extrabold">
            <span className="truncate text-sky-300 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">🥊 {blueName}</span>
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-sky-200 shrink-0">{bluePercent}% HP</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700">
            <div
              className={`h-full transition-all duration-300 ${
                bluePercent > 60
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-300'
                  : bluePercent > 30
                  ? 'bg-amber-500'
                  : 'bg-rose-600'
              }`}
              style={{ width: `${bluePercent}%` }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-300">
            <span className="truncate">
              {bluePercent <= 0
                ? '💫 K.O.!'
                : bluePercent < 45
                ? '😵 Pusing'
                : '🥊 Siap Tinju'}
            </span>
            {activeTurn === 'blue' && bluePercent > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-sky-500/30 text-sky-200 font-bold shrink-0">
                GILIRAN
              </span>
            )}
          </div>
        </div>

        {/* Center Championship Badge */}
        <div className="hidden xl:flex flex-col items-center px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-400/50 text-center shadow-lg">
          <span className="text-[10px] font-black tracking-widest uppercase text-amber-400 flex items-center gap-1">
            <Swords className="w-3 h-3" />
            <span>RING REAL BOT 3D</span>
          </span>
          <span className="text-[10px] text-slate-300 max-w-[180px] truncate">
            {subtitle || 'Jawab tepat untuk melancarkan Combo Tinju!'}
          </span>
        </div>

        {/* Red Boxer Card */}
        <div className="w-[48%] sm:w-60 p-2 sm:p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-rose-500/50 text-white shadow-lg">
          <div className="flex items-center justify-between gap-1 text-[11px] sm:text-xs font-extrabold">
            <span className="truncate text-rose-300 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">🥊 {redName}</span>
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-rose-200 shrink-0">{redPercent}% HP</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700">
            <div
              className={`h-full transition-all duration-300 ${
                redPercent > 60
                  ? 'bg-gradient-to-r from-rose-500 to-amber-400'
                  : redPercent > 30
                  ? 'bg-amber-500'
                  : 'bg-red-700'
              }`}
              style={{ width: `${redPercent}%` }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-300">
            <span className="truncate">
              {redPercent <= 0
                ? '💫 K.O.!'
                : redPercent < 45
                ? '😵 Pusing'
                : '🥊 Siap Tinju'}
            </span>
            {activeTurn === 'red' && redPercent > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-rose-500/30 text-rose-200 font-bold shrink-0">
                GILIRAN
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Compact Collapsible Bottom Boxing Action & Camera Dock */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center max-w-[96%]">
        <button
          type="button"
          onClick={() => setControlsCollapsed((prev) => !prev)}
          className="px-2.5 py-0.5 rounded-t-lg bg-slate-900/90 border border-b-0 border-slate-700 text-[10px] font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          {controlsCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3" />
              <span>Kamera & Jurus Tinju</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              <span>Tutup Panel Ring</span>
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
                { id: 'wide', label: 'Ring' },
                { id: 'cinematic', label: 'Sinematik' },
                { id: 'blue', label: 'Biru' },
                { id: 'red', label: 'Merah' }
              ] as const
            ).map((cam) => (
              <button
                key={cam.id}
                type="button"
                onClick={() => setCameraPreset(cam.id)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                  cameraPreset === cam.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cam.label}
              </button>
            ))}

            <div className="h-3.5 w-[1px] bg-slate-700 mx-0.5 hidden sm:block" />

            <button
              type="button"
              onClick={() => launchBoxingCombo('blue', 'jab')}
              className="px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Zap className="w-3 h-3" />
              <span>Jab Biru</span>
            </button>

            <button
              type="button"
              onClick={() => launchBoxingCombo('blue', 'uppercut')}
              className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Uppercut Biru</span>
            </button>

            <button
              type="button"
              onClick={() => launchBoxingCombo('red', 'uppercut')}
              className="px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Flame className="w-3 h-3" />
              <span>Uppercut Merah</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
