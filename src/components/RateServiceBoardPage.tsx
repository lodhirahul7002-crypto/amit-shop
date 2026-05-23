import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Printer,
  Plus,
  Trash2,
  Coins,
  FileCheck2,
  ChevronRight,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function RateServiceBoardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Selection list for cumulative receipt generator
  const [cart, setCart] = useState<any[]>([]);
  const [citizenName, setCitizenName] = useState("");
  const [isQuoteCreated, setIsQuoteCreated] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<any | null>(null);

  const categories = [
    "All",
    "Government Cards",
    "Identity / Documents",
    "Certificate Services",
    "Online Admission & Recruitments",
    "Financial & Digital Payments",
    "Licensing & Registry",
    "Utility & Recharge",
    "Insurance & Travel"
  ];

  const kioskServices = useMemo(() => [
    { id: "ks-1", nameHindi: "श्रम कार्ड पंजीयन", nameEnglish: "Shram Card Registration", fee: 50, category: "Government Cards", active: true },
    { id: "ks-2", nameHindi: "आयुष्मान भारत कार्ड", nameEnglish: "Ayushman Card Print/Issue", fee: 30, category: "Government Cards", active: true },
    { id: "ks-3", nameHindi: "रोजगार पंजीयन नवीन", nameEnglish: "Rojgar Panjiyan Enrollment", fee: 50, category: "Online Admission & Recruitments", active: true },
    { id: "ks-4", nameHindi: "आधार कार्ड प्रिंट रंगीन", nameEnglish: "Aadhaar Card Color Printing", fee: 50, category: "Identity / Documents", active: true },
    { id: "ks-5", nameHindi: "समग्र आई डी डाउनलोड", nameEnglish: "Samagra ID Search & Print", fee: 20, category: "Identity / Documents", active: true },
    { id: "ks-6", nameHindi: "संबल कार्ड पंजीयन", nameEnglish: "Sambal Card Application", fee: 50, category: "Government Cards", active: true },
    { id: "ks-7", nameHindi: "ई-पीएफ़ निकासी दावा", nameEnglish: "e-PF Claim & Withdrawal Form", fee: 100, category: "Financial & Digital Payments", active: true },
    { id: "ks-8", nameHindi: "ड्राइविंग लाइसेंस आवेदन", nameEnglish: "Driving License Application Desk", fee: 250, category: "Licensing & Registry", active: true },
    { id: "ks-9", nameHindi: "पासपोर्ट फोटो (8 फोटो शीट)", nameEnglish: "Passport Photo Creator (8 counts)", fee: 40, category: "Identity / Documents", active: true },
    { id: "ks-10", nameHindi: "आभा डिजिटल हेल्थ आईडी", nameEnglish: "ABHA Card Generation", fee: 20, category: "Identity / Documents", active: true },
    { id: "ks-11", nameHindi: "वोटर आईडी कार्ड प्रिंट", nameEnglish: "Voter Card PVC/Paper Printing", fee: 50, category: "Identity / Documents", active: true },
    { id: "ks-12", nameHindi: "राशन कार्ड सूची नाम", nameEnglish: "Ration Card List & Printout", fee: 30, category: "Identity / Documents", active: true },
    { id: "ks-13", nameHindi: "आय प्रमाण पत्र", nameEnglish: "Income Certificate Application", fee: 50, category: "Certificate Services", active: true },
    { id: "ks-14", nameHindi: "मूल निवासी प्रमाण पत्र", nameEnglish: "Domicile Certificate Application", fee: 50, category: "Certificate Services", active: true },
    { id: "ks-15", nameHindi: "जाति प्रमाण पत्र", nameEnglish: "Caste Certificate Application", fee: 60, category: "Certificate Services", active: true },
    { id: "ks-16", nameHindi: "दिव्यांग (UDID) कार्ड", nameEnglish: "Disability Card (UDID) Form", fee: 50, category: "Government Cards", active: true },
    { id: "ks-17", nameHindi: "उद्योग आधार (MSME)", nameEnglish: "Udyog Aadhaar MSME Registrations", fee: 150, category: "Licensing & Registry", active: true },
    { id: "ks-18", nameHindi: "फ़ूड सेफ्टी लाइसेंस (FSSAI)", nameEnglish: "Food Safety License registrations", fee: 200, category: "Licensing & Registry", active: true },
    { id: "ks-19", nameHindi: "गुमास्ता वाणिज्य पंजीयन", nameEnglish: "Gumasta Business License Copy", fee: 350, category: "Licensing & Registry", active: true },
    { id: "ks-20", nameHindi: "डिजिटल खसरा - खतौनी", nameEnglish: "Khasra Khatauni Certified", fee: 50, category: "Licensing & Registry", active: true },
    { id: "ks-21", nameHindi: "भू-अधिकार ऋण पुस्तिका", nameEnglish: "Bhoo-Aadhaar Land Booklets", fee: 100, category: "Licensing & Registry", active: true },
    { id: "ks-22", nameHindi: "बिजली बिल भुगतान", nameEnglish: "Electricity Bill Payments Processing", fee: 20, category: "Utility & Recharge", active: true },
    { id: "ks-23", nameHindi: "मोबाइल एवं डीटीएच रिचार्ज", nameEnglish: "Mobile recharge direct outlet", fee: 15, category: "Utility & Recharge", active: true },
    { id: "ks-24", nameHindi: "एलआईसी बीमा किस्त जमा", nameEnglish: "LIC Premium payment terminal", fee: 35, category: "Financial & Digital Payments", active: true },
    { id: "ks-25", nameHindi: "वाहन चालान भुगतान", nameEnglish: "Traffic Challan Payments Direct", fee: 40, category: "Utility & Recharge", active: true },
    { id: "ks-26", nameHindi: "रेल्वे आरक्षण टिकट (IRCTC)", nameEnglish: "Railway Reservation Ticket Kiosk", fee: 80, category: "Insurance & Travel", active: true },
    { id: "ks-27", nameHindi: "कॉलेज / स्कूल प्रवेश फॉर्म", nameEnglish: "College/School Online Admissions", fee: 100, category: "Online Admission & Recruitments", active: true },
    { id: "ks-28", nameHindi: "छात्रवृत्ति (Scholarship) फॉर्म", nameEnglish: "Govt School post-matric scholar", fee: 100, category: "Online Admission & Recruitments", active: true },
    { id: "ks-29", nameHindi: "पैन कार्ड आवेदन (NSDL/UTI)", nameEnglish: "PAN Card UTI/NSDL Registration", fee: 150, category: "Identity / Documents", active: true },
    { id: "ks-30", nameHindi: "फसल बीमा (Crop Insurance)", nameEnglish: "Fasal Bima application desk", fee: 80, category: "Insurance & Travel", active: true }
  ], []);

  const filteredServices = useMemo(() => {
    return kioskServices.filter((svc) => {
      const matchSearch = svc.nameHindi.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          svc.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === "All" || svc.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory, kioskServices]);

  const addToCart = (svc: any) => {
    if (cart.some((item) => item.id === svc.id)) return;
    setCart([...cart, svc]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.fee, 0);
  };

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const baseAmount = calculateTotal();
    const portalGstFee = Math.round(baseAmount * 0.18); // 18% custom portal gst
    const discount = baseAmount > 300 ? 15 : 0; // ₹15 discount in brackets

    const quote = {
      id: "QT-" + Date.now().toString().slice(6, 13),
      customer: citizenName.trim() || "अतिथि नागरिक (Walk-in Citizen)",
      items: [...cart],
      base: baseAmount,
      gst: portalGstFee,
      discount: discount,
      total: baseAmount + portalGstFee - discount,
      date: new Date().toLocaleString()
    };

    setQuoteDetails(quote);
    setIsQuoteCreated(true);
  };

  const handleResetCart = () => {
    setCart([]);
    setCitizenName("");
    setIsQuoteCreated(false);
    setQuoteDetails(null);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Upper header statistics block */}
      <div className="bg-white rounded-3xl border p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-650">🪙</span>
              कियोस्क सेवाएँ एवं आधिकारिक शुल्क सूची (Rate & Service Board)
            </h2>
            <p className="text-xs text-slate-500 font-medium">Standard mandated government rates of MP-Online & e-Seva kiosk networks to regulate transparent fees billing.</p>
          </div>
          
          <div className="bg-slate-50 border border-slate-150 rounded-2xl px-4 py-2 flex items-center gap-2 shrink-0">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700 font-black text-[10px]">TOTAL</span>
            <span className="text-xs font-bold font-mono text-slate-800">{kioskServices.length} Active Services listed</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-12 border-t pt-4">
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="खोजें: श्रम कार्ड, आधार, समग्र, आय, जाति, ड्राइविंग लाइसेंस..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div className="sm:col-span-4 select-none">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-bold"
            >
              <option value="All">🌌 All Departments / सभी प्रभाग</option>
              {categories.filter((c) => c !== "All").map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        
        {/* Left Side: Service fee cards grid (8 Columns) */}
        <div className="md:col-span-8 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredServices.length === 0 ? (
              <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-dashed">
                <Search className="mx-auto text-slate-300 mb-2" size={24} />
                <p className="text-xs text-slate-500 font-bold">कोई भी सेवा शुल्क नहीं मिला।</p>
              </div>
            ) : (
              filteredServices.map((svc) => (
                <div 
                  key={svc.id}
                  className="bg-white border hover:border-slate-300 hover:shadow-sm transition-all rounded-2xl p-4 flex justify-between items-start gap-3 relative overflow-hidden group"
                >
                  <div className="space-y-1.5 text-left">
                    <span className="text-[8px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-black uppercase inline-block">{svc.category}</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition tracking-tight leading-snug">{svc.nameHindi}</h4>
                      <p className="text-[10px] text-slate-450 font-medium">{svc.nameEnglish}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[8px] text-slate-400 block font-bold uppercase leading-none">RATE</span>
                      <span className="text-sm font-black font-mono text-indigo-650 text-indigo-630 text-indigo-600">₹{svc.fee}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(svc)}
                      disabled={cart.some((item) => item.id === svc.id)}
                      className={`p-1.5 rounded-xl border flex items-center justify-center transition active:scale-95 text-[10px] uppercase font-bold gap-1 ${
                        cart.some((item) => item.id === svc.id)
                          ? "bg-slate-50 border-slate-200 text-slate-400"
                          : "bg-indigo-50 border-indigo-150 text-indigo-650 hover:bg-indigo-150 hover:bg-indigo-100 text-indigo-600 cursor-pointer"
                      }`}
                    >
                      <Plus size={12} />
                      <span>जोड़ें (Add)</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Interactive Billing Cart Estimator (4 Columns) */}
        <div className="md:col-span-4 space-y-4" id="billing-card-wrapper">
          
          <div className="bg-white border rounded-3xl p-5 shadow-sm space-y-4 text-left">
            <h3 className="text-xs font-black text-indigo-650 uppercase tracking-widest border-b pb-2 flex items-center gap-1">
              🧾 कियोस्क बिलिंग कैलकुलेटर (Quote Estimator)
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-8 space-y-1">
                <Coins className="mx-auto text-slate-300 animate-pulse mb-1" size={24} />
                <p className="text-[11px] text-slate-500 leading-normal font-bold">कैलकुलेटर खाली है!</p>
                <p className="text-[9px] text-slate-400 font-light leading-normal max-w-[150px] mx-auto">बाईं सूची से सेवाओं को जोड़ने के लिए 'जोड़ें' बटन दबाएं।</p>
              </div>
            ) : (
              <form onSubmit={handleGenerateQuote} className="space-y-3.5 text-xs font-semibold text-slate-700">
                <div className="space-y-1">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase">नागरिक का नाम (Citizen Customer) *</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. अमित कुमार सैन"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase">चयनित सेवाएं (Selected Services)</span>
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border text-[11px]">
                        <div className="truncate max-w-[140px] text-left">
                          <span className="block font-bold text-slate-800 text-[10px] truncate">{item.nameHindi}</span>
                          <span className="block text-[8px] text-slate-450 font-normal truncate">{item.nameEnglish}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 font-bold">
                          <span className="font-mono text-indigo-600 font-extrabold text-[10px]">₹{item.fee}</span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 p-0.5"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-2.5 font-sans space-y-1 text-[11px]">
                  <div className="flex justify-between text-slate-500">
                    <span>Base Amount (मूल शुल्क):</span>
                    <span className="font-mono font-bold">₹{calculateTotal()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase rounded-xl tracking-wider shadow transition duration-150 active:scale-95"
                >
                  बिल रसीद बनाएं (Generate fee receipt)
                </button>
                
                <button
                  type="button"
                  onClick={handleResetCart}
                  className="w-full py-1.5 text-slate-500 hover:text-slate-850 text-[10px] underline hover:no-underline text-center font-bold uppercase"
                >
                  कैलकुलेटर साफ़ करें (Reset Cart)
                </button>
              </form>
            )}
          </div>

          {/* Render generated Quote Details slip */}
          {isQuoteCreated && quoteDetails && (
            <div className="bg-indigo-50 border border-indigo-250 p-5 rounded-3xl space-y-4 animate-scale-up text-left relative overflow-hidden" id="rates-billing-receipt">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-24 h-24 bg-indigo-100/50 rounded-full" />
              <div className="flex justify-between items-center border-b border-indigo-200 pb-2">
                <span className="text-[10px] font-black text-indigo-800 uppercase tracking-widest flex items-center gap-1">
                  📄 official quotation
                </span>
                <button
                  type="button"
                  onClick={() => alert(`Direct print dispatching to client connected spool port under print document standard raw format. System node: active.`)}
                  className="py-1 px-2 border border-indigo-250 bg-white hover:bg-slate-50 text-[9px] font-black text-slate-850 uppercase rounded-lg flex items-center gap-1 active:scale-95 select-none transition"
                >
                  <Printer size={11} />
                  <span>रसीद प्रिंट</span>
                </button>
              </div>

              <div className="text-[10px] text-slate-700 space-y-1 font-semibold leading-normal font-mono">
                <div>ID: <span className="text-slate-900 font-extrabold">{quoteDetails.id}</span></div>
                <div>CITIZEN: <span className="text-slate-900 font-extrabold">{quoteDetails.customer}</span></div>
                <div>DATE: <span className="text-slate-900 font-extrabold">{quoteDetails.date}</span></div>
              </div>

              <div className="border-t border-indigo-100 pt-2.5 space-y-1.5">
                {quoteDetails.items.map((it: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-[10px] font-bold text-slate-700 leading-none">
                    <span>{idx + 1}. {it.nameHindi}</span>
                    <span className="font-mono text-slate-900 text-[11px]">₹{it.fee}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-indigo-200 pt-2 bg-indigo-100/50 p-3 rounded-2xl space-y-1.5 font-sans">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Subtotal (मूल प्रभार):</span>
                  <span className="font-mono">₹{quoteDetails.base}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>GST Taxes (कराधान प्रभार - 18%):</span>
                  <span className="font-mono">₹{quoteDetails.gst}</span>
                </div>
                {quoteDetails.discount > 0 && (
                  <div className="flex justify-between text-[11px] text-emerald-600">
                    <span>Brackets Promo Saving:</span>
                    <span className="font-mono">-₹{quoteDetails.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-indigo-950 font-black border-t border-indigo-200 pt-1.5">
                  <span>भुगतान योग्य राशि (Final Premium):</span>
                  <span className="font-mono text-sm text-indigo-650">₹{quoteDetails.total}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Floating Mobile Cart Indicator Drawer Anchor */}
      {cart.length > 0 && (
        <div className="md:hidden fixed bottom-[76px] left-4 right-4 z-40 animate-bounce">
          <button
            onClick={() => {
              const el = document.getElementById("billing-card-wrapper");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-2xl font-black text-[10px] uppercase tracking-wider flex items-center justify-between shadow-xl shadow-indigo-600/35 border border-indigo-500/40"
          >
            <span className="flex items-center gap-1">
              <span>🧾 {cart.length} सेवा(एँ) चयनित (Selected)</span>
            </span>
            <span className="flex items-center gap-0.5 font-mono">
              <span>कुल: ₹{calculateTotal()} • रसीद बनाएँ</span>
              <ChevronRight size={13} />
            </span>
          </button>
        </div>
      )}

    </div>
  );
}
