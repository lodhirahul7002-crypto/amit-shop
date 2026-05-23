import React, { useState, useMemo } from "react";
import {
  Search,
  Briefcase,
  GraduationCap,
  CalendarDays,
  Download,
  Filter,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ExternalLink,
  BookOpen,
  Trophy,
  PlayCircle,
  Newspaper,
  Megaphone,
  Sparkles,
  Award,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface JobAggregatorPageProps {
  currentLanguage: "Hindi" | "English";
}

export default function JobAggregatorPage({ currentLanguage }: JobAggregatorPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [activeTab, setActiveTab] = useState<"latest" | "admit" | "results">("latest");
  const [activePrepTool, setActivePrepTool] = useState<string | null>(null);

  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [selectedJobDetail, setSelectedJobDetail] = useState<any | null>(null);

  const categories = [
    "All",
    "Railways",
    "Defence",
    "Police",
    "Teaching",
    "Staff Selection (SSC)",
    "UPSC / PSC",
    "Banking"
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const latestJobs = useMemo(() => [
    { id: "j-1", title: "Railway RRB ALP Recruitment 2026", posts: "11,127 Posts", qualification: "10th / ITI", lastDate: "28 June", state: "All India", category: "Railways", linkText: "Apply Online Form", desc: "Railway Recruitment Board (RRB) online forms open for Assistant Loco Pilot posts. Age limit: 18-30. Written standard test pattern and blueprint guidance." },
    { id: "j-2", title: "MP Police SI & Subedar Online Vacancy", posts: "850+ Posts", qualification: "Graduate", lastDate: "12 July", state: "Madhya Pradesh", category: "Police", linkText: "MPESB Portal Application", desc: "Madhya Pradesh Employee Selection Board hiring Sub-Inspectors and Subedars. Direct physical telemetry, written, and interview stages config." },
    { id: "j-3", title: "UPSC NDA II Online Form 2026", posts: "404 Posts", qualification: "12th Pass", lastDate: "30 June", state: "All India", category: "UPSC / PSC", linkText: "UPSC Online Apply Portal", desc: "Union Public Service Commission (UPSC) Naval Academy and National Defence Academy exams intake." },
    { id: "j-4", title: "SSC GD Constable Recruitment Exam 2026", posts: "26,146 Posts", qualification: "10th Pass", lastDate: "15 August", state: "All India", category: "Staff Selection (SSC)", linkText: "SSC Kiosk Direct Link", desc: "General Duty Constables in BAF, CISF, CRPF, SSB, ITBP, AR and SSF. Standard physical assessment test norms." },
    { id: "j-5", title: "Railway RRB Technician Grade I & III", posts: "6,565 Posts", qualification: "Syllabus / ITI / Diploma", lastDate: "05 July", state: "All India", category: "Railways", linkText: "Online Kiosk Apply", desc: "Railway Technician posts vacancies with upgraded direct pay grades scale standards." },
    { id: "j-6", title: "DSSSB Teaching PGT & Nursery Form", posts: "1,455 Posts", qualification: "Master Degree / B.Ed", lastDate: "22 June", state: "Delhi NCR", category: "Teaching", linkText: "DSSSB Form Page", desc: "Delhi Subordinate Services Selection Board post-graduate teachers recruitment." },
    { id: "j-7", title: "UPSC CDS II Combined Defence Admission", posts: "395 Posts", qualification: "Degree / Engg", lastDate: "30 June", state: "All India", category: "UPSC / PSC", linkText: "UPSC CDS Apply Desk", desc: "Combined Defence Services Examination intake guidelines, offline centers in Indore, Bhopal, Jabalpur." }
  ], []);

  const admitCards = [
    { title: "Indian Army Agniveer CEE Admit Card 2026", date: "Released Today", state: "All India", link: "Download PDF Admit Link" },
    { title: "UPSSSC Lekhpal Main Exam Call Letter", date: "Released 2 days ago", state: "Uttar Pradesh", link: "Get Call Letter" },
    { title: "SSC GD Constable Physical Telemetry Card", date: "Released", state: "All India", link: "Download Admit Page" },
    { title: "RRB NTPC 10+2 UG Hall Ticket Phase III", date: "Released Yesterday", state: "All India", link: "Get NTPC Admit Card" },
    { title: "MP Board High School Supplementary Admit Card", date: "Released", state: "Madhya Pradesh", link: "Print supplementary hall ticket" }
  ];

  const examResults = [
    { title: "MPESB Primary School TET Result 2026", status: "Announced (Cut-off Out)", state: "Madhya Pradesh", link: "View MPESB Result Scorecard" },
    { title: "RRB Assistant Loco Pilot ALP Stage I Scores", status: "Announced", state: "All India", link: "Check ALP Score lists" },
    { title: "UPSC Civil Services Prelims Exam Result 2026", status: "Announced (Qualified List)", state: "All India", link: "View IAS Qualified List" },
    { title: "DSSSB Nursery Teacher Exam Final Merit List", status: "Announced", state: "Delhi NCR", link: "Download Final Merit PDF" },
    { title: "MP High School (Class 10th) Board Result", status: "Dispatched to Nodes", state: "Madhya Pradesh", link: "Kiosk Class 10 Search Desk" }
  ];

  const filteredJobsList = useMemo(() => {
    return latestJobs.filter((job) => {
      const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === "All" || job.category === selectedCategory;
      const matchState = selectedState === "All" || job.state === selectedState;
      return matchSearch && matchCategory && matchState;
    });
  }, [searchTerm, selectedCategory, selectedState, latestJobs]);

  const handleApplyClick = (jobTitle: string) => {
    if (appliedJobs.includes(jobTitle)) return;
    setAppliedJobs([...appliedJobs, jobTitle]);
  };

  const prepTools = [
    { id: "p1", title: "Free PDF Notes & Blueprints", desc: "Download curated curriculum booklets, previous year solved papers, and standard GK books for SSC, RRB and MP State exams.", content: "📕 MP State GK Capsule 2026, 📘 General Science & Aptitude Blueprints PDF, 📓 Railway ALP Physics Solved 2025-2026 exam booklets ready. (Save print sheets directly via connected Laser spool)." },
    { id: "p2", title: "Daily Live Mock-Up Exams", desc: "Simulate exact test console screen structures for MP Police and Railways Standard Aptitude. Solve 20 queries, track timing analytics.", content: "🎯 Today's Mock-Up Test Active: 'MP GS & State General Rules 2026'. Mode comprises 20 MCQs with instant scoring. Press center to trigger sandbox test engine." },
    { id: "p3", title: "Video Standard Classes", desc: "Curated high-quality, free tutorials covering logic, aptitude formulas, current affairs, and local history capsules.", content: "🎥 Video Sessions Active: 'Quantitative Aptitude Shortcuts for Railways' (12 mins), 'Madhya Pradesh Panchayati Raj System Core Structure' (18 mins). Press play inside browser context." },
    { id: "p4", title: "Daily Current Affairs Digest", desc: "Clean summary bulletins of national schemes, state welfare systems, sports awards, and regional announcements.", content: "📰 Current Affairs Core: Ladli Behna Scheme phase 3 allocations, RRB age relaxation directives approved, Samagra dynamic KYC guidelines issued. Updated at 07:00 AM." }
  ];

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Search Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl font-sans" />
        <div className="space-y-4 max-w-4xl relative z-10">
          <span className="bg-blue-500/20 text-blue-300 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1">
            <TrendingUp size={11} className="text-amber-400 animate-pulse" />
            Central & State Live Job feeds aggregators
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight leading-tight">
            सरकारी नियुक्तियां, प्रवेश पत्र एवं परीक्षा परिणाम पोर्टल 🎯
          </h2>
          <p className="text-slate-400 text-xs">
            Directly browse vacancies, print exam admit cards, checkout latest board results from trusted resources. Use physical filters to isolate center vacancies instantly.
          </p>

          <div className="grid gap-3 sm:grid-cols-12 pt-1">
            <div className="sm:col-span-8 relative">
              <Search className="absolute left-3 top-3.5 text-slate-450 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="जॉब टाइटल, योग्यता, विभाग या कीवर्ड खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div className="sm:col-span-4 relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full text-xs px-3 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-bold"
              >
                <option value="All">📍 All India / सभी राज्य</option>
                <option value="Madhya Pradesh">Madhya Pradesh (एमपी)</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Filters List */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 relative border-b border-slate-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`py-1.5 px-4 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat 
                ? "bg-slate-900 text-white shadow-sm" 
                : "bg-slate-104 bg-slate-100 text-slate-650 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        
        {/* Left Side: core job/admit cards/results listings (8 Columns) */}
        <div className="md:col-span-8 space-y-4">
          
          {/* Dynamic selectors tabs */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border">
            {[
              { id: "latest", label: "🔥 जॉब वैकेंसी (Latest Jobs)" },
              { id: "admit", label: "🎟️ एडमिट कार्ड (Admit Cards)" },
              { id: "results", label: "🏆 परीक्षा परिणाम (Results)" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 rounded-xl text-xs font-bold text-center transition-all ${
                  activeTab === tab.id 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 min-h-[350px]">
            <AnimatePresence mode="wait">
              {activeTab === "latest" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {filteredJobsList.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed">
                      <Briefcase className="mx-auto text-slate-300 mb-2 animate-bounce" size={28} />
                      <p className="text-xs text-slate-500 font-bold">कोई जॉब वैकेंसी नहीं मिली।</p>
                      <button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }} className="text-xs text-indigo-600 underline font-black uppercase mt-1">फ़िल्टर हटाएँ</button>
                    </div>
                  ) : (
                    filteredJobsList.map((job) => (
                      <div 
                        key={job.id}
                        className="bg-white border rounded-2xl p-5 hover:shadow-sm transition-all text-left flex flex-col justify-between space-y-3 relative overflow-hidden group"
                      >
                        <div className="absolute right-4 top-4 flex gap-1.5">
                          <span className="bg-slate-100 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">{job.category}</span>
                          <span className="bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">{job.state}</span>
                        </div>

                        <div className="space-y-2">
                          <h4 
                            onClick={() => setSelectedJobDetail(job)}
                            className="text-sm font-extrabold text-slate-900 hover:text-indigo-650 cursor-pointer block transition max-w-[85%]"
                          >
                            {job.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 leading-normal font-medium max-w-[95%]">{job.desc}</p>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] border-t pt-3.5">
                          <div>
                            <span className="text-slate-400 font-medium">कुल पद:</span> <span className="font-bold text-slate-800">{job.posts}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium">पात्रता:</span> <span className="font-bold text-slate-800">{job.qualification}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium">अंतिम तिथि:</span> <span className="font-bold text-rose-600">{job.lastDate}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-1.5">
                          <button
                            onClick={() => setSelectedJobDetail(job)}
                            className="text-xs font-black text-slate-700 hover:text-indigo-650 underline"
                          >
                            पूर्ण विवरण (View Specifications)
                          </button>
                          
                          <button
                            onClick={() => handleApplyClick(job.title)}
                            disabled={appliedJobs.includes(job.title)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm transition active:scale-95 ${
                              appliedJobs.includes(job.title)
                                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                          >
                            {appliedJobs.includes(job.title) ? "✓ Applied Kiosk" : "Kiosk Apply ⚡"}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === "admit" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {admitCards.map((card, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 shadow-sm transition group"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block">{card.state}</span>
                        <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition">{card.title}</h4>
                        <span className="text-[10px] text-slate-405 text-slate-400 block">{card.date}</span>
                      </div>
                      
                      <button
                        onClick={() => alert(`Spooling admit card file layout. Verify printer online setup! Printer context load...`)}
                        className="py-2 px-4 rounded-xl border bg-white text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center gap-1.5 text-[10px] shrink-0 uppercase active:scale-95 transition"
                      >
                        <Download size={13} />
                        <span>Print Admit Slot</span>
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "results" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {examResults.map((res, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 shadow-sm transition group"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-teal-650 text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full uppercase tracking-widest inline-block">{res.state}</span>
                        <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-650 transition">{res.title}</h4>
                        <span className="text-[10px] text-slate-450 block font-semibold text-emerald-600">{res.status}</span>
                      </div>
                      
                      <button
                        onClick={() => alert(`Retrieving scoreboard. MP Exam credentials verify module launched.`)}
                        className="py-2 px-4 rounded-xl bg-slate-900 text-white font-extrabold hover:bg-slate-800 flex items-center justify-center gap-1.5 text-[10px] shrink-0 uppercase active:scale-95 transition-all shadow-sm"
                      >
                        <span>View Results</span>
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Right Side: Study Prep and Syllabus widgets (4 Columns) */}
        <div className="md:col-span-4 space-y-6 text-left">
          
          {/* Prep-Kit section */}
          <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-3xl p-5 shadow space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-1">
              <GraduationCap size={15} /> Exam Preparation Tools
            </h4>
            <p className="text-[10px] text-slate-400 font-light leading-relaxed">
              Equip students with live mock modules, syllabus blueprints, and digital classes catalogs directly in the kiosk node.
            </p>

            <div className="space-y-2.5">
              {prepTools.map((tool) => (
                <div key={tool.id} className="border-b border-indigo-900/50 pb-2.5 last:border-0 last:pb-0">
                  <button
                    onClick={() => setActivePrepTool(activePrepTool === tool.id ? null : tool.id)}
                    className="w-full text-left text-xs font-extrabold hover:text-indigo-300 transition flex items-center justify-between"
                  >
                    <span>{tool.title}</span>
                    <span className="text-[9px] text-indigo-450 font-bold">{activePrepTool === tool.id ? "Minimize" : "Explore"}</span>
                  </button>
                  <p className="text-[10px] text-slate-450 leading-relaxed font-normal mt-0.5">{tool.desc}</p>
                  
                  {activePrepTool === tool.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="mt-2 text-[10px] bg-indigo-900/40 p-2.5 rounded-xl border border-indigo-950/20 text-slate-300 leading-normal font-sans"
                    >
                      {tool.content}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Scraped Info stats feed */}
          <div className="bg-white border rounded-2xl p-4 shadow-sm space-y-3">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">🔥 Current Syllabus Search</h5>
            <div className="relative text-xs">
              <input 
                type="text" 
                placeholder="Ex. 'MP SI syllabus', 'RRB ALP'" 
                className="w-full py-2.5 pl-3 pr-8 bg-slate-50 rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-550 focus:border-indigo-500 font-medium"
              />
              <button 
                onClick={() => alert("Search result blueprints extracted. Check Kiosk standard documents database.")}
                className="absolute right-2 top-2 hover:scale-110 text-indigo-600"
              >
                <Search size={14} />
              </button>
            </div>
            <p className="text-[9px] text-slate-500 leading-snug">Extract exact recruitment criteria and curriculum books PDF directly. Direct fast-print spools available.</p>
          </div>

        </div>

      </div>

      {/* Selected Job Detail Modal */}
      {selectedJobDetail && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-xl w-full border shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <span className="bg-indigo-50 text-indigo-750 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase inline-block mb-1">{selectedJobDetail.category}</span>
                <h3 className="text-base font-extrabold text-slate-950">{selectedJobDetail.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedJobDetail(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-sans">
              <div>
                <strong className="text-slate-900 block">विवरण (Description):</strong>
                <p className="font-medium mt-0.5 text-slate-600">{selectedJobDetail.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl text-[11px] font-bold">
                <div>
                  <span className="text-slate-400 block font-normal text-[9px] uppercase">STATE</span>
                  <span>{selectedJobDetail.state}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-normal text-[9px] uppercase">TOTAL VACANCIES</span>
                  <span>{selectedJobDetail.posts}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-normal text-[9px] uppercase">QUALIFICATION</span>
                  <span>{selectedJobDetail.qualification}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-normal text-[9px] uppercase">LAST DATE</span>
                  <span className="text-rose-600">{selectedJobDetail.lastDate}</span>
                </div>
              </div>

              <div className="bg-indigo-50 text-indigo-800 p-2.5 rounded-xl border border-indigo-100 flex items-center gap-2">
                <span className="bg-indigo-600 text-white p-1 rounded font-bold text-[9px]">DOCS</span>
                <span className="font-extrabold text-[10px]">Photo requirements: White Backdrop, Crop Size 3.5x4.5cm, under 50KB limit.</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button 
                onClick={() => setSelectedJobDetail(null)}
                className="flex-1 py-2.5 text-xs text-slate-600 hover:bg-slate-50 border rounded-xl font-extrabold uppercase transition"
              >
                Close Panel
              </button>
              <button 
                onClick={() => {
                  handleApplyClick(selectedJobDetail.title);
                  setSelectedJobDetail(null);
                  alert(`Direct link spooled to Kiosk application form dashboard!`);
                }}
                className="flex-1 py-2.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold uppercase shadow transition active:scale-95"
              >
                Apply Direct ⚡
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
