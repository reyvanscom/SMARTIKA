import React from 'react';

interface PictureIllustrationProps {
  answerKey: string;
  iconName?: string;
  title?: string;
  className?: string;
  customImageUrl?: string;
}

export const PictureIllustration: React.FC<PictureIllustrationProps> = ({
  answerKey,
  iconName,
  title = '',
  className = 'w-full h-full',
  customImageUrl
}) => {
  if (customImageUrl) {
    return (
      <img
        src={customImageUrl}
        alt={title || answerKey}
        className={`${className} object-cover rounded-2xl shadow-sm`}
      />
    );
  }

  const normKey = (answerKey || title).toLowerCase();

  // 1. Situs Resmi Sekolah
  if (normKey.includes('sekolah') || normKey.includes('sch.id')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" rx="20" fill="url(#skyGrad)" />
        {/* Ground */}
        <rect y="160" width="200" height="40" rx="4" fill="#65a30d" />
        {/* School Building Base */}
        <rect x="40" y="80" width="120" height="80" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
        {/* Red Roof */}
        <polygon points="100,30 25,80 175,80" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
        {/* Flag Pole */}
        <line x1="100" y1="30" x2="100" y2="10" stroke="#475569" strokeWidth="3" />
        <polygon points="100,10 120,16 100,22" fill="#ef4444" />
        {/* Clock Tower / Round Window */}
        <circle cx="100" cy="60" r="10" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
        <line x1="100" y1="60" x2="100" y2="54" stroke="#0f172a" strokeWidth="2" />
        <line x1="100" y1="60" x2="105" y2="60" stroke="#0f172a" strokeWidth="2" />
        {/* Pillars & Doors */}
        <rect x="52" y="100" width="16" height="20" fill="#38bdf8" stroke="#334155" strokeWidth="2" />
        <rect x="132" y="100" width="16" height="20" fill="#38bdf8" stroke="#334155" strokeWidth="2" />
        <rect x="88" y="120" width="24" height="40" rx="3" fill="#92400e" stroke="#334155" strokeWidth="2.5" />
        <circle cx="94" cy="140" r="2" fill="#fef08a" />
        {/* School Bushes */}
        <circle cx="35" cy="160" r="14" fill="#16a34a" />
        <circle cx="165" cy="160" r="14" fill="#16a34a" />
        {/* Official Shield Stamp Badge in corner */}
        <path d="M145 25 L170 35 L170 60 C170 80 145 92 145 92 C145 92 120 80 120 60 L120 35 Z" fill="#059669" stroke="#ffffff" strokeWidth="2" />
        <path d="M133 55 L141 63 L157 45" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 2. Artikel Clickbait
  if (normKey.includes('clickbait') || normKey.includes('umpan klik')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#fff1f2" />
        {/* Browser window */}
        <rect x="25" y="25" width="150" height="150" rx="12" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
        <rect x="25" y="25" width="150" height="25" rx="12" fill="#fecdd3" />
        <circle cx="38" cy="37" r="4" fill="#f43f5e" />
        <circle cx="50" cy="37" r="4" fill="#fb7185" />
        <circle cx="62" cy="37" r="4" fill="#fda4af" />
        {/* Sensational Warning Banner */}
        <rect x="35" y="60" width="130" height="30" rx="6" fill="#e11d48" />
        {/* Exclamation marks in triangles */}
        <polygon points="100,95 80,135 120,135" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
        <circle cx="100" cy="128" r="2.5" fill="#000000" />
        <line x1="100" y1="108" x2="100" y2="122" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        {/* Flashing pointer finger clicking */}
        <path d="M125 120 L135 150 L145 145 L155 165 L165 160 L155 140 L165 135 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
        {/* Sparks */}
        <line x1="60" y1="105" x2="45" y2="100" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
        <line x1="65" y1="115" x2="50" y2="120" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 3. Teks Digital / PDF / Dokumen
  if (normKey.includes('pdf') || normKey.includes('dokumen') || normKey.includes('buku digital')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#fef2f2" />
        {/* PDF Document Paper */}
        <path d="M50 30 L120 30 L150 60 L150 170 L50 170 Z" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
        {/* Folded Corner */}
        <polygon points="120,30 150,60 120,60" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
        {/* Red PDF Tag Banner */}
        <rect x="40" y="70" width="70" height="28" rx="5" fill="#dc2626" />
        {/* Document Content Lines */}
        <line x1="65" y1="115" x2="135" y2="115" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <line x1="65" y1="130" x2="135" y2="130" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <line x1="65" y1="145" x2="110" y2="145" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        {/* Digital Device Silhouette Tablet Behind */}
        <rect x="135" y="105" width="40" height="60" rx="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="140" y="112" width="30" height="42" fill="#38bdf8" />
      </svg>
    );
  }

  // 4. Koneksi Aman HTTPS / Gembok
  if (normKey.includes('https') || normKey.includes('ssl') || normKey.includes('gembok')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f0fdf4" />
        {/* Glowing Shield Ring */}
        <circle cx="100" cy="100" r="75" fill="#dcfce7" stroke="#22c55e" strokeWidth="3" strokeDasharray="6 4" />
        {/* Padlock Body */}
        <rect x="65" y="90" width="70" height="60" rx="12" fill="#16a34a" stroke="#14532d" strokeWidth="3.5" />
        {/* Padlock Shackle */}
        <path d="M80 90 L80 65 C80 50 120 50 120 65 L120 90" fill="none" stroke="#64748b" strokeWidth="9" strokeLinecap="round" />
        {/* Keyhole */}
        <circle cx="100" cy="115" r="7" fill="#ffffff" />
        <polygon points="97,118 103,118 102,132 98,132" fill="#ffffff" />
        {/* Green Sparkles */}
        <path d="M45 55 L50 65 L45 75 L40 65 Z" fill="#22c55e" />
        <path d="M155 140 L160 148 L155 156 L150 148 Z" fill="#22c55e" />
      </svg>
    );
  }

  // 5. Audio Digital / Podcast
  if (normKey.includes('audio') || normKey.includes('podcast') || normKey.includes('earphone') || normKey.includes('tws')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#faf5ff" />
        {/* Headband */}
        <path d="M50 110 C50 50 150 50 150 110" fill="none" stroke="#7e22ce" strokeWidth="10" strokeLinecap="round" />
        {/* Left Earcup */}
        <rect x="36" y="95" width="26" height="42" rx="10" fill="#a855f7" stroke="#581c87" strokeWidth="3" />
        <rect x="42" y="103" width="6" height="26" rx="3" fill="#ffffff" opacity="0.6" />
        {/* Right Earcup */}
        <rect x="138" y="95" width="26" height="42" rx="10" fill="#a855f7" stroke="#581c87" strokeWidth="3" />
        <rect x="152" y="103" width="6" height="26" rx="3" fill="#ffffff" opacity="0.6" />
        {/* Sound Waves in Center */}
        <line x1="80" y1="110" x2="80" y2="125" stroke="#c084fc" strokeWidth="4" strokeLinecap="round" />
        <line x1="90" y1="100" x2="90" y2="135" stroke="#9333ea" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="90" x2="100" y2="145" stroke="#7e22ce" strokeWidth="4" strokeLinecap="round" />
        <line x1="110" y1="100" x2="110" y2="135" stroke="#9333ea" strokeWidth="4" strokeLinecap="round" />
        <line x1="120" y1="110" x2="120" y2="125" stroke="#c084fc" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 6. Bluetooth
  if (normKey.includes('bluetooth')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#eff6ff" />
        {/* Blue Rounded Diamond Badge */}
        <path d="M100 25 L165 100 L100 175 L35 100 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3" />
        {/* Bluetooth Symbol */}
        <path
          d="M100 45 L100 155 M100 45 L135 75 L100 100 L135 125 L100 155 M75 75 L100 100 L75 125"
          fill="none"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 7. Kabel USB-C / LAN RJ45
  if (normKey.includes('kabel') || normKey.includes('usb') || normKey.includes('rj45')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Curving Cable */}
        <path d="M20 160 C60 160 80 120 120 120 L135 120" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" />
        {/* Connector Shell */}
        <rect x="130" y="102" width="36" height="36" rx="6" fill="#334155" stroke="#0f172a" strokeWidth="2.5" />
        {/* Metal Tip */}
        <rect x="166" y="108" width="20" height="24" rx="4" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
        {/* Gold Pins */}
        <line x1="172" y1="114" x2="182" y2="114" stroke="#eab308" strokeWidth="2.5" />
        <line x1="172" y1="120" x2="182" y2="120" stroke="#eab308" strokeWidth="2.5" />
        <line x1="172" y1="126" x2="182" y2="126" stroke="#eab308" strokeWidth="2.5" />
      </svg>
    );
  }

  // 8. Sinyal Wi-Fi / Hotspot
  if (normKey.includes('wi-fi') || normKey.includes('wifi') || normKey.includes('sinyal') || normKey.includes('hotspot')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#eff6ff" />
        {/* Base Dot */}
        <circle cx="100" cy="155" r="10" fill="#2563eb" />
        {/* First Arc */}
        <path d="M80 135 C92 124 108 124 120 135" fill="none" stroke="#2563eb" strokeWidth="9" strokeLinecap="round" />
        {/* Second Arc */}
        <path d="M60 110 C82 92 118 92 140 110" fill="none" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" />
        {/* Third Outer Arc */}
        <path d="M40 85 C75 58 125 58 160 85" fill="none" stroke="#60a5fa" strokeWidth="9" strokeLinecap="round" />
      </svg>
    );
  }

  // 9. Laptop / Komputer
  if (normKey.includes('laptop') || normKey.includes('komputer')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f0f9ff" />
        {/* Laptop Screen Bezel */}
        <rect x="42" y="45" width="116" height="78" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
        {/* Screen Glass */}
        <rect x="48" y="51" width="104" height="66" rx="4" fill="#0284c7" />
        {/* Desktop Interface Lines */}
        <rect x="54" y="58" width="45" height="30" rx="3" fill="#ffffff" opacity="0.8" />
        <rect x="105" y="58" width="40" height="18" rx="2" fill="#38bdf8" />
        <line x1="105" y1="84" x2="135" y2="84" stroke="#ffffff" strokeWidth="2" />
        {/* Webcam */}
        <circle cx="100" cy="48" r="1.5" fill="#94a3b8" />
        {/* Laptop Base Keyboard */}
        <path d="M26 123 L174 123 L162 145 L38 145 Z" fill="#64748b" stroke="#334155" strokeWidth="3" />
        {/* Trackpad */}
        <rect x="85" y="132" width="30" height="9" rx="2" fill="#94a3b8" />
      </svg>
    );
  }

  // 10. Layar Sentuh IFP / TV
  if (normKey.includes('ifp') || normKey.includes('layar sentuh') || normKey.includes('tv')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Big Smart IFP Display Frame */}
        <rect x="30" y="35" width="140" height="95" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="4" />
        {/* Screen Display */}
        <rect x="36" y="41" width="128" height="83" fill="#1e1b4b" />
        {/* Colorful Presentation Slide */}
        <rect x="46" y="50" width="60" height="10" rx="3" fill="#38bdf8" />
        <circle cx="65" cy="85" r="18" fill="#ec4899" />
        <polygon points="110,65 140,85 110,105" fill="#f59e0b" />
        {/* IFP Stand / Legs */}
        <line x1="70" y1="130" x2="60" y2="165" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <line x1="130" y1="130" x2="140" y2="165" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <line x1="45" y1="165" x2="75" y2="165" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        <line x1="125" y1="165" x2="155" y2="165" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 10b. Virtual Reality (VR Headset)
  if (normKey.includes('virtual reality') || normKey.includes('vr')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#fdf4ff" />
        {/* Head Strap */}
        <path d="M30 100 C30 65 170 65 170 100" fill="none" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
        {/* VR Visor Housing */}
        <rect x="42" y="75" width="116" height="60" rx="18" fill="#1e1b4b" stroke="#0f172a" strokeWidth="3.5" />
        {/* Curved Glass Front Screen */}
        <rect x="52" y="85" width="96" height="40" rx="12" fill="#7c3aed" />
        {/* Sensor cameras */}
        <circle cx="60" cy="95" r="3.5" fill="#38bdf8" />
        <circle cx="140" cy="95" r="3.5" fill="#38bdf8" />
        <circle cx="60" cy="115" r="3.5" fill="#38bdf8" />
        <circle cx="140" cy="115" r="3.5" fill="#38bdf8" />
        {/* Neon Light Strip */}
        <path d="M72 105 L128 105" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 10c. Augmented Reality (AR 3D Object Projection)
  if (normKey.includes('augmented reality') || normKey.includes('ar')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#eff6ff" />
        {/* Smartphone holding in hand */}
        <rect x="60" y="45" width="80" height="130" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="3" />
        <rect x="66" y="58" width="68" height="104" rx="6" fill="#1e293b" />
        {/* Real camera view room background */}
        <line x1="66" y1="125" x2="134" y2="125" stroke="#475569" strokeWidth="2" />
        {/* Projected 3D Hologram Cube Floating on screen */}
        <polygon points="100,75 125,90 100,105 75,90" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        <polygon points="75,90 100,105 100,132 75,117" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <polygon points="100,105 125,90 125,117 100,132" fill="#0ea5e9" stroke="#0369a1" strokeWidth="2" />
        {/* Target Reticle Tracking Circles */}
        <circle cx="100" cy="104" r="28" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="100" cy="104" r="3" fill="#22c55e" />
      </svg>
    );
  }

  // 11. Robot Edukasi / Robot Algoritma
  if (normKey.includes('robot')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f5f3ff" />
        {/* Antenna */}
        <line x1="100" y1="45" x2="100" y2="25" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="20" r="7" fill="#f59e0b" />
        {/* Head */}
        <rect x="60" y="45" width="80" height="48" rx="14" fill="#8b5cf6" stroke="#5b21b6" strokeWidth="3" />
        {/* Visor Screen */}
        <rect x="70" y="54" width="60" height="26" rx="8" fill="#1e1b4b" />
        <circle cx="85" cy="67" r="6" fill="#38bdf8" />
        <circle cx="115" cy="67" r="6" fill="#38bdf8" />
        {/* Body */}
        <rect x="66" y="100" width="68" height="45" rx="10" fill="#a78bfa" stroke="#5b21b6" strokeWidth="3" />
        {/* Reactor */}
        <circle cx="100" cy="122" r="10" fill="#10b981" />
        {/* Wheels / Treads */}
        <rect x="58" y="148" width="84" height="20" rx="8" fill="#334155" stroke="#0f172a" strokeWidth="3" />
        <circle cx="72" cy="158" r="5" fill="#cbd5e1" />
        <circle cx="100" cy="158" r="5" fill="#cbd5e1" />
        <circle cx="128" cy="158" r="5" fill="#cbd5e1" />
      </svg>
    );
  }

  // 12. Dekomposisi / Diagram Blok
  if (normKey.includes('dekomposisi')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f0fdfa" />
        {/* 4 Separated Module Blocks */}
        <rect x="40" y="40" width="52" height="52" rx="10" fill="#0d9488" stroke="#115e59" strokeWidth="3" />
        <rect x="108" y="40" width="52" height="52" rx="10" fill="#14b8a6" stroke="#115e59" strokeWidth="3" />
        <rect x="40" y="108" width="52" height="52" rx="10" fill="#2dd4bf" stroke="#115e59" strokeWidth="3" />
        <rect x="108" y="108" width="52" height="52" rx="10" fill="#5eead4" stroke="#115e59" strokeWidth="3" />
        {/* Arrows connecting or decomposing */}
        <line x1="100" y1="66" x2="100" y2="134" stroke="#0f766e" strokeWidth="3" strokeDasharray="4 3" />
        <line x1="66" y1="100" x2="134" y2="100" stroke="#0f766e" strokeWidth="3" strokeDasharray="4 3" />
      </svg>
    );
  }

  // 13. Pengenalan Pola / Fingerprint
  if (normKey.includes('pola') || normKey.includes('fingerprint') || normKey.includes('sidik')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#ecfeff" />
        {/* Concentric curved fingerprint pattern */}
        <circle cx="100" cy="100" r="14" fill="none" stroke="#0891b2" strokeWidth="5" />
        <path d="M80 110 C80 80 120 80 120 110" fill="none" stroke="#0891b2" strokeWidth="5" strokeLinecap="round" />
        <path d="M68 120 C68 65 132 65 132 120" fill="none" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />
        <path d="M56 130 C56 50 144 50 144 130" fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" />
        <path d="M46 142 C46 38 154 38 154 142" fill="none" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  // 14. Algoritma / Flowchart
  if (normKey.includes('algoritma') || normKey.includes('flowchart') || normKey.includes('diagram alur')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f0fdf4" />
        {/* Start Oval */}
        <rect x="65" y="30" width="70" height="28" rx="14" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
        {/* Arrow Down */}
        <line x1="100" y1="58" x2="100" y2="78" stroke="#15803d" strokeWidth="3" />
        <polygon points="100,82 95,74 105,74" fill="#15803d" />
        {/* Decision Diamond */}
        <polygon points="100,84 135,110 100,136 65,110" fill="#eab308" stroke="#a16207" strokeWidth="2.5" />
        {/* Arrow Down */}
        <line x1="100" y1="136" x2="100" y2="152" stroke="#15803d" strokeWidth="3" />
        <polygon points="100,156 95,148 105,148" fill="#15803d" />
        {/* Process Box / Finish */}
        <rect x="65" y="156" width="70" height="26" rx="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
      </svg>
    );
  }

  // 15. CPU / Processor
  if (normKey.includes('cpu') || normKey.includes('processor')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Gold Pins Surrounding */}
        <rect x="42" y="42" width="116" height="116" rx="8" fill="#0f172a" stroke="#eab308" strokeWidth="5" />
        {/* Chip Heat Spreader */}
        <rect x="58" y="58" width="84" height="84" rx="6" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
        {/* Core Silicon Die */}
        <rect x="76" y="76" width="48" height="48" rx="4" fill="#1e293b" />
        <circle cx="100" cy="100" r="14" fill="#38bdf8" opacity="0.8" />
        {/* Corner Triangle Notch */}
        <polygon points="46,46 56,46 46,56" fill="#eab308" />
      </svg>
    );
  }

  // 16. Keyboard
  if (normKey.includes('keyboard')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f1f5f9" />
        {/* Keyboard Body */}
        <rect x="25" y="60" width="150" height="85" rx="10" fill="#334155" stroke="#0f172a" strokeWidth="3" />
        {/* Row 1 Keys */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={`r1-${i}`} x={34 + i * 19} y={70} width="15" height="12" rx="3" fill="#f8fafc" />
        ))}
        {/* Row 2 Keys */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={`r2-${i}`} x={34 + i * 19} y={88} width="15" height="12" rx="3" fill="#f8fafc" />
        ))}
        {/* Row 3 Spacebar */}
        <rect x="34" y="106" width="22" height="12" rx="3" fill="#cbd5e1" />
        <rect x="62" y="106" width="76" height="12" rx="3" fill="#38bdf8" />
        <rect x="144" y="106" width="22" height="12" rx="3" fill="#cbd5e1" />
      </svg>
    );
  }

  // 17. Monitor
  if (normKey.includes('monitor')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f0f9ff" />
        {/* Monitor Screen Frame */}
        <rect x="30" y="40" width="140" height="90" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="3.5" />
        {/* Display Glass */}
        <rect x="38" y="48" width="124" height="74" rx="4" fill="#0284c7" />
        {/* Beautiful mountain wallpaper inside monitor */}
        <polygon points="50,115 85,75 115,115" fill="#38bdf8" />
        <polygon points="95,115 130,65 155,115" fill="#7dd3fc" />
        <circle cx="140" cy="65" r="8" fill="#fef08a" />
        {/* Stand Base */}
        <rect x="92" y="130" width="16" height="25" fill="#64748b" />
        <ellipse cx="100" cy="160" rx="35" ry="8" fill="#334155" stroke="#0f172a" strokeWidth="2" />
      </svg>
    );
  }

  // 18. SSD / Penyimpanan
  if (normKey.includes('ssd') || normKey.includes('penyimpanan') || normKey.includes('harddisk')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* M.2 NVMe SSD Circuit Board */}
        <rect x="50" y="35" width="100" height="135" rx="6" fill="#047857" stroke="#064e3b" strokeWidth="3" />
        {/* Gold Pins */}
        <rect x="70" y="32" width="60" height="8" rx="2" fill="#eab308" />
        {/* Flash Memory NAND Chips */}
        <rect x="62" y="55" width="76" height="32" rx="4" fill="#1e293b" />
        <rect x="62" y="95" width="76" height="32" rx="4" fill="#1e293b" />
        {/* Controller Chip */}
        <rect x="80" y="135" width="40" height="25" rx="3" fill="#94a3b8" />
        {/* Screwhole at bottom */}
        <circle cx="100" cy="164" r="5" fill="#f8fafc" stroke="#eab308" strokeWidth="2" />
      </svg>
    );
  }

  // 19. Printer
  if (normKey.includes('printer')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Paper feeder top */}
        <rect x="60" y="35" width="80" height="40" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
        {/* Printer Main Housing */}
        <rect x="35" y="65" width="130" height="75" rx="12" fill="#334155" stroke="#0f172a" strokeWidth="3" />
        {/* Output Tray */}
        <rect x="50" y="125" width="100" height="35" rx="4" fill="#1e293b" />
        {/* Printed Document Emerging */}
        <rect x="60" y="110" width="80" height="45" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="70" y1="125" x2="130" y2="125" stroke="#3b82f6" strokeWidth="3" />
        <line x1="70" y1="135" x2="120" y2="135" stroke="#ec4899" strokeWidth="3" />
        <line x1="70" y1="145" x2="105" y2="145" stroke="#eab308" strokeWidth="3" />
        {/* Power LED */}
        <circle cx="145" cy="85" r="4" fill="#22c55e" />
      </svg>
    );
  }

  // 19b. Mouse Komputer / Optical Mouse
  if (normKey.includes('mouse')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Cord if wired */}
        <path d="M100 40 C100 20 80 15 65 15" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        {/* Mouse Body Oval */}
        <ellipse cx="100" cy="115" rx="42" ry="60" fill="#334155" stroke="#0f172a" strokeWidth="3" />
        {/* Center Split Line */}
        <line x1="100" y1="55" x2="100" y2="105" stroke="#0f172a" strokeWidth="2.5" />
        {/* Left & Right Button Curves */}
        <path d="M60 90 C75 90 85 92 100 92 C115 92 125 90 140 90" fill="none" stroke="#0f172a" strokeWidth="2.5" />
        {/* Scroll Wheel */}
        <rect x="94" y="68" width="12" height="24" rx="6" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
        {/* Red Optical Glow Underneath */}
        <ellipse cx="100" cy="168" rx="28" ry="6" fill="#ef4444" opacity="0.4" />
      </svg>
    );
  }

  // 19c. Memori RAM (Random Access Memory)
  if (normKey.includes('ram') || normKey.includes('memori')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f0fdf4" />
        {/* RAM PCB Stick */}
        <rect x="25" y="75" width="150" height="50" rx="4" fill="#15803d" stroke="#14532d" strokeWidth="3" />
        {/* Notch key cut */}
        <rect x="92" y="118" width="12" height="10" fill="#f0fdf4" />
        {/* Gold contact pins bottom */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
          <rect key={`pin-${i}`} x={30 + i * 10} y={116} width="6" height="8" fill="#eab308" />
        ))}
        {/* DRAM Memory Chips */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={`dram-${i}`} x={34 + i * 34} y={82} width={24} height={28} rx={2} fill="#1e293b" />
        ))}
        {/* Heatsink accent line */}
        <line x1="28" y1="80" x2="172" y2="80" stroke="#86efac" strokeWidth="2" />
      </svg>
    );
  }

  // 19d. Motherboard / Mainboard
  if (normKey.includes('motherboard') || normKey.includes('mainboard')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* PCB Board Base */}
        <rect x="30" y="30" width="140" height="140" rx="8" fill="#047857" stroke="#064e3b" strokeWidth="3" />
        {/* CPU Socket Center-Left */}
        <rect x="45" y="45" width="45" height="45" rx="3" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
        <rect x="52" y="52" width="31" height="31" fill="#475569" />
        {/* RAM Slots Right */}
        <rect x="105" y="42" width="10" height="60" rx="2" fill="#3b82f6" />
        <rect x="120" y="42" width="10" height="60" rx="2" fill="#3b82f6" />
        {/* PCIe Expansion Slot Bottom */}
        <rect x="45" y="115" width="85" height="12" rx="2" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
        {/* Chipset Heatsink */}
        <rect x="100" y="125" width="35" height="30" rx="4" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
        {/* Capacitor circles */}
        <circle cx="48" cy="145" r="4" fill="#64748b" />
        <circle cx="60" cy="145" r="4" fill="#64748b" />
      </svg>
    );
  }

  // 19e. Power Supply (PSU)
  if (normKey.includes('power supply') || normKey.includes('psu') || normKey.includes('daya')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* PSU Metal Box */}
        <rect x="35" y="45" width="130" height="110" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
        {/* Big Cooling Fan Grill */}
        <circle cx="95" cy="100" r="38" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        {/* Fan Blades */}
        <circle cx="95" cy="100" r="10" fill="#cbd5e1" />
        <line x1="95" y1="65" x2="95" y2="135" stroke="#64748b" strokeWidth="4" />
        <line x1="60" y1="100" x2="130" y2="100" stroke="#64748b" strokeWidth="4" />
        {/* Power Switch & AC Port on Right */}
        <rect x="145" y="65" width="14" height="20" rx="2" fill="#dc2626" />
        <circle cx="152" cy="115" r="5" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
    );
  }

  // 19f. Webcam Komputer
  if (normKey.includes('webcam') || normKey.includes('kamera')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Monitor Edge Clamp at bottom */}
        <rect x="85" y="140" width="30" height="25" rx="3" fill="#475569" />
        <rect x="70" y="155" width="60" height="10" rx="2" fill="#334155" />
        {/* Webcam Capsule Body */}
        <rect x="45" y="65" width="110" height="70" rx="35" fill="#1e293b" stroke="#0f172a" strokeWidth="3.5" />
        {/* Big Camera Lens */}
        <circle cx="100" cy="100" r="26" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
        <circle cx="100" cy="100" r="16" fill="#1e1b4b" />
        <circle cx="95" cy="95" r="5" fill="#38bdf8" />
        {/* Status LED & Mic Hole */}
        <circle cx="65" cy="100" r="3" fill="#22c55e" />
        <circle cx="135" cy="100" r="2" fill="#64748b" />
      </svg>
    );
  }

  // 19g. Kartu Grafis Dedicated / GPU (Graphics Processing Unit)
  if (normKey.includes('gpu') || normKey.includes('grafis') || normKey.includes('vga')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Metal PCIe Backplate & Bracket on left */}
        <rect x="25" y="45" width="8" height="110" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
        <rect x="20" y="70" width="12" height="14" rx="2" fill="#0f172a" />
        <rect x="20" y="95" width="12" height="14" rx="2" fill="#0f172a" />
        {/* Main GPU Shroud Housing */}
        <rect x="33" y="55" width="142" height="85" rx="10" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
        {/* Dual Cooling Fans */}
        {/* Fan 1 (Left) */}
        <circle cx="75" cy="95" r="28" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="75" cy="95" r="9" fill="#38bdf8" />
        <path d="M75 67 C83 75 83 85 75 95" stroke="#64748b" strokeWidth="3" fill="none" />
        <path d="M75 123 C67 115 67 105 75 95" stroke="#64748b" strokeWidth="3" fill="none" />
        <path d="M47 95 C55 103 65 103 75 95" stroke="#64748b" strokeWidth="3" fill="none" />
        <path d="M103 95 C95 87 85 87 75 95" stroke="#64748b" strokeWidth="3" fill="none" />
        {/* Fan 2 (Right) */}
        <circle cx="135" cy="95" r="28" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="135" cy="95" r="9" fill="#38bdf8" />
        <path d="M135 67 C143 75 143 85 135 95" stroke="#64748b" strokeWidth="3" fill="none" />
        <path d="M135 123 C127 115 127 105 135 95" stroke="#64748b" strokeWidth="3" fill="none" />
        <path d="M107 95 C115 103 125 103 135 95" stroke="#64748b" strokeWidth="3" fill="none" />
        <path d="M163 95 C155 87 145 87 135 95" stroke="#64748b" strokeWidth="3" fill="none" />
        {/* PCIe x16 Gold Connector Teeth Bottom */}
        <rect x="50" y="140" width="85" height="12" rx="1" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
        <rect x="75" y="140" width="4" height="12" fill="#1e293b" />
        {/* RGB Accent Line */}
        <line x1="45" y1="62" x2="165" y2="62" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 19h. Flashdisk USB / USB Flash Drive
  if (normKey.includes('flashdisk') || normKey.includes('usb')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* USB Type-A Metal Connector Head */}
        <rect x="80" y="30" width="40" height="35" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="2.5" />
        {/* 2 Cutout Windows & 4 Gold Pins */}
        <rect x="86" y="42" width="10" height="8" rx="1" fill="#1e293b" />
        <rect x="104" y="42" width="10" height="8" rx="1" fill="#1e293b" />
        <line x1="91" y1="50" x2="91" y2="60" stroke="#eab308" strokeWidth="2" />
        <line x1="109" y1="50" x2="109" y2="60" stroke="#eab308" strokeWidth="2" />
        {/* Main Flashdrive Body */}
        <rect x="70" y="65" width="60" height="95" rx="12" fill="#0284c7" stroke="#0369a1" strokeWidth="3" />
        {/* Grip Ridges */}
        <line x1="78" y1="95" x2="122" y2="95" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="78" y1="105" x2="122" y2="105" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="78" y1="115" x2="122" y2="115" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        {/* Activity Blue/Cyan LED */}
        <circle cx="100" cy="135" r="4" fill="#38bdf8" />
        {/* Lanyard Hole at bottom */}
        <rect x="90" y="150" width="20" height="12" rx="4" fill="#0369a1" />
        <ellipse cx="100" cy="156" rx="5" ry="3" fill="#f8fafc" />
      </svg>
    );
  }

  // 19i. Scanner Dokumen / Pemindai
  if (normKey.includes('scanner') || normKey.includes('pemindai')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Flatbed Scanner Base Body */}
        <polygon points="30,140 170,140 160,165 40,165" fill="#334155" stroke="#0f172a" strokeWidth="3" />
        <polygon points="30,85 170,85 170,140 30,140" fill="#f1f5f9" stroke="#0f172a" strokeWidth="3" />
        {/* Glass Platen */}
        <polygon points="45,95 155,95 155,135 45,135" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
        {/* Scanning Light Beam (Glowing Cyan) */}
        <line x1="45" y1="115" x2="155" y2="115" stroke="#06b6d4" strokeWidth="4" />
        <polygon points="45,108 155,108 155,122 45,122" fill="#22d3ee" opacity="0.4" />
        {/* Raised Scanner Lid */}
        <polygon points="30,85 170,85 150,40 50,40" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
        {/* Document sheet placed inside */}
        <polygon points="65,100 135,100 135,130 65,130" fill="#ffffff" opacity="0.85" />
      </svg>
    );
  }

  // 19j. Speaker Komputer Stereo
  if (normKey.includes('speaker') || normKey.includes('audio')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Left Speaker Cabinet */}
        <rect x="35" y="45" width="55" height="110" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
        {/* Tweeter */}
        <circle cx="62" cy="75" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
        <circle cx="62" cy="75" r="5" fill="#38bdf8" />
        {/* Woofer */}
        <circle cx="62" cy="118" r="20" fill="#0f172a" stroke="#e2e8f0" strokeWidth="3" />
        <circle cx="62" cy="118" r="8" fill="#475569" />
        {/* Right Speaker Cabinet */}
        <rect x="110" y="45" width="55" height="110" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
        {/* Tweeter */}
        <circle cx="137" cy="75" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
        <circle cx="137" cy="75" r="5" fill="#38bdf8" />
        {/* Woofer */}
        <circle cx="137" cy="118" r="20" fill="#0f172a" stroke="#e2e8f0" strokeWidth="3" />
        <circle cx="137" cy="118" r="8" fill="#475569" />
        {/* Volume Knob on right speaker */}
        <circle cx="137" cy="145" r="5" fill="#38bdf8" />
      </svg>
    );
  }

  // 20. Switch Jaringan / Router
  if (normKey.includes('switch') || normKey.includes('router') || normKey.includes('gateway')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f1f5f9" />
        {/* 2 Antennas if router */}
        <line x1="60" y1="75" x2="45" y2="25" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        <line x1="140" y1="75" x2="155" y2="25" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        {/* Switch / Router Chassis */}
        <rect x="30" y="75" width="140" height="60" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
        {/* LAN RJ45 Ports */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`port-${i}`} x={45 + i * 19} y={92} width="14" height="16" rx="2" fill="#334155" stroke="#475569" strokeWidth="1.5" />
        ))}
        {/* Blinking LEDs */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={`led-${i}`} cx={52 + i * 19} cy={118} r="2.5" fill="#22c55e" />
        ))}
        {/* Cable coming in */}
        <path d="M83 108 L83 160" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 21. Topologi Star
  if (normKey.includes('topologi') || normKey.includes('star')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#faf5ff" />
        {/* Central Switch Hub */}
        <circle cx="100" cy="100" r="22" fill="#7c3aed" stroke="#4c1d95" strokeWidth="3" />
        <circle cx="100" cy="100" r="8" fill="#ffffff" />
        {/* Lines to 5 surrounding Client Nodes */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg - 90) * (Math.PI / 180);
          const x = 100 + 65 * Math.cos(rad);
          const y = 100 + 65 * Math.sin(rad);
          return (
            <g key={`star-${i}`}>
              <line x1="100" y1="100" x2={x} y2={y} stroke="#a855f7" strokeWidth="3.5" />
              <rect x={x - 14} y={y - 12} width="28" height="24" rx="4" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
            </g>
          );
        })}
      </svg>
    );
  }

  // 22. Coding / Scratch / Block Code
  if (normKey.includes('scratch') || normKey.includes('coding') || normKey.includes('block')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#fffbeb" />
        {/* Block 1 (When Flag Clicked - Yellow) */}
        <path d="M40 40 L160 40 L160 65 L85 65 L80 72 L65 72 L60 65 L40 65 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2.5" />
        <circle cx="60" cy="52" r="5" fill="#ffffff" />
        {/* Block 2 (Move 10 steps - Blue) */}
        <path d="M40 65 L60 65 L65 72 L80 72 L85 65 L160 65 L160 95 L85 95 L80 102 L65 102 L60 95 L40 95 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
        <rect x="110" y="73" width="30" height="14" rx="7" fill="#ffffff" />
        {/* Block 3 (Repeat 10 - Orange) */}
        <path d="M40 95 L60 95 L65 102 L80 102 L85 95 L160 95 L160 125 L100 125 L100 145 L160 145 L160 165 L40 165 Z" fill="#f97316" stroke="#c2410c" strokeWidth="2.5" />
        <rect x="70" y="103" width="22" height="14" rx="7" fill="#ffffff" />
      </svg>
    );
  }

  // 23. Firewall / Keamanan Siber
  if (normKey.includes('firewall')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#fff7ed" />
        {/* Brick Firewall Wall */}
        <rect x="40" y="60" width="120" height="85" rx="6" fill="#ea580c" stroke="#9a3412" strokeWidth="3" />
        {/* Brick Lines */}
        <line x1="40" y1="88" x2="160" y2="88" stroke="#ffffff" strokeWidth="2" />
        <line x1="40" y1="116" x2="160" y2="116" stroke="#ffffff" strokeWidth="2" />
        <line x1="80" y1="60" x2="80" y2="88" stroke="#ffffff" strokeWidth="2" />
        <line x1="120" y1="60" x2="120" y2="88" stroke="#ffffff" strokeWidth="2" />
        <line x1="60" y1="88" x2="60" y2="116" stroke="#ffffff" strokeWidth="2" />
        <line x1="100" y1="88" x2="100" y2="116" stroke="#ffffff" strokeWidth="2" />
        <line x1="140" y1="88" x2="140" y2="116" stroke="#ffffff" strokeWidth="2" />
        {/* Fire Flames */}
        <path d="M70 145 C60 110 80 90 85 70 C95 85 105 80 105 60 C115 80 135 90 125 145 Z" fill="#facc15" opacity="0.9" />
        <path d="M85 145 C80 120 90 105 95 90 C100 100 110 95 110 80 C115 95 125 105 115 145 Z" fill="#ef4444" opacity="0.9" />
      </svg>
    );
  }

  // 24. Spreadsheet / Excel / Google Sheets
  if (normKey.includes('spreadsheet') || normKey.includes('excel') || normKey.includes('sheet') || normKey.includes('sum')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f0fdf4" />
        {/* Green Spreadsheet Container */}
        <rect x="30" y="35" width="140" height="130" rx="8" fill="#ffffff" stroke="#16a34a" strokeWidth="3" />
        {/* Column Header Green Bar */}
        <rect x="30" y="35" width="140" height="28" rx="8" fill="#15803d" />
        {/* Grid Cells */}
        <line x1="30" y1="63" x2="170" y2="63" stroke="#16a34a" strokeWidth="2" />
        <line x1="30" y1="90" x2="170" y2="90" stroke="#86efac" strokeWidth="1.5" />
        <line x1="30" y1="117" x2="170" y2="117" stroke="#86efac" strokeWidth="1.5" />
        <line x1="30" y1="144" x2="170" y2="144" stroke="#86efac" strokeWidth="1.5" />
        <line x1="75" y1="35" x2="75" y2="165" stroke="#16a34a" strokeWidth="2" />
        <line x1="120" y1="35" x2="120" y2="165" stroke="#86efac" strokeWidth="1.5" />
        {/* Selected Highlight Cell (Green outline with anchor dot) */}
        <rect x="75" y="90" width="45" height="27" fill="#dcfce7" stroke="#15803d" strokeWidth="2.5" />
        <rect x="117" y="114" width="5" height="5" fill="#15803d" />
        {/* Sigma SUM Icon overlay */}
        <circle cx="150" cy="145" r="18" fill="#15803d" stroke="#ffffff" strokeWidth="2.5" />
        <path d="M143 138 L157 138 L149 145 L157 152 L143 152" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 25. Google Chrome / Browser
  if (normKey.includes('chrome') || normKey.includes('browser')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Browser Outer Circle */}
        <circle cx="100" cy="100" r="70" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        {/* Chrome Sectors */}
        <path d="M100 30 A70 70 0 0 1 160 65 L125 100 A35 35 0 0 0 100 65 Z" fill="#ef4444" />
        <path d="M160 65 A70 70 0 0 1 135 160 L100 135 A35 35 0 0 0 125 100 Z" fill="#22c55e" />
        <path d="M135 160 A70 70 0 0 1 100 30 L100 65 A35 35 0 0 0 100 135 Z" fill="#eab308" />
        {/* Blue Inner Center */}
        <circle cx="100" cy="100" r="32" fill="#ffffff" />
        <circle cx="100" cy="100" r="26" fill="#3b82f6" />
      </svg>
    );
  }

  // 26. Google Docs
  if (normKey.includes('google docs') || normKey.includes('docs')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#eff6ff" />
        {/* Document Sheet */}
        <path d="M50 35 L120 35 L150 65 L150 165 L50 165 Z" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
        <polygon points="120,35 150,65 120,65" fill="#93c5fd" />
        {/* Blue Document Lines */}
        <line x1="68" y1="80" x2="132" y2="80" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
        <line x1="68" y1="100" x2="132" y2="100" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
        <line x1="68" y1="120" x2="132" y2="120" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
        <line x1="68" y1="140" x2="105" y2="140" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  // 27. Search Engine / Mesin Pencari
  if (normKey.includes('search') || normKey.includes('pencari')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Search Bar Pill */}
        <rect x="25" y="85" width="150" height="38" rx="19" fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />
        <circle cx="50" cy="104" r="8" fill="none" stroke="#3b82f6" strokeWidth="3" />
        <line x1="56" y1="110" x2="64" y2="118" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        {/* Blinking Cursor Bar */}
        <line x1="75" y1="95" x2="75" y2="113" stroke="#0f172a" strokeWidth="2.5" />
        {/* Magnifying Glass Giant Accent */}
        <circle cx="135" cy="65" r="28" fill="#e0f2fe" stroke="#0284c7" strokeWidth="4" />
        <line x1="155" y1="85" x2="175" y2="105" stroke="#0284c7" strokeWidth="7" strokeLinecap="round" />
      </svg>
    );
  }

  // 28. Kata Sandi Kuat / Password
  if (normKey.includes('sandi') || normKey.includes('password') || normKey.includes('kunci')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f0fdf4" />
        {/* Input box */}
        <rect x="30" y="70" width="140" height="42" rx="10" fill="#ffffff" stroke="#22c55e" strokeWidth="3" />
        {/* Password dots */}
        <circle cx="55" cy="91" r="5" fill="#0f172a" />
        <circle cx="75" cy="91" r="5" fill="#0f172a" />
        <circle cx="95" cy="91" r="5" fill="#0f172a" />
        <circle cx="115" cy="91" r="5" fill="#0f172a" />
        <circle cx="135" cy="91" r="5" fill="#0f172a" />
        {/* Green Strength Bar */}
        <rect x="30" y="125" width="140" height="10" rx="5" fill="#22c55e" />
        {/* Gold Key Accent */}
        <circle cx="140" cy="50" r="14" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />
        <circle cx="140" cy="50" r="6" fill="#f0fdf4" />
        <rect x="148" y="47" width="28" height="6" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
        <rect x="166" y="53" width="5" height="8" fill="#ca8a04" />
        <rect x="173" y="53" width="5" height="6" fill="#ca8a04" />
      </svg>
    );
  }

  // 29. Phishing / Umpan Pancing
  if (normKey.includes('phishing') || normKey.includes('pancing')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#fff1f2" />
        {/* Fishing Line & Hook */}
        <line x1="100" y1="20" x2="100" y2="85" stroke="#94a3b8" strokeWidth="2.5" />
        <path d="M100 85 C100 120 70 120 70 95 L65 105" fill="none" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
        {/* Fake Email Envelope Hooked */}
        <rect x="75" y="80" width="75" height="50" rx="6" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
        <polygon points="75,80 112,105 150,80" fill="#fecdd3" stroke="#e11d48" strokeWidth="2" />
        {/* Alert Triangle */}
        <polygon points="112,135 98,160 126,160" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
        <circle cx="112" cy="154" r="1.5" fill="#000000" />
        <line x1="112" y1="142" x2="112" y2="150" stroke="#000000" strokeWidth="2" />
      </svg>
    );
  }

  // 30. Autentikasi 2FA
  if (normKey.includes('2fa') || normKey.includes('autentikasi')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#eff6ff" />
        {/* Smartphone */}
        <rect x="65" y="30" width="70" height="140" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="3.5" />
        <rect x="70" y="42" width="60" height="112" rx="4" fill="#1e293b" />
        {/* OTP Code Box on Screen */}
        <rect x="75" y="75" width="50" height="24" rx="4" fill="#2563eb" />
        <circle cx="83" cy="87" r="3" fill="#ffffff" />
        <circle cx="91" cy="87" r="3" fill="#ffffff" />
        <circle cx="99" cy="87" r="3" fill="#ffffff" />
        <circle cx="107" cy="87" r="3" fill="#ffffff" />
        <circle cx="115" cy="87" r="3" fill="#ffffff" />
        {/* Checkmark Badge */}
        <circle cx="100" cy="125" r="12" fill="#22c55e" />
        <path d="M94 125 L98 129 L106 120" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  // 31. Fakta Terverifikasi
  if (normKey.includes('fakta')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f0fdf4" />
        {/* Verified Circular Stamp */}
        <circle cx="100" cy="100" r="65" fill="#dcfce7" stroke="#16a34a" strokeWidth="6" strokeDasharray="10 5" />
        <circle cx="100" cy="100" r="48" fill="#16a34a" />
        <path d="M80 100 L94 114 L124 84" stroke="#ffffff" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 32. Kabar Hoaks / Malware
  if (normKey.includes('hoaks') || normKey.includes('malware') || normKey.includes('virus')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#fff1f2" />
        {/* Warning Octagon */}
        <polygon points="65,25 135,25 175,65 175,135 135,175 65,175 25,135 25,65" fill="#dc2626" stroke="#991b1b" strokeWidth="4" />
        {/* Big White Cross / X */}
        <line x1="65" y1="65" x2="135" y2="135" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
        <line x1="135" y1="65" x2="65" y2="135" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
      </svg>
    );
  }

  // 33. Opini Subjektif
  if (normKey.includes('opini')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#fefce8" />
        {/* Chat Bubble 1 */}
        <path d="M40 50 C40 35 110 35 110 50 C110 65 95 75 80 75 L65 90 L65 75 C40 75 40 65 40 50 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
        <circle cx="65" cy="55" r="3" fill="#ffffff" />
        <circle cx="75" cy="55" r="3" fill="#ffffff" />
        <circle cx="85" cy="55" r="3" fill="#ffffff" />
        {/* Chat Bubble 2 */}
        <path d="M90 100 C90 85 160 85 160 100 C160 115 145 125 130 125 L130 145 L115 125 C90 125 90 115 90 100 Z" fill="#fb7185" stroke="#e11d48" strokeWidth="3" />
        <circle cx="115" cy="105" r="3" fill="#ffffff" />
        <circle cx="125" cy="105" r="3" fill="#ffffff" />
        <circle cx="135" cy="105" r="3" fill="#ffffff" />
      </svg>
    );
  }

  // 34. Investigasi Bukti
  if (normKey.includes('investigasi') || normKey.includes('bukti') || normKey.includes('vlookup')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f8fafc" />
        {/* Document Sheet in background */}
        <rect x="40" y="35" width="90" height="120" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="2.5" />
        <line x1="55" y1="55" x2="110" y2="55" stroke="#cbd5e1" strokeWidth="4" />
        <line x1="55" y1="70" x2="110" y2="70" stroke="#cbd5e1" strokeWidth="4" />
        <line x1="55" y1="85" x2="110" y2="85" stroke="#cbd5e1" strokeWidth="4" />
        <line x1="55" y1="100" x2="110" y2="100" stroke="#cbd5e1" strokeWidth="4" />
        {/* Detective Magnifier Focused on Document */}
        <circle cx="115" cy="100" r="36" fill="#e0f2fe" fillOpacity="0.7" stroke="#0284c7" strokeWidth="5" />
        <line x1="140" y1="126" x2="175" y2="160" stroke="#0f172a" strokeWidth="10" strokeLinecap="round" />
      </svg>
    );
  }

  // 35. Piala Prestasi Belajar
  if (normKey.includes('prestasi') || normKey.includes('piala') || normKey.includes('juara') || normKey.includes('finish') || normKey.includes('target')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#fefce8" />
        {/* Golden Trophy Cup */}
        <path d="M60 45 L140 45 L130 100 C130 120 100 130 100 130 C100 130 70 120 70 100 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="3.5" />
        {/* Trophy Handles */}
        <path d="M62 55 C40 55 40 85 68 88" fill="none" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
        <path d="M138 55 C160 55 160 85 132 88" fill="none" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
        {/* Stem & Base */}
        <rect x="92" y="130" width="16" height="22" fill="#ca8a04" />
        <rect x="68" y="152" width="64" height="22" rx="4" fill="#854d0e" stroke="#581c87" strokeWidth="2.5" />
        {/* Star in Center */}
        <polygon points="100,60 105,74 120,74 108,83 112,98 100,89 88,98 92,83 80,74 95,74" fill="#ffffff" />
      </svg>
    );
  }

  // 36. Mode Saran / Version History / Share
  if (normKey.includes('saran') || normKey.includes('riwayat') || normKey.includes('bagikan')) {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <rect width="200" height="200" rx="20" fill="#f0fdfa" />
        {/* Document with Pen & Clock */}
        <rect x="45" y="40" width="90" height="120" rx="8" fill="#ffffff" stroke="#0d9488" strokeWidth="3" />
        <line x1="60" y1="65" x2="115" y2="65" stroke="#99f6e4" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="85" x2="115" y2="85" stroke="#99f6e4" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="105" x2="95" y2="105" stroke="#99f6e4" strokeWidth="4" strokeLinecap="round" />
        {/* Clock in circle */}
        <circle cx="135" cy="125" r="28" fill="#0d9488" stroke="#ffffff" strokeWidth="3" />
        <circle cx="135" cy="125" r="2" fill="#ffffff" />
        <line x1="135" y1="125" x2="135" y2="110" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <line x1="135" y1="125" x2="148" y2="125" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // Universal Default 2D Illustration: Clean Tech Device & Subject Geometry
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        <linearGradient id="genGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="20" fill="#eef2ff" />
      <circle cx="100" cy="100" r="60" fill="url(#genGrad)" opacity="0.15" />
      <polygon points="100,40 155,75 155,135 100,165 45,135 45,75" fill="none" stroke="#4f46e5" strokeWidth="3.5" />
      <circle cx="100" cy="100" r="24" fill="#4f46e5" />
      <circle cx="100" cy="100" r="10" fill="#ffffff" />
      <line x1="100" y1="40" x2="100" y2="76" stroke="#4f46e5" strokeWidth="3" />
      <line x1="100" y1="124" x2="100" y2="165" stroke="#4f46e5" strokeWidth="3" />
      <line x1="45" y1="75" x2="79" y2="90" stroke="#4f46e5" strokeWidth="3" />
      <line x1="155" y1="75" x2="121" y2="90" stroke="#4f46e5" strokeWidth="3" />
      <line x1="45" y1="135" x2="79" y2="110" stroke="#4f46e5" strokeWidth="3" />
      <line x1="155" y1="135" x2="121" y2="110" stroke="#4f46e5" strokeWidth="3" />
    </svg>
  );
};
