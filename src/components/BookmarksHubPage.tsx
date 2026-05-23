import React, { useState, useEffect } from "react";
import {
  Bookmark,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  FolderLock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BookmarksHubPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Utility Portals");
  const [desc, setDesc] = useState("");
  const [cardBg, setCardBg] = useState("from-indigo-650 to-indigo-850 bg-gradient-to-tr");

  const initialBookmarks = [
    { id: "bm-1", title: "MP Online Portal (एमपी ऑनलाइन)", url: "https://www.mponline.gov.in", category: "Kiosk Essentials", desc: "Primary e-seva gateway for MP government recruitment, certifications & citizen payments.", color: "from-indigo-900 to-indigo-800" },
    { id: "bm-2", title: "Samagra ID Portal (समग्र सामाजिक सुरक्षा)", url: "https://samagra.gov.in", category: "Citizen Identity", desc: "Update eKYC, split family, check Samagra ID status and generate family cards.", color: "from-blue-900 to-blue-800" },
    { id: "bm-3", title: "Ayushman Card NHA (आयुष्मान भारत)", url: "https://beneficiary.nha.gov.in", category: "Health & Welfare", desc: "Official direct link to register beneficiaries for the ₹5 Lakh free health scheme.", color: "from-emerald-950 to-emerald-800" },
    { id: "bm-4", title: "Ration Card RCMS (राशन पात्रता पर्ची)", url: "https://rcms.mponline.gov.in", category: "Citizen Identity", desc: "Print पात्रता पर्ची, check dealer allocations, and request inclusion of newborn.", color: "from-amber-955 from-amber-950 to-amber-800" },
    { id: "bm-5", title: "MP Land Records (भू-अभिलेख खसरा)", url: "https://mpbhulekh.gov.in", category: "Revenue & Land", desc: "Get authorized Khasra, Khatauni copies, bhoo-naksha maps, and land deeds.", color: "from-rose-950 to-rose-850" },
    { id: "bm-6", title: "DigiLocker Online Portal", url: "https://www.digilocker.gov.in", category: "Kiosk Essentials", desc: "Verify driving licenses, academic score cards & marksheets live via OTC API.", color: "from-cyan-950 to-cyan-800" },
    { id: "bm-7", title: "PAN Card UTI-ITSL Desk", url: "https://www.pan.utiitsl.com", category: "Utility Portals", desc: "Submit UTI/NSDL PAN application online slips and verify biometric thumb links.", color: "from-pink-950 to-pink-850" },
    { id: "bm-8", title: "MPTAAS Tribals Profile", url: "https://www.tribal.mp.gov.in/mptaas", category: "Health & Welfare", desc: "Post-matric tribal scholar profile creation, hostel registration & schemes.", color: "from-purple-950 to-purple-800" },
    { id: "bm-9", title: "PM-Kisan Samman Nidhi", url: "https://pmkisan.gov.in", category: "Revenue & Land", desc: "Check installment status, execute OTP-based eKYC, crop records update.", color: "from-teal-950 to-teal-850" }
  ];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mp_kiosk_premium_bookmarks");
      if (saved) {
        setBookmarks(JSON.parse(saved));
      } else {
        setBookmarks(initialBookmarks);
        localStorage.setItem("mp_kiosk_premium_bookmarks", JSON.stringify(initialBookmarks));
      }
    } catch (e) {
      setBookmarks(initialBookmarks);
    }
  }, []);

  const saveToStorage = (updatedList: any[]) => {
    setBookmarks(updatedList);
    try {
      localStorage.setItem("mp_kiosk_premium_bookmarks", JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    let fixedUrl = url.trim();
    if (!/^https?:\/\//i.test(fixedUrl)) {
      fixedUrl = "https://" + fixedUrl;
    }

    const newBm = {
      id: "bm-" + Date.now(),
      title: title.trim(),
      url: fixedUrl,
      category,
      desc: desc.trim() || "त्वरित पहुंच के लिए सहेजा गया कस्टम लिंक।",
      color: cardBg
    };

    const updated = [newBm, ...bookmarks];
    saveToStorage(updated);
    setTitle("");
    setUrl("");
    setDesc("");
    setIsAddOpen(false);
  };

  const handleDeleteBookmark = (id: string) => {
    const updated = bookmarks.filter((bm) => bm.id !== id);
    saveToStorage(updated);
  };

  const handleResetDefaults = () => {
    if (confirm("क्या आप बुकमार्क्स को डिफ़ॉल्ट पर रीसेट करना चाहते हैं?")) {
      saveToStorage(initialBookmarks);
    }
  };

  const categoriesList = ["All", "Kiosk Essentials", "Citizen Identity", "Health & Welfare", "Revenue & Land", "Utility Portals"];

  const filteredBookmarks = bookmarks.filter((bm) => {
    const matchesSearch = bm.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bm.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || bm.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const bgOptions = [
    { color: "from-indigo-900 to-indigo-800", label: "Midnight Blue" },
    { color: "from-blue-900 to-blue-800", label: "Atlantic Cobalt" },
    { color: "from-emerald-950 to-emerald-800", label: "Forest Teal" },
    { color: "from-teal-950 to-teal-850", label: "Peacock Green" },
    { color: "from-rose-950 to-rose-850", label: "Cosmic Crimson" },
    { color: "from-pink-950 to-pink-850", label: "Crimson Magenta" },
    { color: "from-purple-950 to-purple-800", label: "Royal Amethyst" },
    { color: "from-amber-950 to-slate-900", label: "Charcoal Amber" }
  ];

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Search and Header panel */}
      <div className="bg-white rounded-3xl border p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-650">🔗</span>
              पसंदीदा वेबसाइट बुकमार्क्स (Kiosk Bookmarks Hub)
            </h2>
            <p className="text-xs text-slate-500 font-medium">Quick link portal access sheet for critical government systems to save time searching manually.</p>
          </div>

          <div className="flex gap-2 shrink-0 select-none">
            <button
              onClick={() => setIsAddOpen(true)}
              className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow transition active:scale-95"
            >
              <Plus size={15} />
              <span>पसंदीदा लिंक जोड़ें (Add Access Link)</span>
            </button>
            <button
              onClick={handleResetDefaults}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition active:scale-95 border"
            >
              रीसेट (Reset)
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-12 border-t pt-4">
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="बुकमार्क नाम, विभाग या विवरण खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div className="sm:col-span-4 select-none">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-bold"
            >
              <option value="All">🌌 All Categories / सभी श्रेणियां</option>
              {categoriesList.filter((c) => c !== "All").map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid items */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBookmarks.length === 0 ? (
          <div className="col-span-3 text-center py-12 bg-white rounded-3xl border border-dashed">
            <Bookmark className="mx-auto text-slate-300 mb-2 animate-bounce" size={28} />
            <p className="text-xs text-slate-500 font-bold">कोई बुकमार्क नहीं मिला।</p>
          </div>
        ) : (
          filteredBookmarks.map((bm) => (
            <div
              key={bm.id}
              className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-5 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${bm.color || "from-indigo-900 to-indigo-800"} opacity-95 group-hover:scale-105 transition-transform duration-500 -z-10`} />
              
              <div className="space-y-2 relative z-10 text-left">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] bg-white/15 text-white/90 px-2 py-0.5 rounded font-black tracking-wide uppercase">{bm.category}</span>
                  <button
                    onClick={() => handleDeleteBookmark(bm.id)}
                    className="text-white/40 hover:text-rose-450 hover:text-red-400 p-1 rounded hover:bg-white/10 transition-colors"
                    title="Bookmark हटाएं"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-black tracking-tight leading-snug group-hover:text-indigo-250 transition">{bm.title}</h4>
                  <p className="text-[10px] text-slate-300 font-medium leading-relaxed mt-1 line-clamp-2 md:line-clamp-3">{bm.desc}</p>
                </div>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-3 mt-4 flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400 font-mono text-[9px] truncate max-w-[150px]">{bm.url}</span>
                <a
                  href={bm.url}
                  target="_blank"
                  rel="noreferrer"
                  className="py-1 px-3 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all text-white flex items-center gap-1 shrink-0 font-extrabold uppercase text-[9px]"
                >
                  <span>Open Portal</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Custom Bookmark Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-lg w-full border shadow-2xl space-y-4 text-left"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">नया बुकमार्क जोड़ें (Create Access Bookmark)</h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateBookmark} className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">पोर्टल का नाम (Portal Title) *</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. समग्र ID मुख्य पोर्टल"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">पोर्टल URL (Portal address) *</label>
                  <input
                    type="text"
                    required
                    placeholder="samagra.gov.in"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400">श्रेणी चुनें (Select Category)</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-bold"
                >
                  <option value="Kiosk Essentials">Kiosk Essentials</option>
                  <option value="Citizen Identity">Citizen Identity</option>
                  <option value="Health & Welfare">Health & Welfare</option>
                  <option value="Revenue & Land">Revenue & Land</option>
                  <option value="Utility Portals">Utility Portals</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400">संक्षिप्त विवरण (Brief details)</label>
                <textarea
                  placeholder="व्हाट्सएप्प लिंक, सदस्य केवाईसी अपडेट, आदि की त्वरित जानकारी।"
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-400 resize-none font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase font-bold text-slate-400">पसंदीदा रंग (Choose visual style Theme)</label>
                <div className="grid grid-cols-4 gap-2">
                  {bgOptions.map((bg, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setCardBg(bg.color)}
                      className={`h-11 rounded-xl text-[9px] font-bold text-white relative overflow-hidden flex items-center justify-center border-2 ${
                        cardBg === bg.color ? "border-slate-900 ring-2 ring-indigo-500/20" : "border-transparent"
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-tr ${bg.color} -z-10`} />
                      <span className="text-[8px] bg-slate-950/25 px-1 rounded truncate leading-none">{bg.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="flex-1 py-3 text-xs text-slate-600 hover:bg-slate-50 border rounded-xl font-extrabold uppercase transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold uppercase shadow transition active:scale-95"
                >
                  Save Bookmark ✓
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
