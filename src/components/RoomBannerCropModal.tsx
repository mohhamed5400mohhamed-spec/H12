import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Crop, Maximize2, RotateCcw, Upload, X, ZoomIn, ZoomOut, Check, Eye } from 'lucide-react';

export interface BannerAspectPreset {
  id: string;
  label: string;
  width: number;
  height: number;
}

const BANNER_ASPECT_PRESETS: BannerAspectPreset[] = [
  { id: '16:5', label: 'قياسي (16:5)', width: 960, height: 300 },
  { id: '3:1', label: 'بانورامي (3:1)', width: 960, height: 320 },
  { id: '5:2', label: 'عريض (5:2)', width: 950, height: 380 },
  { id: '16:9', label: 'كبير (16:9)', width: 960, height: 540 }
];

export interface RoomBannerCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialImageUrl?: string;
  roomNamePreview?: string;
  onSaveCroppedFile: (file: File) => Promise<void>;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const RoomBannerCropModal: React.FC<RoomBannerCropModalProps> = ({
  isOpen,
  onClose,
  initialImageUrl,
  roomNamePreview = 'الغرفة العامة',
  onSaveCroppedFile,
  onShowToast
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [imageReady, setImageReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [presetId, setPresetId] = useState<string>('16:5');
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showRoomOverlayGuide, setShowRoomOverlayGuide] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const dragStateRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  const activePreset = BANNER_ASPECT_PRESETS.find((p) => p.id === presetId) || BANNER_ASPECT_PRESETS[0];

  // Sync initial image whenever modal opens
  useEffect(() => {
    if (!isOpen) return;
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setLoadError(null);
    setSourceUrl(initialImageUrl || '');
  }, [isOpen, initialImageUrl]);

  // Revoke any local object URL on unmount or close
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  // Load Image into imgRef whenever sourceUrl changes
  useEffect(() => {
    if (!isOpen || !sourceUrl) {
      imgRef.current = null;
      setImageReady(false);
      return;
    }

    let cancelled = false;
    setImageReady(false);
    setLoadError(null);

    const img = new Image();
    if (/^https?:\/\//i.test(sourceUrl)) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      if (cancelled) return;
      imgRef.current = img;
      setImageReady(true);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    img.onerror = () => {
      if (cancelled) return;
      imgRef.current = null;
      setImageReady(false);
      setLoadError('تعذر تحميل الصورة للقص المباشر. اختر الصورة من جهازك عبر زر "اختيار صورة".');
    };
    img.src = sourceUrl;

    return () => {
      cancelled = true;
    };
  }, [isOpen, sourceUrl]);

  const computeDrawGeometry = useCallback(
    (img: HTMLImageElement, targetW: number, targetH: number, currentZoom: number, rawOffset: { x: number; y: number }) => {
      const baseScale = Math.max(targetW / img.width, targetH / img.height);
      const effectiveScale = baseScale * currentZoom;
      const drawW = img.width * effectiveScale;
      const drawH = img.height * effectiveScale;

      const maxPanX = Math.max(0, (drawW - targetW) / 2);
      const maxPanY = Math.max(0, (drawH - targetH) / 2);

      const clampedX = Math.min(maxPanX, Math.max(-maxPanX, rawOffset.x));
      const clampedY = Math.min(maxPanY, Math.max(-maxPanY, rawOffset.y));

      const drawX = (targetW - drawW) / 2 + clampedX;
      const drawY = (targetH - drawH) / 2 + clampedY;

      return { drawX, drawY, drawW, drawH, clampedX, clampedY, maxPanX, maxPanY };
    },
    []
  );

  // Render live interactive canvas preview
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = activePreset.width;
    const H = activePreset.height;
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
    }

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, W, H);

    const img = imgRef.current;
    if (!img || !imageReady) {
      return;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const { drawX, drawY, drawW, drawH } = computeDrawGeometry(img, W, H, zoom, offset);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Optional Room List UI safe-zone & overlay guide (visual only, never exported)
    if (showRoomOverlayGuide) {
      const scrimGrad = ctx.createLinearGradient(0, 0, 0, H);
      scrimGrad.addColorStop(0, 'rgba(2, 6, 23, 0.85)');
      scrimGrad.addColorStop(0.45, 'rgba(2, 6, 23, 0.28)');
      scrimGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = scrimGrad;
      ctx.fillRect(0, 0, W, H);

      // Subtle rule-of-thirds / safe top-band guide
      ctx.save();
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(18, 14, W - 36, 78);
      ctx.restore();
    }
  }, [isOpen, imageReady, activePreset, zoom, offset, showRoomOverlayGuide, computeDrawGeometry]);

  const handlePickLocalFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      onShowToast('يرجى اختيار ملف صورة صالح فقط 🖼️', 'error');
      return;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    const localUrl = URL.createObjectURL(file);
    objectUrlRef.current = localUrl;
    setSourceUrl(localUrl);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!imageReady) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStateRef.current.dragging || !imgRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleFactorX = rect.width > 0 ? activePreset.width / rect.width : 1;
    const scaleFactorY = rect.height > 0 ? activePreset.height / rect.height : 1;

    const dx = (e.clientX - dragStateRef.current.startX) * scaleFactorX;
    const dy = (e.clientY - dragStateRef.current.startY) * scaleFactorY;

    const nextRaw = {
      x: dragStateRef.current.originX + dx,
      y: dragStateRef.current.originY + dy
    };
    const geom = computeDrawGeometry(imgRef.current, activePreset.width, activePreset.height, zoom, nextRaw);
    setOffset({ x: geom.clampedX, y: geom.clampedY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragStateRef.current.dragging) {
      dragStateRef.current.dragging = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore if pointer already released
      }
    }
  };

  const handleZoomChange = (nextZoom: number) => {
    const clampedZoom = Math.min(3, Math.max(1, Number(nextZoom.toFixed(2))));
    setZoom(clampedZoom);
    if (imgRef.current) {
      const geom = computeDrawGeometry(imgRef.current, activePreset.width, activePreset.height, clampedZoom, offset);
      setOffset({ x: geom.clampedX, y: geom.clampedY });
    }
  };

  const handleExportAndApply = async () => {
    const img = imgRef.current;
    if (!img || !imageReady) {
      onShowToast('يرجى اختيار صورة للغرفة أولاً 🖼️', 'error');
      return;
    }

    setIsExporting(true);
    try {
      const outCanvas = document.createElement('canvas');
      outCanvas.width = activePreset.width;
      outCanvas.height = activePreset.height;
      const outCtx = outCanvas.getContext('2d');
      if (!outCtx) throw new Error('تعذر تهيئة أداة القص');

      outCtx.imageSmoothingEnabled = true;
      outCtx.imageSmoothingQuality = 'high';
      outCtx.fillStyle = '#090d16';
      outCtx.fillRect(0, 0, outCanvas.width, outCanvas.height);

      const geom = computeDrawGeometry(img, outCanvas.width, outCanvas.height, zoom, offset);
      outCtx.drawImage(img, geom.drawX, geom.drawY, geom.drawW, geom.drawH);

      const blob: Blob = await new Promise((resolve, reject) => {
        try {
          outCanvas.toBlob(
            (b) => {
              if (b) {
                resolve(b);
              } else {
                outCanvas.toBlob(
                  (fallback) => (fallback ? resolve(fallback) : reject(new Error('فشل تصدير الصورة المقصوصة'))),
                  'image/jpeg',
                  0.92
                );
              }
            },
            'image/webp',
            0.92
          );
        } catch (err) {
          reject(err);
        }
      });

      const ext = blob.type.includes('webp') ? 'webp' : 'jpg';
      const file = new File([blob], `room-banner-${Date.now()}.${ext}`, { type: blob.type || 'image/jpeg' });
      await onSaveCroppedFile(file);
      onClose();
    } catch (err: any) {
      const msg = String(err?.message || '');
      if (msg.toLowerCase().includes('tainted') || msg.toLowerCase().includes('security')) {
        onShowToast('الصورة الحالية محمية من الخادم الخارجي؛ اختر نسخة من جهازك لقصها بسهولة ✂️', 'error');
      } else {
        onShowToast(msg || 'تعذر قص وتصدير بنر الغرفة', 'error');
      }
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && !isExporting) onClose();
      }}
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in"
      dir="rtl"
    >
      <div className="w-full max-w-xl max-h-[92vh] bg-[#131722] border-2 border-amber-500/75 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-right text-slate-100">
        {/* Header */}
        <div className="shrink-0 bg-gradient-to-l from-[#1e1711] via-[#261c12] to-[#1e1711] border-b border-amber-500/40 px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shrink-0">
              <Crop className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-sm text-amber-300 truncate">ضبط وقص بنر الغرفة بدون تشويه ✂️</h3>
              <p className="text-[11px] text-amber-100/75 truncate">اسحب الصورة لتحديد موضعها المثالي في قائمة الغرف وكبّر أو صغّر حسب الرغبة</p>
            </div>
          </div>
          <button
            type="button"
            disabled={isExporting}
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white flex items-center justify-center cursor-pointer shrink-0 transition-colors"
            title="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll-container p-3.5 space-y-3 text-xs">
          {/* Top toolbar: Pick Image & Aspect Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePickLocalFile}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{sourceUrl ? 'تغيير الصورة من الهاتف' : 'اختيار صورة من الهاتف'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowRoomOverlayGuide((v) => !v)}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer border transition-colors ${
                showRoomOverlayGuide
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/60'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
              title="معاينة موضع اسم الغرفة والأزرار أعلى البنر"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showRoomOverlayGuide ? 'إخفاء معاينة الاسم' : 'معاينة شكل الغرفة'}</span>
            </button>
          </div>

          {/* Aspect Ratio Presets */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-300">مقاس ونسبة البنر في قائمة الغرف:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {BANNER_ASPECT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setPresetId(preset.id);
                    setOffset({ x: 0, y: 0 });
                  }}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                    presetId === preset.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500/50'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive HTML5 Canvas Stage */}
          <div className="relative rounded-xl overflow-hidden border-2 border-amber-500/50 bg-slate-950 shadow-inner">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`w-full h-auto block select-none touch-none ${
                imageReady ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
              }`}
            />

            {/* Live non-destructive HTML overlay preview showing Room List Header alignment */}
            {imageReady && showRoomOverlayGuide && (
              <div className="pointer-events-none select-none absolute inset-x-0 top-0 px-3 pt-2.5 flex items-start justify-between gap-2">
                <div className="text-right">
                  <div className="font-black text-xs sm:text-sm text-white drop-shadow">{roomNamePreview}</div>
                  <div className="text-[10px] text-slate-200/85 drop-shadow">المنطقة الآمنة لعرض اسم الغرفة والوصف</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-600/90 text-white text-[10px] font-bold shadow">0/30 🎙️</span>
              </div>
            )}

            {!imageReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2 bg-slate-950/90">
                <Maximize2 className="w-7 h-7 text-amber-400/80" />
                <div className="text-xs font-bold text-slate-200">
                  {loadError || 'اختر صورة من هاتفك لقصها وضبط مقياسها بدقة قبل الحفظ'}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
                >
                  اختيار صورة الآن
                </button>
              </div>
            )}
          </div>

          {/* Zoom & Position Controls */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-[11px] text-amber-200">
                التكبير والمقياس ({Math.round(zoom * 100)}%)
              </span>
              <button
                type="button"
                disabled={!imageReady}
                onClick={() => {
                  setZoom(1);
                  setOffset({ x: 0, y: 0 });
                }}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>إعادة ضبط</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!imageReady || zoom <= 1}
                onClick={() => handleZoomChange(zoom - 0.15)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 flex items-center justify-center cursor-pointer shrink-0"
                title="تصغير"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <input
                type="range"
                min={1}
                max={3}
                step={0.02}
                disabled={!imageReady}
                value={zoom}
                onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                className="flex-1 accent-amber-500 cursor-pointer"
              />

              <button
                type="button"
                disabled={!imageReady || zoom >= 3}
                onClick={() => handleZoomChange(zoom + 0.15)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 flex items-center justify-center cursor-pointer shrink-0"
                title="تكبير"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[10px] text-slate-400 flex items-center justify-between">
              <span>اسحب الصورة باللمس أو الماوس لضبط الكادر المثالي</span>
              <span className="font-mono text-amber-300">
                {activePreset.width} × {activePreset.height} px
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 p-3 bg-slate-950/90 border-t border-slate-800 flex items-center gap-2">
          <button
            type="button"
            disabled={!imageReady || isExporting}
            onClick={handleExportAndApply}
            className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-colors"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isExporting ? 'جارٍ القص والرفع...' : 'اعتماد البنر المقصوص وحفظه'}</span>
          </button>
          <button
            type="button"
            disabled={isExporting}
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-bold text-xs cursor-pointer transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};
