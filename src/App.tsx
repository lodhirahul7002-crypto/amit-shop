import React, { useState } from "react";
import {
  Bell,
  Languages,
  Sparkles,
  Scissors,
  Bookmark,
  Smartphone,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Check,
  User,
  Heart,
  ExternalLink,
  BookOpen,
  Menu,
  X,
  FileText,
  Coins,
  Briefcase,
  Layers,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import EsSevaPortal from "./components/EsSevaPortal";
import MultiToolSuite from "./components/MultiToolSuite";
import { AppView } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<AppView>("eseva");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<"Hindi" | "English">("English");

  // 📂 Dropdown Menu state & mobile triggers
  const [activeDropdown, setActiveDropdown] = useState<"eseva" | "tools" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileEsevaOpen, setMobileEsevaOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpSent) {
      if (phoneNumber.length === 10) {
        setIsOtpSent(true);
      } else {
        alert("कृपया Valid 10-अंकीय मोबाइल नंबर दर्ज़ करें।");
      }
    } else {
      if (otpValue.length === 4) {
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
        setIsOtpSent(false);
      } else {
        alert("कृपया सही 4-अंकीय OTP दर्ज़ करें।");
      }
    }
  };

  // Helper navigating dynamically to e-Seva sections
  const navigateToEsevaSection = (sectionId: string) => {
    setActiveTab("eseva");
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-4", "ring-indigo-500/20", "transition-all", "duration-1000");
        setTimeout(() => {
          el.classList.remove("ring-4", "ring-indigo-500/20");
        }, 3000);
      }
    }, 250);
  };

  // Helper navigating dynamically to specific tools inside MultiToolSuite
  const navigateToMultiTool = (toolId: string) => {
    setActiveTab("multitool");
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("set-active-tool", { detail: { toolId } }));
      const el = document.getElementById("multitool-dashboard");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-850 font-sans flex flex-col justify-between">
      
      {/* 1. Header Shell */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
          
          {/* Brand Logo & Meta */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => { setActiveTab("eseva"); setIsMobileMenuOpen(false); }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-black text-white shadow-md shadow-indigo-600/20 tracking-wider cursor-pointer transform hover:scale-[1.03] transition"
            >
              MP
            </div>
            <div>
              <h1 
                onClick={() => { setActiveTab("eseva"); }}
                className="text-base font-extrabold leading-tight text-slate-950 flex items-center gap-1.5 cursor-pointer hover:text-indigo-650 transition"
              >
                MP e-Seva <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold tracking-wide">v3.2</span>
              </h1>
              <p className="text-[10px] text-slate-405 font-semibold tracking-wide">
                Digital Services • Govt Jobs • MultiTool Pro Suite
              </p>
            </div>
          </div>

          {/* 💻 DESKTOP MIDDLE NAVIGATION WITH DROPDOWNS */}
          <nav className="hidden lg:flex items-center gap-1 font-sans">
            
            {/* Nav Option: Home Portal */}
            <button
              type="button"
              onClick={() => { setActiveTab("eseva"); setActiveDropdown(null); }}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition ${
                activeTab === "eseva" && !activeDropdown
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              मुख्य पोर्टल (Home)
            </button>

            {/* Dropdown: e-Seva digital categories */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("eseva")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                  activeDropdown === "eseva" || (activeTab === "eseva" && activeDropdown === null)
                    ? "bg-indigo-50/50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span>ई-सेवा डिजिटल सर्विसेज</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === "eseva" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "eseva" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 bg-white border border-slate-150/80 rounded-2xl p-4 shadow-xl mt-1 z-50 space-y-3 font-sans"
                  >
                    <div className="border-b border-slate-100 pb-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        नागरिक डिजिटल सेवाएं व केल्कुलेटर
                      </span>
                    </div>

                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => navigateToEsevaSection("services-list")}
                        className="w-full text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5 groups"
                      >
                        <span className="p-1 px-1.5 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-xs mt-0.5 shrink-0">
                          📜
                        </span>
                        <div>
                          <span className="block text-xs font-bold text-slate-800">कियोस्क डिजिटल सेवाएं</span>
                          <span className="block text-[10px] text-slate-450 mt-0.5">जाति, आय, मूल निवासी और राजस्व आवेदन पत्र</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateToEsevaSection("jobs-list")}
                        className="w-full text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5 groups"
                      >
                        <span className="p-1 px-1.5 rounded-lg bg-teal-50 text-teal-600 font-bold text-xs mt-0.5 shrink-0">
                          💼
                        </span>
                        <div>
                          <span className="block text-xs font-bold text-slate-800">नवीनतम सरकारी भर्तियां</span>
                          <span className="block text-[10px] text-slate-450 mt-0.5">Sarkari Naukri, एडमिट कार्ड, परीक्षा परिणाम</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateToEsevaSection("aeps-banking-portal")}
                        className="w-full text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5 groups"
                      >
                        <span className="p-1 px-1.5 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs mt-0.5 shrink-0">
                          💳
                        </span>
                        <div>
                          <span className="block text-xs font-bold text-slate-800">आधार नगद निकासी (AePS)</span>
                          <span className="block text-[10px] text-slate-450 mt-0.5">Direct AEPS विथड्रॉल कमीशन दर व बैंक सेवा</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateToEsevaSection("kiosk-rate-card-hub")}
                        className="w-full text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5 groups"
                      >
                        <span className="p-1 px-1.5 rounded-lg bg-purple-50 text-purple-600 font-bold text-xs mt-0.5 shrink-0">
                          🪙
                        </span>
                        <div>
                          <span className="block text-xs font-bold text-slate-800">सर्विस शुल्क व कमीशन केल्कुलेटर</span>
                          <span className="block text-[10px] text-slate-450 mt-0.5">विभिन्न प्रमाण पत्रों का सरकारी चार्ज कैलकुलेट करें</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateToEsevaSection("bookmark-websites-hub")}
                        className="w-full text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5 groups"
                      >
                        <span className="p-1 px-1.5 rounded-lg bg-amber-50 text-amber-600 font-bold text-xs mt-0.5 shrink-0">
                          🔗
                        </span>
                        <div>
                          <span className="block text-xs font-bold text-slate-800">महत्वपूर्ण सरकारी वेबसाइट कड़ियाँ</span>
                          <span className="block text-[10px] text-slate-450 mt-0.5">समग्र, भूलेख, राशन कार्ड डायरेक्ट सर्वर लिंक</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown: Pro Multi-Webtools */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("tools")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                  activeDropdown === "tools" || activeTab === "multitool"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-55/70 hover:text-slate-950"
                }`}
              >
                <span>मल्टी-वेब टूल्स प्रो</span>
                <span className="bg-red-500 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-md leading-none animate-pulse">
                  FAST
                </span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === "tools" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "tools" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 w-96 bg-white border border-slate-150/80 rounded-2xl p-4 shadow-xl mt-1 z-50 grid grid-cols-2 gap-2 font-sans"
                  >
                    <div className="col-span-2 border-b border-slate-100 pb-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        तत्काल एसेट प्रोसेसिंग टूल्स
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("doc-scanner")}
                      className="text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5"
                    >
                      <span className="text-sm mt-0.5">🖨️</span>
                      <div>
                        <span className="block text-xs font-bold text-slate-850">दस्तावेज़ स्कैनर</span>
                        <span className="block text-[9px] text-slate-450">A4 ब्राइटनेस प्रिंटर</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("passport-photo")}
                      className="text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5"
                    >
                      <span className="text-sm mt-0.5">📸</span>
                      <div>
                        <span className="block text-xs font-bold text-slate-850">पासपोर्ट फोटो</span>
                        <span className="block text-[9px] text-slate-450">Grid Creator 2x2"</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("bg-remove")}
                      className="text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5"
                    >
                      <span className="text-sm mt-0.5">✂️</span>
                      <div>
                        <span className="block text-xs font-bold text-slate-850">बैकग्राउंड रिमूवर</span>
                        <span className="block text-[9px] text-slate-450">रंग और ग्रेडिएंट बदलें</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("doc-converts")}
                      className="text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5"
                    >
                      <span className="text-sm mt-0.5">📂</span>
                      <div>
                        <span className="block text-xs font-bold text-slate-850">PDF ⇄ Word</span>
                        <span className="block text-[9px] text-slate-450">दस्तावेज़ कनवर्टर</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("img-compress")}
                      className="text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5"
                    >
                      <span className="text-sm mt-0.5">📉</span>
                      <div>
                        <span className="block text-xs font-bold text-slate-850">इमेज कंप्रेसर</span>
                        <span className="block text-[9px] text-slate-450">MB/KB साइज कम करें</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("translate-tts")}
                      className="text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5"
                    >
                      <span className="text-sm mt-0.5">🗣️</span>
                      <div>
                        <span className="block text-xs font-bold text-slate-850">ट्रांसलेटर व वाक्</span>
                        <span className="block text-[9px] text-slate-450">स्पीच सिंथेसाइजर</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("photo-enhance")}
                      className="text-left p-2 hover:bg-indigo-50/50 rounded-xl transition flex items-start gap-2.5 col-span-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100"
                    >
                      <span className="text-sm mt-0.5">🎨</span>
                      <div>
                        <span className="block text-xs font-bold text-amber-900">अंकसूची व सील संवर्धक (Enhancer)</span>
                        <span className="block text-[9px] text-amber-700">लो-क्वालिटी फोटो को एचडी और ब्राइट फिल्टर में लाइव बदलें</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* RIGHT SIDE HEAD ACTIONS */}
          <div className="flex items-center gap-2">
            
            {/* Language Switcher */}
            <button
              onClick={() => setCurrentLanguage(currentLanguage === "English" ? "Hindi" : "English")}
              className="rounded-xl border border-slate-100 bg-slate-55 bg-slate-50 hover:bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition flex items-center gap-1.5"
            >
              <Languages size={13} className="text-slate-550" />
              <span className="hidden sm:inline">{currentLanguage}</span>
            </button>

            {/* Notifications Info */}
            <button className="rounded-xl border border-slate-100 p-2 text-slate-550 bg-slate-50 hover:bg-slate-100 hover:text-slate-800 transition relative">
              <Bell size={15} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* Login Badge */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2 rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <span className="text-xs font-bold text-indigo-700 truncate max-w-[100px]">Rahul S.</span>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4.5 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-indigo-600/10 leading-none"
              >
                Login / OTP
              </button>
            )}

            {/* 📱 MOBILE NAVIGATION TRIGGER TOGGLE */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden rounded-xl border border-slate-100 p-2 text-slate-700 hover:bg-slate-100 transition"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* 📱 MOBILE RESPONSIVE EXPANDED DROPDOWN PANEL */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white overflow-hidden px-4 py-3 space-y-4 font-sans"
            >
              {/* Category 1: Home Portal */}
              <button
                type="button"
                onClick={() => { setActiveTab("eseva"); setIsMobileMenuOpen(false); }}
                className="w-full text-left font-bold text-xs p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl transition flex items-center justify-between"
              >
                <span>🚀 मुख्य पोर्टल पर जाएँ (Home Portal)</span>
                <ChevronRight size={14} />
              </button>

              {/* Category 2: e-Seva Digital collapsible */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setMobileEsevaOpen(!mobileEsevaOpen)}
                  className="w-full text-left font-extrabold text-[11px] text-slate-405 uppercase tracking-wider p-1.5 flex items-center justify-between border-b border-slate-50"
                >
                  <span>📂 नागरिक डिजिटल सेवाएं ({mobileEsevaOpen ? "बंद करें" : "खोलें"})</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${mobileEsevaOpen ? "rotate-180" : ""}`} />
                </button>

                {mobileEsevaOpen && (
                  <div className="pl-2 space-y-1 bg-slate-50/50 rounded-xl p-2">
                    <button
                      type="button"
                      onClick={() => navigateToEsevaSection("services-list")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>📜</span>
                      <span>कियोस्क डिजिटल सेवाएं (जाति/मूल निवासी)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToEsevaSection("jobs-list")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>💼</span>
                      <span>नवीनतम सरकारी भर्तियां & रिजल्ट</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToEsevaSection("aeps-banking-portal")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>💳</span>
                      <span>आधार नगद निकासी (AePS कमीशन)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToEsevaSection("kiosk-rate-card-hub")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>🪙</span>
                      <span>शुल्क एवं कमीशन दर केल्कुलेटर</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToEsevaSection("bookmark-websites-hub")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>🔗</span>
                      <span>महत्वपूर्ण शासकीय वेबसाइट्स</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Category 3: Multi-webtools Pro collapsible */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                  className="w-full text-left font-extrabold text-[11px] text-slate-405 uppercase tracking-wider p-1.5 flex items-center justify-between border-b border-slate-50"
                >
                  <span className="flex items-center gap-1">
                    🔨 तत्काल एसेट प्रोसेसिंग वेब-टूल्स
                    <span className="bg-red-500 text-[8px] font-bold text-white px-1 rounded">HOT</span>
                  </span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`} />
                </button>

                {mobileToolsOpen && (
                  <div className="pl-2 space-y-1 bg-indigo-50/20 rounded-xl p-2 border border-indigo-50">
                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("doc-scanner")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>🖨️</span>
                      <span>दस्तावेज़ स्कैनर & डायरेक्ट प्रिंटर</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("passport-photo")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>📸</span>
                      <span>पासपोर्ट फोटो शीट क्रिएटर (2x2")</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("bg-remove")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>✂️</span>
                      <span>फोटो बैकग्राउंड रिमूवर इरेज़र</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("doc-converts")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>📂</span>
                      <span>पीडीएफ ⇄ वर्ड दस्तावेज़ कनवर्टर</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("img-compress")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>📉</span>
                      <span>फ़ोटो KB साइज डिक्रीसर कनवर्टर</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("translate-tts")}
                      className="w-full text-left text-xs font-bold p-2 text-slate-750 hover:text-indigo-650 flex items-center gap-2"
                    >
                      <span>🗣️</span>
                      <span>बहुभाषी ट्रांसलेटर व वाक्</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToMultiTool("photo-enhance")}
                      className="w-full text-left text-xs font-bold p-2 text-amber-800 hover:text-amber-900 flex items-center gap-2 bg-amber-50 rounded-lg"
                    >
                      <span>🎨</span>
                      <span>अंकसूची व सील संवर्धक (HD filters)</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Main Workbench Shell */}
      <main className="mx-auto max-w-7xl px-4 py-6 w-full flex-1 space-y-6">
        
        {/* Unified Tab Switching - Separating e-Seva and the brand new MultiTool Pro suite requested */}
        <div className="flex gap-2 rounded-2xl bg-white border border-slate-100 p-2 shadow-sm" id="main-portal-tab-switch">
          <button
            onClick={() => setActiveTab("eseva")}
            id="tab-eseva-link"
            className={`flex-1 flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-6 text-sm font-bold tracking-wide transition-all ${
              activeTab === "eseva"
                ? "bg-slate-900 text-white shadow-lg"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Bookmark size={15} />
            MP e-Seva Services Portal
          </button>
          
          <button
            onClick={() => setActiveTab("multitool")}
            id="tab-multitool-link"
            className={`flex-1 flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-6 text-sm font-bold tracking-wide transition-all ${
              activeTab === "multitool"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Scissors size={15} />
            MultiTool Pro Creative Suite
            <span className="rounded-full bg-red-500 text-[9px] font-black tracking-normal text-white px-2 py-0.5 animate-pulse">
              NEW
            </span>
          </button>
        </div>

        {/* Portals presentation with smooth animation shifts */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {activeTab === "eseva" ? <EsSevaPortal /> : <MultiToolSuite />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer Shell */}
      <footer className="border-t border-slate-100 bg-white py-12 mt-12 text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                MP
              </div>
              <span className="font-extrabold text-slate-900 text-sm">MP e-Seva & MultiTool</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-450">
              Madhya Pradesh Govt approved e-governance service broker integrated with offline edge-processing passport creators and document converter models.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-3 uppercase tracking-wider text-[10px]">e-Gov Operations</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-slate-800">Caste Certificates (जाति प्रमाण)</a></li>
              <li><a href="#" className="hover:text-slate-800">Revenue Records</a></li>
              <li><a href="#" className="hover:text-slate-800">Municipal Connections</a></li>
              <li><a href="#" className="hover:text-slate-800">Govt Recruitment Boards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-3 uppercase tracking-wider text-[10px]">MultiTool Suite</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-slate-800">Passport Photo grid</a></li>
              <li><a href="#" className="hover:text-slate-800">Background Eraser</a></li>
              <li><a href="#" className="hover:text-slate-800">Document Compressors</a></li>
              <li><a href="#" className="hover:text-slate-800">Translators</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-3 uppercase tracking-wider text-[10px]">Secure Gateway</h4>
            <p className="text-[11px] leading-relaxed text-slate-450 mb-3">
              Encrypted biometric OTP check and direct UPI receipt disbursements.
            </p>
            <div className="flex gap-2 items-center text-slate-800 font-bold bg-slate-50 rounded-xl px-4 py-2 border w-max">
              <ShieldCheck size={14} className="text-green-650" />
              <span>SSL SECURED</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-8 mt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between gap-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          <span>© 2026 MP e-Seva Digital Infrastructure Services Limited.</span>
          <div className="flex gap-4 flex-wrap">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms & Conditions</a>
            <a href="#" className="hover:text-slate-600">Grievance Cell</a>
          </div>
        </div>
      </footer>

      {/* Login OTP Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 overflow-hidden relative"
          >
            <div className="flex justify-between items-start border-b border-slate-50 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Sign in with OTP</h3>
                <p className="text-[10px] text-slate-400">Verifying citizens via Samagra/Aadhaar linked numbers.</p>
              </div>
              <button
                onClick={() => { setIsLoginModalOpen(false); setIsOtpSent(false); }}
                className="rounded-full hover:bg-slate-100 p-1.5 text-slate-400 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {!isOtpSent ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                  <div className="flex rounded-xl border bg-slate-50 px-3 py-2 items-center gap-1 focus-within:border-indigo-400 focus-within:bg-white transition">
                    <span className="text-xs text-slate-400 font-bold">+91</span>
                    <input
                      required
                      type="tel"
                      maxLength={10}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                      className="bg-transparent w-full outline-none text-xs text-slate-800 font-semibold"
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Enter 4-digit OTP</label>
                  <input
                    required
                    type="password"
                    maxLength={4}
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-center text-sm font-bold tracking-widest outline-none focus:border-indigo-400 focus:bg-white transition"
                    placeholder="XXXX"
                  />
                  <p className="text-[9px] text-indigo-650 mt-1.5 font-bold cursor-pointer hover:underline" onClick={() => setIsOtpSent(false)}>← Change Phone Number</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-md shadow-indigo-600/15"
              >
                {isOtpSent ? "Verify OTP & Secure Login" : "Send Biometric One-Time PIN"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
