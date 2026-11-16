import React, { useRef, useState } from 'react';
import { Sparkles, Upload, Trash2, Lock, Check, Image as ImageIcon, X, Crown } from 'lucide-react';
import {
  AVATAR_FRAME_PRESETS,
  MEMBER_BG_PRESETS,
  isCustomImageValue,
  resolveMemberBgUrl
} from '../constants/membershipDesigns';
import { AvatarWithFrame } from './AvatarWithFrame';

export interface MembershipDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  displayName?: string;
  avatarUrl: string;
  statusQuote?: string;
  flag?: string;
  currentFrame?: string;
  currentBg?: string;
  canUseAvatarFrame: boolean;
  canUseMemberBg: boolean;
  onUploadImage: (file: File) => Promise<string | null>;
  onSaveFrame: (frameValue: string) => void;
  onSaveBg: (bgValue: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const MembershipDesignModal: React.FC<MembershipDesignModalProps> = ({
  isOpen,
  onClose,
  username,
  displayName,
  avatarUrl,
  statusQuote,
  flag = '👑',
  currentFrame = '',
  currentBg = '',
  canUseAvatarFrame,
  canUseMemberBg,
  onUploadImage,
  onSaveFrame,
  onSaveBg,
  onShowToast
}) => {
  const frameFileRef = useRef<HTMLInputElement>(null);
  const bgFileRef = useRef<HTMLInputElement>(null);
  const [isUploadingFrame, setIsUploadingFrame] = useState(false);
  const [isUploadingBg, setIsUploadingBg] = useState(false);

  if (!isOpen) return null;

  const previewBgUrl = resolveMemberBgUrl(currentBg);
  const hasCustomFrameUrl = Boolean(currentFrame && isCustomImageValue(currentFrame));
  const hasCustomBgUrl = Boolean(currentBg && isCustomImageValue(currentBg));

  const denyFrame = () => {
    onShowToast('ليس لديك صلاحية استخدام أو تغيير إطار الصورة الشخصية 🔒', 'error');
  };

  const denyBg = () => {
    onShowToast('ليس لديك صلاحية استخدام أو تغيير خلفية العضوية والبروفايل 🔒', 'error');
  };

  const handleFrameFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!canUseAvatarFrame) {
      denyFrame();
      return;
    }
    setIsUploadingFrame(true);
    try {
      const url = await onUploadImage(file);
      if (url) {
        onSaveFrame(url);
      }
    } finally {
      setIsUploadingFrame(false);
    }
  };

  const handleBgFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!canUseMemberBg) {
      denyBg();
      return;
    }
    setIsUploadingBg(true);
    try {
      const url = await onUploadImage(file);
      if (url) {
        onSaveBg(url);
      }
    } finally {
      setIsUploadingBg(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in"
      dir="rtl"
    >
      <div className="w-full max-w-lg max-h-[92vh] bg-[#131722] border-2 border-amber-500/75 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-right text-slate-100">
        {/* Header */}
        <div className="shrink-0 bg-gradient-to-l from-[#1e1711] via-[#261c12] to-[#1e1711] border-b border-amber-500/40 px-3.5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shrink-0">
              <Crown className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-sm text-amber-300 truncate">تصميم العضوية ✨</h3>
              <p className="text-[11px] text-amber-100/70 truncate">اختر إطارك المتحرك وخلفية عضويتك لتتألق أمام الجميع</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center cursor-pointer shrink-0 transition-colors"
            title="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll-container p-3.5 space-y-4 text-xs">
          {/* Live Preview Card */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
              <span>معاينة ظهورك في قائمة الأعضاء والبروفايل:</span>
              {(currentFrame || currentBg) && (
                <span className="text-emerald-400 font-semibold">مباشر ⚡</span>
              )}
            </div>
            <div className="grid grid-cols-1 rounded-xl overflow-hidden border border-amber-500/40 bg-slate-900/90 shadow-lg">
              {previewBgUrl && (
                <img
                  src={previewBgUrl}
                  alt="معاينة الخلفية"
                  className="col-start-1 row-start-1 w-full h-auto max-h-[210px] min-h-full object-cover select-none pointer-events-none"
                />
              )}
              {previewBgUrl && (
                <div
                  aria-hidden="true"
                  className="col-start-1 row-start-1 bg-gradient-to-b from-slate-950/90 via-slate-950/35 to-transparent pointer-events-none"
                />
              )}
              <div className="col-start-1 row-start-1 relative z-10 self-start w-full px-4 pt-5 pb-3.5 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <AvatarWithFrame
                    src={avatarUrl}
                    alt={username}
                    frame={currentFrame}
                    size="md"
                    presenceState="online"
                    showPresenceDot
                  />
                  <div className="min-w-0 text-right">
                    <div className="font-black text-sm text-white drop-shadow truncate">
                      {displayName || username}
                    </div>
                    <div className="text-[11px] text-slate-200/90 truncate max-w-[220px] drop-shadow">
                      {statusQuote || 'عضو مميز في شات حسان برو'}
                    </div>
                  </div>
                </div>
                <span className="text-lg shrink-0 drop-shadow">{flag}</span>
              </div>
            </div>
          </div>

          {/* SECTION 1: FRAMES (قسم الإطارات) */}
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-black text-sm text-amber-300">قسم الإطارات</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border ${
                  canUseAvatarFrame
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                }`}
              >
                {canUseAvatarFrame ? <Check className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                <span>{canUseAvatarFrame ? 'الصلاحية مفعلة' : 'يتطلب صلاحية'}</span>
              </span>
            </div>

            {/* Frame Actions Row */}
            <div className="grid grid-cols-2 gap-2">
              <input
                ref={frameFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFrameFileChange}
              />
              <button
                type="button"
                disabled={isUploadingFrame}
                onClick={() => {
                  if (!canUseAvatarFrame) {
                    denyFrame();
                    return;
                  }
                  frameFileRef.current?.click();
                }}
                className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
              >
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span>{isUploadingFrame ? 'جارٍ رفع الإطار...' : 'رفع إطار من الهاتف'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!canUseAvatarFrame) {
                    denyFrame();
                    return;
                  }
                  if (!currentFrame) {
                    onShowToast('لا يوجد إطار مُفعّل حالياً لإزالته.', 'info');
                    return;
                  }
                  onSaveFrame('');
                }}
                className="py-2.5 px-3 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 shrink-0" />
                <span>إزالة الإطار</span>
              </button>
            </div>

            {hasCustomFrameUrl && (
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AvatarWithFrame src={avatarUrl} alt="الإطار المرفوع" frame={currentFrame} size="sm" />
                  <span className="text-[11px] font-bold text-amber-200">إطارك المرفوع حالياً ✓</span>
                </div>
                <span className="text-[10px] text-emerald-300 font-bold">مُطبق على صورتك</span>
              </div>
            )}

            {/* Pre-uploaded Luxury Frames Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {AVATAR_FRAME_PRESETS.map((preset) => {
                const isSelected = currentFrame === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      if (!canUseAvatarFrame) {
                        denyFrame();
                        return;
                      }
                      onSaveFrame(preset.id);
                    }}
                    className={`pt-6 pb-3 px-2 rounded-xl border text-center flex flex-col items-center gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-b from-amber-500/20 to-amber-950/30 border-amber-400 ring-2 ring-amber-400/50 shadow-lg'
                        : 'bg-gradient-to-b from-slate-800/85 to-slate-900/95 border-slate-700/90 hover:border-amber-500/60 hover:from-slate-800'
                    }`}
                  >
                    <AvatarWithFrame src={avatarUrl} alt={preset.name} frame={preset.id} size="md" />
                    <div className="space-y-0.5 w-full pt-0.5">
                      <div className="font-bold text-[11px] text-slate-100 truncate">{preset.name}</div>
                      <div className="text-[9px] font-bold text-amber-300">{preset.badge}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: BACKGROUNDS (قسم الخلفيات) */}
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span className="font-black text-sm text-cyan-300">قسم الخلفيات</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border ${
                  canUseMemberBg
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                }`}
              >
                {canUseMemberBg ? <Check className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                <span>{canUseMemberBg ? 'الصلاحية مفعلة' : 'يتطلب صلاحية'}</span>
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              تظهر الخلفية التي تختارها في البروفايل الخاص بك، وتظهر أيضاً كخلفية لمساحة عضويتك داخل قائمة الأعضاء وتتمدد تلقائياً حسب مقاس صورتك بدون أن تغطي على باقي الأعضاء.
            </p>

            {/* Bg Actions Row */}
            <div className="grid grid-cols-2 gap-2">
              <input
                ref={bgFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBgFileChange}
              />
              <button
                type="button"
                disabled={isUploadingBg}
                onClick={() => {
                  if (!canUseMemberBg) {
                    denyBg();
                    return;
                  }
                  bgFileRef.current?.click();
                }}
                className="py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
              >
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span>{isUploadingBg ? 'جارٍ رفع الخلفية...' : 'رفع خلفية من الهاتف'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!canUseMemberBg) {
                    denyBg();
                    return;
                  }
                  if (!currentBg) {
                    onShowToast('لا توجد خلفية مُفعّلة حالياً لإزالتها.', 'info');
                    return;
                  }
                  onSaveBg('');
                }}
                className="py-2.5 px-3 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 shrink-0" />
                <span>إزالة الخلفية</span>
              </button>
            </div>

            {hasCustomBgUrl && (
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={currentBg}
                    alt="خلفية العضوية الحالية"
                    className="w-16 h-10 rounded-lg object-cover border border-cyan-400/50 shrink-0"
                  />
                  <span className="text-[11px] font-bold text-cyan-200 truncate">خلفية العضوية المرفوعة حالياً ✓</span>
                </div>
                <span className="text-[10px] text-emerald-300 font-bold shrink-0">نشطة الآن</span>
              </div>
            )}

            {/* Pre-made Backgrounds Grid */}
            <div className="grid grid-cols-2 gap-2">
              {MEMBER_BG_PRESETS.map((bgPreset) => {
                const isSelected = currentBg === bgPreset.id;
                return (
                  <button
                    key={bgPreset.id}
                    type="button"
                    onClick={() => {
                      if (!canUseMemberBg) {
                        denyBg();
                        return;
                      }
                      onSaveBg(bgPreset.id);
                    }}
                    className={`rounded-xl overflow-hidden border text-right transition-all cursor-pointer grid grid-cols-1 ${
                      isSelected
                        ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-md'
                        : 'border-slate-700 hover:border-cyan-500/60'
                    }`}
                  >
                    <img
                      src={bgPreset.previewImage}
                      alt={bgPreset.name}
                      className="col-start-1 row-start-1 w-full h-20 object-cover select-none pointer-events-none"
                    />
                    <div
                      aria-hidden="true"
                      className="col-start-1 row-start-1 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"
                    />
                    <div className="col-start-1 row-start-1 relative z-10 p-2 flex flex-col justify-between h-20">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold bg-black/55 text-amber-300 px-1.5 py-0.5 rounded">
                          {bgPreset.badge}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-[11px] text-white truncate drop-shadow">
                        {bgPreset.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
