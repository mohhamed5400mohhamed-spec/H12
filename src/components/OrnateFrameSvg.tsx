import React, { useId } from 'react';

export interface OrnateFrameSvgProps {
  variant: string;
  className?: string;
}

/**
 * High-detail multi-layered vector + CSS animated avatar frames inspired by luxury VIP chat galleries.
 * Center (cx=80, cy=80, r=50) stays completely transparent so any circular user avatar sits inside cleanly.
 * Designed for -inset-[27%] w-[154%] h-[154%] overlay around a rounded-full avatar.
 */
export const OrnateFrameSvg: React.FC<OrnateFrameSvgProps> = ({ variant, className = '' }) => {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '');

  const id = (name: string) => `${uid}_${name}`;

  // Common reusable faceted star sparkle SVG element
  const renderSparkle = (cx: number, cy: number, r: number, color = '#ffffff', delay = '0s') => (
    <g
      key={`${cx}-${cy}`}
      className="avatar-frame-sparkle"
      style={{ transformOrigin: `${cx}px ${cy}px`, animationDelay: delay }}
    >
      <path
        d={`M ${cx} ${cy - r} Q ${cx} ${cy} ${cx + r} ${cy} Q ${cx} ${cy} ${cx} ${cy + r} Q ${cx} ${cy} ${cx - r} ${cy} Q ${cx} ${cy} ${cx} ${cy - r} Z`}
        fill={color}
      />
      <circle cx={cx} cy={cy} r={r * 0.24} fill="#ffffff" />
    </g>
  );

  // Common shared defs for rich 3D metals & gemstones
  const renderSharedDefs = () => (
    <defs>
      {/* Royal Gold Metallic */}
      <linearGradient id={id('gold')} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff7cc" />
        <stop offset="22%" stopColor="#fde047" />
        <stop offset="50%" stopColor="#d97706" />
        <stop offset="78%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id={id('goldDark')} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="55%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>

      {/* Platinum Silver */}
      <linearGradient id={id('silver')} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#e2e8f0" />
        <stop offset="50%" stopColor="#64748b" />
        <stop offset="75%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id={id('darkSteel')} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#cbd5e1" />
        <stop offset="35%" stopColor="#475569" />
        <stop offset="70%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>

      {/* Amethyst Violet */}
      <linearGradient id={id('violet')} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f3e8ff" />
        <stop offset="30%" stopColor="#c084fc" />
        <stop offset="70%" stopColor="#7e22ce" />
        <stop offset="100%" stopColor="#3b0764" />
      </linearGradient>

      {/* Ice / Sapphire Azure */}
      <linearGradient id={id('azure')} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e0f2fe" />
        <stop offset="30%" stopColor="#38bdf8" />
        <stop offset="70%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>

      {/* Flame Orange / Crimson */}
      <linearGradient id={id('fire')} x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#991b1b" />
        <stop offset="35%" stopColor="#ef4444" />
        <stop offset="70%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#fef08a" />
      </linearGradient>

      {/* Pastel Pink */}
      <linearGradient id={id('pink')} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff1f2" />
        <stop offset="40%" stopColor="#fda4af" />
        <stop offset="80%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#be123c" />
      </linearGradient>

      {/* Emerald */}
      <linearGradient id={id('emerald')} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d1fae5" />
        <stop offset="35%" stopColor="#34d399" />
        <stop offset="75%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>

      {/* Rainbow Opal */}
      <linearGradient id={id('opal')} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbcfe8" />
        <stop offset="25%" stopColor="#fde68a" />
        <stop offset="50%" stopColor="#a7f3d0" />
        <stop offset="75%" stopColor="#bae6fd" />
        <stop offset="100%" stopColor="#ddd6fe" />
      </linearGradient>

      {/* White Angel Wing */}
      <linearGradient id={id('pearlWing')} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>

      {/* Obsidian Black Wing */}
      <linearGradient id={id('blackWing')} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="40%" stopColor="#1e293b" />
        <stop offset="85%" stopColor="#090d16" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>
    </defs>
  );

  // Reusable feathered half-wing path (left side, mirror for right side)
  const renderFalconWingHalf = (fillUrl: string, strokeUrl: string, innerHighlight = '#ffffff') => (
    <g>
      {/* Back upper pinion feathers */}
      <path
        d="M 32 76 C 17 65 8 49 6 33 C 16 39 24 47 32 58 Z"
        fill={fillUrl}
        stroke={strokeUrl}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M 30 88 C 14 78 5 64 4 49 C 14 55 22 63 31 73 Z"
        fill={fillUrl}
        stroke={strokeUrl}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M 32 100 C 17 92 9 80 8 67 C 17 72 24 79 33 88 Z"
        fill={fillUrl}
        stroke={strokeUrl}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M 39 114 C 24 108 16 97 15 86 C 23 90 31 96 40 104 Z"
        fill={fillUrl}
        stroke={strokeUrl}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Highlight vein lines */}
      <path
        d="M 11 40 Q 20 50 30 63 M 9 56 Q 19 65 29 76 M 13 73 Q 22 81 31 91"
        fill="none"
        stroke={innerHighlight}
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </g>
  );

  const renderVariantArtwork = () => {
    switch (variant) {
      // 1. أجنحة الصقر الذهبي الملكي (Row 1 Col 1 in video)
      case 'royal-gold-glitter':
        return (
          <>
            {/* Inner luminous halo */}
            <circle cx="80" cy="80" r="56" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeOpacity="0.35" />
            {/* Animated wings */}
            <g className="avatar-frame-wing">
              {renderFalconWingHalf(`url(#${id('gold')})`, `url(#${id('goldDark')})`, '#fef9c3')}
              <g transform="translate(160, 0) scale(-1, 1)">
                {renderFalconWingHalf(`url(#${id('gold')})`, `url(#${id('goldDark')})`, '#fef9c3')}
              </g>
            </g>
            {/* Sculpted golden outer rim */}
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('gold')})`} strokeWidth="5.5" />
            <circle cx="80" cy="80" r="49.5" fill="none" stroke="#fffbeb" strokeWidth="1" strokeOpacity="0.8" />
            {/* Top fiery falcon crest + ruby diamond */}
            <path
              d="M 62 28 L 70 15 L 80 6 L 90 15 L 98 28 Q 80 23 62 28 Z"
              fill={`url(#${id('gold')})`}
              stroke={`url(#${id('goldDark')})`}
              strokeWidth="1.2"
            />
            <polygon points="80,10 85,18 80,25 75,18" fill={`url(#${id('fire')})`} stroke="#fef08a" strokeWidth="0.8" />
            {/* Bottom royal ruby crest */}
            <path
              d="M 56 130 Q 80 144 104 130 L 94 141 Q 80 148 66 141 Z"
              fill={`url(#${id('gold')})`}
              stroke={`url(#${id('goldDark')})`}
              strokeWidth="1"
            />
            <polygon points="80,130 87,138 80,146 73,138" fill="#ef4444" stroke="#fde047" strokeWidth="1" />
            {renderSparkle(24, 24, 6, '#fef08a', '0s')}
            {renderSparkle(137, 26, 5.5, '#fde047', '0.7s')}
            {renderSparkle(140, 128, 5, '#fef08a', '1.2s')}
          </>
        );

      // 2. التاج البنفسجي الكريستالي (Row 1 Col 2 in video)
      case 'diamond-prism':
        return (
          <>
            {/* Lower frost-violet wings */}
            <g className="avatar-frame-wing">
              <path
                d="M 33 102 C 18 96 10 82 10 68 C 20 75 26 83 34 92 Z M 41 118 C 26 115 17 104 15 91 C 25 97 33 103 42 110 Z"
                fill={`url(#${id('silver')})`}
                stroke="#a78bfa"
                strokeWidth="1"
              />
              <g transform="translate(160, 0) scale(-1, 1)">
                <path
                  d="M 33 102 C 18 96 10 82 10 68 C 20 75 26 83 34 92 Z M 41 118 C 26 115 17 104 15 91 C 25 97 33 103 42 110 Z"
                  fill={`url(#${id('silver')})`}
                  stroke="#a78bfa"
                  strokeWidth="1"
                />
              </g>
            </g>
            {/* Silver prism bezel */}
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('silver')})`} strokeWidth="5" />
            <circle cx="80" cy="80" r="55" fill="none" stroke={`url(#${id('violet')})`} strokeWidth="1.6" strokeOpacity="0.85" />
            {/* Faceted purple crystal crown */}
            <g>
              <polygon points="58,31 53,16 68,24" fill={`url(#${id('violet')})`} stroke="#e9d5ff" strokeWidth="0.9" />
              <polygon points="102,31 107,16 92,24" fill={`url(#${id('violet')})`} stroke="#e9d5ff" strokeWidth="0.9" />
              <polygon points="68,26 80,4 92,26 80,32" fill={`url(#${id('violet')})`} stroke="#ffffff" strokeWidth="1.1" />
              <polygon points="80,8 85,20 80,28 75,20" fill="#e9d5ff" fillOpacity="0.7" />
            </g>
            {/* Bottom sapphire crystal medallion */}
            <polygon points="80,127 89,136 80,147 71,136" fill={`url(#${id('violet')})`} stroke="#f3e8ff" strokeWidth="1.1" />
            {renderSparkle(28, 30, 5.5, '#e0f2fe', '0.2s')}
            {renderSparkle(133, 32, 6, '#e9d5ff', '0.9s')}
            {renderSparkle(80, 149, 4.5, '#ffffff', '1.4s')}
          </>
        );

      // 3. درع المحارب الفضي الحديدي (Row 1 Col 3 in video)
      case 'silver-knight':
        return (
          <>
            {/* Sharp armored knight helmet side blades */}
            <path
              d="M 30 56 C 14 48 9 32 14 19 C 22 30 28 38 35 45 Z M 27 72 C 12 72 8 88 16 105 C 23 119 37 129 52 136 L 56 125 C 40 116 32 100 32 80 Z"
              fill={`url(#${id('darkSteel')})`}
              stroke={`url(#${id('silver')})`}
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <g transform="translate(160, 0) scale(-1, 1)">
              <path
                d="M 30 56 C 14 48 9 32 14 19 C 22 30 28 38 35 45 Z M 27 72 C 12 72 8 88 16 105 C 23 119 37 129 52 136 L 56 125 C 40 116 32 100 32 80 Z"
                fill={`url(#${id('darkSteel')})`}
                stroke={`url(#${id('silver')})`}
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </g>
            {/* Gunmetal + Chrome ring */}
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('silver')})`} strokeWidth="5.5" />
            <circle cx="80" cy="80" r="50" fill="none" stroke="#0f172a" strokeWidth="1.5" />
            {/* Bottom obsidian shield gem */}
            <polygon points="80,126 91,136 80,150 69,136" fill={`url(#${id('darkSteel')})`} stroke="#e2e8f0" strokeWidth="1.4" />
            <polygon points="80,130 86,136 80,144 74,136" fill="#64748b" />
            {renderSparkle(24, 24, 4.5, '#f8fafc', '0.3s')}
            {renderSparkle(136, 24, 4.5, '#f8fafc', '1.1s')}
          </>
        );

      // 4. التنين الذهبي والأمواج الزرقاء (Row 2 Col 1 in video)
      case 'dragon-azure':
        return (
          <>
            {/* Swirling sapphire dragon ocean waves */}
            <g className="avatar-frame-orbit-slow">
              <path
                d="M 24 62 C 10 74 12 102 32 118 C 46 130 58 134 72 135 C 50 130 34 114 30 92 C 28 79 29 70 24 62 Z"
                fill={`url(#${id('azure')})`}
                stroke="#bae6fd"
                strokeWidth="1"
              />
              <path
                d="M 136 98 C 150 84 148 58 128 42 C 114 30 102 26 88 25 C 110 30 126 46 130 68 C 132 81 131 90 136 98 Z"
                fill={`url(#${id('azure')})`}
                stroke="#bae6fd"
                strokeWidth="1"
              />
            </g>
            {/* Gold dragon ring */}
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('gold')})`} strokeWidth="5.2" />
            {/* Sculpted gold dragon horns at top */}
            <path
              d="M 52 34 C 38 22 38 10 46 6 C 48 16 54 22 64 26 L 74 20 L 80 10 L 86 20 L 96 26 C 106 22 112 16 114 6 C 122 10 122 22 108 34 Z"
              fill={`url(#${id('gold')})`}
              stroke={`url(#${id('goldDark')})`}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Glowing azure pearl */}
            <circle cx="80" cy="134" r="7.5" fill={`url(#${id('azure')})`} stroke="#fef08a" strokeWidth="1.8" />
            <circle cx="77.5" cy="131.5" r="2.2" fill="#ffffff" fillOpacity="0.9" />
            {renderSparkle(22, 85, 5, '#7dd3fc', '0s')}
            {renderSparkle(138, 72, 5, '#fde047', '0.8s')}
          </>
        );

      // 5. شعلة الشمس والإكليل الذهبي (Row 2 Col 2 in video)
      case 'solar-laurel':
        return (
          <>
            {/* Double golden laurel wings */}
            <g className="avatar-frame-wing">
              <path
                d="M 32 112 C 14 96 10 66 24 40 C 30 29 38 22 48 18 C 38 30 33 44 33 62 C 33 82 39 98 50 112 Z"
                fill={`url(#${id('gold')})`}
                stroke={`url(#${id('goldDark')})`}
                strokeWidth="1.2"
              />
              <g transform="translate(160, 0) scale(-1, 1)">
                <path
                  d="M 32 112 C 14 96 10 66 24 40 C 30 29 38 22 48 18 C 38 30 33 44 33 62 C 33 82 39 98 50 112 Z"
                  fill={`url(#${id('gold')})`}
                  stroke={`url(#${id('goldDark')})`}
                  strokeWidth="1.2"
                />
              </g>
            </g>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('gold')})`} strokeWidth="5.2" />
            {/* Radiant top solar sunburst */}
            <polygon
              points="80,4 85,17 98,17 87,25 91,37 80,29 69,37 73,25 62,17 75,17"
              fill={`url(#${id('gold')})`}
              stroke="#fffbeb"
              strokeWidth="1"
            />
            {/* Golden honor scroll banner at bottom */}
            <path
              d="M 46 126 Q 80 135 114 126 L 118 140 Q 80 148 42 140 Z"
              fill={`url(#${id('gold')})`}
              stroke={`url(#${id('goldDark')})`}
              strokeWidth="1.4"
            />
            <text x="80" y="138.5" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#78350f">
              GOLD
            </text>
            {renderSparkle(24, 34, 5, '#fef08a', '0.4s')}
            {renderSparkle(136, 34, 5, '#fef08a', '1.1s')}
          </>
        );

      // 6. أجنحة النسر الأسود الفخم (Row 4 Col 2 in video)
      case 'obsidian-wings':
        return (
          <>
            {/* Sweeping jet-black feathered wings from bottom outward */}
            <g className="avatar-frame-wing">
              <path
                d="M 44 124 C 24 114 11 94 7 68 C 16 74 22 81 27 89 C 16 71 12 52 14 34 C 24 44 31 58 35 72 C 33 56 35 44 41 35 C 43 56 44 77 54 106 Z"
                fill={`url(#${id('blackWing')})`}
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <g transform="translate(160, 0) scale(-1, 1)">
                <path
                  d="M 44 124 C 24 114 11 94 7 68 C 16 74 22 81 27 89 C 16 71 12 52 14 34 C 24 44 31 58 35 72 C 33 56 35 44 41 35 C 43 56 44 77 54 106 Z"
                  fill={`url(#${id('blackWing')})`}
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('darkSteel')})`} strokeWidth="5.2" />
            <circle cx="80" cy="80" r="49.8" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeOpacity="0.85" />
            {/* Bottom feather tie emblem */}
            <polygon points="80,126 88,136 80,146 72,136" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.3" />
          </>
        );

      // 7. الزخرف الفيكتوري الفضي الداكن (Row 4 Col 3 in video)
      case 'gothic-filigree':
        return (
          <>
            {/* Ornate metallic spikes & scroll ring */}
            <circle cx="80" cy="80" r="55" fill="none" stroke={`url(#${id('darkSteel')})`} strokeWidth="8" />
            <circle cx="80" cy="80" r="52" fill="none" stroke={`url(#${id('silver')})`} strokeWidth="2.5" />
            {/* 4 cardinal gothic diamond spires */}
            <polygon points="80,10 86,25 80,32 74,25" fill={`url(#${id('silver')})`} stroke="#1e293b" strokeWidth="1" />
            <polygon points="80,150 86,135 80,128 74,135" fill={`url(#${id('silver')})`} stroke="#1e293b" strokeWidth="1" />
            <polygon points="10,80 25,74 32,80 25,86" fill={`url(#${id('silver')})`} stroke="#1e293b" strokeWidth="1" />
            <polygon points="150,80 135,74 128,80 135,86" fill={`url(#${id('silver')})`} stroke="#1e293b" strokeWidth="1" />
            {/* Corner filigree curls */}
            {[45, 135, 225, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 80 80)`}>
                <path
                  d="M 68 20 Q 80 12 92 20 Q 86 27 80 24 Q 74 27 68 20 Z"
                  fill={`url(#${id('silver')})`}
                  stroke="#334155"
                  strokeWidth="1"
                />
                <circle cx="80" cy="21" r="2.5" fill="#94a3b8" />
              </g>
            ))}
          </>
        );

      // 8. شريط الجليد والأجنحة الشفافة (Row 5 Col 1 in video)
      case 'crystal-ribbon':
        return (
          <>
            <g className="avatar-frame-orbit-slow">
              <path
                d="M 24 62 C 16 96 34 128 68 136 C 46 124 34 104 33 78 Z"
                fill={`url(#${id('azure')})`}
                fillOpacity="0.65"
                stroke="#e0f2fe"
                strokeWidth="1.2"
              />
              <path
                d="M 136 98 C 144 64 126 32 92 24 C 114 36 126 56 127 82 Z"
                fill={`url(#${id('azure')})`}
                fillOpacity="0.65"
                stroke="#e0f2fe"
                strokeWidth="1.2"
              />
            </g>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('azure')})`} strokeWidth="4.2" />
            <circle cx="80" cy="80" r="50.2" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.85" />
            {/* Translucent fairy wing tip top-right */}
            <path
              d="M 110 34 C 128 20 144 20 146 32 C 138 44 124 48 114 44 Z"
              fill="#bae6fd"
              fillOpacity="0.7"
              stroke="#ffffff"
              strokeWidth="1.1"
            />
            {renderSparkle(30, 34, 5, '#e0f2fe', '0s')}
            {renderSparkle(128, 128, 5, '#bae6fd', '0.9s')}
          </>
        );

      // 9. القلوب الوردية المتوهجة (Row 5 Col 3 in video)
      case 'rose-crystal':
        return (
          <>
            {/* Glowing soft pink ring */}
            <circle cx="80" cy="80" r="55" fill="none" stroke="#fda4af" strokeWidth="3" strokeOpacity="0.45" />
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('pink')})`} strokeWidth="4.8" />
            {/* Cute pastel ribbon / ears silhouette top */}
            <path
              d="M 52 34 C 46 20 55 15 65 26 M 108 34 C 114 20 105 15 95 26"
              fill="#fecdd3"
              stroke="#fb7185"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Floating luminous pink hearts (top-right & bottom-left) */}
            <g className="avatar-frame-heart">
              <path
                d="M 122 36 C 122 31 129 29 132 34 C 135 29 142 31 142 36 C 142 43 132 49 132 49 C 132 49 122 43 122 36 Z"
                fill={`url(#${id('pink')})`}
                stroke="#fff1f2"
                strokeWidth="1"
              />
              <path
                d="M 18 112 C 18 106 26 104 30 109 C 34 104 42 106 42 112 C 42 120 30 128 30 128 C 30 128 18 120 18 112 Z"
                fill={`url(#${id('pink')})`}
                stroke="#fff1f2"
                strokeWidth="1"
              />
            </g>
            {renderSparkle(34, 34, 4.5, '#ffe4e6', '0.3s')}
            {renderSparkle(122, 128, 4.5, '#fecdd3', '1s')}
          </>
        );

      // 10. الكوكب السماوي والمدار الأزرق (Row 6 Col 1 in video)
      case 'ocean-orbit':
        return (
          <>
            {/* Electric cobalt glowing ring */}
            <circle cx="80" cy="80" r="55" fill="none" stroke="#38bdf8" strokeWidth="3" strokeOpacity="0.45" />
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('azure')})`} strokeWidth="5.2" />
            {/* Orbiting glowing planet + orbit ring */}
            <g className="avatar-frame-orbit">
              <ellipse
                cx="80"
                cy="80"
                rx="64"
                ry="56"
                fill="none"
                stroke="#7dd3fc"
                strokeWidth="1.2"
                strokeOpacity="0.65"
                strokeDasharray="18 10"
              />
              {/* Planet sphere at bottom-left of orbit */}
              <g transform="translate(26, 114)">
                <circle cx="0" cy="0" r="9.5" fill={`url(#${id('azure')})`} stroke="#e0f2fe" strokeWidth="1.5" />
                <ellipse cx="0" cy="0" rx="14" ry="4" transform="rotate(-24)" fill="none" stroke="#bae6fd" strokeWidth="1.6" />
                <circle cx="-3" cy="-3" r="2.2" fill="#ffffff" fillOpacity="0.9" />
              </g>
              {/* Small moon orb opposite side */}
              <circle cx="133" cy="46" r="4" fill="#bae6fd" stroke="#ffffff" strokeWidth="1" />
            </g>
            {renderSparkle(135, 118, 4.5, '#e0f2fe', '0.5s')}
          </>
        );

      // 11. أجنحة اللؤلؤ والزهور البنفسجية (Row 6 Col 2 in video)
      case 'violet-blossom':
        return (
          <>
            <g className="avatar-frame-wing">
              <path
                d="M 32 108 C 16 100 10 82 14 66 C 23 74 28 84 34 94 Z M 42 124 C 24 122 14 110 15 94 C 25 100 34 108 44 116 Z"
                fill={`url(#${id('violet')})`}
                stroke="#f3e8ff"
                strokeWidth="1.1"
              />
              <g transform="translate(160, 0) scale(-1, 1)">
                <path
                  d="M 32 108 C 16 100 10 82 14 66 C 23 74 28 84 34 94 Z M 42 124 C 24 122 14 110 15 94 C 25 100 34 108 44 116 Z"
                  fill={`url(#${id('violet')})`}
                  stroke="#f3e8ff"
                  strokeWidth="1.1"
                />
              </g>
            </g>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('violet')})`} strokeWidth="5" />
            {/* Lotus crystal petals at top & bottom */}
            <path
              d="M 65 27 Q 72 12 80 6 Q 88 12 95 27 Q 80 23 65 27 Z"
              fill={`url(#${id('violet')})`}
              stroke="#ffffff"
              strokeWidth="1.1"
            />
            <path
              d="M 62 130 Q 80 148 98 130 Q 80 137 62 130 Z"
              fill={`url(#${id('violet')})`}
              stroke="#f3e8ff"
              strokeWidth="1"
            />
            {renderSparkle(26, 40, 5, '#e9d5ff', '0.2s')}
            {renderSparkle(134, 40, 5, '#e9d5ff', '0.9s')}
          </>
        );

      // 12. التاج الإمبراطوري الفضي VIP (Row 7 Col 1 in video)
      case 'imperial-vip':
        return (
          <>
            {/* Grand platinum-silver wings */}
            <g className="avatar-frame-wing">
              {renderFalconWingHalf(`url(#${id('silver')})`, '#475569', '#ffffff')}
              <g transform="translate(160, 0) scale(-1, 1)">
                {renderFalconWingHalf(`url(#${id('silver')})`, '#475569', '#ffffff')}
              </g>
            </g>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('silver')})`} strokeWidth="5.4" />
            {/* Multi-spired silver imperial crown */}
            <path
              d="M 54 30 L 50 15 L 65 22 L 80 5 L 95 22 L 110 15 L 106 30 Z"
              fill={`url(#${id('silver')})`}
              stroke="#334155"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
            <circle cx="80" cy="18" r="3" fill="#a855f7" stroke="#ffffff" strokeWidth="0.8" />
            {/* Purple-Silver VIP Ribbon Plaque at bottom */}
            <path
              d="M 42 126 Q 80 135 118 126 L 124 142 Q 80 150 36 142 Z"
              fill={`url(#${id('violet')})`}
              stroke={`url(#${id('silver')})`}
              strokeWidth="1.6"
            />
            <text x="80" y="140.5" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#ffffff" letterSpacing="1.2">
              VIP
            </text>
            {renderSparkle(20, 22, 5.5, '#ffffff', '0.1s')}
            {renderSparkle(140, 22, 5.5, '#e9d5ff', '0.8s')}
          </>
        );

      // 13. الشعلة النارية الدوارة (Row 8 Col 1 in video)
      case 'phoenix-fire':
        return (
          <>
            {/* Dynamic swirling fire tongues */}
            <g className="avatar-frame-fire">
              <path
                d="M 24 72 C 12 52 24 22 52 16 C 36 28 31 44 33 62 Z"
                fill={`url(#${id('fire')})`}
              />
              <path
                d="M 136 88 C 148 108 136 138 108 144 C 124 132 129 116 127 98 Z"
                fill={`url(#${id('fire')})`}
              />
              <path
                d="M 76 22 C 98 10 128 24 136 52 C 122 36 104 30 86 30 Z"
                fill={`url(#${id('fire')})`}
              />
              <path
                d="M 84 138 C 62 150 32 136 24 108 C 38 124 56 130 74 130 Z"
                fill={`url(#${id('fire')})`}
              />
              <circle cx="22" cy="96" r="2.6" fill="#fef08a" />
              <circle cx="138" cy="64" r="2.6" fill="#fde047" />
              <circle cx="114" cy="24" r="2" fill="#fed7aa" />
            </g>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('fire')})`} strokeWidth="5.5" />
            <circle cx="80" cy="80" r="49.8" fill="none" stroke="#fef08a" strokeWidth="1.1" strokeOpacity="0.85" />
          </>
        );

      // 14. الجواهر الملكية المرصعة (Row 8 Col 2 in video)
      case 'royal-armor':
        return (
          <>
            <circle cx="80" cy="80" r="54.5" fill="none" stroke={`url(#${id('gold')})`} strokeWidth="7" />
            <circle cx="80" cy="80" r="50.5" fill="none" stroke="#1e3a8a" strokeWidth="1.5" />
            {/* Side armor gauntlets */}
            <path
              d="M 21 62 L 10 72 L 10 88 L 21 98 L 28 80 Z"
              fill={`url(#${id('silver')})`}
              stroke={`url(#${id('goldDark')})`}
              strokeWidth="1.3"
            />
            <g transform="translate(160, 0) scale(-1, 1)">
              <path
                d="M 21 62 L 10 72 L 10 88 L 21 98 L 28 80 Z"
                fill={`url(#${id('silver')})`}
                stroke={`url(#${id('goldDark')})`}
                strokeWidth="1.3"
              />
            </g>
            {/* Top & bottom sapphire jewels */}
            <polygon points="80,8 88,22 80,31 72,22" fill={`url(#${id('azure')})`} stroke="#fde047" strokeWidth="1.3" />
            <polygon points="80,129 88,138 80,150 72,138" fill={`url(#${id('azure')})`} stroke="#fde047" strokeWidth="1.3" />
            {[45, 135, 225, 315].map((deg) => (
              <circle
                key={deg}
                cx={80 + 54.5 * Math.cos((deg * Math.PI) / 180)}
                cy={80 + 54.5 * Math.sin((deg * Math.PI) / 180)}
                r="4"
                fill={`url(#${id('azure')})`}
                stroke="#fef08a"
                strokeWidth="1.1"
              />
            ))}
          </>
        );

      // 15. هالة الملاك والأجنحة البيضاء (Row 8 Col 3 in video)
      case 'angel-halo':
        return (
          <>
            {/* Floating golden angel halo hovering cleanly above head */}
            <g className="avatar-frame-halo">
              <ellipse
                cx="80"
                cy="16"
                rx="26"
                ry="6.5"
                fill="none"
                stroke={`url(#${id('gold')})`}
                strokeWidth="4"
              />
              <ellipse
                cx="80"
                cy="16"
                rx="26"
                ry="6.5"
                fill="none"
                stroke="#fffbeb"
                strokeWidth="1.2"
              />
            </g>
            {/* Subtle pearl-white ring */}
            <circle cx="80" cy="80" r="52" fill="none" stroke={`url(#${id('pearlWing')})`} strokeWidth="3.5" strokeOpacity="0.9" />
            {/* Luminous pearly-white feather wings curving upward */}
            <g className="avatar-frame-wing">
              <path
                d="M 46 126 C 24 120 12 104 12 85 C 18 92 24 96 31 99 C 18 89 14 75 17 62 C 25 71 32 80 38 92 C 38 78 40 69 45 64 C 46 84 48 102 58 120 Z"
                fill={`url(#${id('pearlWing')})`}
                stroke="#cbd5e1"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <g transform="translate(160, 0) scale(-1, 1)">
                <path
                  d="M 46 126 C 24 120 12 104 12 85 C 18 92 24 96 31 99 C 18 89 14 75 17 62 C 25 71 32 80 38 92 C 38 78 40 69 45 64 C 46 84 48 102 58 120 Z"
                  fill={`url(#${id('pearlWing')})`}
                  stroke="#cbd5e1"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            {renderSparkle(44, 18, 4.2, '#fef08a', '0.2s')}
            {renderSparkle(116, 18, 4.2, '#fef08a', '0.9s')}
          </>
        );

      // 16. زمرد السلطان المذهب (Upgraded ornate gold & emerald crest)
      case 'emerald-sultan':
        return (
          <>
            <g className="avatar-frame-wing">
              <path
                d="M 32 106 C 14 94 10 68 22 46 C 28 56 32 68 35 80 Z"
                fill={`url(#${id('gold')})`}
                stroke={`url(#${id('goldDark')})`}
                strokeWidth="1.2"
              />
              <g transform="translate(160, 0) scale(-1, 1)">
                <path
                  d="M 32 106 C 14 94 10 68 22 46 C 28 56 32 68 35 80 Z"
                  fill={`url(#${id('gold')})`}
                  stroke={`url(#${id('goldDark')})`}
                  strokeWidth="1.2"
                />
              </g>
            </g>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('gold')})`} strokeWidth="5.4" />
            {/* Sultan emerald turban crest at top */}
            <path
              d="M 60 28 Q 80 6 100 28 Q 80 23 60 28 Z"
              fill={`url(#${id('gold')})`}
              stroke={`url(#${id('goldDark')})`}
              strokeWidth="1.2"
            />
            <polygon points="80,11 86,20 80,28 74,20" fill={`url(#${id('emerald')})`} stroke="#fef08a" strokeWidth="1" />
            <polygon points="80,128 87,136 80,145 73,136" fill={`url(#${id('emerald')})`} stroke="#fef08a" strokeWidth="1" />
            {renderSparkle(26, 36, 4.8, '#6ee7b7', '0.3s')}
            {renderSparkle(134, 36, 4.8, '#fde047', '1.1s')}
          </>
        );

      // 17. الطيف اللؤلؤي القزحي (Row 7 Col 2 in video)
      case 'aurora-rainbow':
        return (
          <>
            <circle cx="80" cy="80" r="54.5" fill="none" stroke={`url(#${id('opal')})`} strokeWidth="6" />
            <circle cx="80" cy="80" r="50.5" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeOpacity="0.9" />
            <g className="avatar-frame-orbit-slow">
              <path
                d="M 28 56 C 16 84 32 126 70 138 C 44 124 32 96 34 68 Z"
                fill={`url(#${id('opal')})`}
                fillOpacity="0.85"
                stroke="#ffffff"
                strokeWidth="1"
              />
            </g>
            {renderSparkle(36, 26, 5.5, '#ffffff', '0s')}
            {renderSparkle(128, 34, 5, '#fde68a', '0.7s')}
            {renderSparkle(122, 130, 5.5, '#bae6fd', '1.3s')}
          </>
        );

      // 18. خوذة السايبر الكرومية (Row 3 Col 3 in video)
      case 'cyber-neon':
        return (
          <>
            <path
              d="M 32 62 C 14 52 10 34 18 18 C 28 28 34 38 38 48 Z"
              fill={`url(#${id('silver')})`}
              stroke="#22d3ee"
              strokeWidth="1.2"
            />
            <g transform="translate(160, 0) scale(-1, 1)">
              <path
                d="M 32 62 C 14 52 10 34 18 18 C 28 28 34 38 38 48 Z"
                fill={`url(#${id('silver')})`}
                stroke="#22d3ee"
                strokeWidth="1.2"
              />
            </g>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('silver')})`} strokeWidth="5.2" />
            <circle cx="80" cy="80" r="55.5" fill="none" stroke="#22d3ee" strokeWidth="1.6" strokeDasharray="24 8 6 8" />
            <polygon points="80,14 92,26 80,30 68,26" fill={`url(#${id('azure')})`} stroke="#e0f2fe" strokeWidth="1" />
            {renderSparkle(24, 120, 4.5, '#22d3ee', '0.4s')}
            {renderSparkle(136, 120, 4.5, '#22d3ee', '1s')}
          </>
        );

      // 19. بريق اللؤلؤ والنجوم الفضية (Row 3 Col 1 in video)
      case 'silver-pearl':
        return (
          <>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('silver')})`} strokeWidth="4.5" />
            <circle cx="80" cy="80" r="55.5" fill="none" stroke="#f8fafc" strokeWidth="1" strokeDasharray="6 6" />
            <path
              d="M 60 28 Q 80 18 100 28 Q 80 24 60 28 Z"
              fill={`url(#${id('silver')})`}
              stroke="#ffffff"
              strokeWidth="0.9"
            />
            {renderSparkle(24, 34, 6, '#ffffff', '0s')}
            {renderSparkle(136, 40, 5, '#e2e8f0', '0.8s')}
            {renderSparkle(26, 124, 4.8, '#ffffff', '1.4s')}
            {renderSparkle(134, 122, 5.5, '#f8fafc', '0.4s')}
          </>
        );

      // 20. أجنحة العنقاء والياقوت (Row 4 Col 1 in video)
      case 'ruby-crimson':
        return (
          <>
            <g className="avatar-frame-wing">
              {renderFalconWingHalf(`url(#${id('gold')})`, '#b91c1c', '#fecaca')}
              <g transform="translate(160, 0) scale(-1, 1)">
                {renderFalconWingHalf(`url(#${id('gold')})`, '#b91c1c', '#fecaca')}
              </g>
            </g>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('fire')})`} strokeWidth="5.4" />
            <polygon points="80,10 88,22 80,30 72,22" fill="#dc2626" stroke="#fde047" strokeWidth="1.2" />
            <polygon points="80,128 88,137 80,147 72,137" fill="#dc2626" stroke="#fde047" strokeWidth="1.2" />
            {renderSparkle(26, 26, 5, '#fecaca', '0.2s')}
            {renderSparkle(134, 26, 5, '#fde047', '0.9s')}
          </>
        );

      // 21. إكليل الأوبسيديان المذهب (Row 2 Col 3 in video)
      case 'obsidian-gold':
      default:
        return (
          <>
            <g className="avatar-frame-wing">
              <path
                d="M 32 104 C 14 90 12 60 28 38 C 33 52 35 66 37 84 Z"
                fill={`url(#${id('goldDark')})`}
                stroke="#fde68a"
                strokeWidth="1.1"
              />
              <g transform="translate(160, 0) scale(-1, 1)">
                <path
                  d="M 32 104 C 14 90 12 60 28 38 C 33 52 35 66 37 84 Z"
                  fill={`url(#${id('goldDark')})`}
                  stroke="#fde68a"
                  strokeWidth="1.1"
                />
              </g>
            </g>
            <circle cx="80" cy="80" r="52.5" fill="none" stroke={`url(#${id('goldDark')})`} strokeWidth="5.4" />
            <circle cx="80" cy="80" r="50" fill="none" stroke="#fde047" strokeWidth="1.1" strokeOpacity="0.7" />
            <polygon points="80,128 87,137 80,146 73,137" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.2" />
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-visible ${className}`}
    >
      {renderSharedDefs()}
      {renderVariantArtwork()}
    </svg>
  );
};
