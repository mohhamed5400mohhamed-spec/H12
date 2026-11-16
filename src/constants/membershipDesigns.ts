export interface AvatarFramePreset {
  id: string;
  name: string;
  badge: string;
  animated: boolean;
  svgVariant: string;
  gradient: string;
  glowColor: string;
  accentColor: string;
  sparkles?: boolean;
  crown?: boolean;
  spinFast?: boolean;
  ringStyle?: 'rounded' | 'circle' | 'octagon';
}

export interface MemberBackgroundPreset {
  id: string;
  name: string;
  badge: string;
  previewImage: string;
  cssGradient: string;
}

export interface RoomBannerPreset {
  id: string;
  name: string;
  imageUrl: string;
}

// Helper to build crisp offline-safe inline SVG data URI illustrations for luxury backgrounds
function svgDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export const AVATAR_FRAME_PRESETS: AvatarFramePreset[] = [
  {
    id: 'frame:royal-gold-glitter',
    svgVariant: 'royal-gold-glitter',
    name: 'أجنحة الصقر الذهبي الملكي',
    badge: 'أجنحة 3D ✨',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #fbbf24, #fef08a, #d97706, #fde047, #b45309, #fbbf24)',
    glowColor: 'rgba(245, 158, 11, 0.72)',
    accentColor: '#fbbf24',
    sparkles: true,
    crown: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:imperial-vip',
    svgVariant: 'imperial-vip',
    name: 'التاج الإمبراطوري الفضي VIP',
    badge: 'إمبراطوري 👑',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #f8fafc, #c084fc, #e2e8f0, #94a3b8, #f8fafc)',
    glowColor: 'rgba(192, 132, 252, 0.72)',
    accentColor: '#e9d5ff',
    sparkles: true,
    crown: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:diamond-prism',
    svgVariant: 'diamond-prism',
    name: 'التاج البنفسجي الكريستالي',
    badge: 'كريستال 💎',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #e0f2fe, #a855f7, #ffffff, #38bdf8, #c084fc, #e0f2fe)',
    glowColor: 'rgba(168, 85, 247, 0.72)',
    accentColor: '#c084fc',
    sparkles: true,
    spinFast: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:angel-halo',
    svgVariant: 'angel-halo',
    name: 'هالة الملاك والأجنحة البيضاء',
    badge: 'ملائكي 🪽',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #ffffff, #fef08a, #f8fafc, #fde047, #ffffff)',
    glowColor: 'rgba(253, 224, 71, 0.65)',
    accentColor: '#fef08a',
    sparkles: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:dragon-azure',
    svgVariant: 'dragon-azure',
    name: 'التنين الذهبي والأمواج الزرقاء',
    badge: 'تنين 🐉',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #fbbf24, #38bdf8, #0284c7, #fde047, #0ea5e9, #fbbf24)',
    glowColor: 'rgba(56, 189, 248, 0.75)',
    accentColor: '#38bdf8',
    sparkles: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:solar-laurel',
    svgVariant: 'solar-laurel',
    name: 'شعلة الشمس والإكليل الذهبي',
    badge: 'إكليل 🏆',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #f59e0b, #fef08a, #ea580c, #fde047, #f59e0b)',
    glowColor: 'rgba(245, 158, 11, 0.78)',
    accentColor: '#fde047',
    sparkles: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:obsidian-wings',
    svgVariant: 'obsidian-wings',
    name: 'أجنحة النسر الأسود الفخم',
    badge: 'أسطوري 🦅',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #334155, #0f172a, #94a3b8, #020617, #334155)',
    glowColor: 'rgba(148, 163, 184, 0.55)',
    accentColor: '#cbd5e1',
    ringStyle: 'circle'
  },
  {
    id: 'frame:ocean-orbit',
    svgVariant: 'ocean-orbit',
    name: 'الكوكب السماوي والمدار الأزرق',
    badge: 'مداري 🪐',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #0ea5e9, #38bdf8, #1d4ed8, #7dd3fc, #0ea5e9)',
    glowColor: 'rgba(14, 165, 233, 0.8)',
    accentColor: '#7dd3fc',
    spinFast: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:phoenix-fire',
    svgVariant: 'phoenix-fire',
    name: 'الشعلة النارية الدوارة',
    badge: 'ناري 🔥',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #f97316, #ef4444, #facc15, #ea580c, #fde047, #f97316)',
    glowColor: 'rgba(249, 115, 22, 0.82)',
    accentColor: '#fb923c',
    spinFast: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:rose-crystal',
    svgVariant: 'rose-crystal',
    name: 'القلوب الوردية المتوهجة',
    badge: 'وردي 💖',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #fb7185, #ffe4e6, #ec4899, #fda4af, #fb7185)',
    glowColor: 'rgba(244, 114, 182, 0.72)',
    accentColor: '#fda4af',
    sparkles: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:silver-knight',
    svgVariant: 'silver-knight',
    name: 'درع المحارب الفضي الحديدي',
    badge: 'فولاذي ⚔️',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #e2e8f0, #334155, #f8fafc, #1e293b, #e2e8f0)',
    glowColor: 'rgba(203, 213, 225, 0.62)',
    accentColor: '#e2e8f0',
    ringStyle: 'circle'
  },
  {
    id: 'frame:royal-armor',
    svgVariant: 'royal-armor',
    name: 'الجواهر الملكية المرصعة',
    badge: 'مرصع 💠',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #fbbf24, #2563eb, #fde047, #1d4ed8, #fbbf24)',
    glowColor: 'rgba(59, 130, 246, 0.72)',
    accentColor: '#fde047',
    ringStyle: 'circle'
  },
  {
    id: 'frame:violet-blossom',
    svgVariant: 'violet-blossom',
    name: 'أجنحة اللؤلؤ والزهور البنفسجية',
    badge: 'بنفسجي 🌸',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #c084fc, #f3e8ff, #7e22ce, #d8b4fe, #c084fc)',
    glowColor: 'rgba(168, 85, 247, 0.72)',
    accentColor: '#e9d5ff',
    sparkles: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:crystal-ribbon',
    svgVariant: 'crystal-ribbon',
    name: 'شريط الجليد والأجنحة الشفافة',
    badge: 'جليدي ❄️',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #bae6fd, #ffffff, #38bdf8, #e0f2fe, #bae6fd)',
    glowColor: 'rgba(125, 211, 252, 0.72)',
    accentColor: '#bae6fd',
    sparkles: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:gothic-filigree',
    svgVariant: 'gothic-filigree',
    name: 'الزخرف الفيكتوري الفضي الداكن',
    badge: 'ملكي ⚜️',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #94a3b8, #0f172a, #e2e8f0, #1e293b, #94a3b8)',
    glowColor: 'rgba(148, 163, 184, 0.6)',
    accentColor: '#cbd5e1',
    ringStyle: 'circle'
  },
  {
    id: 'frame:ruby-crimson',
    svgVariant: 'ruby-crimson',
    name: 'أجنحة العنقاء والياقوت',
    badge: 'ياقوت ❤️‍🔥',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #dc2626, #fbbf24, #991b1b, #fca5a5, #ef4444, #dc2626)',
    glowColor: 'rgba(220, 38, 38, 0.75)',
    accentColor: '#fca5a5',
    crown: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:emerald-sultan',
    svgVariant: 'emerald-sultan',
    name: 'زمرد السلطان المذهب',
    badge: 'زمردي 🌿',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #10b981, #fbbf24, #059669, #fde047, #34d399, #10b981)',
    glowColor: 'rgba(16, 185, 129, 0.7)',
    accentColor: '#6ee7b7',
    sparkles: true,
    crown: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:aurora-rainbow',
    svgVariant: 'aurora-rainbow',
    name: 'الطيف اللؤلؤي القزحي',
    badge: 'قزحي 🌈',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #fbcfe8, #fde68a, #a7f3d0, #bae6fd, #ddd6fe, #fbcfe8)',
    glowColor: 'rgba(192, 132, 252, 0.65)',
    accentColor: '#f5d0fe',
    sparkles: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:cyber-neon',
    svgVariant: 'cyber-neon',
    name: 'خوذة السايبر الكرومية',
    badge: 'سايبر ⚡',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #22d3ee, #e2e8f0, #0ea5e9, #334155, #22d3ee)',
    glowColor: 'rgba(34, 211, 238, 0.8)',
    accentColor: '#22d3ee',
    spinFast: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:silver-pearl',
    svgVariant: 'silver-pearl',
    name: 'بريق اللؤلؤ والنجوم الفضية',
    badge: 'لؤلؤي 🪞',
    animated: true,
    gradient: 'conic-gradient(from 0deg, #f8fafc, #94a3b8, #e2e8f0, #cbd5e1, #ffffff, #f8fafc)',
    glowColor: 'rgba(226, 232, 240, 0.65)',
    accentColor: '#f8fafc',
    sparkles: true,
    ringStyle: 'circle'
  },
  {
    id: 'frame:obsidian-gold',
    svgVariant: 'obsidian-gold',
    name: 'إكليل الأوبسيديان المذهب',
    badge: 'فخم 🖤',
    animated: true,
    gradient: 'linear-gradient(135deg, #1e293b 0%, #fbbf24 50%, #0f172a 100%)',
    glowColor: 'rgba(251, 191, 36, 0.58)',
    accentColor: '#fbbf24',
    ringStyle: 'circle'
  }
];

export const MEMBER_BG_PRESETS: MemberBackgroundPreset[] = [
  {
    id: 'bg:royal-gold-damask',
    name: 'نقش الذهب الملكي',
    badge: 'ملكي 👑',
    cssGradient: 'linear-gradient(135deg, #1c1306 0%, #3d2808 50%, #140e04 100%)',
    previewImage: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#171005"/>
            <stop offset="50%" stop-color="#3c2606"/>
            <stop offset="100%" stop-color="#0f0a03"/>
          </linearGradient>
          <radialGradient id="glow1" cx="75%" cy="35%" r="55%">
            <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.38"/>
            <stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="600" height="180" fill="url(#g1)"/>
        <rect width="600" height="180" fill="url(#glow1)"/>
        <path d="M0,145 Q150,95 300,140 T600,120 L600,180 L0,180 Z" fill="#f59e0b" fill-opacity="0.14"/>
        <path d="M0,160 Q180,115 360,155 T600,135" fill="none" stroke="#fbbf24" stroke-opacity="0.45" stroke-width="2"/>
        <circle cx="480" cy="48" r="3" fill="#fef08a" opacity="0.8"/>
        <circle cx="520" cy="72" r="2" fill="#fbbf24" opacity="0.7"/>
        <circle cx="420" cy="34" r="2" fill="#fde047" opacity="0.6"/>
        <circle cx="110" cy="40" r="2.5" fill="#fbbf24" opacity="0.5"/>
      </svg>
    `)
  },
  {
    id: 'bg:midnight-aurora',
    name: 'أضواء الشفق الليلي',
    badge: 'شفق 🌌',
    cssGradient: 'linear-gradient(135deg, #061326 0%, #1e1b4b 55%, #0f172a 100%)',
    previewImage: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180">
        <defs>
          <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#050e1d"/>
            <stop offset="50%" stop-color="#1e1b4b"/>
            <stop offset="100%" stop-color="#09192b"/>
          </linearGradient>
          <radialGradient id="au1" cx="30%" cy="25%" r="55%">
            <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="au2" cx="80%" cy="65%" r="50%">
            <stop offset="0%" stop-color="#a855f7" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="600" height="180" fill="url(#g2)"/>
        <rect width="600" height="180" fill="url(#au1)"/>
        <rect width="600" height="180" fill="url(#au2)"/>
        <path d="M0,120 C140,65 280,150 440,85 C510,55 560,75 600,60" fill="none" stroke="#38bdf8" stroke-opacity="0.45" stroke-width="2.5"/>
        <circle cx="95" cy="40" r="1.8" fill="#fff" opacity="0.8"/>
        <circle cx="240" cy="28" r="2.2" fill="#e0f2fe" opacity="0.7"/>
        <circle cx="490" cy="36" r="1.8" fill="#fff" opacity="0.9"/>
        <circle cx="555" cy="110" r="1.5" fill="#c084fc" opacity="0.8"/>
      </svg>
    `)
  },
  {
    id: 'bg:crimson-velvet',
    name: 'مخمل الياقوت الأحمر',
    badge: 'فاخر 🌹',
    cssGradient: 'linear-gradient(135deg, #2a0711 0%, #581022 50%, #1c050c 100%)',
    previewImage: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180">
        <defs>
          <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#25060f"/>
            <stop offset="50%" stop-color="#681228"/>
            <stop offset="100%" stop-color="#19040a"/>
          </linearGradient>
          <radialGradient id="rg3" cx="68%" cy="40%" r="55%">
            <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="600" height="180" fill="url(#g3)"/>
        <rect width="600" height="180" fill="url(#rg3)"/>
        <path d="M0,140 Q170,90 340,140 T600,115 L600,180 L0,180 Z" fill="#fb7185" fill-opacity="0.12"/>
        <circle cx="465" cy="55" r="32" fill="none" stroke="#fda4af" stroke-opacity="0.22" stroke-width="1.5"/>
        <circle cx="465" cy="55" r="52" fill="none" stroke="#fbbf24" stroke-opacity="0.18" stroke-width="1"/>
      </svg>
    `)
  },
  {
    id: 'bg:emerald-palace',
    name: 'حدائق الزمرد الأندلسية',
    badge: 'زمرد 🌿',
    cssGradient: 'linear-gradient(135deg, #042018 0%, #0b4635 55%, #031912 100%)',
    previewImage: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180">
        <defs>
          <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#031b14"/>
            <stop offset="55%" stop-color="#0d523d"/>
            <stop offset="100%" stop-color="#02140e"/>
          </linearGradient>
        </defs>
        <rect width="600" height="180" fill="url(#g4)"/>
        <circle cx="500" cy="45" r="70" fill="#10b981" fill-opacity="0.16"/>
        <circle cx="120" cy="140" r="65" fill="#fbbf24" fill-opacity="0.08"/>
        <path d="M0,150 Q150,105 300,145 T600,125" fill="none" stroke="#34d399" stroke-opacity="0.4" stroke-width="2"/>
        <path d="M0,165 Q200,130 400,160 T600,145" fill="none" stroke="#fbbf24" stroke-opacity="0.28" stroke-width="1.2"/>
      </svg>
    `)
  },
  {
    id: 'bg:pearl-platinum',
    name: 'البلاتين اللؤلؤي الهادئ',
    badge: 'لؤلؤي 🪞',
    cssGradient: 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #0f172a 100%)',
    previewImage: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180">
        <defs>
          <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e293b"/>
            <stop offset="50%" stop-color="#475569"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>
        <rect width="600" height="180" fill="url(#g5)"/>
        <path d="M-20,160 C160,60 360,200 620,40" fill="none" stroke="#e2e8f0" stroke-opacity="0.25" stroke-width="22"/>
        <path d="M-20,130 C160,30 360,170 620,10" fill="none" stroke="#f8fafc" stroke-opacity="0.16" stroke-width="2"/>
        <circle cx="490" cy="60" r="3" fill="#f8fafc" opacity="0.7"/>
        <circle cx="140" cy="45" r="2" fill="#cbd5e1" opacity="0.6"/>
      </svg>
    `)
  },
  {
    id: 'bg:sapphire-ocean',
    name: 'أعماق الياقوت الأزرق',
    badge: 'ياقوت 🌊',
    cssGradient: 'linear-gradient(135deg, #071936 0%, #164e87 55%, #051126 100%)',
    previewImage: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180">
        <defs>
          <linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#061630"/>
            <stop offset="55%" stop-color="#154d8a"/>
            <stop offset="100%" stop-color="#041024"/>
          </linearGradient>
        </defs>
        <rect width="600" height="180" fill="url(#g6)"/>
        <path d="M0,120 Q150,80 300,125 T600,110 L600,180 L0,180 Z" fill="#38bdf8" fill-opacity="0.14"/>
        <path d="M0,145 Q180,105 360,145 T600,130 L600,180 L0,180 Z" fill="#0ea5e9" fill-opacity="0.18"/>
        <circle cx="470" cy="45" r="2.5" fill="#bae6fd" opacity="0.8"/>
      </svg>
    `)
  },
  {
    id: 'bg:sunset-desert',
    name: 'غروب الصحراء الذهبية',
    badge: 'غروب 🌅',
    cssGradient: 'linear-gradient(135deg, #2e1029 0%, #831843 45%, #d97706 100%)',
    previewImage: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180">
        <defs>
          <linearGradient id="g7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#270d23"/>
            <stop offset="55%" stop-color="#7c1d3d"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
        </defs>
        <rect width="600" height="180" fill="url(#g7)"/>
        <circle cx="460" cy="70" r="38" fill="#fbbf24" fill-opacity="0.32"/>
        <path d="M0,135 Q160,105 320,135 T600,125 L600,180 L0,180 Z" fill="#1e0914" fill-opacity="0.65"/>
      </svg>
    `)
  },
  {
    id: 'bg:cyber-purple',
    name: 'سديم النيون البنفسجي',
    badge: 'نيون 🔮',
    cssGradient: 'linear-gradient(135deg, #170936 0%, #4c1d95 55%, #0f172a 100%)',
    previewImage: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180">
        <defs>
          <linearGradient id="g8" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#14072e"/>
            <stop offset="55%" stop-color="#4c1d95"/>
            <stop offset="100%" stop-color="#090d1f"/>
          </linearGradient>
        </defs>
        <rect width="600" height="180" fill="url(#g8)"/>
        <circle cx="140" cy="50" r="60" fill="#ec4899" fill-opacity="0.22"/>
        <circle cx="490" cy="110" r="75" fill="#22d3ee" fill-opacity="0.18"/>
        <path d="M0,155 L600,85" stroke="#c084fc" stroke-opacity="0.25" stroke-width="1.5"/>
      </svg>
    `)
  }
];

export const ROOM_BANNER_PRESETS: RoomBannerPreset[] = MEMBER_BG_PRESETS.slice(0, 6).map((b) => ({
  id: b.id,
  name: b.name,
  imageUrl: b.previewImage
}));

export function getFramePreset(value?: string): AvatarFramePreset | undefined {
  if (!value) return undefined;
  return AVATAR_FRAME_PRESETS.find((f) => f.id === value);
}

export function isCustomImageValue(value?: string): boolean {
  if (!value) return false;
  return (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('/uploads/') ||
    value.startsWith('data:image/') ||
    value.startsWith('blob:')
  );
}

export function getMemberBgPreset(value?: string): MemberBackgroundPreset | undefined {
  if (!value) return undefined;
  return MEMBER_BG_PRESETS.find((b) => b.id === value);
}

export function resolveMemberBgUrl(value?: string): string | undefined {
  if (!value) return undefined;
  const preset = getMemberBgPreset(value);
  if (preset) return preset.previewImage;
  if (isCustomImageValue(value)) return value;
  return undefined;
}
