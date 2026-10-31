import React from 'react';

export interface RobotFigureProps {
  color: 'blue' | 'red';
  name: string;
  hp: number;
  maxHp?: number;
  isShooting: boolean;
  isHit: boolean;
  isDead: boolean;
  isCurrentTurn?: boolean;
}

export const RobotFigure: React.FC<RobotFigureProps> = ({
  color,
  name,
  hp,
  maxHp = 100,
  isShooting,
  isHit,
  isDead,
  isCurrentTurn
}) => {
  const hpPercent = Math.max(0, Math.min(100, Math.round((hp / maxHp) * 100)));
  const isDamaged = hpPercent < 60 && !isDead;
  const isCritical = hpPercent < 30 && !isDead;

  // Primary colors
  const primary = color === 'blue' ? '#0284c7' : '#e11d48';
  const secondary = color === 'blue' ? '#38bdf8' : '#fb7185';
  const glow = color === 'blue' ? '#0ea5e9' : '#f43f5e';
  const eyeColor = isDead ? '#64748b' : isDamaged ? '#f59e0b' : color === 'blue' ? '#38bdf8' : '#f43f5e';

  return (
    <div className="flex flex-col items-center select-none">
      {/* Robot Stage */}
      <div className="relative w-36 h-40 sm:w-44 sm:h-48 flex items-center justify-center">
        {/* Glow floor / Shadow */}
        <div
          className={`absolute bottom-1 w-24 sm:w-32 h-6 rounded-full blur-md transition-all duration-300 ${
            isDead
              ? 'bg-slate-700/30'
              : color === 'blue'
              ? 'bg-sky-500/30 dark:bg-sky-500/40 animate-pulse'
              : 'bg-rose-500/30 dark:bg-rose-500/40 animate-pulse'
          }`}
        />

        {/* Laser Blast Animation when shooting */}
        {isShooting && (
          <div
            className={`absolute top-1/2 ${
              color === 'blue' ? 'left-full' : 'right-full'
            } -translate-y-1/2 flex items-center z-30 pointer-events-none`}
          >
            <div
              className={`h-4 sm:h-5 w-20 sm:w-28 rounded-full shadow-lg ${
                color === 'blue'
                  ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-white animate-pulse'
                  : 'bg-gradient-to-l from-rose-500 via-amber-300 to-white animate-pulse'
              }`}
              style={{
                boxShadow: `0 0 20px ${color === 'blue' ? '#38bdf8' : '#f43f5e'}`
              }}
            />
            {/* Spark particles */}
            <div className="w-6 h-6 rounded-full bg-white animate-ping" />
          </div>
        )}

        {/* Explosion overlay when dead */}
        {isDead && (
          <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-300">
            {/* Blast waves */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-orange-500/30 animate-ping absolute" />
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-amber-400/40 animate-pulse absolute" />

            {/* Cartoon explosion shapes */}
            <svg
              viewBox="0 0 100 100"
              className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl animate-bounce"
            >
              <polygon
                points="50,5 64,30 95,25 78,50 95,75 65,72 50,98 35,72 5,75 22,50 5,25 36,30"
                fill="#f97316"
                stroke="#dc2626"
                strokeWidth="3"
              />
              <polygon
                points="50,18 60,35 80,32 68,50 80,68 60,65 50,82 40,65 20,68 32,50 20,32 40,35"
                fill="#fef08a"
              />
              {/* Smoke clouds */}
              <circle cx="30" cy="40" r="12" fill="#475569" opacity="0.8" />
              <circle cx="65" cy="45" r="14" fill="#334155" opacity="0.8" />
              <circle cx="50" cy="30" r="10" fill="#64748b" opacity="0.9" />
              <text
                x="50"
                y="56"
                fontSize="12"
                fontWeight="900"
                fill="#dc2626"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                BOOM!
              </text>
            </svg>
          </div>
        )}

        {/* Sparks / Smoke when damaged */}
        {isDamaged && !isDead && (
          <div className="absolute -top-1 sm:-top-2 z-20 pointer-events-none flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="inline-block w-3 h-3 rounded-full bg-slate-400/80 blur-xs animate-bounce" />
            {isCritical && (
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping delay-100" />
            )}
          </div>
        )}

        {/* SVG Robot Character */}
        <svg
          viewBox="0 0 160 160"
          className={`w-32 h-32 sm:w-40 sm:h-40 transition-all duration-300 filter drop-shadow-lg ${
            isDead
              ? 'opacity-30 grayscale rotate-12 scale-90'
              : isHit
              ? 'translate-x-3 -rotate-6 scale-95 brightness-150'
              : isShooting
              ? color === 'blue'
                ? 'translate-x-3 scale-105'
                : '-translate-x-3 scale-105'
              : 'animate-[bounce_3s_ease-in-out_infinite]'
          }`}
          style={{
            transformOrigin: 'bottom center'
          }}
        >
          <defs>
            {/* Linear gradients for metallic look */}
            <linearGradient id={`bodyGrad-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={secondary} />
              <stop offset="100%" stopColor={primary} />
            </linearGradient>
            <linearGradient id={`metalGrad-${color}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>

          {/* Turn indicator glow ring */}
          {isCurrentTurn && !isDead && (
            <circle
              cx="80"
              cy="80"
              r="76"
              fill="none"
              stroke={glow}
              strokeWidth="2.5"
              strokeDasharray="8 6"
              className="animate-spin"
              style={{ animationDuration: '8s' }}
            />
          )}

          {/* ANTENNA */}
          <line x1="80" y1="36" x2="80" y2="18" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <circle
            cx="80"
            cy="14"
            r="7"
            fill={isDead ? '#475569' : glow}
            className={!isDead ? 'animate-pulse' : ''}
          />
          <circle cx="80" cy="14" r="3" fill="#ffffff" />

          {/* EARS / SIDE BOLTS */}
          <rect x="36" y="44" width="8" height="16" rx="3" fill="#475569" />
          <rect x="116" y="44" width="8" height="16" rx="3" fill="#475569" />

          {/* ROBOT HEAD */}
          <rect
            x="42"
            y="30"
            width="76"
            height="46"
            rx="14"
            fill={`url(#bodyGrad-${color})`}
            stroke="#1e293b"
            strokeWidth="3.5"
          />

          {/* VISOR / SCREEN FACE */}
          <rect
            x="49"
            y="38"
            width="62"
            height="26"
            rx="8"
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* EYES */}
          {isDead ? (
            // Dead X eyes
            <g stroke="#94a3b8" strokeWidth="3" strokeLinecap="round">
              <line x1="57" y1="46" x2="67" y2="56" />
              <line x1="67" y1="46" x2="57" y2="56" />
              <line x1="93" y1="46" x2="103" y2="56" />
              <line x1="103" y1="46" x2="93" y2="56" />
            </g>
          ) : isHit ? (
            // Dizzy dizzy eyes
            <g stroke="#f59e0b" strokeWidth="2.5" fill="none">
              <circle cx="62" cy="51" r="5" />
              <circle cx="98" cy="51" r="5" />
            </g>
          ) : (
            // Expressive Glowing Robot Eyes
            <g>
              <ellipse
                cx="62"
                cy="51"
                rx={isShooting ? '8' : '7'}
                ry="7"
                fill={eyeColor}
              />
              <circle cx="60" cy="49" r="2.5" fill="#ffffff" />
              <ellipse
                cx="98"
                cy="51"
                rx={isShooting ? '8' : '7'}
                ry="7"
                fill={eyeColor}
              />
              <circle cx="96" cy="49" r="2.5" fill="#ffffff" />
            </g>
          )}

          {/* NECK JOINT */}
          <rect x="72" y="76" width="16" height="8" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="2" />

          {/* ROBOT BODY */}
          <rect
            x="46"
            y="82"
            width="68"
            height="46"
            rx="12"
            fill={`url(#bodyGrad-${color})`}
            stroke="#1e293b"
            strokeWidth="3.5"
          />

          {/* CHEST CORE REACTOR */}
          <circle
            cx="80"
            cy="102"
            r="12"
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="2"
          />
          <circle
            cx="80"
            cy="102"
            r="8"
            fill={isDead ? '#334155' : glow}
            className={!isDead ? 'animate-pulse' : ''}
          />
          <polygon
            points="80,97 85,105 75,105"
            fill="#ffffff"
            opacity="0.8"
          />

          {/* DAMAGE CRACKS ON BODY */}
          {isDamaged && (
            <path
              d="M52 92 L62 98 L58 106 L66 114"
              stroke="#0f172a"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          )}
          {isCritical && (
            <path
              d="M106 90 L96 96 L100 102 L92 110"
              stroke="#0f172a"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* ROBOT ARMS & CANNONS */}
          {/* Left Arm (Shooter if Blue) */}
          <g>
            <rect
              x="26"
              y="86"
              width="18"
              height="12"
              rx="4"
              fill={`url(#bodyGrad-${color})`}
              stroke="#1e293b"
              strokeWidth="2.5"
            />
            {color === 'blue' && isShooting ? (
              // Extended laser cannon
              <g>
                <rect x="12" y="88" width="16" height="8" rx="2" fill="#334155" stroke="#0f172a" strokeWidth="2" />
                <circle cx="10" cy="92" r="5" fill="#38bdf8" />
              </g>
            ) : (
              <circle cx="28" cy="92" r="5" fill="#64748b" />
            )}
          </g>

          {/* Right Arm (Shooter if Red) */}
          <g>
            <rect
              x="116"
              y="86"
              width="18"
              height="12"
              rx="4"
              fill={`url(#bodyGrad-${color})`}
              stroke="#1e293b"
              strokeWidth="2.5"
            />
            {color === 'red' && isShooting ? (
              // Extended laser cannon
              <g>
                <rect x="132" y="88" width="16" height="8" rx="2" fill="#334155" stroke="#0f172a" strokeWidth="2" />
                <circle cx="150" cy="92" r="5" fill="#fb7185" />
              </g>
            ) : (
              <circle cx="132" cy="92" r="5" fill="#64748b" />
            )}
          </g>

          {/* CATERPILLAR TREADS / TANK LEGS */}
          <rect
            x="48"
            y="128"
            width="64"
            height="18"
            rx="9"
            fill="#334155"
            stroke="#0f172a"
            strokeWidth="3"
          />
          {/* Tread wheels */}
          <circle cx="58" cy="137" r="5" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
          <circle cx="72" cy="137" r="5" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
          <circle cx="88" cy="137" r="5" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
          <circle cx="102" cy="137" r="5" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
        </svg>
      </div>

      {/* Robot Status Info */}
      <div className="w-full max-w-[160px] sm:max-w-[180px] space-y-1.5 text-center mt-1">
        <div className="flex items-center justify-between text-xs font-bold px-1">
          <span className={color === 'blue' ? 'text-sky-600 dark:text-sky-400' : 'text-rose-600 dark:text-rose-400'}>
            {name}
          </span>
          <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
            {hp} HP
          </span>
        </div>

        {/* Dynamic HP bar with damage states */}
        <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              hpPercent > 50
                ? color === 'blue'
                  ? 'bg-gradient-to-r from-sky-500 to-emerald-400'
                  : 'bg-gradient-to-r from-amber-500 to-rose-500'
                : hpPercent > 20
                ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                : 'bg-gradient-to-r from-rose-600 to-red-600 animate-pulse'
            }`}
            style={{ width: `${hpPercent}%` }}
          />
        </div>

        {/* State label badge */}
        <div className="pt-0.5">
          {isDead ? (
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-white shadow-xs">
              💥 Meledak! (Kalah)
            </span>
          ) : isCritical ? (
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white animate-pulse">
              ⚠️ Rusak Parah!
            </span>
          ) : isDamaged ? (
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white">
              ⚙️ Rusak Ringan
            </span>
          ) : (
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white">
              🛡️ Kondisi Siap
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
