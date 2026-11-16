import React, { useState } from 'react';
import { Smile, X } from 'lucide-react';
import type { EmblemItem } from '../utils/emblemsSystem';
import { VINTAGE_STICKERS } from '../constants/themeStyles';

export interface CustomEmojiPickerPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  items: EmblemItem[];
  onSelectCustomEmoji: (shortcut: string) => void;
  onSelectSticker?: (imageUrl: string, title: string) => void;
  onSelectVintageEmoji: (emojiChar: string) => void;
  allowStickers?: boolean;
  compact?: boolean;
  alignClassName?: string;
}

export const CustomEmojiPickerPopover: React.FC<CustomEmojiPickerPopoverProps> = ({
  isOpen,
  onClose,
  items,
  onSelectCustomEmoji,
  onSelectSticker,
  onSelectVintageEmoji,
  allowStickers = true,
  compact = false,
  alignClassName = 'bottom-full right-1 mb-1.5'
}) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'stickers' | 'vintage'>('custom');

  if (!isOpen) return null;

  const customEmojis = items
    .filter((i) => i.type === 'emoji' && i.shortcut)
    .sort((a, b) => (a.codeNumber || 0) - (b.codeNumber || 0));
  const stickers = items.filter((i) => i.type === 'sticker');
  const gridMaxH = compact ? 'max-h-28' : 'max-h-56';

  return (
    <>
      <div
        className="fixed inset-0 z-30"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute ${alignClassName} z-40 ${
          compact ? 'p-2 w-72 sm:w-80' : 'p-3 w-76 sm:w-96'
        } bg-slate-900 border-2 border-amber-500/75 rounded-2xl shadow-2xl text-right text-slate-100 backdrop-blur-md animate-in zoom-in-95 duration-150`}
        dir="rtl"
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b border-slate-700/80 ${compact ? 'pb-1.5 mb-1.5' : 'pb-2 mb-2'}`}>
          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300">
            <Smile className="w-4 h-4 text-amber-400 shrink-0" />
            <span>الفيسات المخصصة والملصقات</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
            title="إغلاق"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tabs */}
        <div
          className={`grid ${allowStickers ? 'grid-cols-3' : 'grid-cols-2'} gap-1 p-1 bg-slate-950/80 rounded-xl ${
            compact ? 'mb-1.5' : 'mb-2.5'
          } border border-slate-800 text-[11px] font-bold`}
        >
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`py-1 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'custom' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🎨</span>
            <span>فيسات (ف1)</span>
          </button>
          {allowStickers && (
            <button
              type="button"
              onClick={() => setActiveTab('stickers')}
              className={`py-1 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'stickers' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🖼️</span>
              <span>ستيكرات</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveTab('vintage')}
            className={`py-1 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'vintage' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>😊</span>
            <span>شعبية</span>
          </button>
        </div>

        {/* Tab 1: Custom Emojis (ف1، ف2...) */}
        {activeTab === 'custom' && (
          <div className="space-y-1.5">
            {!compact && (
              <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                <span>انقر لإدراج الفيس مباشرة:</span>
                <span className="font-mono text-purple-300 font-bold">{customEmojis.length} فيس متاح</span>
              </div>
            )}
            <div className={`grid grid-cols-4 sm:grid-cols-5 gap-1.5 ${gridMaxH} overflow-y-auto p-1`}>
              {customEmojis.map((emoji) => (
                <button
                  key={emoji.id}
                  type="button"
                  onClick={() => {
                    if (emoji.shortcut) {
                      onSelectCustomEmoji(emoji.shortcut);
                    }
                  }}
                  className="p-1.5 rounded-xl bg-slate-950/75 border border-slate-800 hover:border-purple-400 hover:bg-purple-950/35 flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer hover:scale-105"
                  title={`${emoji.title} (${emoji.shortcut})`}
                >
                  <img
                    src={emoji.imageUrl}
                    alt={emoji.shortcut || emoji.title}
                    className={`${compact ? 'w-7 h-7' : 'w-8 h-8'} object-contain drop-shadow-sm group-hover:scale-110 transition-transform`}
                    loading="lazy"
                  />
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[9px] font-black border border-amber-500/40">
                    {emoji.shortcut}
                  </span>
                </button>
              ))}
              {customEmojis.length === 0 && (
                <div className="col-span-full text-center text-[11px] text-slate-400 py-4">
                  لا توجد فيسات مخصصة مضافة حالياً
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Stickers */}
        {allowStickers && activeTab === 'stickers' && (
          <div className="space-y-1.5">
            {!compact && (
              <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                <span>انقر لإرسال الستيكر كصورة فوراً:</span>
                <span className="font-mono text-amber-300 font-bold">{stickers.length} ستيكر</span>
              </div>
            )}
            <div className={`grid grid-cols-3 sm:grid-cols-4 gap-1.5 ${gridMaxH} overflow-y-auto p-1`}>
              {stickers.map((stk) => (
                <button
                  key={stk.id}
                  type="button"
                  onClick={() => {
                    onSelectSticker?.(stk.imageUrl, stk.title);
                    onClose();
                  }}
                  className="p-1.5 rounded-xl bg-slate-950/75 border border-slate-800 hover:border-amber-400 hover:bg-amber-950/35 flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer hover:scale-105"
                  title={stk.title}
                >
                  <img
                    src={stk.imageUrl}
                    alt={stk.title}
                    className={`${compact ? 'w-10 h-10' : 'w-12 h-12'} object-contain drop-shadow-md group-hover:scale-110 transition-transform`}
                    loading="lazy"
                  />
                  <span className="text-[10px] text-slate-300 font-bold truncate max-w-full">{stk.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Classic Vintage Emojis */}
        {activeTab === 'vintage' && (
          <div className="space-y-1.5">
            <div className={`grid grid-cols-6 gap-1.5 text-xl ${gridMaxH} overflow-y-auto p-1`}>
              {VINTAGE_STICKERS.map((stk) => (
                <button
                  key={stk}
                  type="button"
                  onClick={() => onSelectVintageEmoji(stk)}
                  className="p-1 hover:bg-slate-800 rounded-lg text-center cursor-pointer hover:scale-125 transition-transform"
                >
                  {stk}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
