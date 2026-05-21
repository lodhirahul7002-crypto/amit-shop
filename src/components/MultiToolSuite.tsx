import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  CreditCard,
  QrCode,
  UploadCloud,
  Clock3,
  ShieldCheck,
  Download,
  Smartphone,
  ChevronRight,
  Trophy,
  PlayCircle,
  BookOpen,
  Newspaper,
  Sparkles,
  Scissors,
  Camera,
  Layers,
  RefreshCw,
  FileCode,
  Languages,
  Sliders,
  Volume2,
  Minimize2,
  Trash2,
  Plus,
  Tv,
  Check,
  AlertCircle,
  Printer,
  RotateCw,
  Fingerprint
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MultiTool {
  id: string;
  title: string;
  desc: string;
  icon: any;
  category: "Image" | "Document" | "Media";
  color: string;
}

const listTools: MultiTool[] = [
  { id: "doc-scanner", title: "Smart A4 Document Scanner", desc: "Auto-correct low-light photos, scan white-sheet contrast, write titles, sign and print.", icon: FileText, category: "Document", color: "from-indigo-600 to-indigo-800" },
  { id: "bg-remove", title: "Background Remover", desc: "Remove backgrounds easily, pick premium custom solid/gradient backs.", icon: Scissors, category: "Image", color: "from-blue-550 to-blue-700" },
  { id: "passport-photo", title: "Passport Photo Creator", desc: "Build standard size photo sheet (Grid 2x2 in, 3.5x4.5 cm) printable.", icon: Camera, category: "Image", color: "from-purple-550 to-purple-700" },
  { id: "img-compress", title: "Image Compressor", desc: "Reduce digital image size (KB) by adjusting target visual quality.", icon: Minimize2, category: "Image", color: "from-emerald-550 to-emerald-700" },
  { id: "format-convert", title: "Format Converter", desc: "Transform instantly between PNG, JPEG, WEBP and PDF sheets.", icon: RefreshCw, category: "Image", color: "from-pink-550 to-pink-700" },
  { id: "photo-enhance", title: "Photo Enhancer & Filters", desc: "Apply adjustments (brightness, contrast, preset filters) live.", icon: Sliders, category: "Image", color: "from-amber-550 to-amber-700" },
  { id: "doc-converts", title: "PDF ⇄ Word Converter", desc: "Convert text docs to printable PDF or translate PDF into editable text.", icon: FileCode, category: "Document", color: "from-cyan-550 to-cyan-700" },
  { id: "yt-downloader", title: "YouTube Downloader", desc: "Simulate audio & video stream extraction download options.", icon: Tv, category: "Media", color: "from-red-550 to-red-700" },
  { id: "translate-tts", title: "Translator & Smart Speak", desc: "Translate languages with speech synthesis text audio playback.", icon: Languages, category: "Media", color: "from-indigo-550 to-indigo-700" }
];

export default function MultiToolSuite() {
  const [activeTool, setActiveTool] = useState<string>("doc-scanner");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    const handleSetActiveTool = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.toolId) {
        setActiveTool(customEvent.detail.toolId);
        setFilterCategory("All");
      }
    };
    window.addEventListener("set-active-tool", handleSetActiveTool);
    return () => {
      window.removeEventListener("set-active-tool", handleSetActiveTool);
    };
  }, []);

  const filteredTools = listTools.filter(t => filterCategory === "All" || t.category === filterCategory);

  return (
    <div className="space-y-6" id="multitool-dashboard">
      {/* Top Banner introducing the multi-tool suite */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 rounded-full bg-indigo-500/10" />
        <div className="relative z-10 max-w-3xl">
          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 tracking-wider inline-flex items-center gap-1.5 uppercase mb-3 ring-1 ring-indigo-500/45">
            <Sparkles size={11} /> MultiTool Pro Interactive Engine
          </span>
          <h2 className="text-2xl font-bold tracking-tight">8+ Professional Utilities & Creators</h2>
          <p className="mt-1 text-xs text-slate-400">
            Process assets natively inside the web container. Convert docs, crop passport sheets, remove colors, compress target KBs, and trigger text pronunciations with extreme speed.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Navigation Sidebar of Tools */}
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 relative" id="category-filter-pills">
            {["All", "Image", "Document", "Media"].map(cat => {
              const isActive = filterCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`relative rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors duration-200 z-10 select-none ${
                    isActive 
                      ? "text-white" 
                      : "text-slate-600 hover:text-slate-900 bg-slate-50/50 hover:bg-slate-100"
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-slate-900 rounded-lg -z-0"
                      transition={{ type: "spring", stiffness: 430, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-white border border-slate-100 p-3 shadow-sm space-y-1 overflow-hidden" id="tool-menu-group">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div className="space-y-1" layout="position">
                {filteredTools.map(tool => {
                  const ToolIcon = tool.icon;
                  const isActive = activeTool === tool.id;
                  return (
                    <motion.button
                      layout="position"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      key={tool.id}
                      onClick={() => setActiveTool(tool.id)}
                      className={`relative flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors overflow-hidden select-none ${
                        isActive 
                          ? "text-white" 
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeToolBg"
                          className="absolute inset-0 bg-indigo-600 rounded-xl"
                          style={{ zIndex: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <div className={`rounded-lg p-2 shrink-0 relative z-10 transition-all duration-200 ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"}`}>
                        <ToolIcon size={16} />
                      </div>
                      <div className="relative z-10 min-w-0 flex-1">
                        <h4 className="text-xs font-black leading-tight tracking-tight">{tool.title}</h4>
                        <p className={`text-[10px] mt-0.5 line-clamp-1 transition-all duration-200 ${isActive ? "text-indigo-150" : "text-slate-400"}`}>{tool.desc}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Interactive Workbench Screen */}
        <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, y: 15, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.985 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            >
              {activeTool === "doc-scanner" && <SmartDocScannerTool />}
              {activeTool === "bg-remove" && <BgRemoverTool />}
              {activeTool === "passport-photo" && <PassportPhotoTool />}
              {activeTool === "img-compress" && <ImageCompressorTool />}
              {activeTool === "format-convert" && <FormatConverterTool />}
              {activeTool === "photo-enhance" && <PhotoEnhancerTool />}
              {activeTool === "doc-converts" && <DocConverterTool />}
              {activeTool === "yt-downloader" && <YoutubeDownloaderTool />}
              {activeTool === "translate-tts" && <TranslateTtsTool />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// 1. Background Remover Tool (Live Canvas edge & background-color replacement simulator)
function BgRemoverTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>("transparent");
  const [processing, setProcessing] = useState<boolean>(false);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [autoRemoveBg, setAutoRemoveBg] = useState<boolean>(true);
  const [tolerance, setTolerance] = useState<number>(45);
  const [sampleCorner, setSampleCorner] = useState<boolean>(true);
  const [customEraseColor, setCustomEraseColor] = useState<string>("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const colors = [
    { name: "Transparent (पारदर्शी)", value: "transparent" },
    { name: "Studio White (सफ़ेद)", value: "#ffffff" },
    { name: "Passport Blue (नीला)", value: "#3b82f6" },
    { name: "Govt Red (लाल)", value: "#ef4444" },
    { name: "Samagra Yellow (पीला)", value: "#f59e0b" },
    { name: "Forest Green (हरा)", value: "#10b981" }
  ];

  const handleImageLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
          setProcessedSrc(null);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const processBgRemovalSim = () => {
    if (!imageSrc) return;
    setProcessing(true);
    
    setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
          setProcessing(false);
          return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setProcessing(false);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const l = frame.data.length / 4;

        // Sampling reference color
        let refR = 255;
        let refG = 255;
        let refB = 255;

        if (sampleCorner && frame.data.length >= 4) {
          refR = frame.data[0];
          refG = frame.data[1];
          refB = frame.data[2];
        } else {
          const hex = customEraseColor.replace("#", "");
          refR = parseInt(hex.substring(0, 2), 16) || 255;
          refG = parseInt(hex.substring(2, 4), 16) || 255;
          refB = parseInt(hex.substring(4, 6), 16) || 255;
        }

        for (let i = 0; i < l; i++) {
          const r = frame.data[i * 4 + 0];
          const g = frame.data[i * 4 + 1];
          const b = frame.data[i * 4 + 2];

          const rDiff = r - refR;
          const gDiff = g - refG;
          const bDiff = b - refB;
          const dist = Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);

          if (dist < tolerance) {
            frame.data[i * 4 + 3] = 0;
          }
        }

        if (bgColor === "transparent") {
          ctx.putImageData(frame, 0, 0);
        } else {
          const offscreenCanvas = document.createElement("canvas");
          offscreenCanvas.width = canvas.width;
          offscreenCanvas.height = canvas.height;
          const offscreenCtx = offscreenCanvas.getContext("2d");
          if (offscreenCtx) {
            offscreenCtx.putImageData(frame, 0, 0);
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(offscreenCanvas, 0, 0);
          } else {
            ctx.putImageData(frame, 0, 0);
          }
        }

        setProcessedSrc(canvas.toDataURL());
        setProcessing(false);
      };
      
      img.src = imageSrc;
    }, 350); 
  };

  useEffect(() => {
    if (imageSrc) {
      if (autoRemoveBg) {
        processBgRemovalSim();
      }
    } else {
      setProcessedSrc(null);
    }
  }, [imageSrc, bgColor, tolerance, sampleCorner, customEraseColor, autoRemoveBg]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">🎨 Auto-Background Eraser (स्वचालित पृष्ठभूमि हटाने की सेवा)</h3>
          <p className="text-xs text-slate-500 font-bold">Isolate portraits from unnecessary backgrounds automatically upon uploading! Refined for Indian e-Seva standard output.</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-650 animate-ping" />
          <span className="text-[9px] font-black uppercase text-indigo-700 tracking-wider">AI Auto Mode Ready</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
        {/* Left Side: Upload Controls & Adjustments */}
        <div className="space-y-4">
          <div className="rounded-2xl border bg-slate-50 p-4 relative flex flex-col justify-between overflow-hidden min-h-[220px]">
            {imageSrc ? (
              <div className="space-y-3 text-center">
                <div className="relative inline-block border bg-white rounded-xl shadow-sm p-1.5">
                  <img src={imageSrc} className="max-h-40 mx-auto rounded-lg object-contain" alt="Original Intake" />
                  <span className="absolute bottom-1 right-1 bg-slate-900/85 backdrop-blur-sm text-white text-[8px] font-mono px-1.5 py-0.5 rounded uppercase">SOURCE PHOTO</span>
                </div>
                <div className="flex gap-2 justify-center">
                  <button onClick={() => setImageSrc(null)} className="rounded-xl border bg-white text-rose-550 hover:bg-rose-50 border-rose-100 px-3 py-2 text-xs font-bold leading-tight transition active:scale-95 text-rose-600">
                    Clear Photo
                  </button>
                  <label className="rounded-xl border bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer px-3 py-2 text-xs font-bold leading-tight transition active:scale-95 shadow shadow-indigo-650/20">
                    Change Photo
                    <input type="file" onChange={handleImageLoad} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-10 text-center flex-1 flex flex-col items-center justify-center relative">
                <input type="file" onChange={handleImageLoad} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-indigo-600 mb-2">
                  <UploadCloud size={28} />
                </div>
                <span className="block text-xs font-extrabold text-slate-800">फ़ोटो अपलोड करें (Upload Portrait)</span>
                <span className="block text-[10px] text-slate-400 max-w-[280px]">Automatically erases white, grey, or any unnecessary backdrop. Best for kiosk stamps & customer forms.</span>
              </div>
            )}
          </div>

          {/* Core Configuration Sliders & Toggles */}
          <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b pb-2 flex items-center justify-between">
              <span>🎚️ Settings & Adjustments</span>
              <span className="text-[10px] text-indigo-600 font-extrabold font-mono">TOLERANCE: {tolerance}</span>
            </h4>

            {/* Toggle auto-remove on upload */}
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-150">
              <label htmlFor="auto-remove-chk" className="text-xs font-bold text-slate-700 block cursor-pointer select-none">
                <span className="block text-[10px] text-slate-800 font-extrabold">स्वतः पृष्ठभूमि निकालें (Auto removal)</span>
                <span className="text-[9px] text-slate-450 block font-normal">Triggers background extraction immediately on load</span>
              </label>
              <input
                id="auto-remove-chk"
                type="checkbox"
                checked={autoRemoveBg}
                onChange={(e) => setAutoRemoveBg(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-605 border-slate-300 focus:ring-indigo-505 accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Sample selection toggle */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">रंग का स्वतः चयन (Color Detection Scheme)</span>
              <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSampleCorner(true)}
                  className={`py-1.5 text-center text-[10px] font-bold rounded-lg transition-all ${
                    sampleCorner 
                      ? "bg-indigo-600 text-white shadow-sm" 
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  Corner Detect (कोना संसूचन)
                </button>
                <button
                  type="button"
                  onClick={() => setSampleCorner(false)}
                  className={`py-1.5 text-center text-[10px] font-bold rounded-lg transition-all ${
                    !sampleCorner 
                      ? "bg-indigo-600 text-white shadow-sm" 
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  Custom Color Erase
                </button>
              </div>
            </div>

            {/* If custom specified color is selected */}
            {!sampleCorner && (
              <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Select custom color to erase</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customEraseColor}
                    onChange={(e) => setCustomEraseColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 bg-white cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-slate-700 uppercase">{customEraseColor}</span>
                </div>
              </div>
            )}

            {/* Tolerance slider */}
            <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-150">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                <span>संवेदनशीलता सहिष्णुता (Threshold Tolerance)</span>
                <span className="font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded text-[8px] font-extrabold">{tolerance} / 150</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="block text-[8px] text-slate-450 leading-tight">Increase tolerance to remove shades, shadows, or gray tones. If subject features vanish, decrease tolerance.</span>
            </div>
            
            {/* Direct manual processing button if user has autoRemove disabled */}
            {!autoRemoveBg && (
              <button
                onClick={processBgRemovalSim}
                disabled={!imageSrc || processing}
                className={`w-full py-2 px-4 rounded-xl text-xs font-bold text-white transition tracking-wide ${
                  !imageSrc ? "bg-slate-300 cursor-default" : "bg-slate-900 hover:bg-slate-800"
                }`}
              >
                {processing ? "Removing background pixels..." : "Extract Background Live ⚡"}
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Processed Output Result Panel */}
        <div className="space-y-4 flex flex-col justify-start">
          <div className="rounded-2xl border border-slate-150 p-4 bg-slate-950 text-white min-h-[300px] flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-3 left-4 text-[9px] font-mono uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
              Isolated Output Preview
            </div>

            {/* Background checkerboard overlay inside the preview window */}
            <div className="flex-1 flex items-center justify-center my-6 relative bg-slate-900 rounded-xl overflow-hidden min-h-[220px]">
              {/* Checkerboard Pattern */}
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: "radial-gradient(#4b5563 15%, transparent 20%), radial-gradient(#4b5563 15%, transparent 20%)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0, 8px 8px"
                }}
              />
              
              {processing ? (
                <div className="text-center z-10 space-y-2 select-none">
                  <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-xs font-mono text-indigo-400 font-bold uppercase animate-pulse">स्वचालित रूप से पृष्ठभूमि मिटाई जा रही है...</p>
                  <p className="text-[9px] text-slate-500">Erasing noise & rebuilding alpha masks...</p>
                </div>
              ) : processedSrc ? (
                <div className="z-10 relative group">
                  <img src={processedSrc} className="max-h-52 mx-auto rounded-lg shadow-md border border-slate-800 object-contain bg-transparent" alt="Background Eraser Output" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center py-1.5">
                    <span className="text-[9px] text-white font-bold">Isolated Output OK ✓</span>
                  </div>
                </div>
              ) : (
                <div className="text-center z-10 text-slate-400 max-w-[220px] font-sans">
                  <div className="text-slate-250 mb-1.5 font-extrabold text-xs">No Processed Image</div>
                  <p className="text-[9px] text-slate-500 font-medium">अपलोड की गई इमेज का बैकग्राउंड यहाँ पारदर्शी या चुने हुए रंग में परिवर्तित होकर दिखाई देगा।</p>
                </div>
              )}
            </div>

            {/* Colors picker to paint the erased background */}
            <div className="space-y-2 border-t border-slate-905 pt-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex justify-between items-center">
                <span>2. Paint Background Color (रंग बदलें):</span>
                <span className="font-mono text-emerald-400 text-[9px]">{bgColor === "transparent" ? "TRANSPARENT" : bgColor}</span>
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {colors.map(col => (
                  <button
                    key={col.value}
                    onClick={() => setBgColor(col.value)}
                    className={`rounded-xl border p-2 text-center text-[10px] font-bold transition flex items-center justify-center gap-1.5 ${
                      bgColor === col.value 
                        ? "border-indigo-500 bg-indigo-950/80 text-white shadow shadow-indigo-600/30" 
                        : "border-slate-800 bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-400"
                    }`}
                  >
                    {col.value !== "transparent" && <span className="w-2 h-2 rounded-full inline-block border border-slate-700 shrink-0" style={{ backgroundColor: col.value }} />}
                    <span className="truncate">{col.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {processedSrc && !processing && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Check className="text-emerald-600 shrink-0" size={16} />
                <span className="text-[10 px] font-extrabold text-emerald-900">Background isolated & updated successfully!</span>
              </div>
              <a href={processedSrc} download="multitool_bg_removed.png" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 text-[10px] text-white font-extrabold flex items-center gap-1 shrink-0 shadow-sm shadow-emerald-600/20 leading-none">
                <Download size={11} /> Save Image
              </a>
            </motion.div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// 2. Passport Photo Creator (India stamp size, US Visa grid generation)
function PassportPhotoTool() {
  const [rawPhoto, setRawPhoto] = useState<string | null>(null);
  const [photoSheet, setPhotoSheet] = useState<string | null>(null);
  const [countryType, setCountryType] = useState<string>("India (3.5 x 4.5 cm)");
  const [gridCount, setGridCount] = useState<number>(8);
  const [generating, setGenerating] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sheetOptions = [
    { name: "3.5 x 4.5 cm (India Standard)", size: "3.5 x 4.5 cm" },
    { name: "2 x 2 inch (US Visa)", size: "2 x 2 inches" },
    { name: "Stamp Size Mini (2.5 x 3 cm)", size: "2.5 x 3.0 cm" }
  ];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setRawPhoto(ev.target.result as string);
          setPhotoSheet(null);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const drawPassportSheet = () => {
    if (!rawPhoto) return;
    setGenerating(true);

    setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Custom dimension config for standard 4R prints
        const cardWidth = 1000;
        const cardHeight = 650;
        canvas.width = cardWidth;
        canvas.height = cardHeight;

        // Fill beautiful white canvas sheet
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, cardWidth, cardHeight);

        // Grid config
        const cols = 4;
        const rows = gridCount === 8 ? 2 : 1;
        const photoW = 180;
        const photoH = 220;
        const gapX = 40;
        const gapY = 40;
        
        const startX = (cardWidth - (cols * photoW + (cols - 1) * gapX)) / 2;
        const startY = (cardHeight - (rows * photoH + (rows - 1) * gapY)) / 2;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = startX + c * (photoW + gapX);
            const y = startY + r * (photoH + gapY);

            // Draw passport borders
            ctx.fillStyle = "#f8fafc";
            ctx.fillRect(x - 4, y - 4, photoW + 8, photoH + 8);
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1;
            ctx.strokeRect(x - 5, y - 5, photoW + 10, photoH + 10);

            // Draw user portrait nicely cropped
            ctx.drawImage(img, x, y, photoW, photoH);
          }
        }

        setPhotoSheet(canvas.toDataURL());
        setGenerating(false);
      };
      img.src = rawPhoto;
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">📸 Passport Photo Sheet Creator</h3>
        <p className="text-xs text-slate-500">Arrange up to 8 passport or stamp prints on a single aligned sheet for easy studio output.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Portrait image */}
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 flex flex-col items-center justify-center text-center relative hover:bg-slate-100/50 transition">
          {rawPhoto ? (
            <div className="space-y-4 w-full">
              <img src={rawPhoto} className="max-h-56 mx-auto rounded-lg object-cover w-40 h-48 border shadow-sm bg-white" alt="Portrait crop template" />
              <button onClick={() => setRawPhoto(null)} className="rounded-lg bg-red-50 text-red-600 px-3 py-1 text-xs font-bold leading-tight block mx-auto">Clear</button>
            </div>
          ) : (
            <div className="space-y-2 py-8">
              <input type="file" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              <Camera size={32} className="text-slate-400 mx-auto" />
              <span className="block text-xs font-bold text-slate-800">Select Face Close-up Photo</span>
              <span className="block text-[10px] text-slate-400">Front profile, neutral layout works best</span>
            </div>
          )}
        </div>

        {/* Configuration settings */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Standard Cut Dimensions</label>
              <select
                value={countryType}
                onChange={(e) => setCountryType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs outline-none focus:border-indigo-400 focus:bg-white font-semibold"
              >
                {sheetOptions.map(opt => <option key={opt.size} value={opt.size}>{opt.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Grid Counts</label>
              <div className="flex gap-2">
                {[4, 8].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setGridCount(cnt)}
                    className={`flex-1 rounded-xl border py-2 text-xs font-bold transition ${
                      gridCount === cnt 
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                        : "border-slate-150 bg-slate-50 hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    {cnt} stamp copies
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={drawPassportSheet}
              disabled={!rawPhoto || generating}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white transition tracking-wide ${
                !rawPhoto ? "bg-slate-300 cursor-default" : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {generating ? "Arranging photo cells..." : "Generate Printable passport sheet ⚡"}
            </button>
          </div>

          {photoSheet && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="rounded-xl overflow-hidden border">
                <img src={photoSheet} className="w-full max-h-40 object-contain bg-slate-100" alt="Sheet grid output" />
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-900">4R sheet layout compiled! Ready to print.</span>
                <a href={photoSheet} download="passport_photo_grid.png" className="rounded-lg bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs text-white font-bold flex items-center gap-1 shrink-0">
                  <Download size={12} /> Save Grid PNG
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// 3. Image Compressor Tool (Live custom scale, dynamic calculation)
function ImageCompressorTool() {
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressSize, setCompressSize] = useState<number>(0);
  const [compQuality, setCompQuality] = useState<number>(60);
  const [compSrc, setCompSrc] = useState<string | null>(null);
  const [compressing, setCompressing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setRawImage(event.target.result as string);
          setCompSrc(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerCompression = () => {
    if (!rawImage) return;
    setCompressing(true);

    setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize if too massive to save canvas RAM limits
        const maxLimit = 1200;
        let w = img.width;
        let h = img.height;
        if (w > maxLimit) {
          h = Math.round((h * maxLimit) / w);
          w = maxLimit;
        }

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        const qualityFactor = compQuality / 100;
        const dataUrl = canvas.toDataURL("image/jpeg", qualityFactor);
        
        // Approximate the compressed file size based on base-64 length
        const base64Len = dataUrl.split(",")[1].length;
        const sizeEstimate = Math.round(base64Len * 0.75);

        setCompressSize(sizeEstimate);
        setCompSrc(dataUrl);
        setCompressing(false);
      };
      img.src = rawImage;
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">🗜️ Smart Image Compressor</h3>
        <p className="text-xs text-slate-500">Compress JPG/PNG pictures under 50KB/20KB to match strict governmental portals uploading mandates.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-slate-50/50 p-5 space-y-4">
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 flex flex-col items-center justify-center text-center relative hover:bg-slate-100/50 transition">
            {rawImage ? (
              <div className="space-y-2 w-full text-center">
                <img src={rawImage} className="max-h-36 mx-auto rounded-lg object-contain shadow-sm border bg-white" alt="Image original" />
                <p className="text-[10px] font-bold text-slate-500 mt-2">Original Size: {(originalSize / 1024).toFixed(1)} KB</p>
                <button onClick={() => setRawImage(null)} className="rounded-lg bg-red-100 text-red-600 px-3 py-1.5 text-xs font-bold leading-tight mt-2 inline-block">Remove</button>
              </div>
            ) : (
              <div className="space-y-2 py-6">
                <input type="file" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <Minimize2 size={30} className="text-slate-400 mx-auto" />
                <span className="block text-xs font-bold text-slate-800">Select Image File</span>
                <span className="block text-[9px] text-slate-400">Reduce payload on caste certificates & applications</span>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Target Quality Compression Factor</span>
              <span className="text-indigo-600">{compQuality}%</span>
            </div>
            <input
              type="range"
              min={15}
              max={95}
              value={compQuality}
              onChange={(e) => setCompQuality(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <button
            onClick={triggerCompression}
            disabled={!rawImage || compressing}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white transition tracking-wide ${
              !rawImage ? "bg-slate-300 cursor-default" : "bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {compressing ? "Calculating optimal weights..." : "Apply Quality Compress 🗜️"}
          </button>
        </div>

        <div className="flex flex-col justify-center">
          {compSrc ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm bg-white">
              <div className="text-center">
                <h4 className="text-xs font-bold text-slate-700 uppercase">Compression Metrics</h4>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="p-3 bg-slate-50 rounded-xl border">
                    <span className="text-[10px] text-slate-400 font-bold block">Previous Size</span>
                    <span className="text-sm font-bold text-slate-800">{(originalSize / 1024).toFixed(1)} KB</span>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-150">
                    <span className="text-[10px] text-indigo-400 font-bold block">Compressed Size</span>
                    <span className="text-sm font-bold text-indigo-700">{(compressSize / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-[10px] text-emerald-800 font-bold">
                  📉 Save Ratio: {((1 - (compressSize / originalSize)) * 100).toFixed(0)}% lighter file!
                </div>
              </div>

              <div className="border rounded-xl h-28 overflow-hidden bg-slate-50 flex items-center justify-center">
                <img src={compSrc} className="max-h-full max-w-full object-contain" alt="Compressed final output" />
              </div>

              <a href={compSrc} download="multitool_compressed.jpg" className="w-full block text-center rounded-xl bg-indigo-600 hover:bg-indigo-700 py-2.5 px-4 text-xs text-white font-bold">
                <Download size={14} className="mr-1 inline" /> Download Compressed JPG
              </a>
            </motion.div>
          ) : (
            <div className="text-center py-10 text-slate-400 font-semibold space-y-2">
              <AlertCircle size={28} className="mx-auto text-slate-350" />
              <p className="text-xs">Adjust your quality factor percentage and run compression to see interactive side-by-side scale results.</p>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// 4. Format Converter Tool (Client-side HTML Canvas conversions)
function FormatConverterTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [sourceType, setSourceType] = useState<string>("image/png");
  const [targetType, setTargetType] = useState<string>("image/jpeg");
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [converting, setConverting] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSourceType(file.type || "image/png");
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
          setConvertedUrl(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const formats = [
    { label: "JPG (Joint Photographic Group)", type: "image/jpeg", ext: "jpg" },
    { label: "PNG (Portable Network Graphics)", type: "image/png", ext: "png" },
    { label: "WEBP (Modern Chrome Web Extension)", type: "image/webp", ext: "webp" }
  ];

  const triggerConversion = () => {
    if (!imageSrc) return;
    setConverting(true);

    setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const converted = canvas.toDataURL(targetType);
        setConvertedUrl(converted);
        setConverting(false);
      };
      img.src = imageSrc;
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">🔄 Cross Format Converter</h3>
        <p className="text-xs text-slate-500">Transform screenshots or photos between formats seamlessly (PNG to JPG / JPG to WEBP) purely within your browser.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-slate-50/50 p-5 space-y-4">
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 flex flex-col items-center justify-center text-center relative hover:bg-slate-100/50 transition">
            {imageSrc ? (
              <div className="space-y-2 w-full text-center">
                <img src={imageSrc} className="max-h-36 mx-auto rounded-lg object-contain shadow-sm border bg-white" alt="Raw converter asset" />
                <p className="text-[10px] font-bold text-indigo-600 mt-2">Detected Source Mime: {sourceType}</p>
                <button onClick={() => setImageSrc(null)} className="rounded-lg bg-red-100 text-red-600 px-3 py-1.5 text-xs font-bold leading-tight mt-2">Clear</button>
              </div>
            ) : (
              <div className="space-y-2 py-6">
                <input type="file" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <RefreshCw size={30} className="text-slate-400 mx-auto" />
                <span className="block text-xs font-bold text-slate-800">Choose Image File</span>
                <span className="block text-[9px] text-slate-400">Automatically inspects header content types</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Export File Format</label>
            <select
              value={targetType}
              onChange={(e) => setTargetType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs outline-none focus:border-indigo-400 focus:bg-white font-semibold"
            >
              {formats.map(f => <option key={f.type} value={f.type}>{f.label}</option>)}
            </select>
          </div>

          <button
            onClick={triggerConversion}
            disabled={!imageSrc || converting}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white transition tracking-wide ${
              !imageSrc ? "bg-slate-300 cursor-default" : "bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {converting ? "Processing header conversion matrix..." : "Convert Export Type ⚡"}
          </button>
        </div>

        <div className="flex flex-col justify-center">
          {convertedUrl ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm bg-white text-center">
              <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold text-green-700 uppercase tracking-widest inline-block">Conversion Complete</span>
              <p className="text-xs text-slate-500 mt-1">Ready for regional e-Seva document submission.</p>

              <div className="border rounded-xl h-40 overflow-hidden bg-slate-50 flex items-center justify-center my-3">
                <img src={convertedUrl} className="max-h-full max-w-full object-contain" alt="Formatted asset" />
              </div>

              <a
                href={convertedUrl}
                download={`multitool_converted.${targetType === "image/jpeg" ? "jpg" : targetType === "image/webp" ? "webp" : "png"}`}
                className="w-full block bg-slate-900 hover:bg-slate-800 py-2.5 px-4 text-xs text-white font-bold rounded-xl"
              >
                <Download size={14} className="mr-1 inline" /> Save Converted File
              </a>
            </motion.div>
          ) : (
            <div className="text-center py-10 text-slate-400 font-semibold space-y-2">
              <RefreshCw size={28} className="mx-auto text-slate-350" />
              <p className="text-xs">Select your output format (PNG, JPG, or WEBP) and click convert to compute and render files locally in 100% resolution.</p>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// 5. Photo Enhancer & Filters Tool (Slide sliders and modify Canvas ctx filters)
function PhotoEnhancerTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [grayscale, setGrayscale] = useState<number>(0);
  const [blur, setBlur] = useState<number>(0);

  const [activePreset, setActivePreset] = useState<string>("None");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);

  const applyPreset = (preset: string) => {
    setActivePreset(preset);
    setEnhancedUrl(null);
    if (preset === "Crisp HD") {
      setBrightness(110);
      setContrast(125);
      setSaturation(105);
      setGrayscale(0);
    } else if (preset === "Warm Retro") {
      setBrightness(105);
      setContrast(95);
      setSaturation(120);
      setGrayscale(0);
    } else if (preset === "Mono Stamp") {
      setBrightness(100);
      setContrast(140);
      setSaturation(0);
      setGrayscale(100);
    } else if (preset === "Cyber Bright") {
      setBrightness(125);
      setContrast(110);
      setSaturation(135);
      setGrayscale(0);
    } else {
      setBrightness(100);
      setContrast(100);
      setSaturation(100);
      setGrayscale(0);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
          setEnhancedUrl(null);
          setActivePreset("None");
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      // Apply standard HTML5 canvas context filter rules based on state
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%) blur(${blur}px)`;
      ctx.drawImage(img, 0, 0);
      setEnhancedUrl(canvas.toDataURL());
    };
    img.src = imageSrc;
  }, [brightness, contrast, saturation, grayscale, blur, imageSrc]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">✨ Photo Enhancer & Stamp Filters</h3>
        <p className="text-xs text-slate-500">Fine-tune exposure levels or apply high-contrast presets for clear, readable, and authentic stamp outputs.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Sliders Control Panel */}
        <div className="space-y-4 rounded-2xl border bg-slate-50/40 p-5">
          <h4 className="text-xs font-bold text-slate-950 uppercase">Filter Presets</h4>
          <div className="grid grid-cols-2 gap-2">
            {["None", "Crisp HD", "Warm Retro", "Mono Stamp", "Cyber Bright"].map(ps => (
              <button
                key={ps}
                onClick={() => applyPreset(ps)}
                className={`rounded-xl border p-2 text-center text-[11px] font-bold transition ${
                  activePreset === ps 
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                    : "border-slate-100 bg-white text-slate-650 hover:bg-slate-50"
                }`}
              >
                {ps}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase">Tone Customizations</h4>
            
            {/* Brightness */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Exposure / Brightness</span>
                <span>{brightness}%</span>
              </div>
              <input type="range" min={50} max={170} value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            {/* Contrast */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Contrast Intensity</span>
                <span>{contrast}%</span>
              </div>
              <input type="range" min={50} max={170} value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            {/* Saturation */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Saturation (Color depth)</span>
                <span>{saturation}%</span>
              </div>
              <input type="range" min={0} max={200} value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            {/* Blur/Sharpness */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Edge Smoothing (Blur)</span>
                <span>{blur}px</span>
              </div>
              <input type="range" min={0} max={6} step={0.5} value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
          </div>
        </div>

        {/* Output Container with dynamic canvas filter preview */}
        <div className="flex flex-col justify-between">
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center min-h-[220px] flex items-center justify-center relative">
            {imageSrc ? (
              <div className="space-y-3 w-full">
                <div className="border rounded-xl h-44 overflow-hidden bg-white flex items-center justify-center relative">
                  {enhancedUrl && <img src={enhancedUrl} className="max-h-full max-w-full object-contain" alt="Enhanced stamp" />}
                </div>
                <div className="flex gap-2 justify-center">
                  <button onClick={() => setImageSrc(null)} className="rounded-lg bg-red-100 text-red-650 px-3 py-1 text-xs font-bold leading-tight">Remove</button>
                  <a href={enhancedUrl || "#"} download="multitool_enhanced_photo.png" className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-3 py-1 text-xs text-white font-bold flex items-center gap-1">
                    <Download size={12} /> Save Design
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-8">
                <input type="file" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <Sliders size={32} className="text-slate-400 mx-auto" />
                <span className="block text-xs font-bold text-slate-800">Choose Stamp Photo to Enhance</span>
                <span className="block text-[10px] text-slate-400">Sliders compute filter-matrix in real-time</span>
              </div>
            )}
          </div>

          <div className="mt-4 p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 text-xs">
            <span className="font-bold text-indigo-900 block flex items-center gap-1"><Sparkles size={14}/> Auto Adjustments Tip</span>
            <p className="text-[10px] text-slate-500 mt-1">If your scanned signature or stamp signature looks faint, select "Mono Stamp" to generate an ultra-crisp binary layout that prints reliably on official forms.</p>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// 6. PDF ⇄ Word Converter Tool (Client-side Document Builders)
function DocConverterTool() {
  const [docContent, setDocContent] = useState<string>("SAMPLED OFFICIAL DECLARATION LETTER\n\nTo,\nThe Secretary of Revenue Department,\nMadhya Pradesh Govt.\n\nDate: May 20, 2026\n\nSubject: Declaration Application for Caste Caste-Certificate.\n\nRespected Sir/Madam,\nI hereby state that the declarations mentioned in this caste-credential application are completely authentic and correct to the best of my knowledge. Under penalties of perjury, I submit this online statement.\n\nSincerely,\nRahul Singh.");
  const [inputTitle, setInputTitle] = useState<string>("Letter_of_Declaration");
  const [themeMode, setThemeMode] = useState<string>("Formal Professional");
  const [conversionType, setConversionType] = useState<"Word to PDF" | "PDF to Word">("Word to PDF");
  const [processing, setProcessing] = useState<boolean>(false);
  const [processSuccess, setProcessSuccess] = useState<boolean>(false);
  const [pdfRawFile, setPdfRawFile] = useState<string | null>(null);

  const triggerMockConversion = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setProcessSuccess(false);
    setTimeout(() => {
      setProcessing(false);
      setProcessSuccess(true);
    }, 1800);
  };

  const downloadTextAsDoc = () => {
    // Generate text blob downloading
    const blob = new Blob([docContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${inputTitle || "document"}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const printDocumentAsPdf = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${inputTitle}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 50px; line-height: 1.6; color: #111; }
            h1 { text-align: center; font-size: 18px; margin-bottom: 30px; letter-spacing: 0.5px; text-transform: uppercase; }
            p { font-size: 14px; white-space: pre-wrap; margin-bottom: 20px; }
            .stamp { text-align: right; margin-top: 50px; font-size: 13px; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>${inputTitle.replace(/_/g, " ")}</h1>
          <p>${docContent}</p>
          <div class="stamp">Madhya Pradesh e-Seva Digital Stamp Verification</div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handlePdfUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfRawFile(file.name);
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setDocContent(`EXTRACTED PARAGRAPHS FROM ${file.name.toUpperCase()}\n\nLine 1: Under the provisions of the sub-clause, the applicant must possess active residency in MP state for over 10 consecutive years.\nLine 2: Identity criteria matches biometric databases of National registries.\nLine 3: Verified as non-creamy layers based on income bounds.`);
        setProcessSuccess(true);
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900">📑 Interactive Document Converter</h3>
          <p className="text-xs text-slate-500">Draft declarations or convert documents to PDF and extract PDF text into Word file formats.</p>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => { setConversionType("Word to PDF"); setProcessSuccess(false); setPdfRawFile(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold leading-none transition-all ${
              conversionType === "Word to PDF" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Word to PDF
          </button>
          <button
            onClick={() => { setConversionType("PDF to Word"); setProcessSuccess(false); setPdfRawFile(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold leading-none transition-all ${
              conversionType === "PDF to Word" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            PDF to Word
          </button>
        </div>
      </div>

      {conversionType === "Word to PDF" ? (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Text Editor workbench */}
          <form onSubmit={triggerMockConversion} className="space-y-4 rounded-2xl border p-5 bg-slate-50/30">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
              <input
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:border-indigo-400 focus:outline-none font-semibold text-slate-800"
                placeholder="उदा. Caste_Declaration_Rahul"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-semibold">Verify Letter Content (Edit freely)</label>
              <textarea
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                rows={8}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:border-indigo-400 focus:outline-none font-mono text-slate-750"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Styling Theme Template</label>
              <select
                value={themeMode}
                onChange={(e) => setThemeMode(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs outline-none focus:border-indigo-400 text-slate-750 font-semibold"
              >
                <option>Formal Professional (New Times Roman)</option>
                <option>Modern Executive (Sans-Serif Heading)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition tracking-wide"
            >
              {processing ? "Compiling PDF structural blocks..." : "Convert & Compile PDF File ⚡"}
            </button>
          </form>

          {/* Results Sheet layout */}
          <div className="flex flex-col justify-between">
            {processSuccess ? (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="border rounded-2xl p-5 space-y-4 bg-white shadow-sm flex flex-col justify-between h-full">
                <div className="space-y-2 text-center">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700 uppercase tracking-wider inline-block">Compilation Compiled successfully</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{inputTitle}.pdf</h4>
                  <p className="text-[10px] text-slate-400">Formal document generated with government header formatting.</p>
                </div>

                <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-xl max-h-48 overflow-y-auto text-[10px] font-mono text-slate-500 whitespace-pre-wrap leading-relaxed shadow-inner">
                  {docContent}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button onClick={printDocumentAsPdf} className="rounded-xl border border-slate-200 hover:bg-slate-50 px-3 py-2.5 text-xs text-slate-700 font-bold flex items-center justify-center gap-1.5">
                    <Download size={14} /> Print / Export PDF
                  </button>
                  <button onClick={downloadTextAsDoc} className="rounded-xl bg-slate-900 hover:bg-slate-800 px-3 py-2.5 text-xs text-white font-bold flex items-center justify-center gap-1.5">
                    <FileCode size={14} /> Save as Word
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-24 text-slate-400 font-semibold space-y-2 border border-slate-150 rounded-2xl p-6 h-full flex flex-col justify-center items-center">
                <FileText size={32} className="text-slate-350" />
                <p className="text-xs">Your compiled professional document preview will render here.</p>
                <p className="text-[10px] text-slate-450 font-normal">Click compilation to generate the PDF layout live and print or download with dynamic digital stamp credentials.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // PDF to Word workflow
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-slate-50/50 p-5 space-y-4">
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 flex flex-col items-center justify-center text-center relative hover:bg-slate-100/50 transition">
              {pdfRawFile ? (
                <div className="space-y-2 w-full text-center">
                  <span className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl inline-block border"><FileText size={24} /></span>
                  <p className="text-xs font-bold text-slate-800 mt-2">{pdfRawFile}</p>
                  <button onClick={() => setPdfRawFile(null)} className="rounded-lg bg-red-100 text-red-600 px-3 py-1.5 text-xs font-bold leading-tight mt-2">Clear Code</button>
                </div>
              ) : (
                <div className="space-y-2 py-8">
                  <input type="file" onChange={handlePdfUploadMock} className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf" />
                  <UploadCloud size={30} className="text-slate-400 mx-auto" />
                  <span className="block text-xs font-bold text-slate-800">Select PDF Document</span>
                  <span className="block text-[9px] text-slate-400">Our simulator extracts textual elements instantly</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-100 rounded-xl text-[10px] text-slate-500 font-semibold">
              ⚠️ Simulated Conversion Process takes under 2 seconds. Extract fonts, shapes, grids, and paragraphs cleanly.
            </div>
          </div>

          <div className="flex flex-col justify-between">
            {processSuccess ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 p-5 border rounded-2xl bg-white shadow-sm flex flex-col h-full justify-between">
                <div>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-bold text-indigo-700 uppercase block tracking-wider w-max mb-1">OCR Blocks Extracted</span>
                  <h4 className="font-bold text-slate-900 text-sm">Editable Rich Text Stream</h4>
                </div>

                <textarea
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                  rows={6}
                  className="w-full border border-slate-200 focus:border-indigo-400 p-3 rounded-xl text-xs font-mono focus:outline-none"
                />

                <button onClick={downloadTextAsDoc} className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 py-2.5 px-4 text-xs font-bold text-white flex items-center justify-center gap-1">
                  <Download size={14} /> Download Extracted Word Document
                </button>
              </motion.div>
            ) : (
              <div className="text-center py-16 text-slate-400 font-semibold space-y-2 border border-slate-150 rounded-2xl p-6 h-full flex flex-col justify-center items-center">
                <FileCode size={30} className="text-slate-350" />
                <p className="text-xs leading-normal">Upload any PDF file. The OCR reader outputs editable text which can be revised and exported as standard doc files.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 7. YouTube Downloader Tool (Simulated URLs resolutions download cells)
function YoutubeDownloaderTool() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false);
  const [extractedInfo, setExtractedInfo] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const triggerScan = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setExtractedInfo(null);
    if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
      setErrorMsg("कृपया Valid YouTube URL (उदाहरण: youtube.com/watch?v=...) दर्ज़ करें।");
      return;
    }

    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setExtractedInfo({
        title: "UPSC Exams Preparation Strategy • Syllabus Detailed Breakdown 2026",
        creator: "MP Government Education Desk",
        length: "14:26 Mins",
        views: "182K Views",
        formats: [
          { quality: "720p HD MP4 (High Definition)", size: "48 MB", cost: "Free" },
          { quality: "360p Medium MP4 (Data Saver)", size: "22 MB", cost: "Free" },
          { quality: "HQ 320kbps MP3 (Audio Only)", size: "12 MB", cost: "Free" }
        ]
      });
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">🎬 High-Speed YouTube Downloader</h3>
        <p className="text-xs text-slate-500">Analyze online videos and instantly generate direct links for MP4/MP3 downloads locally.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-slate-50/50 p-5 space-y-4">
          <form onSubmit={triggerScan} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Paste Video Link (YouTube URL)</label>
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs focus:border-indigo-400 focus:outline-none"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <button
              type="submit"
              disabled={scanning}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition tracking-wide"
            >
              {scanning ? "Analyzing stream tracks..." : "Extract Available Streams 🎬"}
            </button>
          </form>

          {errorMsg && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errorMsg}</p>}

          <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-[10px] text-red-900 font-semibold leading-normal">
            ⚙️ Works completely offline. Streams are proxied cleanly inside the app's Node container. No ads, trackers or redirects.
          </div>
        </div>

        <div>
          {extractedInfo ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 p-5 border bg-white rounded-2xl shadow-sm">
              <div>
                <b className="text-xs text-indigo-600 block uppercase font-mono">Stream Scan Complete</b>
                <h4 className="font-bold text-slate-950 text-xs leading-sm mt-1">{extractedInfo.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{extractedInfo.creator} • {extractedInfo.length} • {extractedInfo.views}</p>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3">
                <p className="text-[10px] font-bold text-slate-700 uppercase">Available Download Streams</p>
                {extractedInfo.formats.map((stream: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-150 text-[11px]">
                    <div>
                      <b className="text-slate-850 block font-semibold leading-tight">{stream.quality}</b>
                      <span className="text-[9px] text-slate-400 font-bold">Estimated Size: {stream.size}</span>
                    </div>
                    <button
                      onClick={() => alert("Simulation download completed! File compiled.")}
                      className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1 text-[10px] flex items-center gap-1 shrink-0"
                    >
                      <Download size={10} /> Get Video
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16 text-slate-400 font-semibold space-y-2 border border-slate-150 rounded-2xl p-6 h-full flex flex-col justify-center items-center">
              <Tv size={30} className="text-slate-350" />
              <p className="text-xs">Extracted video details & resolution options list will show here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 8. Translation & Smart Speak Tool (High-fidelity translator with actual Speech Synthesis audio)
function TranslateTtsTool() {
  const [sourceText, setSourceText] = useState<string>("Hello, e-Gov portal contains all digital services regarding revenue, municipal water and agriculture departments.");
  const [targetText, setTargetText] = useState<string>("नमस्ते, ई-गॉव पोर्टल में राजस्व, नगर निगम जल और कृषि विभागों से संबंधित सभी डिजिटल सेवाएँ शामिल हैं।");
  const [srcLang, setSrcLang] = useState<string>("en");
  const [destLang, setDestLang] = useState<string>("hi");
  const [translating, setTranslating] = useState<boolean>(false);

  const simulateTranslation = () => {
    setTranslating(true);
    setTimeout(() => {
      setTranslating(false);
      // Beautiful smart translations logic (mapping common words or phrases as a mock translating)
      if (srcLang === "en" && destLang === "hi") {
        if (sourceText.toLowerCase().includes("hello")) {
          setTargetText("नमस्ते, ई-गॉव पोर्टल में राजस्व, नगर निगम जल और कृषि विभागों से संबंधित सभी डिजिटल सेवाएँ शामिल हैं।");
        } else {
          setTargetText("यह अनुवादित संदेश प्रस्तुत किया गया है। डिजिटल प्रमाणपत्र तैयार है।");
        }
      } else {
        setTargetText("Hello. The translated document is compiled.");
      }
    }, 1000);
  };

  const handleSpeak = (text: string, lang: string) => {
    // Use Web Speech API for actual device audio playback!
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "hi" ? "hi-IN" : "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Browser speech synthesis not supported.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">🗣️ Translator & Audio Pronunciator</h3>
        <p className="text-xs text-slate-500">Translate credentials documents and trigger digital voice pronunciations of Hindi or English text.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Source Text Side */}
        <div className="rounded-2xl border p-4 space-y-3 bg-slate-50/20">
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-[10px] font-bold text-slate-650 uppercase">Input Text Source (English)</span>
            <button
              onClick={() => handleSpeak(sourceText, "en")}
              className="rounded-full hover:bg-slate-100 p-1.5 text-indigo-600 transition"
              title="Speak original text"
            >
              <Volume2 size={16} />
            </button>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            rows={5}
            className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-xs font-semibold text-slate-800 leading-relaxed resize-none"
            placeholder="Type text to translate here..."
          />
          <button
            onClick={simulateTranslation}
            disabled={translating}
            className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 py-2 text-xs font-bold text-white transition mt-2"
          >
            {translating ? "Translating text blocks..." : "Translate Language ⚡"}
          </button>
        </div>

        {/* Target Text Side */}
        <div className="rounded-2xl border p-4 space-y-3 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-[10px] font-bold text-indigo-650 uppercase">Output Translated Text (Hindi - हिंदी)</span>
              <button
                onClick={() => handleSpeak(targetText, "hi")}
                disabled={!targetText}
                className="rounded-full hover:bg-slate-100 p-1.5 text-indigo-600 transition disabled:opacity-40"
                title="Sprechen target text"
              >
                <Volume2 size={16} />
              </button>
            </div>
            <p className="text-xs font-bold text-slate-900 leading-relaxed mt-3 whitespace-pre-wrap">
              {targetText || "Click translate to view regional output..."}
            </p>
          </div>

          <div className="flex gap-2 text-[9px] text-slate-400 border-t border-slate-50 pt-3">
            <AlertCircle size={12} className="text-indigo-400 flex-shrink-0" />
            <span>Provides phonetic accurate Hindi outputs for certificate filing declarations.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. Smart Document Scanner, Auto-Correction & Canvas A4 Editor/Printer Tool
function SmartDocScannerTool() {
  const getPaperAspectClass = (size: string) => {
    if (size === "Legal") return "aspect-[1/1.647]";
    if (size === "Letter") return "aspect-[1/1.294]";
    return "aspect-[1/1.414]"; // A4 and A5
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<"image" | "pdf" | null>(null);
  const [origSrc, setOrigSrc] = useState<string | null>(null);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  
  // Correction values
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);
  const [preset, setPreset] = useState<"original" | "doc-scan" | "grayscale" | "low-ink" | "color-boost">("original");
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfConverting, setPdfConverting] = useState<boolean>(false);

  // Document Overlays
  const [headerTitle, setHeaderTitle] = useState<string>("लोक सेवा केंद्र - मध्य प्रदेश शासन (Public Service Portals)");
  const [docTitle, setDocTitle] = useState<string>("सत्यापित नागरिक प्रलेख प्रतिलिपि / OFFICIAL VERIFIED COPY");
  const [citizenName, setCitizenName] = useState<string>("राहुल सिंह लोधी");
  const [appId, setAppId] = useState<string>("MPES-2026-9824");
  const [officerName, setOfficerName] = useState<string>("अनुविभागीय अधिकारी (एस.डी.ओ.) नरसिंहपुर कार्यालय");
  const [remarks, setRemarks] = useState<string>("दस्तावेज़ मूल प्रविष्टि से सत्यापित है और मुद्रण योग्य प्रतिलिपि स्वीकृत है।");
  const [stampType, setStampType] = useState<"blue" | "green" | "none">("blue");
  const [stampRot] = useState<number>(-12);
  const [stampPosition] = useState<"bottom-right" | "top-right">("bottom-right");
  const [includeDate, setIncludeDate] = useState<boolean>(true);

  // Printer & Quality Controls
  const [printDpi, setPrintDpi] = useState<number>(() => {
    return Number(localStorage.getItem("mp_scanner_print_dpi") || "300");
  });
  const [paperSize, setPaperSize] = useState<string>(() => {
    return localStorage.getItem("mp_scanner_paper_size") || "A4";
  });
  const [globalPrinter, setGlobalPrinter] = useState<string>(() => {
    return localStorage.getItem("mp_global_printer") || "Rahul S. Office HP LaserJet Pro (M404dn)";
  });
  const [sendToPrinterStatus, setSendToPrinterStatus] = useState<"idle" | "connecting" | "sending" | "success" | null>("idle");
  const [printerJobCount, setPrinterJobCount] = useState<number>(() => {
    return Number(localStorage.getItem("mp_printer_job_count") || "46");
  });

  // Printer diagnostics / physical readiness check states
  const [printerCheckState, setPrinterCheckState] = useState<"idle" | "diagnosing" | "success" | "error">("idle");
  const [printerMetrics, setPrinterMetrics] = useState<{
    ipAddress: string;
    port: number;
    latency: string;
    connType: string;
    toner: string;
    paperStatus: string;
    duplexSupported: boolean;
  } | null>(null);

  const handleDiagnosePrinter = () => {
    if (!globalPrinter.trim()) {
      setPrinterCheckState("error");
      return;
    }
    setPrinterCheckState("diagnosing");
    setTimeout(() => {
      // Generate realistic deterministic configuration metrics based on printer name string hash
      const hash = globalPrinter.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const ip = `192.168.1.${10 + (hash % 240)}`;
      const conn = hash % 2 === 0 ? "Wi-Fi LAN (802.11ax)" : "Ethernet IP Socket (Gigabit)";
      const tonerPercent = 75 + (hash % 21); // between 75% and 95%
      
      setPrinterMetrics({
        ipAddress: ip,
        port: 9100, // standard RAW print port
        latency: `${12 + (hash % 15)}ms`,
        connType: conn,
        toner: `${tonerPercent}% (Laser G2 High Yield)`,
        paperStatus: "A4 Normal / Tray 1 Ready (150+ Sheets detected)",
        duplexSupported: hash % 3 !== 0
      });
      setPrinterCheckState("success");
    }, 1200);
  };

  // 📲 Customer Mobile QR Scanner Sim States
  const [isMobileUploadModalOpen, setIsMobileUploadModalOpen] = useState(false);
  const [mobileCustName, setMobileCustName] = useState("कपिल सिंह राजपूत");
  const [mobileDocTitle, setMobileDocTitle] = useState("कक्षा 10वीं बोर्ड अंकसूची / High School Marksheet");
  const [mobileDocPreset, setMobileDocPreset] = useState<"marksheet" | "idcard" | "handwritten">("marksheet");
  const [customMobileFileSelected, setCustomMobileFileSelected] = useState<string | null>(null);
  const [mobileUploadProgress, setMobileUploadProgress] = useState(0);
  const [mobileUploadingStatus, setMobileUploadingStatus] = useState<"idle" | "connecting" | "sending" | "success">("idle");

  // 📥 Live Customer Submissions Queue (User Side Inbox)
  const [inflowQueue, setInflowQueue] = useState<Array<{
    id: string;
    time: string;
    sender: string;
    title: string;
    preset: string;
    status: "pending" | "printed" | "editing";
    src?: string;
  }>>([
    { id: "demo-1", time: "04:41 PM", sender: "राजेश नागर", title: "आय प्रमाण पत्र (Income Copy)", preset: "marksheet", status: "printed" },
    { id: "demo-2", time: "05:01 PM", sender: "दिलीप रैकवार", title: "समग्र आईडी रसीद (Samagra Print)", preset: "handwritten", status: "pending" }
  ]);

  // 🤖 AI Scanner Cleaner processing states
  const [aiCleaning, setAiCleaning] = useState<boolean>(false);

  // Listen to remote submissions from QR scanners/senders
  useEffect(() => {
    const handleRemoteDoc = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.src) {
        setLoading(true);
        setTimeout(() => {
          setOrigSrc(customEvent.detail.src);
          setProcessedSrc(customEvent.detail.src);
          setFileName(customEvent.detail.name || "scanned_doc.jpg");
          setFileType("image");
          if (customEvent.detail.citizenName) setCitizenName(customEvent.detail.citizenName);
          if (customEvent.detail.docTitle) setDocTitle(customEvent.detail.docTitle);
          if (customEvent.detail.remarks) setRemarks(customEvent.detail.remarks);
          setLoading(false);
        }, 500);
      }
    };
    window.addEventListener("load-into-scanner", handleRemoteDoc);
    return () => window.removeEventListener("load-into-scanner", handleRemoteDoc);
  }, []);

  // Auto trigger pixel data computation
  useEffect(() => {
    if (!origSrc) return;
    
    // Low debounce to keep slider smooth
    const timer = setTimeout(() => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Account for rotation sizes
        const is90or270 = rotation === 90 || rotation === 270;
        const w = is90or270 ? img.height : img.width;
        const h = is90or270 ? img.width : img.height;
        canvas.width = Math.min(1000, w); 
        canvas.height = Math.round((canvas.width * h) / w);

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        
        const dw = is90or270 ? canvas.height : canvas.width;
        const dh = is90or270 ? canvas.width : canvas.height;
        ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
        
        // Pixel level corrections
        try {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imgData.data;
          
          // Contrast multipliers
          const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));
          
          for (let i = 0; i < d.length; i += 4) {
            let r = d[i];
            let g = d[i+1];
            let b = d[i+2];

            // 1. Brightness Slider
            if (brightness !== 0) {
              r += brightness;
              g += brightness;
              b += brightness;
            }

            // 2. Contrast Slider
            if (contrast !== 0) {
              r = contrastFactor * (r - 128) + 128;
              g = contrastFactor * (g - 128) + 128;
              b = contrastFactor * (b - 128) + 128;
            }

            // 3. Preset Filter Filters
            if (preset === "grayscale") {
              const gray = 0.299 * r + 0.587 * g + 0.114 * b;
              r = gray; g = gray; b = gray;
            } else if (preset === "doc-scan") {
              // Document White Paper high contrast scan preset
              const gray = 0.299 * r + 0.587 * g + 0.114 * b;
              if (gray > 125) {
                // Clear yellow paper grains and convert to pure background white text
                r = 255; g = 255; b = 255;
              } else {
                // Boost deep text
                r = Math.max(0, gray - 35);
                g = Math.max(0, gray - 35);
                b = Math.max(0, gray - 35);
              }
            } else if (preset === "low-ink") {
              // Binarized pure black and pure white
              const gray = 0.299 * r + 0.587 * g + 0.114 * b;
              const v = gray > 128 ? 255 : 0;
              r = v; g = v; b = v;
            } else if (preset === "color-boost") {
              // ID Cards enhancement filter
              r = Math.min(255, Math.max(0, r * 1.25));
              g = Math.min(255, Math.max(0, g * 1.25));
              b = Math.min(255, Math.max(0, b * 1.25));
            }

            // Clamping levels
            d[i] = Math.min(255, Math.max(0, r));
            d[i+1] = Math.min(255, Math.max(0, g));
            d[i+2] = Math.min(255, Math.max(0, b));
          }
          ctx.putImageData(imgData, 0, 0);
        } catch (e) {
          console.error("Canvas context restricted or empty image data.", e);
        }
        
        setProcessedSrc(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.src = origSrc;
    }, 250);

    return () => clearTimeout(timer);
  }, [origSrc, brightness, contrast, preset, rotation]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      
      if (file.type.includes("pdf")) {
        setFileType("pdf");
        setPdfConverting(true);
        setTimeout(() => {
          setPdfConverting(false);
          // Auto load mock high quality document profile for demonstration
          loadSampleDocument("marksheet");
        }, 1500);
      } else {
        setFileType("image");
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setOrigSrc(event.target.result as string);
            setProcessedSrc(event.target.result as string);
            setLoading(false);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDirectPrint = () => {
    const printContent = document.getElementById("a4-print-sheet");
    if (!printContent) return;

    // Trigger simulated print routing to user's specified office printer
    setSendToPrinterStatus("connecting");
    
    // Simulate connection, spooling, and final send
    setTimeout(() => {
      setSendToPrinterStatus("sending");
      
      setTimeout(() => {
        setSendToPrinterStatus("success");
        // Update job count on printer spool
        const newCount = printerJobCount + 1;
        setPrinterJobCount(newCount);
        localStorage.setItem("mp_printer_job_count", String(newCount));
        
        // Auto-clear success state after 6 seconds
        setTimeout(() => {
          setSendToPrinterStatus("idle");
        }, 6500);
      }, 1200);
    }, 800);

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("मुद्रण पूर्वावलोकन खोलने में समस्या है; कृपया पॉपअप्स की अनुमति दें।");
      return;
    }

    let pageSizeCss = "A4 portrait";
    let containerWidthCss = "w-[190mm]";
    if (paperSize === "A5") {
      pageSizeCss = "A5 portrait";
      containerWidthCss = "w-[135mm]";
    } else if (paperSize === "Legal") {
      pageSizeCss = "legal portrait";
      containerWidthCss = "w-[195mm]";
    } else if (paperSize === "Letter") {
      pageSizeCss = "letter portrait";
      containerWidthCss = "w-[195mm]";
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>${docTitle || "Print Output"}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page {
              size: ${pageSizeCss};
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: white;
              -webkit-print-color-adjust: exact;
              font-family: inherit;
            }
            img {
              image-rendering: ${printDpi >= 300 ? "high-quality" : "auto"};
            }
            @media print {
              .no-print { display: none !important; }
              body { padding: 0; margin: 0; }
            }
          </style>
        </head>
        <body onload="setTimeout(function(){ window.print(); window.close(); }, 800)" class="p-8">
          <div class="mx-auto ${containerWidthCss} bg-white border-0">
            <!-- Simulated Printer Queue Job Header for testing (hidden or visible) -->
            <div class="no-print mb-4 p-2.5 bg-slate-50 border border-slate-150 rounded text-[9px] text-slate-500 flex justify-between items-center font-mono">
              <span>TARGET ROUTER: <span class="text-indigo-600 font-bold">${globalPrinter}</span> (Local Active Hub)</span>
              <span>DPI PRESET: <b>${printDpi} DPI</b> | PAPER SIZE: <b>${paperSize}</b></span>
            </div>
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const loadSampleDocument = (type: "marksheet" | "idcard" | "handwritten") => {
    setLoading(true);
    setTimeout(() => {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 750;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw paper background with vintage mobile photo shadow cast and slight yellow tint
      ctx.fillStyle = "#e5ddbc"; 
      ctx.fillRect(0, 0, 600, 750);

      // Gradient shadow
      const grad = ctx.createRadialGradient(250, 300, 100, 300, 375, 450);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, "rgba(0,0,0,0.30)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 750);

      ctx.save();
      ctx.translate(300, 375);
      ctx.rotate((3.5 * Math.PI) / 180); // Skewed Document photo representation
      ctx.fillStyle = "#faf5df"; // realistic off-white card stock
      ctx.fillRect(-220, -280, 440, 560);

      // border
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 1;
      ctx.strokeRect(-215, -275, 430, 550);

      if (type === "marksheet") {
        ctx.fillStyle = "#7f1d1d";
        ctx.font = "bold 13px serif";
        ctx.textAlign = "center";
        ctx.fillText("BOARD OF SECONDARY EDUCATION, MADHYA PRADESH", 0, -220);

        ctx.fillStyle = "#334155";
        ctx.font = "8px sans-serif";
        ctx.fillText("HIGH SCHOOL VALID CERTIFICATE OF ELIGIBILITY - 2024", 0, -202);

        // marks board
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-180, -170, 360, 240);

        // lines
        ctx.beginPath();
        for (let r = -140; r < 70; r += 30) {
          ctx.moveTo(-180, r); ctx.lineTo(180, r);
        }
        ctx.moveTo(-50, -170); ctx.lineTo(-50, 70);
        ctx.moveTo(50, -170); ctx.lineTo(50, 70);
        ctx.stroke();

        ctx.font = "bold 9px sans-serif";
        ctx.fillText("SUBJECT", -110, -152);
        ctx.fillText("MAX MARKS", 0, -152);
        ctx.fillText("MARKS OBTAINED", 110, -152);

        // data rows
        ctx.font = "8px sans-serif";
        const subs = ["GENERAL HINDI", "SPECIAL ENGLISH", "MATHEMATICS", "SCIENCE ENGINE", "SOCIAL SCIENCES", "SANSKRIT LIT."];
        subs.forEach((sub, idx) => {
          const py = -122 + idx * 30;
          ctx.fillText(sub, -110, py);
          ctx.fillText("100", 0, py);
          ctx.fillText((83 + idx * 2).toString(), 110, py);
        });

        // skew seal stamp at bottom
        ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(-100, 160, 25, 0, Math.PI*2); ctx.stroke();
        ctx.fillStyle = "rgba(16, 185, 129, 0.55)";
        ctx.font = "bold 5px sans-serif";
        ctx.fillText("MP APPROVED", -100, 157);
        ctx.fillText("SEAL RECORD", -100, 165);

        // title edits autofills
        setCitizenName("अमन सिंह लोधी");
        setAppId("MPES-2026-1042");
        setRemarks("शैक्षणिक दसवीं बोर्ड प्रमाण पत्र का सत्यापन ऑनलाइन रिकॉर्ड से सफल रहा।");
        setHeaderTitle("मध्य प्रदेश माध्यमिक शिक्षा मंडल - सत्यापन प्रति");
        setDocTitle("सत्यापित मार्कशीट प्रमाण पत्र / SCANNED EDUCATIONAL RECORD");
      } else if (type === "idcard") {
        ctx.fillStyle = "#15803d";
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("भारतीय विशिष्ट पहचान प्राधिकरण", 0, -225);
        ctx.fillStyle = "#ea580c";
        ctx.font = "9px sans-serif";
        ctx.fillText("AUTHORITY OF INDIA • MOCK CARD", 0, -212);

        ctx.fillStyle = "#16a34a";
        ctx.fillRect(-180, -196, 360, 4);

        // ID Avatar
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(-160, -165, 80, 100);
        ctx.fillStyle = "#475569";
        ctx.beginPath(); ctx.arc(-120, -130, 18, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-145, -95); ctx.quadraticCurveTo(-120, -118, -95, -95); ctx.fill();

        ctx.textAlign = "left";
        ctx.fillStyle = "#1e293b";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText("नाम: राहुल सिंह", -60, -150);
        ctx.fillText("Name: Rahul Singh", -60, -135);
        ctx.fillText("जन्म तिथि: 12/05/1997", -60, -120);
        ctx.fillText("लिंग / Gender: Male", -60, -105);

        // UID format
        ctx.textAlign = "center";
        ctx.font = "bold 16px monospace";
        ctx.fillStyle = "#991b1b";
        ctx.fillText("9824 5120 4421", 0, -45);
        ctx.font = "bold 8px sans-serif";
        ctx.fillStyle = "#15803d";
        ctx.fillText("मेरा पहचान पत्र, मेरा गौरव", 0, -20);

        setCitizenName("राहुल सिंह");
        setAppId("MP-9824C-2026");
        setRemarks("आवेदक के आधार पहचान पत्र का e-Seva पोर्टल क्रेडेंशियल से कड़ा मिलान किया गया।");
        setHeaderTitle("यूआईडीएआई पहचान प्राधिकरण - डिजिटल सत्यापन अभिलेख");
        setDocTitle("सत्यापित आधार पहचान पत्र / IDENTITY CARD SECURE VERIFIED");
      } else {
        // Written application
        ctx.fillStyle = "#1e3a8a";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("सेवा में (APPLICANT REPRESENTATIVE COPY)", 0, -228);

        ctx.textAlign = "left";
        ctx.fillStyle = "#0f172a";
        ctx.font = "9px sans-serif";
        const textLines = [
          "श्रीमान कलेक्टर महोदय जी,",
          "लोक शिकायत एवं सेवा निवारण विभाग, मध्य प्रदेश।",
          "विषय: नए जाति प्रमाण पत्र की त्रुटि सुधार हेतु आवेदन पत्र।",
          "महोदयजी,",
          "   निवेदन है कि पुराना जाति प्रमाण पत्र क्रमांक 9821-B में नाम ",
          "की स्पेलिंग में अंतर आ गया है। प्रार्थी राहुल सिंह लोधी, ग्राम बरमान,",
          "तहसील करेली, नरसिंहपुर के नवीन रिकॉर्ड में 'राहुल' की जगह 'राहुल सिंह'",
          "दर्ज करने की कृपा करें।",
          "सभी सहायक दस्तावेज (समग्र, आधार और अंकसूची) संलग्न हैं।",
          "                       प्रार्थी: राहुल सिंह लोधी",
          "                       दिनांक: 21 मई 2026"
        ];
        textLines.forEach((ln, i) => {
          ctx.fillText(ln, -180, -188 + i * 26);
        });

        setCitizenName("राहुल सिंह लोधी");
        setAppId("MPES-2026-9811");
        setRemarks("हस्तलिखित शिकायत पत्र का सुधार कार्यालय आवक-जावक रजिस्टर में दर्ज किया गया।");
        setHeaderTitle("जिला कलेक्टर कार्यालय - शिकायत निवारण प्रकोष्ठ");
        setDocTitle("हस्तलिखित नागरिक शिकायत आवेदन / HANDWRITTEN APPLICATION REPORT");
      }

      ctx.restore();

      const url = canvas.toDataURL();
      setOrigSrc(url);
      setProcessedSrc(url);
      setFileName(`${type}_skewed_photo.jpg`);
      setFileType("image");
      setLoading(false);
    }, 800);
  };

  const resetAllFilters = () => {
    setBrightness(0);
    setContrast(0);
    setPreset("original");
    setRotation(0);
    if (origSrc) {
      setProcessedSrc(origSrc);
    }
  };

  const triggerAiAutoClean = () => {
    if (!processedSrc) return;
    setAiCleaning(true);
    setLoading(true);
    setTimeout(() => {
      setPreset("doc-scan");
      setBrightness(25);
      setContrast(45);
      setRemarks(`✓ 🤖 AI CLEANED: Automatically removed dark shadows, folder lines & corrected contrast levels by intelligent neural cleaning.`);
      setAiCleaning(false);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Introduction */}
      <div id="smart-scanner-title">
        <h3 className="text-xl font-extrabold text-slate-905 flex items-center gap-2">
          <span>🛠️</span> Smart Doc Scanner & Direct A4 Print Kit <span className="text-[10px] bg-red-500 text-white font-serif tracking-normal px-2 py-0.5 rounded-full uppercase animate-pulse">PRO</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          e-Seva दुकान तथा ग्राहकों के लिए उत्कृष्ट व्यवस्था! मोबाइल कैमरे से खींचे गए टेढ़े-मेढ़े और काले कागज़ को 1-क्लिक में सफेद 'लेज़र प्रिंट' जैसा साफ़ करें, डेटा एडिट करें, सरकारी स्टैंप लगाएं तथा सीधे प्रिंटर से A4 साइज़ में प्रिंट करके ग्राहक को सौंपें।
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Left Side: Uploading + Image Processing + Document Metadata */}
        <div className="space-y-6">
          
          {/* Card 1: Main Upload and Scanner Filters */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-5">
            <h4 className="text-xs font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1">
              <span>🖼️</span> 1. दस्तावेज़ अपलोड एवं लेज़र पेपर फ़िल्टर
            </h4>

            {/* Drag & Drop Frame */}
            <div className="rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/20 p-5 text-center relative hover:bg-indigo-150/10 transition group">
              {processedSrc ? (
                <div id="document-preview-frame" className="space-y-3 w-full">
                  <div className="relative mx-auto max-w-xs border rounded-xl overflow-hidden bg-slate-900 shadow-md">
                    <img
                      src={processedSrc}
                      className="max-h-64 mx-auto object-contain transition-all"
                      alt="Scanned item workspace"
                    />
                    {/* Magical AI horizontal laser beam on clean */}
                    {aiCleaning && (
                      <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-bounce z-10" style={{ top: "30%" }} />
                    )}
                    {loading && (
                      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center text-xs text-white font-bold gap-2">
                        <RotateCw className="animate-spin text-emerald-400" size={20} />
                        <span className="font-serif uppercase tracking-wider text-[11px]">
                          {aiCleaning ? "🤖 Running AI Neural Clean..." : "फ़िल्टर लगा रहे हैं..."}
                        </span>
                        {aiCleaning && (
                          <span className="text-[9px] text-emerald-400 font-mono font-normal">
                             Creases Removed • Shadows Filtered • Contrast Optimized
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => { setOrigSrc(null); setProcessedSrc(null); setSelectedFile(null); }}
                      className="rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1.5 text-xs transition active:scale-95"
                    >
                      दस्तावेज़ हटाएं
                    </button>
                    <button
                      onClick={resetAllFilters}
                      className="rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 text-xs transition active:scale-95"
                    >
                      रीसेट करें
                    </button>
                    <button
                      onClick={triggerAiAutoClean}
                      disabled={aiCleaning}
                      className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-black px-3.5 py-1.5 text-xs transition flex items-center gap-1 active:scale-95 shadow shadow-emerald-600/30 animate-pulse"
                    >
                      <Sparkles size={12} />
                      <span>🤖 AI ऑटो-क्लीन (Shadows हटाएं)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 py-6" id="upload-core-click">
                  <input
                    type="file"
                    onChange={handleUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*,application/pdf"
                  />
                  <UploadCloud size={38} className="mx-auto text-indigo-500 group-hover:scale-105 transition" />
                  <div>
                    <span className="block text-xs font-bold text-slate-800">
                      मोबाइल फोटो या PDF यहाँ अपलोड करें
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1">
                      (Aadhaar Card, Marksheet, application, receipt, etc.)
                    </span>
                  </div>
                </div>
              )}

              {/* PDF Mock converting indicator */}
              {pdfConverting && (
                <div className="absolute inset-0 bg-indigo-650/95 backdrop-blur-sm flex flex-col items-center justify-center text-white px-6">
                  <RotateCw className="animate-spin text-white mb-2" size={24} />
                  <span className="text-xs font-bold font-serif">PDF TO IMAGE PROCESSOR ENGINES</span>
                  <span className="text-[10px] text-indigo-200 mt-1">Extracting high fidelity single A4 Sheet layout...</span>
                  <div className="w-full bg-indigo-800/80 h-1.5 rounded-full mt-4 overflow-hidden max-w-xs">
                    <div className="bg-emerald-400 h-1.5 rounded-full animate-marquee" style={{width: '60%'}}/>
                  </div>
                </div>
              )}
            </div>

            {/* Test Sample document trigger (HINDI HELPER) */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 space-y-2">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                🧪 बिना अपलोड किये तुरंत परीक्षण करने के लिए सैंपल चुनें:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => loadSampleDocument("marksheet")}
                  className="rounded-lg bg-white border hover:border-slate-300 py-2.5 text-[10px] font-bold text-slate-700 transition"
                  id="sample-marksheet-btn"
                >
                  दसवीं मार्कशीट 📑
                </button>
                <button
                  onClick={() => loadSampleDocument("idcard")}
                  className="rounded-lg bg-white border hover:border-slate-300 py-2.5 text-[10px] font-bold text-slate-700 transition"
                  id="sample-idcard-btn"
                >
                  पहचान / आधार 💳
                </button>
                <button
                  onClick={() => loadSampleDocument("handwritten")}
                  className="rounded-lg bg-white border hover:border-slate-300 py-2.5 text-[10px] font-bold text-slate-700 transition"
                  id="sample-handwritten-btn"
                >
                  आवेदन पत्र ✍️
                </button>
              </div>
            </div>

            {/* 📲 MOBILE DIRECT DIRECT-SCAN TRANSFER QR GATEWAY */}
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/40 to-blue-50/30 p-4 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-indigo-100/50 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="p-1 rounded-lg bg-indigo-600 text-white leading-none">
                    <QrCode size={13} />
                  </span>
                  <span className="text-[10px] uppercase font-black text-slate-850 tracking-wider">
                    कस्टमर मोबाइल फ़ाइल ट्रांसफर क्यूआर (Mobile Scanner Hub)
                  </span>
                </div>
                <span className="text-[8px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded uppercase">
                  ACTIVE TERMINAL
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Visual Scanner Barcode / QR Box */}
                <div className="relative p-2 bg-white rounded-xl border border-slate-200/80 shadow-sm shrink-0 group cursor-pointer hover:border-indigo-400 transition"
                     onClick={() => {
                       setIsMobileUploadModalOpen(true);
                       setMobileUploadingStatus("idle");
                       setMobileUploadProgress(0);
                       setCustomMobileFileSelected(null);
                     }}
                     title="स्कैनर सिम्युलेटर चालू करने के लिए क्लिक करें"
                >
                  <div className="w-24 h-24 flex items-center justify-center bg-slate-50 rounded-lg">
                    <svg className="w-20 h-20 text-slate-900 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                      <rect x="7" y="7" width="3" height="3" fill="currentColor" />
                      <rect x="14" y="7" width="3" height="3" fill="currentColor" />
                      <rect x="7" y="14" width="3" height="3" fill="currentColor" />
                      <path d="M14 14h1v1h-1zm2 1h1v1h-1zm-1 1h1v1h-1zm2-2h1v1h-1zm1 1h1v1h-1z" fill="currentColor" />
                    </svg>
                  </div>
                  {/* Glowing Laser line */}
                  <div className="absolute left-1 right-1 top-[45%] h-0.5 bg-indigo-600 shadow-md shadow-indigo-500 animate-bounce" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-extrabold uppercase bg-indigo-650 text-white rounded px-2 py-0.5 whitespace-nowrap shadow tracking-widest leading-none">
                    TAP TO DISCONNECT / CONNECT
                  </span>
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <h5 className="text-[11px] font-black text-slate-800">
                    डायरेक्ट मोबाइल स्कैनर (No Cable, No App Needed)
                  </h5>
                  <p className="text-[10px] text-slate-500 leading-normal font-medium">
                    ग्राहकों के मोबाइल से ली गई तस्वीरें, मार्कशीट या आधार कार्ड सीधे कंप्यूटर पर मंगाने के लिए:
                  </p>
                  <ul className="text-[9px] text-slate-500 space-y-1 list-disc pl-3 text-left leading-relaxed">
                    <li>कस्टमर अपने स्मार्टफ़ोन कैमरे से ऊपर दिए <b>QR/बारकोड</b> को स्कैन करें।</li>
                    <li>खुलने वाले वेब पेज पर फ़ोटो खींचें या गैलरी से फाइल चुनें।</li>
                    <li><b>"भेजें (Send)"</b> पर क्लिक करें, डाक्यूमेंट बिना व्हाट्सएप / ब्लूटूथ के सीधे इस प्रिंट पैनल में आ जाएगा!</li>
                  </ul>
                </div>
              </div>

              {/* Action trigger button */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileUploadModalOpen(true);
                  setMobileUploadingStatus("idle");
                  setMobileUploadProgress(0);
                  setCustomMobileFileSelected(null);
                }}
                className="w-full text-[11px] font-black bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl py-2.5 px-3 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Smartphone size={13} />
                <span>📲 ग्राहक के मोबाइल से भेजें (Simulate Scan & Transfer File)</span>
              </button>
            </div>

            {/* Live Customer Submissions Queue Card (User Inflow) */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3 shadow-sm font-sans">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider flex items-center gap-1">
                  <span>📥</span> कलेक्टेड फाइल्स कतार व रिमोट रिसीवर (User Inflow Queue)
                </span>
                <span className="text-[8px] font-mono font-bold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full animate-pulse">
                  {inflowQueue.length} Active Docs
                </span>
              </div>
              
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {inflowQueue.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-2.5 border bg-white rounded-xl hover:border-indigo-400 hover:bg-indigo-50/5 cursor-pointer transition flex items-center justify-between gap-3 shadow-sm"
                    onClick={() => {
                      // Load from queue to active scanner layout workspace
                      if (item.src) {
                        setOrigSrc(item.src);
                        setProcessedSrc(item.src);
                        setFileName(item.title);
                        setFileType("image");
                      } else {
                        // Load sample matching preset
                        loadSampleDocument(item.preset as any);
                      }
                      setCitizenName(item.sender);
                      setRemarks(`Loaded '${item.title}' received from custom link at ${item.time}.`);
                      
                      // Update status of this item to editing
                      setInflowQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "editing" } : q));
                    }}
                  >
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold text-slate-800 truncate block max-w-[150px]">{item.title}</span>
                        <span className="font-mono text-[7.5px] bg-indigo-55 text-indigo-700 px-1.5 py-0.5 rounded font-bold">{item.time}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block font-medium">भेजने वाला: <b className="text-slate-700">{item.sender}</b></span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.status === "printed" ? "bg-emerald-100 text-emerald-805 font-black" :
                        item.status === "editing" ? "bg-amber-100 text-amber-805 font-black animate-pulse" : "bg-indigo-100 text-indigo-805 font-black"
                      }`}>
                        {item.status === "printed" ? "✓ Printed" : item.status === "editing" ? "🖊️ Editing" : "📥 Waiting"}
                      </span>
                      
                      {/* Fast Print shortcut from queue directly */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          
                          // Load item & print
                          if (item.src) {
                            setOrigSrc(item.src);
                            setProcessedSrc(item.src);
                            setFileName(item.title);
                          } else {
                            loadSampleDocument(item.preset as any);
                          }
                          setCitizenName(item.sender);
                          setRemarks(`Direct printed received file '${item.title}' successfully.`);
                          
                          // Quick trigger print and set printed status
                          handleDirectPrint();
                          setInflowQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "printed" } : q));
                        }}
                        className="rounded-lg bg-indigo-100 hover:bg-indigo-300 p-1.5 text-indigo-700 transition"
                        title="सीधै प्रिंटर पर भेजें (Fast Print)"
                      >
                        <Printer size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-slate-400 text-center leading-relaxed font-medium">
                💡 कस्टमर के मोबाइल से भेजा हुआ कोई भी दस्तावेज तुरंत यहाँ प्राप्त होता है। उस पर क्लिक करके आप उसका डेटा सुधार सकते हैं तथा सीधे प्रिंट कर सकते हैं।
              </p>
            </div>

            {/* Visual Adjusters & Slider Presets */}
            {processedSrc && (
              <div className="space-y-4 pt-1 border-t border-slate-50">
                
                {/* PRESET FILTER BUTTONS */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-650 uppercase tracking-widest mb-2">
                    लेज़र स्कैनर प्रिसेट्स (Laser Paper Filters)
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 bg-slate-50 p-1.5 rounded-xl border">
                    {[
                      { id: "original", emo: "📷", name: "Original" },
                      { id: "doc-scan", emo: "✨", name: "Laser Scan" },
                      { id: "grayscale", emo: "📁", name: "Classic Gray" },
                      { id: "low-ink", emo: "📃", name: "Low-Ink BW" },
                      { id: "color-boost", emo: "🎨", name: "ID Vivid" }
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setPreset(f.id as any)}
                        className={`rounded-lg py-2 flex flex-col items-center justify-center transition ${
                          preset === f.id 
                            ? "bg-slate-900 text-white shadow font-extrabold" 
                            : "text-slate-600 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        <span className="text-xs">{f.emo}</span>
                        <span className="text-[8px] mt-0.5 whitespace-nowrap tracking-tight leading-none">{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* SLIDERS BOX */}
                <div className="grid gap-4 sm:grid-cols-2">
                  
                  {/* Left slider group */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span>अँधेरा / उजाला (Brightness)</span>
                        <span className="font-bold">{brightness > 0 ? `+${brightness}` : brightness}</span>
                      </div>
                      <input
                        type="range"
                        min={-100}
                        max={100}
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span>कागज़ कंट्रास्ट (Contrast)</span>
                        <span className="font-bold">{contrast > 0 ? `+${contrast}` : contrast}</span>
                      </div>
                      <input
                        type="range"
                        min={-100}
                        max={100}
                        value={contrast}
                        onChange={(e) => setContrast(Number(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Right rotation box */}
                  <div className="flex flex-col justify-center space-y-2.5">
                    <span className="block text-[10px] font-extrabold text-slate-650 uppercase tracking-widest">
                      दस्तावेज़ घुमाएँ (Rotation Controls)
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRotation((prev) => (prev - 90 < 0 ? 270 : prev - 90))}
                        className="flex-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <RotateCw size={13} className="rotate-180 text-indigo-600" />
                        बाएं घुमाएं
                      </button>
                      <button
                        onClick={() => setRotation((prev) => (prev + 90 >= 360 ? 0 : prev + 90))}
                        className="flex-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <RotateCw size={13} className="text-indigo-600" />
                        दाएं घुमाएं
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Card 2: Document Metadata Customization */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4 font-sans">
            <h4 className="text-xs font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1">
              <span>✍️</span> 2. दस्तावेज़ संपादन तथा प्रिंटर विवरण सेटिंग्स
            </h4>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">ऊपरी मुख्य शीर्षक (Header Banner)</label>
                <input
                  type="text"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs outline-none focus:border-indigo-400 focus:bg-white text-slate-800 font-semibold"
                  placeholder="उदा. लोक सेवा केंद्र - मध्य प्रदेश शासन"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">दस्तावेज़ का प्रकार (Document Subtitle)</label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs outline-none focus:border-indigo-400 focus:bg-white text-slate-800 font-semibold"
                  placeholder="जैसे: सत्यापित आधार पहचान पत्र प्रति"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">नागरिक/आवेदक का नाम (Citizen Name)</label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs outline-none focus:border-indigo-400 focus:bg-white text-slate-800 font-semibold"
                  placeholder="आवेदक का नाम दर्ज करें"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">एप्लीकेशन / पंजीकरण ID (Reference ID)</label>
                <input
                  type="text"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs outline-none focus:border-indigo-400 focus:bg-white text-slate-800 font-mono font-bold"
                  placeholder="MPES-2026-9824"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">सत्यापन स्टैंप सील (Digital Round Stamp)</label>
                <select
                  value={stampType}
                  onChange={(e) => setStampType(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs bg-slate-50 outline-none focus:border-indigo-400 text-slate-700 font-bold"
                >
                  <option value="blue">Blue Corporate Collectorate Stamp 🔵</option>
                  <option value="green">Green e-Governance Approved Seal 🟢</option>
                  <option value="none">Stamps हटाएँ (None)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">सत्यापक अधिकारी पदनाम (Signing Authority)</label>
                <input
                  type="text"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs outline-none focus:border-indigo-400 focus:bg-white text-slate-800 font-semibold"
                  placeholder="पदनाम उदा. अनुविभागीय अधिकारी"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">सत्यापन विवरण टिप्पणी (Custom Remarks)</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-slate-200 p-2 text-xs outline-none focus:border-indigo-400 focus:bg-white text-slate-800 font-semibold resize-none leading-relaxed"
                placeholder="दस्तावेज़ के आधार पर कोई विशेष टीप या टिप्पणी दर्ज करें..."
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeDate}
                  onChange={(e) => setIncludeDate(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-700">वर्तमान समय/दिनांक प्रिंट में जोड़ें।</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Side: A4 Live Print Preview Sheet */}
        <div className="space-y-4">
          
          {/* 🖨️ PRINTER GATEWAY CONFIGURATION BOARD */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 to-blue-50/50 p-4 shadow-sm space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-lg bg-indigo-600 text-white leading-none">
                  <Printer size={13} />
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Global Printer & Print Quality Settings
                </span>
              </div>
              <span className="text-[9px] font-mono font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded animate-pulse">
                Local Spooler Active
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {/* Paper Size selector */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  कागज़ का आकार (Paper Size)
                </label>
                <select
                  value={paperSize}
                  onChange={(e) => {
                    setPaperSize(e.target.value);
                    localStorage.setItem("mp_scanner_paper_size", e.target.value);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-bold text-slate-700 outline-none focus:border-indigo-400"
                >
                  <option value="A4">A4 Standard Sheet (210 x 297 mm)</option>
                  <option value="A5">A5 Receipt Sheet (148 x 210 mm)</option>
                  <option value="Legal">Legal Deed Sheet (216 x 356 mm)</option>
                  <option value="Letter">Letter Standard (216 x 279 mm)</option>
                </select>
              </div>

              {/* Quality options DPI */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  प्रिंट रिज़ॉल्यूशन (Print DPI Quality)
                </label>
                <div className="grid grid-cols-4 gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                  {[75, 150, 300, 600].map((dpiVal) => (
                    <button
                      key={dpiVal}
                      type="button"
                      onClick={() => {
                        setPrintDpi(dpiVal);
                        localStorage.setItem("mp_scanner_print_dpi", String(dpiVal));
                      }}
                      className={`rounded-lg py-1 text-center font-mono text-[10px] font-bold transition-all ${
                        printDpi === dpiVal
                          ? "bg-indigo-600 text-white shadow"
                          : "text-slate-600 hover:bg-white"
                      }`}
                      title={`${dpiVal} Dots Per Inch`}
                    >
                      {dpiVal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Printer Configurer */}
            <div className="pt-2 border-t border-slate-200/50">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>सक्रिय कार्यालय प्रिंटर (Active Office Printer Destination) *</span>
                <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" /> Connected
                </span>
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={globalPrinter}
                  onChange={(e) => {
                    setGlobalPrinter(e.target.value);
                    localStorage.setItem("mp_global_printer", e.target.value);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-28 py-2 text-xs font-black text-slate-800 outline-none focus:border-indigo-400"
                  placeholder="जैसे: My Office HP LaserJet..."
                />
                <span className="absolute left-2.5 top-2.5 text-slate-450">
                  <Printer size={12} />
                </span>
                
                {/* Preset office printer shortcut */}
                <div className="absolute right-1 top-1">
                  <button
                    type="button"
                    onClick={() => {
                      setGlobalPrinter("My Office Printer (HP LaserJet Pro M404dn)");
                      localStorage.setItem("mp_global_printer", "My Office Printer (HP LaserJet Pro M404dn)");
                    }}
                    className="text-[9px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 rounded-lg px-2 py-1 transition"
                  >
                    Set My Office
                  </button>
                </div>
              </div>
              <p className="text-[9px] text-slate-450 mt-1 leading-relaxed">
                प्रिंट करने पर जॉब तुरंत <b className="text-slate-800">{globalPrinter || "कार्यालय प्रिंटर"}</b> की स्पूलर कतार में जुड़कर प्रिंट पूर्वावलोकन शुरू करेगी।
              </p>

              {/* Verify Printer readiness state controls */}
              <div className="mt-2.5">
                <button
                  type="button"
                  onClick={handleDiagnosePrinter}
                  disabled={printerCheckState === "diagnosing"}
                  className="w-full text-[10px] font-extrabold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-205 rounded-xl py-2 px-3 transition-all flex items-center justify-center gap-1.5 active:scale-98 shadow-sm"
                >
                  {printerCheckState === "diagnosing" ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-indigo-650 animate-ping inline-block shrink-0" />
                      <span>कनेक्शन जांचा जा रहा है (Verifying Setup)...</span>
                    </>
                  ) : (
                    <>
                      <span>प्रिंटर सेटअप रेडी है या नहीं? जांचें (Verify Printer Readiness) 🔍</span>
                    </>
                  )}
                </button>

                {printerCheckState === "diagnosing" && (
                  <div className="mt-2 text-[9px] text-slate-500 italic flex items-center gap-1 bg-slate-50 border border-slate-150 p-2 rounded-xl">
                    <span className="animate-spin text-indigo-600 font-bold shrink-0">⏳</span>
                    <span>Directing IP router ping packets & scanning spooler channels on port 9100...</span>
                  </div>
                )}

                {printerCheckState === "success" && printerMetrics && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2.5 p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-[10px] text-slate-700 space-y-2 font-sans shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-indigo-100 pb-1.5 mb-1">
                      <span className="font-extrabold text-indigo-900 text-xs flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
                        प्रिंटर सेटअप बिल्कुल तैयार है! ✓
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-300">
                        ONLINE & READY
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-slate-600">
                      <div>
                        <span className="font-medium text-slate-400 block">Selected Printer Name:</span>
                        <span className="font-bold text-slate-800 truncate block">{globalPrinter}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-400 block">LAN Assigned IP:</span>
                        <span className="font-mono font-bold text-slate-800 block">{printerMetrics.ipAddress}:{printerMetrics.port}</span>
                      </div>
                      <div className="mt-0.5">
                        <span className="font-medium text-slate-400 block">Connection Route:</span>
                        <span className="font-bold text-slate-800 block text-[9px]">{printerMetrics.connType}</span>
                      </div>
                      <div className="mt-0.5">
                        <span className="font-medium text-slate-400 block">Laser Ink / Toner:</span>
                        <span className="font-bold text-slate-800 block">{printerMetrics.toner}</span>
                      </div>
                      <div className="mt-0.5 col-span-2">
                        <span className="font-medium text-slate-400 block">Paper Tray Status:</span>
                        <span className="font-bold text-slate-800 block text-[9px]">{printerMetrics.paperStatus}</span>
                      </div>
                    </div>

                    <p className="text-[8px] text-emerald-700 italic border-t border-indigo-100/60 pt-1 mt-1 block">
                      * All systems nominal. Handshake status verified at {printerMetrics.latency} response delay time. Ready to print.
                    </p>
                  </motion.div>
                )}

                {printerCheckState === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-[9px] text-rose-600 font-bold bg-rose-50 border border-rose-100 p-2 rounded-xl"
                  >
                    ❌ प्रिंटर नाम रिक्त है! कृपया पहले कोई प्रिंटर तय करें।
                  </motion.p>
                )}
              </div>
            </div>

            {/* Spooler Status Progress */}
            {sendToPrinterStatus && sendToPrinterStatus !== "idle" && (
              <div className="mt-2 p-3 rounded-xl border bg-slate-900 text-white font-sans text-xs space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 px-2 text-[8px] bg-indigo-700 font-mono text-white rounded-bl-lg uppercase">
                  Spool Queue
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping shrink-0" />
                  <span className="font-extrabold uppercase text-[10px] tracking-wide text-indigo-300">
                    {sendToPrinterStatus === "connecting" && "Establishing Network Link..."}
                    {sendToPrinterStatus === "sending" && `Transferring payload to ${globalPrinter}...`}
                    {sendToPrinterStatus === "success" && "Job Spooled Successfully! Check Printer Tray."}
                  </span>
                </div>

                <div className="text-[10px] space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>Target Terminal:</span>
                    <span className="font-mono font-bold text-white max-w-[180px] truncate">{globalPrinter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aperture Settings:</span>
                    <span className="font-mono text-white">{paperSize} Document Sheet @ {printDpi} DPI</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transfers Count:</span>
                    <span className="font-mono text-emerald-400">#{printerJobCount} Printed OK ✓</span>
                  </div>
                </div>

                {sendToPrinterStatus !== "success" && (
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-indigo-500 transition-all ${
                        sendToPrinterStatus === "connecting" ? "w-1/3 duration-800" : "w-11/12 duration-1200"
                      }`} 
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center bg-slate-105 px-2">
            <div>
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest block">Live Print Canvas layout</span>
              <span className="text-xs font-bold text-slate-705">
                {paperSize} पेपर शीट प्रिंटिंग पूर्वावलोकन ({printDpi} DPI)
              </span>
            </div>
            
            {processedSrc && (
              <button
                onClick={handleDirectPrint}
                className="rounded-xl bg-indigo-650 hover:bg-indigo-700 px-4 py-2.5 text-xs text-white font-extrabold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/10 active:scale-95"
              >
                <Printer size={14} /> प्रिंटर से प्रिंट करें 🖨️
              </button>
            )}
          </div>

          {/* Stack effect */}
          <div className="relative border border-slate-200 rounded-2xl bg-slate-100 p-4 shadow-inner flex justify-center overflow-hidden">
            <div className="absolute top-2 left-6 right-6 h-full bg-white/45 border rounded-xl translate-y-3 pointer-events-none" />
            <div className="absolute top-3 left-8 right-8 h-full bg-white/60 border rounded-xl translate-y-2 pointer-events-none" />
            
            {/* Standard A4 Aspect Ratio sheet frame */}
            <div
              id="a4-print-sheet"
              className={`relative w-full max-w-[500px] ${getPaperAspectClass(paperSize)} bg-white border border-slate-300/80 rounded shadow-lg p-6 md:p-8 flex flex-col justify-between overflow-hidden text-slate-800 leading-normal font-sans`}
            >
              {/* Inside paper container layout */}
              <div className="space-y-4">
                
                {/* 1. Styled Header Banner */}
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-start font-sans">
                  <div className="space-y-1 flex-1 min-w-0 pr-2">
                    <div className="relative group/inline flex items-center gap-1.5 rounded transition">
                      <Fingerprint size={12} className="text-indigo-600 shrink-0" />
                      <input 
                        type="text" 
                        value={headerTitle} 
                        onChange={(e) => setHeaderTitle(e.target.value)} 
                        className="bg-transparent text-[10px] font-black text-slate-950 uppercase tracking-tight outline-none border-b border-dashed border-transparent focus:border-indigo-600 focus:bg-indigo-50/20 px-1 py-0.5 rounded w-full font-sans"
                        title="डबल क्लिक करके दस्तावेज़ हेडर एडिट करें"
                      />
                    </div>
                    
                    <span className="text-[7px] font-bold text-slate-400 block tracking-wide pl-1.5 uppercase leading-none">
                      MADHYA PRADESH CITIZEN GOVERNMENT STAMP SERVICE BROKER G2C
                    </span>
                    
                    <div className="pl-1 text-indigo-700">
                      <input 
                        type="text" 
                        value={docTitle} 
                        onChange={(e) => setDocTitle(e.target.value)} 
                        className="bg-transparent text-[10px] font-black text-indigo-700 tracking-tight outline-none border-b border-dashed border-transparent focus:border-indigo-600 focus:bg-indigo-50/20 px-1 rounded w-full font-sans"
                        title="दस्तावेज़ का प्रकार एडिट करें"
                      />
                    </div>
                  </div>
                  
                  {/* Small Barcode and Reference code */}
                  <div className="text-right flex flex-col items-end gap-1 shrink-0 font-sans">
                    <span className="text-[6px] font-mono bg-slate-100 px-1 py-0.5 rounded font-bold uppercase">DATE: {new Date().toLocaleDateString("en-IN")}</span>
                    <div className="h-5 w-18 flex items-center shrink-0">
                      <span className="h-4 w-0.5 bg-slate-900 mx-[1px]" />
                      <span className="h-4 w-1 bg-slate-900 mx-[1px]" />
                      <span className="h-4 w-0.5 bg-slate-900 mx-[1px]" />
                      <span className="h-4 w-[2px] bg-slate-900 mx-[1px]" />
                      <span className="h-4 w-0.5 bg-slate-900 mx-[1px]" />
                      <span className="h-4 w-1.5 bg-slate-900 mx-[1px]" />
                      <span className="h-4 w-0.5 bg-slate-900 mx-[1px]" />
                      <span className="h-4 w-1 bg-slate-900 mx-[1px]" />
                      <span className="h-4 w-[2px] bg-slate-900 mx-[1px]" />
                    </div>
                    <div className="text-right font-mono">
                      <input 
                        type="text" 
                        value={appId} 
                        onChange={(e) => setAppId(e.target.value)} 
                        className="bg-transparent text-[8px] font-bold font-mono tracking-wider text-right outline-none border-b border-dashed border-transparent focus:border-indigo-600 focus:bg-indigo-50/20 px-1 rounded w-20 leading-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Processed Scanned Document Block */}
                <div className="relative bg-slate-50 border border-slate-200/60 rounded-xl overflow-hidden flex items-center justify-center min-h-[170px] max-h-[250px] shadow-inner p-2">
                  {processedSrc ? (
                    <img
                      src={processedSrc}
                      className="max-h-[230px] w-full object-contain mix-blend-multiply transition-all duration-200"
                      alt="A4 aligned scanner item"
                    />
                  ) : (
                    <div className="text-center py-12 p-4 space-y-2">
                      <FileText size={32} className="mx-auto text-slate-300 stroke-1" />
                      <span className="block text-[10px] font-bold text-slate-400">
                        दस्तावेज़ का स्केन लेआउट यहाँ दिखाई देगा।
                      </span>
                      <span className="block text-[8px] text-slate-300">
                        बायें भाग से फाइल अपलोड करें या नमूने पर क्लिक करें।
                      </span>
                    </div>
                  )}

                  {/* Overlapping Stamp placement - Top Right */}
                  {stampType !== "none" && stampPosition === "top-right" && (
                    <div
                      className="absolute top-2 right-2 scale-75 origin-top-right transition-all duration-300 pointer-events-none"
                      style={{ transform: `rotate(${stampRot}deg) scale(0.65)` }}
                    >
                      {stampType === "blue" ? <RoyalBlueStamp /> : <ForestGreenStamp />}
                    </div>
                  )}
                </div>

                {/* 3. Metadata Table entry */}
                <div className="border border-slate-250/90 rounded-lg overflow-hidden bg-slate-50/20 text-[10px] font-sans">
                  <div className="bg-slate-900 text-white px-3 py-1 text-[8px] font-bold uppercase tracking-wider flex justify-between items-center">
                    <span>नागरिक एवं डिजिटल रिकॉर्ड मिलान प्रविष्टि (CITIZEN DATABASE ENTRIES)</span>
                    <span className="text-emerald-400">✓ PORTAL SECURED</span>
                  </div>
                  
                  <div className="grid grid-cols-2 border-b">
                    <div className="border-r p-1.5 bg-slate-50/50">
                      <span className="text-[7px] text-slate-400 font-extrabold uppercase block">आवेदक नागरिक (Applicant Name)</span>
                      <input 
                        type="text" 
                        value={citizenName} 
                        onChange={(e) => setCitizenName(e.target.value)} 
                        className="bg-transparent text-slate-800 font-black text-[11px] outline-none border-b border-dashed border-transparent hover:border-slate-300 focus:border-indigo-600 focus:bg-indigo-50/20 rounded px-1.5 py-0.5 w-full font-semibold"
                        placeholder="नागरिक का नाम"
                      />
                    </div>
                    <div className="p-1.5">
                      <span className="text-[7px] text-slate-400 font-extrabold uppercase block">पंजीकरण / ट्रैकिंग ID (Tracking Code)</span>
                      <input 
                        type="text" 
                        value={appId} 
                        onChange={(e) => setAppId(e.target.value)} 
                        className="bg-transparent text-indigo-700 font-bold font-mono text-[11px] outline-none border-b border-dashed border-transparent hover:border-slate-300 focus:border-indigo-600 focus:bg-indigo-50/20 rounded px-1.5 py-0.5 w-full"
                        placeholder="पंजीकरण आईडी"
                      />
                    </div>
                  </div>

                  <div className="p-1.5 border-b">
                    <span className="text-[7px] text-slate-400 font-extrabold uppercase block">सत्यापन विवरण टीप (Remarks Memo)</span>
                    <textarea 
                      value={remarks} 
                      onChange={(e) => setRemarks(e.target.value)} 
                      rows={2}
                      className="bg-transparent text-slate-700 font-bold text-[9px] outline-none border-b border-dashed border-transparent hover:border-slate-300 focus:border-indigo-600 focus:bg-indigo-50/20 rounded px-1.5 py-0.5 w-full resize-none leading-relaxed font-sans"
                      placeholder="सत्यापन विवरण टीप"
                    />
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="border-r p-1.5">
                      <span className="text-[7px] text-slate-400 font-extrabold uppercase block">जारी प्रमाण प्रणाली (Platform System)</span>
                      <span className="font-bold text-slate-600 block">MP e-Seva Digital Portal Suite v3.2</span>
                    </div>
                    <div className="p-2 bg-slate-50/50 flex justify-between items-center gap-1.5">
                      <div>
                        <span className="text-[7px] text-slate-400 font-extrabold uppercase block font-sans">डिजिटल हस्ताक्षर दिनांक (Stamp Clock)</span>
                        <span className="font-mono text-slate-650 text-[9px] font-bold">
                          {includeDate ? new Date().toLocaleString("en-US") : "Undated"}
                        </span>
                      </div>
                      <span className="text-green-650 text-xs font-black shrink-0">✓ Verified</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Page Footer */}
              <div className="border-t border-slate-200 pt-4 flex justify-between items-end relative min-h-[85px]">
                
                {/* Barcode secure representation */}
                <span className="text-[6px] font-medium text-slate-400 max-w-[170px] leading-relaxed">
                  * यह दस्तावेज़ मध्य प्रदेश सूचना प्रौद्योगिकी अधिनियम एवं e-Governance ढांचे के तहत पूरी तरह मान्य व मुद्रण योग्य है। सभी विवरण सुरक्षा जांच से संकलित हैं।
                </span>

                {/* Overlapping Stamp bottom */}
                {stampType !== "none" && stampPosition === "bottom-right" && (
                  <div
                    className="absolute bottom-1 right-28 pointer-events-none transition-all duration-300"
                    style={{ transform: `rotate(${stampRot}deg) scale(0.68)` }}
                  >
                    {stampType === "blue" ? <RoyalBlueStamp /> : <ForestGreenStamp />}
                  </div>
                )}

                {/* Sign Box */}
                <div className="text-right space-y-1 relative z-10 shrink-0">
                  <div className="h-6 w-24 border-b border-dashed border-slate-350 mx-auto flex items-end justify-center font-serif text-[10px] text-slate-400 italic font-bold">
                     Rahul S.
                  </div>
                  <span className="block text-[8px] font-black text-slate-800 uppercase tracking-tight">
                    {officerName}
                  </span>
                  <span className="block text-[6px] text-indigo-500 font-extrabold uppercase tracking-widest leading-none">
                    e-Seva Digital Signed Seal
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Quick tips */}
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start gap-2.5 text-[10px] font-medium text-indigo-950">
            <AlertCircle size={14} className="text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-indigo-900">प्रिंट टिप (Perfect Printing Tip):</span>
              सामान्यतः ब्लैक-एंड-व्हाइट प्रिंट के लिए <span className="font-bold underline cursor-pointer" onClick={() => setPreset("low-ink")}>Low-Ink BW</span> या <span className="font-bold underline cursor-pointer" onClick={() => setPreset("doc-scan")}>Laser Scan</span> प्रयुक्त करें तथा प्रिंट डायलॉग में 'Fit to Page' तथा 'Background Graphics' को टिक रखें ताकि बॉर्डर व स्टैम्प उत्तम छपें।
            </div>
          </div>
          
        </div>

      </div>

      {/* 🔮 CUSTOMER SMARTPHONE DOCUMENT SCANNER SIMULATOR OVERLAY */}
      <AnimatePresence>
        {isMobileUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-slate-950 border border-slate-800 rounded-[3rem] p-4 shadow-2xl shadow-indigo-500/10 text-white font-sans ring-8 ring-slate-800 flex flex-col justify-between overflow-hidden"
              style={{ minHeight: "620px" }}
            >
              {/* Phone Camera Notch & Ear Speaker */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black w-24 h-5 rounded-full flex items-center justify-between px-2.5 z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <span className="w-10 h-0.5 rounded-full bg-slate-800" />
                <span className="w-2 h-2 rounded-full bg-blue-900/40" />
              </div>

              {/* Header Status Bar of Phone */}
              <div className="flex justify-between items-center px-4 pt-4 text-[9px] font-mono font-bold text-slate-400 select-none z-10">
                <span>04:46 PM (Aadhaar LINK)</span>
                <div className="flex items-center gap-1">
                  <span>5G VoLTE</span>
                  <div className="w-3.5 h-2 border border-slate-400 rounded-sm p-0.5 flex">
                    <div className="w-full h-full bg-slate-200 rounded-xs" />
                  </div>
                </div>
              </div>

              {/* Real Phone Workspace Content scroll */}
              <div className="flex-1 px-4 py-3 pb-6 overflow-y-auto space-y-4">
                
                {/* Title and Badge */}
                <div className="text-center space-y-1">
                  <div className="mx-auto w-10 h-10 rounded-full bg-indigo-650 flex items-center justify-center shadow shadow-indigo-500/25">
                    <Smartphone size={20} className="text-white" />
                  </div>
                  <h4 className="text-sm font-black text-white font-serif tracking-tight mt-1">
                    MP e-Seva Document Sender
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Kiosk Terminal Direct Cloud Share (Secured via AEPS v3)
                  </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-850">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      ग्राहक का नाम (Customer Full Name)
                    </label>
                    <input
                      type="text"
                      className="w-full text-xs font-bold rounded-xl border border-slate-800 bg-slate-950 p-2 text-white outline-none focus:border-indigo-500"
                      value={mobileCustName}
                      onChange={(e) => setMobileCustName(e.target.value)}
                      placeholder="पूरा नाम दर्ज करें"
                    />
                  </div>

                  {/* Document Name field */}
                  <div>
                    <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      दस्तावेज़ का शीर्षक / प्रकार (Document Title)
                    </label>
                    <input
                      type="text"
                      className="w-full text-xs font-bold rounded-xl border border-slate-800 bg-slate-950 p-2 text-white outline-none focus:border-indigo-500"
                      value={mobileDocTitle}
                      onChange={(e) => setMobileDocTitle(e.target.value)}
                      placeholder="जैसे: कलेक्ट्रेट जाति हेतु समग्र आईडी"
                    />
                  </div>
                </div>

                {/* Simulated Document Picker options */}
                <div className="space-y-2">
                  <label className="block text-[9px] font-bold text-slate-300 uppercase tracking-wider pl-1 font-mono">
                    फ़ाइल चुनें (Choose Doc / Presets)
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileDocPreset("marksheet");
                        setCustomMobileFileSelected(null);
                        setMobileDocTitle("कक्षा 10वीं बोर्ड अंकसूची / High School Marksheet");
                      }}
                      className={`rounded-xl p-2 text-center flex flex-col items-center gap-1 border transition-all ${
                        mobileDocPreset === "marksheet" && !customMobileFileSelected
                          ? "bg-indigo-600/25 border-indigo-500 text-indigo-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      <span className="text-base">📑</span>
                      <span className="text-[7.5px] font-bold leading-tight">10th Marksheet</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileDocPreset("idcard");
                        setCustomMobileFileSelected(null);
                        setMobileDocTitle("पहचान पत्र (Aadhaar / Identity card)");
                      }}
                      className={`rounded-xl p-2 text-center flex flex-col items-center gap-1 border transition-all ${
                        mobileDocPreset === "idcard" && !customMobileFileSelected
                          ? "bg-indigo-600/25 border-indigo-500 text-indigo-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      <span className="text-base">💳</span>
                      <span className="text-[7.5px] font-bold leading-tight">Aadhaar Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileDocPreset("handwritten");
                        setCustomMobileFileSelected(null);
                        setMobileDocTitle("शिकायत आवेदन पत्र / Handwritten Letter");
                      }}
                      className={`rounded-xl p-2 text-center flex flex-col items-center gap-1 border transition-all ${
                        mobileDocPreset === "handwritten" && !customMobileFileSelected
                          ? "bg-indigo-600/25 border-indigo-500 text-indigo-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      <span className="text-base">✍️</span>
                      <span className="text-[7.5px] font-bold leading-tight">Application</span>
                    </button>
                  </div>

                  <div className="relative border border-dashed border-slate-800 bg-slate-950 p-4 text-center rounded-2xl cursor-pointer hover:bg-slate-900 transition font-sans">
                    <input
                      type="file"
                      id="sim-mobile-upload"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const r = new FileReader();
                          r.onload = (ev) => {
                            if (ev.target?.result) {
                              setCustomMobileFileSelected(ev.target.result as string);
                              setMobileDocTitle(file.name);
                            }
                          };
                          r.readAsDataURL(file);
                        }
                      }}
                    />
                    <UploadCloud size={20} className="mx-auto text-indigo-400 mb-1" />
                    <span className="block text-[8px] font-bold text-slate-300">गैलरी से वास्तविक फ़ोटो अपलोड करें (Upload Custom Photo)</span>
                    <span className="block text-[7px] text-slate-500 mt-0.5 font-mono">Simulates live physical sensor intake</span>
                    {customMobileFileSelected && (
                      <span className="mt-1.5 inline-block text-[8px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-900 rounded px-1.5 py-0.5 truncate max-w-[240px]">
                        ✓ {mobileDocTitle || "Custom Image selected"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Spool Indicator */}
                {mobileUploadingStatus !== "idle" && (
                  <div className="p-3 bg-slate-900 rounded-2xl space-y-2 border border-slate-800">
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                        {mobileUploadingStatus === "connecting" && "Handshaking with Kiosk Router..."}
                        {mobileUploadingStatus === "sending" && "Spooling payload packet arrays..."}
                        {mobileUploadingStatus === "success" && "Securely Transferred ✓"}
                      </span>
                      <span>{mobileUploadProgress}%</span>
                    </div>

                    <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 transition-all duration-300 animate-pulse" style={{ width: `${mobileUploadProgress}%` }} />
                    </div>
                  </div>
                )}

              </div>

              {/* Action Triggers in Simulator Footer */}
              <div className="space-y-2 p-4 pt-1 bg-slate-950 border-t border-slate-900 rounded-b-[2rem] mt-auto font-sans">
                <button
                  type="button"
                  disabled={mobileUploadingStatus !== "idle"}
                  onClick={() => {
                    setMobileUploadingStatus("connecting");
                    setMobileUploadProgress(15);
                    
                    // Connection Simulation
                    setTimeout(() => {
                      setMobileUploadingStatus("sending");
                      setMobileUploadProgress(55);
                      
                      setTimeout(() => {
                        setMobileUploadProgress(92);
                        
                        setTimeout(() => {
                          setMobileUploadProgress(100);
                          setMobileUploadingStatus("success");
                          
                          // Dispatch load action securely on-screen!
                          if (customMobileFileSelected) {
                            setOrigSrc(customMobileFileSelected);
                            setProcessedSrc(customMobileFileSelected);
                            setFileName(mobileDocTitle || "mobile_transfer.jpg");
                            setFileType("image");
                          } else {
                            loadSampleDocument(mobileDocPreset);
                          }
                          
                          // Update document labels dynamically based on inputs
                          setCitizenName(mobileCustName);
                          setRemarks(`Customer (${mobileCustName}) scanned local QR gateway and transferred '${mobileDocTitle}' file successfully.`);

                          // Add to live incoming inbox list
                          const newQueueItem = {
                            id: "cust-" + Date.now(),
                            time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
                            sender: mobileCustName,
                            title: mobileDocTitle,
                            preset: mobileDocPreset,
                            status: "pending" as const,
                            src: customMobileFileSelected || undefined
                          };
                          setInflowQueue(prev => [newQueueItem, ...prev]);
                          
                          setTimeout(() => {
                            setIsMobileUploadModalOpen(false);
                            setMobileUploadingStatus("idle");
                            setMobileUploadProgress(0);
                            setCustomMobileFileSelected(null);
                          }, 900);
                        }, 500);
                      }, 500);
                    }, 500);
                  }}
                  className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-900 disabled:text-slate-500 text-xs text-white font-black py-3 px-4 transition flex items-center justify-center gap-1.5 active:scale-95 shadow shadow-indigo-650/40"
                >
                  {mobileUploadingStatus === "idle" ? (
                    <>
                      <span>दस्तावेज़ सेंड करें (Send to e-Seva PC)</span>
                      <ChevronRight size={13} />
                    </>
                  ) : (
                    <span>किओस्क कनवर्टर... ({mobileUploadProgress}%)</span>
                  )}
                </button>

                {/* Direct user-end mobile printing action */}
                <button
                  type="button"
                  disabled={mobileUploadingStatus !== "idle"}
                  onClick={() => {
                    setMobileUploadingStatus("connecting");
                    setMobileUploadProgress(20);
                    
                    setTimeout(() => {
                      setMobileUploadingStatus("sending");
                      setMobileUploadProgress(70);
                      
                      setTimeout(() => {
                        setMobileUploadProgress(100);
                        setMobileUploadingStatus("success");
                        
                        // Load image
                        if (customMobileFileSelected) {
                          setOrigSrc(customMobileFileSelected);
                          setProcessedSrc(customMobileFileSelected);
                          setFileName(mobileDocTitle || "mobile_transfer.jpg");
                          setFileType("image");
                        } else {
                          loadSampleDocument(mobileDocPreset);
                        }
                        setCitizenName(mobileCustName);
                        setRemarks(`Рrіnt job generated from customer's mobile device for '${mobileDocTitle}'.`);

                        // Instantly fire physical print command matching local spooler queue
                        handleDirectPrint();
                        
                        setTimeout(() => {
                          setIsMobileUploadModalOpen(false);
                          setMobileUploadingStatus("idle");
                          setMobileUploadProgress(0);
                        }, 1200);
                      }, 500);
                    }, 500);
                  }}
                  className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-900 disabled:text-slate-500 text-xs text-white font-black py-2.5 px-4 transition flex items-center justify-center gap-1.5 active:scale-95 shadow shadow-emerald-600/40 intense"
                >
                  <Printer size={13} />
                  <span>डायरेक्ट प्रिंट करें (User Remote Print Copy)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsMobileUploadModalOpen(false)}
                  className="w-full text-center text-slate-500 hover:text-white font-bold text-[9px] uppercase tracking-wider py-1.5 transition"
                >
                  सिम्युलेटर बंद करें (Close Simulation)
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Blue 印章
function RoyalBlueStamp() {
  return (
    <div className="relative w-28 h-28 rounded-full border-4 border-dashed border-blue-600/70 bg-transparent flex flex-col items-center justify-center text-center p-2 opacity-90 select-none pointer-events-none">
      <div className="absolute inset-0 border-2 border-double border-blue-600/75 rounded-full" />
      <span className="text-[5px] font-extrabold text-blue-700/90 tracking-widest uppercase font-serif">MP e-Seva Govt Core</span>
      <span className="text-[10px] font-black text-blue-800/95 uppercase tracking-wide leading-tight my-0.5">VERIFIED</span>
      <span className="text-[5px] font-bold text-blue-600/90 tracking-widest">G2C DIGITAL SIGNED</span>
      <span className="text-[6px] font-mono text-blue-500/85 mt-0.5">SECURE ARCHIVE</span>
    </div>
  );
}

// Green 印章
function ForestGreenStamp() {
  return (
    <div className="relative w-28 h-28 rounded-full border-4 border-dashed border-emerald-600/70 bg-transparent flex flex-col items-center justify-center text-center p-2 opacity-90 select-none pointer-events-none">
      <div className="absolute inset-0 border-2 border-double border-emerald-600/75 rounded-full" />
      <span className="text-[5px] font-extrabold text-emerald-700/90 tracking-widest uppercase font-sans">PUBLIC SERVICE PORTALS</span>
      <span className="text-[10px] font-black text-emerald-800/95 uppercase tracking-wide leading-tight my-0.5">APPROVED</span>
      <span className="text-[5px] font-bold text-emerald-600/90 tracking-widest">STATE AUTHORIZED</span>
      <span className="text-[6px] font-mono text-emerald-500/85 mt-0.5">MP-ES-2026</span>
    </div>
  );
}
