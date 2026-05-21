import React, { useState, useEffect } from "react";
import { 
  Globe2, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Settings, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Clock3,
  X,
  RefreshCw,
  TrendingUp,
  Cpu
} from "lucide-react";
import { motion } from "motion/react";

interface JobItem {
  id: string;
  title: string;
  subTitle: string;
  category: "results" | "admitCards" | "latestJobs";
  posts?: string;
  qualification?: string;
  lastDate?: string;
  applyUrl?: string;
  featured?: boolean;
  hidden?: boolean;
  scrapedFrom?: string;
  createdAt: string;
}

interface AdminJobManagerProps {
  onRefreshJobs: () => void;
  liveJobsList: JobItem[];
  activeMenu: string;
}

export default function AdminJobManager({ onRefreshJobs, liveJobsList, activeMenu }: AdminJobManagerProps) {
  const [pendingQueue, setPendingQueue] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [scraperMessage, setScraperMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Forms & Edit states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubTitle, setNewSubTitle] = useState("Apply Online");
  const [newCategory, setNewCategory] = useState<"results" | "admitCards" | "latestJobs">("latestJobs");
  const [newPosts, setNewPosts] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [newLastDate, setNewLastDate] = useState("");
  const [newApplyUrl, setNewApplyUrl] = useState("");
  const [newFeatured, setNewFeatured] = useState(false);

  // Selector for approving/editing a pending scraped job
  const [editingPendingJob, setEditingPendingJob] = useState<JobItem | null>(null);
  
  // Selector for editing an existing live job
  const [editingLiveJob, setEditingLiveJob] = useState<JobItem | null>(null);

  // Fetch pending scraper queue
  const fetchPendingQueue = async () => {
    try {
      const res = await fetch("/api/scraper/pending");
      if (res.ok) {
        const data = await res.json();
        setPendingQueue(data);
      }
    } catch (err) {
      console.error("Failed to load pending scraper queue:", err);
    }
  };

  useEffect(() => {
    fetchPendingQueue();
  }, [activeMenu]);

  // Trigger Mock Auto-Scraper
  const handleTriggerScraper = async () => {
    setLoading(true);
    setScraperMessage("");
    try {
      const res = await fetch("/api/scraper/trigger", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setScraperMessage(data.message || "Scraper completed successfully.");
        fetchPendingQueue();
        onRefreshJobs();
      }
    } catch (err) {
      setScraperMessage("Scraper connection timed out. Retrying...");
    } finally {
      setLoading(false);
    }
  };

  // Direct approval of scraped job
  const handleDirectApprove = async (job: JobItem) => {
    try {
      const res = await fetch("/api/jobs/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job)
      });
      if (res.ok) {
        fetchPendingQueue();
        onRefreshJobs();
        alert(`"${job.title}" is now successfully live on the portal!`);
      }
    } catch (err) {
      alert("Failed to approve job.");
    }
  };

  // Reject/Delete pending job
  const handleRejectPending = async (id: string) => {
    if (!window.confirm("क्या आप इस स्क्रैप किये गये नोटीफिकेशन को हटाना चाहते हैं?")) return;
    try {
      const res = await fetch("/api/jobs/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        fetchPendingQueue();
      }
    } catch (err) {
      alert("Failed to reject pending job.");
    }
  };

  // Save manual added job
  const handleAddJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch("/api/jobs/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          subTitle: newSubTitle.trim(),
          category: newCategory,
          posts: newPosts.trim() || undefined,
          qualification: newQualification.trim() || undefined,
          lastDate: newLastDate.trim() || undefined,
          applyUrl: newApplyUrl.trim() || undefined,
          featured: newFeatured
        })
      });
      if (res.ok) {
        onRefreshJobs();
        setShowAddForm(false);
        // Reset form
        setNewTitle("");
        setNewSubTitle("Apply Online");
        setNewPosts("");
        setNewQualification("");
        setNewLastDate("");
        setNewApplyUrl("");
        setNewFeatured(false);
        alert("नया सरकारी कार्य सफलतापूर्वक पोर्टल पर जोड़ दिया गया है! ✓");
      }
    } catch (err) {
      alert("Error adding custom job");
    }
  };

  // Edit live job submit
  const handleEditLiveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLiveJob) return;

    try {
      const res = await fetch("/api/jobs/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingLiveJob)
      });
      if (res.ok) {
        onRefreshJobs();
        setEditingLiveJob(null);
        alert("संशोधन सफलतापूर्वक लाइव सेव कर दिया गया है! ✓");
      }
    } catch (err) {
      alert("Failed to edit live job.");
    }
  };

  // Edit and approve pending job submit
  const handleEditPendingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPendingJob) return;

    try {
      const res = await fetch("/api/jobs/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPendingJob)
      });
      if (res.ok) {
        fetchPendingQueue();
        onRefreshJobs();
        setEditingPendingJob(null);
        alert("संशोधित नौकरी सफलतापूर्वक लाइव कर दी गई है! ✓");
      }
    } catch (err) {
      alert("Failed to approve job.");
    }
  };

  // Hard delete a public live job
  const handleDeleteLiveJob = async (id: string) => {
    if (!window.confirm("क्या आप इस लाइव घोषणा/नौकरी को पोर्टल से स्थायी रूप से हटाना चाहते हैं?")) return;
    try {
      const res = await fetch("/api/jobs/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        onRefreshJobs();
      }
    } catch (err) {
      alert("Failed to delete live job.");
    }
  };

  const filteredLiveJobs = liveJobsList.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* =========================================================================
         MENU Tab 1: SCRAPER APPROVALS DESK
         ========================================================================= */}
      {activeMenu === "Job Scraper Approvals" && (
        <div className="space-y-6">
          {/* Header & Scraper control console */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 select-none font-black text-7xl select-none">BOT</div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2.5 rounded-xl bg-orange-600 font-extrabold text-[10px] tracking-wider uppercase">Auto Robot Active</span>
                  <span className="text-[11px] text-slate-300 font-mono">CRON: 5m loop</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">सरकारी वेब स्क्रेपर (Official Central & MP Job Bot)</h3>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  यह रोबोट सरकारी नौकरी बोर्डों (UPSC, SSC, RRB, MPPSC & ESB) की वेबसाइटों से सूचनाएं ऑटो-स्कैन करता है। गलत विज्ञापनों से बचने के लिए, इन्हें सिटिजन बोर्ड पर भेजने से पहले एडमिन की अनुमति आवश्यक है।
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleTriggerScraper}
                  disabled={loading}
                  className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 text-xs font-black transition disabled:opacity-50 flex items-center gap-1.5 shadow-lg shadow-orange-950/40"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>{loading ? "स्कैन हो रहा है (Crawl)..." : "मैन्युअल क्रॉल शुरू करें ⚡"}</span>
                </button>
              </div>
            </div>

            {scraperMessage && (
              <div className="bg-orange-500/10 border border-orange-500/30 text-orange-200 text-xs py-3 px-4 rounded-xl flex items-center gap-2 animate-pulse font-sans font-semibold">
                <Sparkles size={14} />
                <span>{scraperMessage}</span>
              </div>
            )}
          </div>

          {/* Pending Pipeline Counter */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase">वेरिफ़िकेशन हेतु लम्बित घोषणाएं ({pendingQueue.length})</h4>
            <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">Admin Verification Queue</span>
          </div>

          {/* Pending loop */}
          {pendingQueue.length === 0 ? (
            <div className="rounded-2xl border border-dashed text-center py-12 bg-white space-y-2">
              <Sparkles className="mx-auto text-slate-300" size={32} />
              <p className="text-xs font-bold text-slate-500">लंबित विज्ञापनों की संख्या शून्य है।</p>
              <p className="text-[10px] text-slate-400">सभी स्क्रेप की गई वैकेंसियां स्वीकृत हो चुकी हैं और वेबसाइट पर लाइव हैं।</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {pendingQueue.map((job) => (
                <div key={job.id} className="rounded-2xl border border-slate-150 bg-white p-5 hover:shadow-md transition flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] tracking-widest font-mono bg-slate-100 text-slate-600 uppercase font-extrabold px-2 py-0.5 rounded-xl">
                        Source: {job.scrapedFrom || "Government Feed"}
                      </span>
                      <span className="text-[10px] font-bold text-orange-600 font-mono uppercase bg-orange-50 px-2 py-0.5 rounded-xl flex items-center gap-0.5">
                        <Cpu size={10} /> Pending
                      </span>
                    </div>

                    <h5 className="text-sm font-black text-slate-900 tracking-tight leading-snug">{job.title}</h5>
                    
                    <div className="grid grid-cols-2 gap-3 text-[10px] bg-slate-50 p-2.5 rounded-xl font-medium text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[8px] uppercase font-bold">Category</span>
                        <span className="font-bold text-slate-800 capitalize font-mono">{job.category === "latestJobs" ? "Latest Jobs" : job.category === "admitCards" ? "Admit Card" : "Result"}</span>
                      </div>
                      {job.posts && (
                        <div>
                          <span className="text-slate-400 block text-[8px] uppercase font-bold">Total Posts</span>
                          <span className="font-bold text-slate-800 font-sans">{job.posts}</span>
                        </div>
                      )}
                      {job.qualification && (
                        <div className="col-span-2">
                          <span className="text-slate-400 block text-[8px] uppercase font-bold mt-1">Eligibility/Qualification</span>
                          <span className="font-bold text-slate-800 leading-tight block">{job.qualification}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 font-sans pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleDirectApprove(job)}
                      className="flex-1 rounded-xl bg-slate-900 text-white font-extrabold py-2 text-[10px] hover:bg-slate-800 transition shadow"
                    >
                      सीधे स्वीकृत करें ✓
                    </button>
                    <button
                      onClick={() => setEditingPendingJob(job)}
                      className="flex-1 rounded-xl border border-slate-200 text-slate-700 font-bold py-2 text-[10px] hover:bg-slate-50 transition"
                    >
                      संशोधित करें...
                    </button>
                    <button
                      onClick={() => handleRejectPending(job.id)}
                      className="rounded-xl bg-red-50 text-red-600 border border-red-100 font-bold p-2 text-[10px] hover:bg-red-100 transition whitespace-nowrap"
                    >
                      हटाएं ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
         MENU Tab 2: MANAGE JOBS / EXAMS (Manual upload and database manager)
         ========================================================================= */}
      {activeMenu === "Manage Jobs/Exams" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-100 p-6 rounded-3xl border border-slate-200">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">लाईव सूचना संपादक (Exams & Recruiting Board DB Tracker)</h3>
              <p className="text-xs text-slate-500 mt-1">सरकारी भर्ती, प्रवेश पत्र और परिणामों की सम्पूर्ण सूची। यहाँ से मैन्युअल जोड़े अथवा लाइव डाटा बदलें।</p>
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-xs font-bold transition flex items-center gap-1 shrink-0 shadow-lg shadow-indigo-600/20"
            >
              <Plus size={14} />
              <span>मैन्युअल जानकारी जोड़ें (Add Job)</span>
            </button>
          </div>

          {/* Add Job form panel */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-indigo-100 bg-indigo-50/20 p-5 space-y-4"
            >
              <h4 className="text-xs font-black uppercase text-indigo-700 tracking-wider">जोड़ें: नया सरकारी भर्ती/रिजल्ट (Add Custom Job Announcement)</h4>
              
              <form onSubmit={handleAddJobSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">विज्ञप्ति शीर्षक (Title) *</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="उदा. UPSC Civil Services Prelims Online Form"
                      className="w-full rounded-lg border bg-white p-2 text-xs outline-none focus:border-indigo-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">उप-शीर्षक (Sub Title) *</label>
                    <input
                      type="text"
                      required
                      value={newSubTitle}
                      onChange={(e) => setNewSubTitle(e.target.value)}
                      placeholder="उदा. Out / Apply Online"
                      className="w-full rounded-lg border bg-white p-2 text-xs outline-none focus:border-indigo-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">श्रेणी श्रेणी (Category Block)</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full rounded-lg border bg-white p-2 text-xs outline-none"
                    >
                      <option value="latestJobs">Latest Jobs (नवीन सरकारी नौकरियाँ)</option>
                      <option value="admitCards">Admit Cards (परीक्षा प्रवेश पत्र)</option>
                      <option value="results">Results (परीक्षा परिणाम घोषणा)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">कुल पद संख्या (Total Posts)</label>
                    <input
                      type="text"
                      value={newPosts}
                      onChange={(e) => setNewPosts(e.target.value)}
                      placeholder="उदा. 450 Posts"
                      className="w-full rounded-lg border bg-white p-2 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">शैक्षणिक योग्यता (Eligibility)</label>
                    <input
                      type="text"
                      value={newQualification}
                      onChange={(e) => setNewQualification(e.target.value)}
                      placeholder="उदा. 10th Pass / B.Tech Degree"
                      className="w-full rounded-lg border bg-white p-2 text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">आधिकारिक आवेदन लिंक (Official Apply Link URL)</label>
                    <input
                      type="url"
                      value={newApplyUrl}
                      onChange={(e) => setNewApplyUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-lg border bg-white p-2 text-xs outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">अंतिम तिथि (Last Date)</label>
                    <input
                      type="text"
                      value={newLastDate}
                      onChange={(e) => setNewLastDate(e.target.value)}
                      placeholder="उदा. 20 June 2026"
                      className="w-full rounded-lg border bg-white p-2 text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="new-featured"
                    checked={newFeatured}
                    onChange={(e) => setNewFeatured(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                  />
                  <label htmlFor="new-featured" className="text-[11px] font-bold text-slate-700 select-none cursor-pointer">
                    इस विज्ञप्ति को मुख्य ट्रेंडिंग अनुभाग (Featured Banner) पर दर्शित करें
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-indigo-100">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="rounded-lg bg-slate-100 text-slate-600 px-4 py-2 font-bold hover:bg-slate-200 transition"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 text-white px-5 py-2 font-bold hover:bg-indigo-750 transition shadow"
                  >
                    लाइव पब्लिश करें ✓
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Search bar inside admin list section */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-50">
              <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">समस्त सक्रिय/लाइव सरकारी नोटीफिकेशन ({liveJobsList.length})</h4>
              <div className="relative max-w-xs w-full">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 pl-8 pr-4 py-1.5 rounded-xl border-slate-200 text-xs outline-none focus:bg-white focus:border-indigo-400"
                  placeholder="यहाँ लाइव सूचनायें खोजें..."
                />
              </div>
            </div>

            {/* Live List details */}
            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full text-left text-xs border-collapse font-sans font-semibold text-slate-700">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase text-[9px] border-b">
                    <th className="p-3">S.No</th>
                    <th className="p-3">अनाउंसमेंट शीर्षक (Public Title)</th>
                    <th className="p-3">श्रेणी (Category)</th>
                    <th className="p-3">पद / योग्यता (Details)</th>
                    <th className="p-3">स्थिति (Status)</th>
                    <th className="p-3 w-32">क्रियाएं</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLiveJobs.map((job, idx) => (
                    <tr key={job.id} className="border-b hover:bg-slate-55/40 text-xs font-semibold">
                      <td className="p-3 text-slate-400 font-mono">{idx + 1}</td>
                      <td className="p-3 space-y-1 max-w-[260px]">
                        <span className="block font-extrabold text-slate-900 leading-tight">{job.title}</span>
                        {job.applyUrl && (
                          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="block text-[9px] text-indigo-500 font-mono truncate">{job.applyUrl}</a>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`p-1 px-2 text-[8px] font-bold rounded-full font-mono capitalize tracking-wide ${
                          job.category === "results" ? "bg-red-100 text-red-700" :
                          job.category === "admitCards" ? "bg-indigo-105 text-indigo-700" : "bg-emerald-100 text-emerald-700"
                        }`}>{job.category}</span>
                      </td>
                      <td className="p-3 text-[10px] space-y-0.5">
                        {job.posts && <div className="text-slate-800 font-bold block">पद: {job.posts}</div>}
                        {job.qualification && <div className="text-slate-500 truncate max-w-[150px]">योग्यता: {job.qualification}</div>}
                        {job.lastDate && <div className="text-red-500 text-[9px] font-bold font-sans">Last Date: {job.lastDate}</div>}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-1 text-[9px] select-none">
                          {job.featured && (
                            <span className="bg-amber-100 font-bold text-amber-700 px-1.5 py-0.5 rounded-md uppercase tracking-wider block w-max">★ Trending</span>
                          )}
                          {!job.hidden ? (
                            <span className="bg-green-100 font-black text-green-700 px-1.5 py-0.5 rounded-md uppercase tracking-wide block w-max">Public Live ✓</span>
                          ) : (
                            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md uppercase block w-max">Hidden/Draft</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 space-y-1">
                        <div className="flex gap-2.5">
                          <button
                            onClick={() => setEditingLiveJob(job)}
                            className="bg-indigo-50 border border-indigo-100 text-indigo-600 font-extrabold px-2.5 py-1 rounded-lg text-[10px] hover:bg-indigo-100 transition shadow-sm bg-indigo-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteLiveJob(job.id)}
                            className="hover:text-red-700 text-red-500 block text-[10px] bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg py-1 px-2 transition font-black"
                          >
                            ✕ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredLiveJobs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-slate-400 font-semibold text-xs">कोई लाइव वैकेंसी मेल नहीं खाती।</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODAL INLINE EDITOR: EDIT PENDING SCROLLER RECRUITMENT
         ========================================================================= */}
      {editingPendingJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-2xl border max-w-md w-full space-y-4 relative"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="text-sm font-black text-slate-900">संशोधित करें और लाइव स्वीकृति दें</h4>
              <button onClick={() => setEditingPendingJob(null)} className="text-slate-400 hover:text-slate-650 p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditPendingSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">घोषणा शीर्षक (Scraped Job Title) *</label>
                <input
                  type="text"
                  required
                  value={editingPendingJob.title}
                  onChange={(e) => setEditingPendingJob({ ...editingPendingJob, title: e.target.value })}
                  className="w-full rounded-lg border bg-slate-50 border-slate-200 p-2.5 font-bold outline-none text-slate-900 focus:bg-white focus:border-indigo-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">Sub Title (उदा. 150 Posts)</label>
                  <input
                    type="text"
                    value={editingPendingJob.subTitle}
                    onChange={(e) => setEditingPendingJob({ ...editingPendingJob, subTitle: e.target.value })}
                    className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">श्रेणी (Category)</label>
                  <select
                    value={editingPendingJob.category}
                    onChange={(e) => setEditingPendingJob({ ...editingPendingJob, category: e.target.value as any })}
                    className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none"
                  >
                    <option value="latestJobs">Latest Jobs</option>
                    <option value="admitCards">Admit Card</option>
                    <option value="results">Result</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">कुल रिक्तियां (Posts count)</label>
                  <input
                    type="text"
                    value={editingPendingJob.posts || ""}
                    onChange={(e) => setEditingPendingJob({ ...editingPendingJob, posts: e.target.value })}
                    placeholder="उदा. 340 Posts"
                    className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">अंतिम तिथि (Last Date)</label>
                  <input
                    type="text"
                    value={editingPendingJob.lastDate || ""}
                    onChange={(e) => setEditingPendingJob({ ...editingPendingJob, lastDate: e.target.value })}
                    className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">शैक्षणिक और अन्य पात्रता (Eligibility)</label>
                <input
                  type="text"
                  value={editingPendingJob.qualification || ""}
                  onChange={(e) => setEditingPendingJob({ ...editingPendingJob, qualification: e.target.value })}
                  className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">ऑनलाइन अप्लाई URL (Official Apply URL Link)</label>
                <input
                  type="url"
                  value={editingPendingJob.applyUrl || ""}
                  onChange={(e) => setEditingPendingJob({ ...editingPendingJob, applyUrl: e.target.value })}
                  className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t mt-4">
                <button
                  type="button"
                  onClick={() => setEditingPendingJob(null)}
                  className="rounded-xl bg-slate-100 text-slate-600 px-4 py-2 font-bold hover:bg-slate-200 transition"
                >
                  बंद करें
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 font-bold transition shadow shadow-indigo-600/30"
                >
                  स्वीकृत कर पब्लिश करें ✓
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* =========================================================================
         MODAL INLINE EDITOR: EDIT EXISTING PUBLIC LIVE JOBS
         ========================================================================= */}
      {editingLiveJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-2xl border max-w-md w-full space-y-4 relative"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="text-sm font-black text-slate-900">लाइव सरकारी घोषणा संशोधित करें</h4>
              <button onClick={() => setEditingLiveJob(null)} className="text-slate-400 hover:text-slate-650 p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditLiveSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">घोषणा शीर्षक (Official Job Title) *</label>
                <input
                  type="text"
                  required
                  value={editingLiveJob.title}
                  onChange={(e) => setEditingLiveJob({ ...editingLiveJob, title: e.target.value })}
                  className="w-full rounded-lg border bg-slate-50 border-slate-200 p-2.5 font-bold outline-none text-slate-900 focus:bg-white focus:border-indigo-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">Sub Title (उदा. Out)</label>
                  <input
                    type="text"
                    value={editingLiveJob.subTitle}
                    onChange={(e) => setEditingLiveJob({ ...editingLiveJob, subTitle: e.target.value })}
                    className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">श्रेणी (Category)</label>
                  <select
                    value={editingLiveJob.category}
                    onChange={(e) => setEditingLiveJob({ ...editingLiveJob, category: e.target.value as any })}
                    className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none"
                  >
                    <option value="latestJobs">Latest Jobs</option>
                    <option value="admitCards">Admit Card</option>
                    <option value="results">Result</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">कुल रिक्तियां (Posts count)</label>
                  <input
                    type="text"
                    value={editingLiveJob.posts || ""}
                    onChange={(e) => setEditingLiveJob({ ...editingLiveJob, posts: e.target.value })}
                    className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">अंतिम तिथि (Last Date)</label>
                  <input
                    type="text"
                    value={editingLiveJob.lastDate || ""}
                    onChange={(e) => setEditingLiveJob({ ...editingLiveJob, lastDate: e.target.value })}
                    className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">पात्रता / योग्यता (Eligibility)</label>
                <input
                  type="text"
                  value={editingLiveJob.qualification || ""}
                  onChange={(e) => setEditingLiveJob({ ...editingLiveJob, qualification: e.target.value })}
                  className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-[#b5bac1] mb-1">ऑनलाइन अप्लाई URL (Official Apply URL Link)</label>
                <input
                  type="url"
                  value={editingLiveJob.applyUrl || ""}
                  onChange={(e) => setEditingLiveJob({ ...editingLiveJob, applyUrl: e.target.value })}
                  className="w-full rounded-lg border bg-slate-50 p-2 text-slate-900 outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl">
                <div className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={!!editingLiveJob.featured}
                    onChange={(e) => setEditingLiveJob({ ...editingLiveJob, featured: e.target.checked })}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                  />
                  <label htmlFor="edit-featured" className="text-[10px] font-bold text-slate-700 cursor-pointer">Trending Block</label>
                </div>

                <div className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    id="edit-hidden"
                    checked={!!editingLiveJob.hidden}
                    onChange={(e) => setEditingLiveJob({ ...editingLiveJob, hidden: e.target.checked })}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                  />
                  <label htmlFor="edit-hidden" className="text-[10px] font-bold text-slate-700 cursor-pointer">Hide Publicly (ड्राफ्ट)</label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t mt-4">
                <button
                  type="button"
                  onClick={() => setEditingLiveJob(null)}
                  className="rounded-xl bg-slate-100 text-slate-600 px-4 py-2 font-bold hover:bg-slate-200 transition"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 font-bold transition shadow shadow-indigo-600/30"
                >
                  संशोधन सेव करें ✓
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
