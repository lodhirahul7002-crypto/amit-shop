import React, { useState, useEffect } from "react";
import {
  Bell,
  Languages,
  Sparkles,
  ShieldCheck,
  User,
  ExternalLink,
  BookOpen,
  Menu,
  X,
  FileText,
  Briefcase,
  Layers,
  Globe2,
  Printer,
  Search,
  CheckCircle2,
  Database,
  Radio,
  Clock,
  Send,
  HelpCircle,
  Home,
  Bookmark,
  Coins,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import Custom Pages
import HomeDashboardPage from "./components/HomeDashboardPage";
import JobAggregatorPage from "./components/JobAggregatorPage";
import BookmarksHubPage from "./components/BookmarksHubPage";
import AepsBankingPage from "./components/AepsBankingPage";
import RateServiceBoardPage from "./components/RateServiceBoardPage";
import MultiToolSuite from "./components/MultiToolSuite";
import EsSevaPortal from "./components/EsSevaPortal"; // Holds the Admin Configurations and original sandbox features

export default function App() {
  // Navigation Routing States
  // Pages map exactly to requested modules:
  // "home" | "jobs" | "bookmarks" | "aeps" | "rates" | "tools" | "legacy" (contains EsSevaPortal and admin panel)
  const [activePage, setActivePage] = useState<string>("home");

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<"Hindi" | "English">("English");

  // Dropdowns and mobile triggers
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Printer configuration quick mock
  const [globalPrinter, setGlobalPrinter] = useState<string>(
    () => localStorage.getItem("mp_global_printer") || "HP LaserJet Pro M404dn ( Rahul-Kiosk Node-12 )"
  );
  const [isPrinterOnline, setIsPrinterOnline] = useState<boolean>(true);
  const [connChecking, setConnChecking] = useState(false);

  // Live bulletin ticket
  const [newsIndex, setNewsIndex] = useState(0);
  const newsTicker = [
    "🔥 [RECRUITMENT]: Railway RRB ALP vacancies scaled up to 11,127 positions. Submit digital applications securely.",
    "📢 [NOTIFICATION]: MP Board class high school and class secondary results released at our Kiosk Nodes.",
    "⚡ [INTEGRATION]: Biometric Mantra fingerprint authentication response updated for 256-bit bank handshakes.",
    "🛡️ [SECURITY]: SAMAGRA Portal eKYC OTP & Bio-matching engine upgraded on local secure socket client routing."
  ];

  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsTicker.length);
    }, 6000);
    return () => clearInterval(tickerInterval);
  }, [newsTicker.length]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpSent) {
      if (phoneNumber.length === 10) {
        setIsOtpSent(true);
      } else {
        alert("कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें!");
      }
    } else {
      if (otpValue.length === 4) {
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
        setIsOtpSent(false);
        alert("सफलतापूर्वक लॉग इन किया गया! (Kiosk User Sign-In Successful)");
      } else {
        alert("कृपया सही 4-अंकीय सुरक्षा पिन या ओटीपी दर्ज करें!");
      }
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "English" ? "Hindi" : "English");
  };

  // Helper navigating dynamically to e-Seva pages
  const handlePageNavigation = (pageId: string) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "home", labelEnglish: "Home Dashboard", labelHindi: "मुख्य पृष्ठ", icon: Home, badge: null },
    { id: "jobs", labelEnglish: "Jobs Aggregator", labelHindi: "सरकारी नौकरियाँ", icon: Briefcase, badge: "New" },
    { id: "bookmarks", labelEnglish: "Bookmarks Hub", labelHindi: "पसंदीदा लिंक्स", icon: Bookmark, badge: null },
    { id: "aeps", labelEnglish: "Aadhaar ATM", labelHindi: "आधार बैंकिंग", icon: ShieldCheck, badge: "Live" },
    { id: "rates", labelEnglish: "Rate & Service Board", labelHindi: "शुल्क दर तालिका", icon: Coins, badge: null },
    { id: "tools", labelEnglish: "Fast processing Tools", labelHindi: "स्मार्ट एसेट टूल्स", icon: Sparkles, badge: "Studio" },
    { id: "legacy", labelEnglish: "Admin Settings", labelHindi: "कियोस्क विन्यास", icon: Settings, badge: "Admin" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-indigo-600 selection:text-white antialiased">
      
      {/* 1. Dynamic News Ticker Header Bar */}
      <div className="bg-slate-950 text-slate-200 text-[11px] py-2 px-4 shadow-sm relative overflow-hidden flex items-center border-b border-slate-900">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-[9px] font-black tracking-widest bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase shrink-0">
            <Radio size={10} className="animate-pulse" /> Live bulletins
          </div>
          <div className="flex-1 overflow-hidden h-4 relative text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={newsIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 truncate font-semibold pr-4 text-slate-300"
              >
                {newsTicker[newsIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[9px] font-mono text-slate-400">
            <span>SECURE SERVER IP: 104.22.84.1</span>
            <span>PING: 14ms Verified ✓</span>
          </div>
        </div>
      </div>

      {/* 2. Sticky Glassmorphic Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
          
          {/* Brand Logo & Aura Glow */}
          <div 
            onClick={() => handlePageNavigation("home")}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 font-display text-sm font-black text-white shadow shadow-indigo-600/35 relative">
              <span className="relative z-10 font-black">MP</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-750 to-indigo-550 rounded-2xl blur-xs opacity-50 -z-0" />
            </div>

            <div className="text-left">
              <h1 className="text-sm font-extrabold leading-tight text-slate-950 flex items-center gap-1.5 tracking-tight">
                MP Kiosk Portal
                <span className="text-[9px] bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-2 py-0.5 rounded-full font-black tracking-wide leading-none">
                  PRO v4.0
                </span>
              </h1>
              <p className="text-[9px] text-slate-450 font-bold tracking-tight">
                Unified Citizen Hub • Central Job Aggregators • Asset Studio
              </p>
            </div>
          </div>

          {/* Core Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageNavigation(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black rounded-xl transition duration-150 relative ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-650 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon size={13} />
                  <span>{currentLanguage === "English" ? item.labelEnglish : item.labelHindi}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 text-[7px] font-black uppercase text-white bg-indigo-600 px-1 py-0.5 rounded-md leading-none animate-bounce">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Hub (Language, Login, Mobile Menu) */}
          <div className="flex items-center gap-2">
            
            {/* Language switch */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[10px] font-black uppercase transition-all flex items-center gap-1 select-none text-slate-755"
              title="हिंदी अनुवाद चालू / बंद करें"
            >
              <Languages size={12} className="text-indigo-600" />
              <span>{currentLanguage === "English" ? "ENG" : "HIN"}</span>
            </button>

            {/* User Logged block */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-150 rounded-xl text-[10px] font-bold text-emerald-800">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>ACTIVE KIOSK NODE</span>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow shadow-indigo-600/25 transition active:scale-95 text-center leading-none"
              >
                Login / OTP
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t bg-white px-4 py-4 space-y-1.5 text-left border-slate-100 select-none"
            >
              <div className="text-[10px] uppercase font-black tracking-widest text-indigo-600 border-b pb-1.5 mb-2 pl-2">
                सेवा श्रेणियां (Select Hub Page)
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePageNavigation(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-xl transition ${
                      isActive 
                        ? "bg-indigo-600 text-white shadow-sm" 
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{currentLanguage === "English" ? item.labelEnglish : item.labelHindi}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. Main content area */}
      <main className="flex-1 py-6 px-4 md:py-8">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activePage === "home" && (
                <HomeDashboardPage
                  onNavigate={handlePageNavigation}
                  isLoggedIn={isLoggedIn}
                  globalPrinter={globalPrinter}
                  isPrinterOnline={isPrinterOnline}
                />
              )}

              {activePage === "jobs" && (
                <JobAggregatorPage currentLanguage={currentLanguage} />
              )}

              {activePage === "bookmarks" && (
                <BookmarksHubPage />
              )}

              {activePage === "aeps" && (
                <AepsBankingPage />
              )}

              {activePage === "rates" && (
                <RateServiceBoardPage />
              )}

              {activePage === "tools" && (
                <MultiToolSuite />
              )}

              {activePage === "legacy" && (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                    <span className="text-lg">⚙️</span>
                    <div>
                      <h4 className="text-xs font-bold text-amber-950 uppercase">प्रशासक / संचालक अनुभाग (Kiosk Configurations Desk)</h4>
                      <p className="text-[10px] text-amber-700 mt-1">Here, you can manage custom notifications, scraped job rules, configure services fee rates, or audit local print spools. Authenticate via secure admin lock.</p>
                    </div>
                  </div>
                  <div className="bg-white border rounded-3xl p-5 shadow-sm">
                    <EsSevaPortal />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 4. Unified professional footer */}
      <footer className="border-t border-slate-200 bg-slate-950 text-slate-400 text-xs py-14">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 md:grid-cols-4 text-left">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow shadow-indigo-600/50">
                MP
              </div>
              <span className="font-extrabold text-white text-base tracking-tight leading-none">MP e-Seva Pro Portal</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
              Approved system of digital e-governance solutions configured for Indian citizen services, certification verification bureaus, and offline-first stamp printers. Transmitted securely under SSL.
            </p>
            <div className="flex gap-2 items-center text-slate-100 font-bold bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 w-max text-[9px] tracking-wider select-none">
              <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
              <span>AES-256 ENCRYPTED GATEWAY</span>
            </div>
          </div>

          <div>
            <h4 className="font-black text-rose-50 text-slate-100 mb-4 uppercase tracking-widest text-[9px] border-l-2 border-indigo-600 pl-2 select-none">Useful Portals Quick Connect</h4>
            <ul className="space-y-2.5 font-bold text-[11px] text-slate-400">
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePageNavigation("bookmarks"); }} className="hover:text-indigo-400 transition">एमपी ऑनलाइन मुख्य द्वार (MP Online Portal)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePageNavigation("bookmarks"); }} className="hover:text-indigo-400 transition">समग्र सामाजिक सुरक्षा प्रणालियाँ (Samagra ID)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePageNavigation("bookmarks"); }} className="hover:text-indigo-400 transition">राजस्व भूमि नक्शा खसरा (Bhulekh Records)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePageNavigation("jobs"); }} className="hover:text-indigo-400 transition">बोर्ड परीक्षा परिणाम एवं एडमिट कार्ड (Admit card lists)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-100 mb-4 uppercase tracking-widest text-[9px] border-l-2 border-emerald-500 pl-2 select-none">Asset Processing Utilities</h4>
            <ul className="space-y-2.5 font-bold text-[11px] text-slate-400">
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePageNavigation("tools"); }} className="hover:text-emerald-400 transition">पासपोर्ट फोटो क्रॉप शीट (Crop Photo Sheet)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePageNavigation("tools"); }} className="hover:text-emerald-400 transition">पृष्ठभूमि इरेज़र संवर्धक (1-Click Background Eraser)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePageNavigation("tools"); }} className="hover:text-emerald-400 transition">स्मार्ट आकार कंप्रेसर (Under 50KB tool)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePageNavigation("tools"); }} className="hover:text-emerald-400 transition">अंकसूची संवर्धक कनवर्टर (PDF Word utility)</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-slate-100 mb-4 uppercase tracking-widest text-[9px] border-l-2 border-indigo-600 pl-2 select-none">Support & Regional Tehsil</h4>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2 text-[11px] font-medium leading-normal">
              <span className="text-[9px] block text-indigo-400 font-extrabold uppercase">District Kiosk Helpdesk Nodes:</span>
              <p className="text-slate-400 text-[10px] leading-relaxed">Direct complaints to the nearest Tehsil center, or request local support coordinates instantly via the Whatsapp alert channel.</p>
              <div className="flex items-center gap-1.5 pt-1 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-extrabold text-slate-400 uppercase">Emergency Whatsapp Alert Loops</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-8 mt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between gap-4 text-[9px] text-slate-500 font-bold uppercase tracking-widest text-left select-none">
          <span>© 2026 MP e-Seva Digital Infrastructure Limited. Developed for Indian Kiosks.</span>
          <div className="flex gap-4 flex-wrap">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of e-Gov Brokerage</a>
            <a href="#" className="hover:text-slate-300">Contact Tehsil Room</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
