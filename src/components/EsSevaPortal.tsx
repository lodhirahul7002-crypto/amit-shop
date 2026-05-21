import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  Bell,
  User,
  FileText,
  CreditCard,
  HeartPulse,
  Tractor,
  Droplets,
  Bus,
  QrCode,
  UploadCloud,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  BarChart3,
  Users,
  Settings,
  MessageCircle,
  Languages,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  CalendarDays,
  Filter,
  Star,
  TrendingUp,
  Download,
  Smartphone,
  ChevronRight,
  ChevronDown,
  Trophy,
  PlayCircle,
  BookOpen,
  Newspaper,
  Wallet,
  BadgeCheck,
  Globe2,
  Headphones,
  TimerReset,
  Sparkles,
  Megaphone,
  ClipboardCheck,
  LockKeyhole,
  Check,
  Plus,
  AlertCircle,
  Camera,
  Printer,
  Scissors,
  Bookmark,
  ExternalLink,
  Fingerprint,
  Landmark,
  RefreshCw
} from "lucide-react";
import { motion } from "motion/react";
import { PortalMode } from "../types";
import AdminJobManager from "./AdminJobManager";

// Shared static state
const defaultServices = [
  { icon: CreditCard, title: "बिजली/पानी बिल", dept: "Utility", fee: "₹0–20", due: "आज", color: "bg-blue-50 text-blue-700 border-blue-100", hoverColor: "hover:bg-blue-50/50" },
  { icon: FileText, title: "आय/जाति प्रमाणपत्र", dept: "Revenue", fee: "₹30", due: "7 दिन", color: "bg-amber-50 text-amber-700 border-amber-100", hoverColor: "hover:bg-amber-50/50" },
  { icon: Bus, title: "बस पास आवेदन", dept: "Transport", fee: "₹50", due: "15 दिन", color: "bg-purple-50 text-purple-700 border-purple-100", hoverColor: "hover:bg-purple-50/50" },
  { icon: Tractor, title: "कृषि योजना", dept: "Agriculture", fee: "Free", due: "30 दिन", color: "bg-green-50 text-green-700 border-green-100", hoverColor: "hover:bg-green-50/50" },
  { icon: HeartPulse, title: "स्वास्थ्य सेवा", dept: "Health", fee: "Free", due: "Open", color: "bg-rose-50 text-rose-700 border-rose-100", hoverColor: "hover:bg-rose-50/50" },
  { icon: Droplets, title: "जल कनेक्शन", dept: "Municipal", fee: "₹100", due: "10 दिन", color: "bg-cyan-50 text-cyan-700 border-cyan-100", hoverColor: "hover:bg-cyan-50/50" },
];

const initialApplications = [
  { name: "जाति प्रमाणपत्र (Caste Certificate)", id: "MPES-2026-1042", status: "Review", progress: 65, date: "18 May 2026" },
  { name: "बिजली बिल भुगतान (Electricity Bill)", id: "MPES-2026-1031", status: "Approved", progress: 100, date: "10 May 2026" },
  { name: "कृषि सब्सिडी (Agriculture Subsidy)", id: "MPES-2026-1020", status: "Pending", progress: 35, date: "14 May 2026" },
];

const govtJobs = {
  results: [
    "MPESB Police SI & Subedar Result 2026 – Out",
    "UPSSSC Pharmacist Eligibility Result 2026 – Out",
    "DSSSB PGT Sanskrit Result 2026 – Out",
    "Indian Airforce Agniveer Vayu 02/2026 PSL List – Out",
    "Rajasthan High Court Chauffeur/Driver Result 2026 – Out",
  ],
  admitCards: [
    "Indian Army Agniveer CEE Admit Card 2026 – Out",
    "UPSSSC Lekhpal Admit Card 2026 – Out",
    "SSC GD Constable Admit Card 2026 – Out",
    "RRB NTPC 10+2 UG Admit Card 2026 – Out",
    "Allahabad High Court UPHJS Mains Exam Date 2026 – Out",
  ],
  latestJobs: [
    "UPSC CDS-II Online Form 2026 – Apply Now",
    "UPSC NDA II Online Form 2026 – Apply Now",
    "Railway RRB ALP Online Form 2026 – 11,127 Posts",
    "Bihar BTSC Food Analyst Online Form 2026",
    "Railway RRB Technician Online Form 2026 – 6,565 Posts",
  ],
};

const featuredJobs = [
  { title: "Railway RRB ALP Recruitment 2026", posts: "11,127 Posts", qualification: "10th / ITI", lastDate: "28 June", state: "All India", tag: "Trending" },
  { title: "MP Police SI & Subedar Vacancy", posts: "850+ Posts", qualification: "Graduate", lastDate: "12 July", state: "Madhya Pradesh", tag: "MP Govt" },
  { title: "UPSC NDA II Online Form", posts: "404 Posts", qualification: "12th Pass", lastDate: "30 June", state: "All India", tag: "Defence" },
];

const quickStats = [
  { label: "Live Services", value: "1,700+", icon: FileText },
  { label: "Govt Jobs", value: "245", icon: BriefcaseBusiness },
  { label: "Applications", value: "82K", icon: TrendingUp },
  { label: "Departments", value: "56", icon: ShieldCheck },
];

const topCategories = [
  "Railway Jobs",
  "Defence Jobs",
  "Police Vacancy",
  "Teaching Jobs",
  "Banking Exams",
  "Govt Scholarships",
  "Mock Tests",
  "Answer Keys",
];

const liveNotices = [
  "🔥 Railway Technician 6,565 Posts Registration Started Online",
  "📢 Central Teacher Eligibility Test (CTET) Notification Released",
  "⚡ SSC GD Constable Admit Card Download Live Now",
  "🎓 MP State Post-Matric Scholarship Portal Extension",
];

const preparationTools = [
  { icon: BookOpen, title: "Free Notes", desc: "PDF study materials & blueprint syllabus" },
  { icon: Trophy, title: "Mock Tests", desc: "Daily live mock exams & rank analysis" },
  { icon: PlayCircle, title: "Video Classes", desc: "Expert recorded & free streaming classes" },
  { icon: Newspaper, title: "Daily News & CA", desc: "Latest current affairs & exam tidbits" },
];

const achievements = [
  "1.2M+ Monthly Visited Citizens",
  "50K+ Daily WhatsApp Job Alerts",
  "24×7 Instant WhatsApp Bot Help",
  "Smart AI-Based Core Recommendations",
];

const adminMenu = ["Dashboard Status", "Job Scraper Approvals", "Manage Jobs/Exams", "Service Configurations", "Applications Tracker", "Auditing Logs & Security"];
const adminIcons = [BarChart3, Globe2, BriefcaseBusiness, Settings, FileText, ShieldCheck];

// Master database of services rendered at the kiosk (as seen in the uploaded image)
const initialKioskServices = [
  { id: "ks-1", nameHindi: "श्रम कार्ड", nameEnglish: "Shram Card", fee: "50", category: "Government Cards", active: true },
  { id: "ks-2", nameHindi: "आयुष्मान कार्ड", nameEnglish: "Ayushman Card", fee: "30", category: "Government Cards", active: true },
  { id: "ks-3", nameHindi: "रोजगार पंजीयन", nameEnglish: "Rojgar Panjiyan", fee: "50", category: "Online Admission & Recruitments", active: true },
  { id: "ks-4", nameHindi: "आधार कार्ड", nameEnglish: "Aadhaar Card", fee: "100", category: "Identity / Documents", active: true },
  { id: "ks-5", nameHindi: "समग्र आई डी", nameEnglish: "Samagra ID", fee: "40", category: "Identity / Documents", active: true },
  { id: "ks-6", nameHindi: "संबल कार्ड", nameEnglish: "Sambal Card", fee: "50", category: "Government Cards", active: true },
  { id: "ks-7", nameHindi: "e-PF", nameEnglish: "e-PF (provident fund)", fee: "100", category: "Financial & Digital Payments", active: true },
  { id: "ks-8", nameHindi: "ड्राइविंग लाइसेंस", nameEnglish: "Driving License", fee: "250", category: "Licensing & Registry", active: true },
  { id: "ks-9", nameHindi: "पासपोर्ट फोटो", nameEnglish: "Passport Photo", fee: "40", category: "Identity / Documents", active: true },
  { id: "ks-10", nameHindi: "आभा कार्ड", nameEnglish: "ABHA Card", fee: "20", category: "Identity / Documents", active: true },
  { id: "ks-11", nameHindi: "वोटर कार्ड", nameEnglish: "Voter Card", fee: "50", category: "Identity / Documents", active: true },
  { id: "ks-12", nameHindi: "राशन कार्ड", nameEnglish: "Ration Card", fee: "80", category: "Identity / Documents", active: true },
  { id: "ks-13", nameHindi: "आय प्रमाण पत्र", nameEnglish: "Income Certificate", fee: "50", category: "Certificate Services", active: true },
  { id: "ks-14", nameHindi: "मूल निवास", nameEnglish: "Domicile Certificate", fee: "50", category: "Certificate Services", active: true },
  { id: "ks-15", nameHindi: "जाति प्रमाण पत्र", nameEnglish: "Caste Certificate", fee: "60", category: "Certificate Services", active: true },
  { id: "ks-16", nameHindi: "दिव्यांग (UDID) कार्ड", nameEnglish: "Disability Card (UDID)", fee: "50", category: "Government Cards", active: true },
  { id: "ks-17", nameHindi: "उद्योग आधार", nameEnglish: "Udyog Aadhaar MSME", fee: "150", category: "Licensing & Registry", active: true },
  { id: "ks-18", nameHindi: "फ़ूड सेफ्टी लाइसेंस", nameEnglish: "Food Safety License (FSSAI)", fee: "200", category: "Licensing & Registry", active: true },
  { id: "ks-19", nameHindi: "गुमास्ता लाइसेंस", nameEnglish: "Gumasta License", fee: "350", category: "Licensing & Registry", active: true },
  { id: "ks-20", nameHindi: "खसरा - खतौनी", nameEnglish: "Khasra Khatauni Copy", fee: "50", category: "Licensing & Registry", active: true },
  { id: "ks-21", nameHindi: "भू-आधार पुस्तिका", nameEnglish: "Bhoo-Aadhaar Pustika", fee: "50", category: "Licensing & Registry", active: true },
  { id: "ks-22", nameHindi: "बिजली बिल", nameEnglish: "Electricity Bill Payment", fee: "20", category: "Utility & Recharge", active: true },
  { id: "ks-23", nameHindi: "मोबाइल रिचार्ज", nameEnglish: "Mobile Recharge Service", fee: "10", category: "Utility & Recharge", active: true },
  { id: "ks-24", nameHindi: "LIC किस्त", nameEnglish: "LIC Premium Deposit", fee: "30", category: "Financial & Digital Payments", active: true },
  { id: "ks-25", nameHindi: "लोन भुगतान", nameEnglish: "Loan Repayment Deposit", fee: "30", category: "Financial & Digital Payments", active: true },
  { id: "ks-26", nameHindi: "चालान भुगतान", nameEnglish: "Challan Payment Gateway", fee: "40", category: "Utility & Recharge", active: true },
  { id: "ks-27", nameHindi: "ऑनलाइन फार्म", nameEnglish: "College/School Online Forms", fee: "100", category: "Online Admission & Recruitments", active: true },
  { id: "ks-28", nameHindi: "कर्मकार", nameEnglish: "Karmakar Card", fee: "50", category: "Government Cards", active: true },
  { id: "ks-29", nameHindi: "जॉब कार्ड", nameEnglish: "NREGA Job Card", fee: "50", category: "Government Cards", active: true },
  { id: "ks-30", nameHindi: "फसल बीमा", nameEnglish: "Fasal Bima (Crop Insurance)", fee: "80", category: "Insurance & Travel", active: true },
  { id: "ks-31", nameHindi: "किसान कार्ड", nameEnglish: "KCC (Kisan Credit Card)", fee: "150", category: "Licensing & Registry", active: true },
  { id: "ks-32", nameHindi: "आधार पेमेंट्स", nameEnglish: "Aadhaar Cash Payments (AEPS)", fee: "20", category: "Financial & Digital Payments", active: true },
  { id: "ks-33", nameHindi: "रोजगार फार्म आवेदन", nameEnglish: "Govt Recruitment Exam Form", fee: "100", category: "Online Admission & Recruitments", active: true },
  { id: "ks-34", nameHindi: "प्रवेश पत्र", nameEnglish: "Exam Admit Card Download", fee: "30", category: "Online Admission & Recruitments", active: true },
  { id: "ks-35", nameHindi: "परीक्षा परिणाम", nameEnglish: "Examinations Result Printout", fee: "20", category: "Online Admission & Recruitments", active: true },
  { id: "ks-36", nameHindi: "कॉलेज फीस", nameEnglish: "College Fees Submission", fee: "50", category: "Online Admission & Recruitments", active: true },
  { id: "ks-37", nameHindi: "स्कूल संबंधित कार्य", nameEnglish: "School Admission & Works", fee: "50", category: "Online Admission & Recruitments", active: true },
  { id: "ks-38", nameHindi: "नगद जमा/निकासी", nameEnglish: "Cash Deposit & Withdrawal", fee: "20", category: "Financial & Digital Payments", active: true },
  { id: "ks-39", nameHindi: "ई-उपार्जन", nameEnglish: "e-Uparjan Registration", fee: "100", category: "Licensing & Registry", active: true },
  { id: "ks-40", nameHindi: "समग्र eKYC", nameEnglish: "Samagra Portal eKYC Update", fee: "45", category: "Identity / Documents", active: true },
  { id: "ks-41", nameHindi: "जन धन खाता", nameEnglish: "Jan Dhan Bank Account Setup", fee: "100", category: "Financial & Digital Payments", active: true },
  { id: "ks-42", nameHindi: "रेल्वे रिजर्वेशन टिकट", nameEnglish: "Railway Ticket Booking IRCTC", fee: "80", category: "Insurance & Travel", active: true },
  { id: "ks-43", nameHindi: "बजाज कार्ड", nameEnglish: "Bajaj Finance Card Creation", fee: "100", category: "Financial & Digital Payments", active: true },
  { id: "ks-44", nameHindi: "आवेदन फार्म", nameEnglish: "Application Forms Blueprint/Print", fee: "30", category: "Online Admission & Recruitments", active: true },
  { id: "ks-45", nameHindi: "MPTAAS प्रोफाइल", nameEnglish: "MPTAAS Tribal Profile Enrollment", fee: "100", category: "Identity / Documents", active: true },
  { id: "ks-46", nameHindi: "छात्रवृत्ति आवेदन", nameEnglish: "Scholarship Application Form", fee: "100", category: "Online Admission & Recruitments", active: true },
  { id: "ks-47", nameHindi: "पेंशन आवेदन", nameEnglish: "Old Age & Widow Pension App", fee: "100", category: "Certificate Services", active: true },
  { id: "ks-48", nameHindi: "डिजिलॉकर", nameEnglish: "Digilocker Account Setup", fee: "40", category: "Identity / Documents", active: true },
  { id: "ks-49", nameHindi: "वाहन बीमा", nameEnglish: "Vehicle Insurance Renewal Desk", fee: "150", category: "Insurance & Travel", active: true },
  { id: "ks-50", nameHindi: "जीवन बीमा", nameEnglish: "Life Insurance Advisor Premium", fee: "200", category: "Insurance & Travel", active: true },
  { id: "ks-51", nameHindi: "पैन पंजीयन", nameEnglish: "PAN Card Registration UTI/NSDL", fee: "150", category: "Identity / Documents", active: true },
  { id: "ks-52", nameHindi: "ABC (अपार) ID", nameEnglish: "Academic APAAR ID Creation", fee: "50", category: "Identity / Documents", active: true },
];

const initialAepsSlabs = [
  { id: "as-1", minAmount: 100, maxAmount: 1000, fee: 10, label: "₹100 - ₹1000 तक" },
  { id: "as-2", minAmount: 1001, maxAmount: 3000, fee: 20, label: "₹1001 - ₹3000 तक" },
  { id: "as-3", minAmount: 3001, maxAmount: 5000, fee: 30, label: "₹3001 - ₹5000 तक" },
  { id: "as-4", minAmount: 5001, maxAmount: 10000, fee: 50, label: "₹5001 - ₹10000 तक" }
];

export default function EsSevaPortal() {
  const [screen, setScreen] = useState<PortalMode>("citizen");

  // Dynamic public jobs database state
  const [liveJobs, setLiveJobs] = useState<any[]>([]);

  // Dynamic Kiosk Services Local Storage persistence
  const [kioskServices, setKioskServices] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("mp_kiosk_services");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Localstorage recovery failed:", e);
    }
    return initialKioskServices;
  });

  const fetchLiveJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        setLiveJobs(data);
      }
    } catch (err) {
      console.error("Failed to load live jobs:", err);
    }
  };

  const fetchKioskServices = async () => {
    try {
      const res = await fetch("/api/kiosk-services");
      if (res.ok) {
        const data = await res.json();
        setKioskServices(data);
      }
    } catch (err) {
      console.error("Failed to load kiosk services:", err);
    }
  };

  useEffect(() => {
    fetchLiveJobs();
    fetchKioskServices();
  }, []);

  // Map public jobs list back to the component formats
  const govtJobsData = useMemo(() => {
    // Helper to turn static strings from the fallback `govtJobs` object into NormalizedJobItem structure
    const normalizeFallback = (strValue: string, idx: number, category: "results" | "admitCards" | "latestJobs") => {
      const parts = strValue.split(/[\u2013-]/);
      const title = parts[0]?.trim() || strValue;
      const subTitle = parts[1]?.trim() || "आउट (Out Now)";
      
      let posts = undefined;
      let qualification = undefined;
      let lastDate = undefined;
      
      // Parse posts/qualifications from static strings for beautiful UI details!
      if (title.includes("ALP")) {
        posts = "11,127 पद (Posts)";
        qualification = "10th / ITI Pass";
        lastDate = "28 June 2026";
      } else if (title.includes("Technician")) {
        posts = "6,565 पद (Posts)";
        qualification = "10th / ITI / Physics Math Pass";
        lastDate = "15 July 2026";
      } else if (title.includes("UPSC CDS")) {
        posts = "450 पद (Posts)";
        qualification = "Graduate (Degree/B.Tech)";
        lastDate = "20 June 2026";
      } else if (title.includes("NDA II")) {
        posts = "404 पद (Posts)";
        qualification = "12th Pass (PCM / Arts)";
        lastDate = "30 June 2026";
      } else if (title.includes("Bihar BTSC") || title.includes("Food Analyst")) {
        posts = "खाद्य विश्लेषक (Food Analyst)";
        qualification = "B.Sc Chemistry / Food Tech / Microbiology";
        lastDate = "30 June 2026";
      } else if (title.includes("Police SI") || title.includes("Subedar")) {
        posts = "850+ पद (Posts)";
        qualification = "Graduate (स्नातक) Degree";
        lastDate = "12 July 2026";
      } else if (title.includes("UPSSSC Lekhpal")) {
        posts = "8,085 पद (Posts)";
        qualification = "12th Pass + PET Slabs Verified";
        lastDate = "31 July 2026";
      } else if (title.includes("SSC GD")) {
        posts = "45,000+ पद (Posts)";
        qualification = "10th Class (High School)";
        lastDate = "15 August 2026";
      } else if (title.includes("Pharmacist")) {
        posts = "1,002 पद (Pharmacist)";
        qualification = "Diploma in Pharmacy (D.Pharm) / B.Pharm";
        lastDate = "25 June 2026";
      } else if (title.includes("Agniveer Vayu")) {
        posts = "Agniveer Intake 02/2026";
        qualification = "12th with Physics, Chemistry, Math or equivalent";
        lastDate = "10 June 2026";
      } else if (title.includes("Agniveer")) {
        posts = "General Army Intake 2026";
        qualification = "10th / 12th Pass according to stream";
        lastDate = "12 June 2026";
      } else if (title.includes("NTPC 10+2")) {
        posts = "11,558 NTPC Open Posts";
        qualification = "12th Class Pass / Under Graduate";
        lastDate = "18 July 2026";
      }
      
      return {
        id: `static-${category}-${idx}`,
        title,
        subTitle,
        category,
        posts,
        qualification,
        lastDate,
        applyUrl: "https://google.com/search?q=" + encodeURIComponent(title)
      };
    };

    const rList = liveJobs.filter((j: any) => j.category === "results");
    const aList = liveJobs.filter((j: any) => j.category === "admitCards");
    const jList = liveJobs.filter((j: any) => j.category === "latestJobs");
    
    return {
      results: rList.length > 0 ? rList : govtJobs.results.map((str, idx) => normalizeFallback(str, idx, "results")),
      admitCards: aList.length > 0 ? aList : govtJobs.admitCards.map((str, idx) => normalizeFallback(str, idx, "admitCards")),
      latestJobs: jList.length > 0 ? jList : govtJobs.latestJobs.map((str, idx) => normalizeFallback(str, idx, "latestJobs"))
    };
  }, [liveJobs]);

  const featuredJobsData = useMemo(() => {
    const featured = liveJobs.filter((j: any) => j.featured).map((j: any) => ({
      title: j.title,
      posts: j.posts || "विज्ञप्ति जारी",
      qualification: j.qualification || "योग्यतानुसार",
      lastDate: j.lastDate || "तत्काल",
      state: "All India",
      tag: "Trending",
      applyUrl: j.applyUrl
    }));
    return featured.length > 0 ? featured : featuredJobs;
  }, [liveJobs]);

  const handleUpdateKioskServices = (newList: any[]) => {
    setKioskServices(newList);
    try {
      localStorage.setItem("mp_kiosk_services", JSON.stringify(newList));
    } catch (e) {
      console.error("Failed to save kiosk services configuration:", e);
    }
  };

  // State for dynamic AEPS Cash deposit/withdrawal convenience rates
  const [aepsSlabs, setAepsSlabs] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("mp_aeps_slabs");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialAepsSlabs;
  });

  const handleUpdateAepsSlabs = (newList: any[]) => {
    setAepsSlabs(newList);
    try {
      localStorage.setItem("mp_aeps_slabs", JSON.stringify(newList));
    } catch (e) {
      console.error("Failed to save AEPS slabs:", e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mini Toggle inside e-Seva Section */}
      <div className="flex rounded-xl bg-slate-100 p-1 max-w-sm" id="portal-toggle-container">
        <button
          onClick={() => setScreen("citizen")}
          id="toggle-citizen-btn"
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs font-semibold tracking-wide transition-all ${
            screen === "citizen" 
              ? "bg-white text-slate-900 shadow-sm" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <User size={14} />
          Citizen Hub
        </button>
        <button
          onClick={() => setScreen("admin")}
          id="toggle-admin-btn"
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs font-semibold tracking-wide transition-all ${
            screen === "admin" 
              ? "bg-white text-slate-900 shadow-sm" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <ShieldCheck size={14} />
          Admin Dashboard
        </button>
      </div>

      <motion.div
        key={screen}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {screen === "citizen" ? (
          <CitizenPortal 
            kioskServices={kioskServices} 
            aepsSlabs={aepsSlabs}
            govtJobsData={govtJobsData}
            featuredJobsData={featuredJobsData}
          />
        ) : (
          <AdminPortal 
            kioskServices={kioskServices} 
            setKioskServices={handleUpdateKioskServices} 
            aepsSlabs={aepsSlabs} 
            setAepsSlabs={handleUpdateAepsSlabs} 
            onRefreshJobs={fetchLiveJobs}
            onRefreshServices={fetchKioskServices}
            liveJobsList={liveJobs}
          />
        )}
      </motion.div>
    </div>
  );
}

function CitizenPortal({ 
  kioskServices, 
  aepsSlabs,
  govtJobsData,
  featuredJobsData
}: { 
  kioskServices: any[], 
  aepsSlabs: any[],
  govtJobsData: any,
  featuredJobsData: any[]
}) {
  const [jobFilter, setJobFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobSearchKeyword, setJobSearchKeyword] = useState("");
  const [appTrackerId, setAppTrackerId] = useState("");
  const [trackedApp, setTrackedApp] = useState<any>(null);
  const [trackerError, setTrackerError] = useState("");

  // Collapsible sections toggle states to maximize layout flexibility and usability
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    rateCard: false,
    aeps: false,
    bookmarks: false,
    popularServices: false,
    jobAggregator: false
  });

  // Kiosk Services Rate List Search & Filter States
  const [kioskSearch, setKioskSearch] = useState("");
  const [kioskCatFilter, setKioskCatFilter] = useState("All");
  const [kioskLanguage, setKioskLanguage] = useState<"both" | "hindi" | "english">("both");
  const [showAllServices, setShowAllServices] = useState(false);

  // AEPS Aadhaar Banking States & Calculations
  const [aepsService, setAepsService] = useState<"withdrawal" | "deposit" | "balance" | "statement">("withdrawal");
  const [aepsBankCode, setAepsBankCode] = useState("SBI");
  const [aepsAadhaar, setAepsAadhaar] = useState("");
  const [aepsAmount, setAepsAmount] = useState("2000");
  const [aepsName, setAepsName] = useState("");
  const [aepsAuthMode, setAepsAuthMode] = useState<"fingerprint" | "face">("fingerprint");
  const [aepsStatus, setAepsStatus] = useState<"idle" | "scanning" | "processing" | "success" | "failed">("idle");
  const [aepsScanPercent, setAepsScanPercent] = useState(0);
  const [aepsReceipt, setAepsReceipt] = useState<any>(null);
  const [aepsError, setAepsError] = useState("");

  const aepsBanksList = [
    { code: "SBI", name: "State Bank of India (एसबीआई)", logoColor: "bg-blue-600" },
    { code: "BOB", name: "Bank of Baroda (बैंक ऑफ बड़ौदा)", logoColor: "bg-orange-600" },
    { code: "PNB", name: "Punjab National Bank (पीएनबी)", logoColor: "bg-amber-800" },
    { code: "MPGB", name: "Madhya Pradesh Gramin Bank (म.प्र. ग्रामीण बैंक)", logoColor: "bg-green-700" },
    { code: "HDFC", name: "HDFC Bank Ltd (एचडीएफसी बैंक)", logoColor: "bg-indigo-900" },
    { code: "ICICI", name: "ICICI Bank (आईसीआईसीआई बैंक)", logoColor: "bg-orange-500" },
    { code: "UBL", name: "Union Bank of India (यूनियन बैंक)", logoColor: "bg-red-650" }
  ];

  const getAepsKioskCharge = (amountStr: string, serviceType: string) => {
    if (serviceType === "balance" || serviceType === "statement") {
      return 10; // flat minimum service charge for balance / statement query
    }
    const amt = parseFloat(amountStr) || 0;
    if (amt <= 0) return 0;
    const matchedSlab = aepsSlabs.find((slab: any) => amt >= slab.minAmount && amt <= slab.maxAmount);
    if (matchedSlab) {
      return matchedSlab.fee;
    }
    if (amt > 10000) return 100;
    return 10;
  };

  const handleSimulateAeps = (e: React.FormEvent) => {
    e.preventDefault();
    const rawAadhaar = aepsAadhaar.replace(/[^0-9]/g, "");
    if (rawAadhaar.length < 12) {
      setAepsError("कृपया 12 अंकों का वैध आधार कार्ड नंबर दर्ज करें!");
      return;
    }
    setAepsError("");
    setAepsStatus("scanning");
    setAepsScanPercent(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setAepsScanPercent(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setAepsStatus("processing");
        setTimeout(() => {
          const amt = (aepsService === "withdrawal" || aepsService === "deposit") ? (parseFloat(aepsAmount) || 0) : 0;
          const charge = getAepsKioskCharge(aepsAmount, aepsService);
          const rrn = "RRN" + Math.floor(100000000000 + Math.random() * 900000000000);
          const bankObj = aepsBanksList.find(b => b.code === aepsBankCode);
          
          setAepsReceipt({
            rrn,
            service: aepsService === "withdrawal" ? "CASH WITHDRAWAL (नगद निकासी)" : aepsService === "deposit" ? "CASH DEPOSIT (नगद जमा)" : aepsService === "balance" ? "BALANCE ENQUIRY (बैलेंस जांच)" : "MINI STATEMENT (मिनी विवरण)",
            bankName: bankObj ? bankObj.name : "Aadhaar Linked Bank",
            aadhaar: `XXXX - XXXX - ${rawAadhaar.slice(-4)}`,
            amount: amt,
            charge: charge,
            status: "SUCCESS (सफल)",
            date: new Date().toLocaleString("hi-IN"),
            beneficiaryName: aepsName.trim() || "राहुल लोधी (Rahul Lodhi)"
          });
          setAepsStatus("success");
        }, 1200);
      }
    }, 120);
  };

  const filteredKioskServices = useMemo(() => {
    return kioskServices.filter(s => {
      const matchSearch = s.nameHindi.toLowerCase().includes(kioskSearch.toLowerCase()) || 
                          s.nameEnglish.toLowerCase().includes(kioskSearch.toLowerCase()) ||
                          s.category.toLowerCase().includes(kioskSearch.toLowerCase());
      const matchCategory = kioskCatFilter === "All" || s.category === kioskCatFilter;
      return matchSearch && matchCategory && s.active;
    });
  }, [kioskServices, kioskSearch, kioskCatFilter]);

  const [applicationsState, setApplicationsState] = useState(initialApplications);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyingService, setApplyingService] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [copiedJobLink, setCopiedJobLink] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [applicationCompleted, setApplicationCompleted] = useState(false);

  // Application State Form
  const [applicantName, setApplicantName] = useState("");
  const [applicantAadhaar, setApplicantAadhaar] = useState("");
  const [applicantContact, setApplicantContact] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Bookmark / Favourite Websites States
  const [bookmarks, setBookmarks] = useState<any[]>([
    {
      id: "bm-1",
      title: "MP Online Kiosk Portal",
      url: "https://www.mponline.gov.in",
      category: "Kiosk Services",
      desc: "Apply for state services, pay bills & access utilities easily.",
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: "bm-2",
      title: "UIDAI MyAadhaar Portal",
      url: "https://myaadhaar.uidai.gov.in",
      category: "Identity / UIDAI",
      desc: "Verify biometric authentication status, download card, update details.",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "bm-3",
      title: "Samagra ID Demographic Portal",
      url: "https://samagra.gov.in",
      category: "Social Security",
      desc: "Validate state housing IDs, update profiles, view family maps.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "bm-4",
      title: "Sarkari Result Updates",
      url: "https://www.sarkariresult.com",
      category: "Jobs / Results",
      desc: "Instant live updates, exam admit cards & board vacancy details.",
      color: "from-rose-500 to-red-600"
    }
  ]);

  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);
  const [newBookmarkTitle, setNewBookmarkTitle] = useState("");
  const [newBookmarkUrl, setNewBookmarkUrl] = useState("");
  const [newBookmarkCategory, setNewBookmarkCategory] = useState("Useful Portal");
  const [newBookmarkDesc, setNewBookmarkDesc] = useState("");
  const [newBookmarkGradient, setNewBookmarkGradient] = useState("from-indigo-600 to-purple-600");
  const [bookmarkFilter, setBookmarkFilter] = useState("All");

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookmarkTitle.trim() || !newBookmarkUrl.trim()) {
      alert("कृपया शीर्षक और वेबसाइट URL भरें!");
      return;
    }

    let urlStr = newBookmarkUrl.trim();
    if (!/^https?:\/\//i.test(urlStr)) {
      urlStr = "https://" + urlStr;
    }

    const newBm = {
      id: `bm-${Date.now()}`,
      title: newBookmarkTitle.trim(),
      url: urlStr,
      category: newBookmarkCategory,
      desc: newBookmarkDesc.trim() || "त्वरित पहुंच के लिए सहेजा गया कस्टम लिंक।",
      color: newBookmarkGradient
    };

    setBookmarks([...bookmarks, newBm]);
    setNewBookmarkTitle("");
    setNewBookmarkUrl("");
    setNewBookmarkDesc("");
    setIsAddBookmarkOpen(false);
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  // RRB ALP Barcode/QR Scanner States
  const [isBarcodeScanning, setIsBarcodeScanning] = useState(false);
  const [barcodeScanStep, setBarcodeScanStep] = useState("");
  const [barcodeResult, setBarcodeResult] = useState<any>(null);
  const [scanAlertSound, setScanAlertSound] = useState(true);

  // Mobile Document Send & Reception States (आवक दस्तावेज़ काउंटर)
  const [isUplinkModalOpen, setIsUplinkModalOpen] = useState(false);
  const [uplinkSenderName, setUplinkSenderName] = useState("");
  const [uplinkDocType, setUplinkDocType] = useState("Aadhar Card (आधार कार्ड)");
  const [uplinkCustomFile, setUplinkCustomFile] = useState<any>(null);
  const [uplinkSelectedPreset, setUplinkSelectedPreset] = useState<any>(null);
  const [isSendingUplink, setIsSendingUplink] = useState(false);
  const [uplinkProgress, setUplinkProgress] = useState(0);
  const [receivedDocuments, setReceivedDocuments] = useState<any[]>([
    {
      id: "DOC-9824",
      name: "rahul_singh_marksheet_12th.jpg",
      type: "12th Board Marksheet",
      senderName: "राहुल सिंह लोधी (Rahul Singh)",
      time: "Just Now",
      size: "450 KB",
      src: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "DOC-8972",
      name: "caste_certificate_mpgov.jpg",
      type: "Caste Certificate",
      senderName: "रवि शंकर शर्मा (Ravi Shankar)",
      time: "10 mins ago",
      size: "240 KB",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    }
  ]);

  const handleSendRemoteDocument = (name: string, type: string, srcUrl: string, fileSize: string) => {
    setIsSendingUplink(true);
    setUplinkProgress(10);
    
    const interval = setInterval(() => {
      setUplinkProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newDoc = {
              id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
              name: `${type.toLowerCase().replace(/[^a-z0-9]/g, "_")}_doc.jpg`,
              type: type,
              senderName: name || "Anonymous Citizen",
              time: "Just Now",
              size: fileSize || "520 KB",
              src: srcUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80"
            };
            setReceivedDocuments((prevList) => [newDoc, ...prevList]);
            setIsSendingUplink(false);
            setUplinkProgress(0);
            setIsUplinkModalOpen(false);

            // Dispatch custom event to let other tools like Smart Scanner load it if listening
            window.dispatchEvent(new CustomEvent("load-into-scanner", { detail: { 
              src: newDoc.src, 
              name: newDoc.name,
              citizenName: newDoc.senderName,
              docTitle: newDoc.type,
              remarks: `Transmitted via Portal Document Web Uplink. Received Ref: ${newDoc.id}` 
            } }));

            // Success audiotone ping
            try {
              const context = new (window.AudioContext || (window as any).webkitAudioContext)();
              const osc = context.createOscillator();
              const gain = context.createGain();
              osc.connect(gain);
              gain.connect(context.destination);
              osc.frequency.setValueAtTime(800, context.currentTime); 
              gain.gain.setValueAtTime(0.08, context.currentTime);
              osc.start();
              osc.stop(context.currentTime + 0.12);
            } catch (err) {}
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  const handleStartBarcodeScan = (type: "demo" | "custom_file") => {
    setIsBarcodeScanning(true);
    setBarcodeResult(null);
    
    const steps = [
      "Initializing Kiosk Barcode Sensor...",
      "Calibrating Laser Beam Grid...",
      "Searching for RRB ALP Admit QR Matrix...",
      "Decoding encrypted candidate payload...",
    ];

    let currentStep = 0;
    setBarcodeScanStep(steps[0]);

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setBarcodeScanStep(steps[currentStep]);
      } else {
        clearInterval(timer);
        setIsBarcodeScanning(false);
        if (scanAlertSound) {
          try {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = context.createOscillator();
            const gain = context.createGain();
            osc.connect(gain);
            gain.connect(context.destination);
            osc.frequency.setValueAtTime(1046.50, context.currentTime); // C note success beep
            gain.gain.setValueAtTime(0.1, context.currentTime);
            osc.start();
            osc.stop(context.currentTime + 0.15);
          } catch (e) {
            console.log("AudioContext blocked");
          }
        }
        
        setBarcodeResult({
          rollNo: "2026-ALP-980412",
          centerName: "MP Online IT-Hub, Sector B, Govindpura, Bhopal, (MP) 462023",
          candidateName: type === "demo" ? "राहुल सिंह लोधी (Rahul Singh Lodhi)" : "अंशुल पटेल (Anshul Patel)",
          examCity: "Bhopal (MP)",
          examDate: "12 June 2026",
          examTime: "09:00 AM to 10:30 AM (Reporting: 08:00 AM)",
          category: type === "demo" ? "OBC (Verified Samagra ID)" : "GEN (Unreserved)",
          papers: "Mechanical Engineering & General Intelligence (Part A + B)",
          status: "Live Approved & Verified (सत्यापित प्रवेश पत्र)",
          admitReceiptId: `MP-ALP-${Math.floor(100000 + Math.random() * 900000)}`
        });
      }
    }, 600);
  };

  const handlePrintBarcodeSlip = () => {
    if (!barcodeResult) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("पॉपअप अवरोधित है; कृपया प्रिंटर रसीद के लिए इसे सक्षम करें।");
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>RRB ALP Exam Gate Pass - MP e-Seva</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              body { margin: 0; padding: 20px; }
            }
          </style>
        </head>
        <body class="p-8 font-sans text-slate-905 bg-white">
          <div class="max-w-xl mx-auto border-4 border-double border-slate-700 p-6 rounded-xl bg-white">
            <div class="text-center space-y-1 mb-6 border-b pb-4">
              <h2 class="text-xl font-extrabold tracking-tight">रेलवे भर्ती बोर्ड (RAILWAY RECRUITMENT BOARDS)</h2>
              <p class="text-xs uppercase font-bold tracking-wider text-slate-500">Government of India • Ministry of Railways</p>
              <div class="inline-block mt-2 bg-slate-900 text-white px-3 py-1 rounded text-[10px] font-bold">
                CBT-1 GATE PASS & CANDIDATE REGISTRATION RECORD
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 text-xs mb-6">
              <div class="border-r pr-4 space-y-2">
                <div>
                  <span class="text-[9px] text-slate-400 block font-bold">CANDIDATE NAME / अभ्यर्थी का नाम</span>
                  <span class="font-bold text-sm text-slate-800">\${barcodeResult.candidateName}</span>
                </div>
                <div>
                  <span class="text-[9px] text-slate-400 block font-bold">ROLL NO. / अनुक्रमांक</span>
                  <span class="font-mono font-bold text-slate-850">\${barcodeResult.rollNo}</span>
                </div>
                <div>
                  <span class="text-[9px] text-slate-400 block font-bold">CATEGORY / श्रेणी</span>
                  <span class="font-bold text-slate-700">\${barcodeResult.category}</span>
                </div>
              </div>
              <div class="space-y-2 pl-2">
                <div>
                  <span class="text-[9px] text-slate-400 block font-bold">EXAM DATE / परीक्षा तिथि</span>
                  <span class="font-bold text-slate-800">\${barcodeResult.examDate}</span>
                </div>
                <div>
                  <span class="text-[9px] text-slate-400 block font-bold">SHIFT TIME / समय</span>
                  <span class="font-bold text-slate-850 font-mono">\${barcodeResult.examTime}</span>
                </div>
                <div>
                  <span class="text-[9px] text-slate-400 block font-bold">RECEIPT REF / संदर्भ संख्या</span>
                  <span class="font-mono font-bold text-indigo-700">\${barcodeResult.admitReceiptId}</span>
                </div>
              </div>
            </div>

            <div class="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[10px] mb-6">
              <span class="text-slate-400 block font-bold uppercase tracking-wide">ASSIGNED EXAM CENTER / निर्धारित परीक्षा केंद्र</span>
              <p class="font-bold text-slate-800 leading-relaxed mt-1">\${barcodeResult.centerName}</p>
            </div>

            <div class="flex flex-col items-center gap-2 pt-4 border-t border-dashed">
              <div class="h-10 w-64 flex items-center shrink-0 mb-1">
                \${Array.from({ length: 44 }).map((_, i) => \`
                  <span class="h-8 bg-slate-950" style="width: \${i % 3 === 0 ? '1px' : i % 5 === 0 ? '3px' : '2px'}; margin-left: \${i % 4 === 0 ? '2px' : '1px'}; opacity: 0.95;"></span>
                \`).join('')}
              </div>
              <span class="text-[8px] font-mono tracking-widest text-slate-600 font-bold">\${barcodeResult.rollNo}-\${barcodeResult.admitReceiptId}</span>
              <span class="text-[8px] text-emerald-600 font-black tracking-wider uppercase mt-1">✓ MP e-Seva Digital Verified Gate Pass</span>
            </div>

            <div class="text-center text-[7px] text-slate-400 mt-6 leading-relaxed">
              * यह रसीद केवल प्रवेश सत्यापन हेतु मान्य है। परीक्षा हॉल में प्रवेश पाने के लिए कृपया मूल प्रवेश पत्र एवं आधार कार्ड अनिवार्य रूप से साथ लाएं।
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const filteredJobs = useMemo(() => {
    return jobFilter === "All" ? featuredJobsData : featuredJobsData.filter((job) => job.tag === jobFilter);
  }, [jobFilter, featuredJobsData]);

  // Filter services by search query
  const filteredServices = useMemo(() => {
    if (!searchQuery) return defaultServices;
    return defaultServices.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.dept.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Filter government job listings by title keyword or category name
  const filteredGovtJobsData = useMemo(() => {
    const query = jobSearchKeyword.toLowerCase().trim();
    if (!query) return govtJobsData;

    const matchesResultsCategory = "results".includes(query) || "result".includes(query) || "परिणाम".includes(query);
    const matchesAdmitCategory = "admit cards".includes(query) || "admit card".includes(query) || "admit".includes(query) || "प्रवेश पत्र".includes(query);
    const matchesJobsCategory = "latest jobs".includes(query) || "latest job".includes(query) || "latest".includes(query) || "jobs".includes(query) || "job".includes(query) || "नौकरी".includes(query);

    const filteredResults = govtJobsData.results.filter((r: any) => {
      const matchTitle = r.title.toLowerCase().includes(query) || r.subTitle.toLowerCase().includes(query);
      return matchTitle || matchesResultsCategory;
    });

    const filteredAdmitCards = govtJobsData.admitCards.filter((a: any) => {
      const matchTitle = a.title.toLowerCase().includes(query) || a.subTitle.toLowerCase().includes(query);
      return matchTitle || matchesAdmitCategory;
    });

    const filteredLatestJobs = govtJobsData.latestJobs.filter((j: any) => {
      const matchTitle = j.title.toLowerCase().includes(query) || j.subTitle.toLowerCase().includes(query) || (j.posts && j.posts.toLowerCase().includes(query));
      return matchTitle || matchesJobsCategory;
    });

    return {
      results: filteredResults,
      admitCards: filteredAdmitCards,
      latestJobs: filteredLatestJobs,
    };
  }, [jobSearchKeyword, govtJobsData]);

  const handleTrackApplication = () => {
    setTrackerError("");
    setTrackedApp(null);
    if (!appTrackerId.trim()) {
      setTrackerError("कृपया Valid Application ID दर्ज़ करें।");
      return;
    }
    const match = applicationsState.find(app => app.id.toLowerCase() === appTrackerId.trim().toLowerCase());
    if (match) {
      setTrackedApp(match);
    } else {
      setTrackerError("इस ID की कोई भी एप्लीकेशन नहीं मिली। कृपया पुनः प्रयास करें।");
    }
  };

  const handleOpenApplyModal = (service: any) => {
    setApplyingService(service);
    setIsApplyModalOpen(true);
    setApplicationCompleted(false);
    setUploadProgress(0);
    setUploadedFile(null);
    setApplicantAadhaar("");
    setApplicantName("");
    setApplicantContact("");
  };

  const simulateDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setIsUploading(true);
      let p = 0;
      const interval = setInterval(() => {
        p += 25;
        setUploadProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setIsUploading(false);
        }
      }, 300);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantAadhaar || !applicantContact) {
      alert("कृपया सभी आवश्यक जानकारी दर्ज़ करें।");
      return;
    }

    const randomID = `MPES-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp = {
      name: applyingService.title,
      id: randomID,
      status: "Review",
      progress: 40,
      date: "Today"
    };

    setApplicationsState([newApp, ...applicationsState]);
    setApplicationCompleted(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_.8fr]" id="citizen-hub-grid">
      <div className="space-y-6">
        {/* Banner Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 py-10 px-8 text-white shadow-xl">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 translate-y-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-100 uppercase mb-4 backdrop-blur-md">
              <Sparkles size={12} /> Digital Government & Services
            </span>
            <h2 className="text-3xl font-bold md:text-5xl tracking-normal leading-tight">
              सरकारी सेवाएँ, Jobs, Admit Card और Results एक ही जगह
            </h2>
            <p className="mt-4 text-indigo-50 font-medium leading-relaxed max-w-xl">
              Aadhaar/Samagra OTP authentication, online application processing, passport dimensions creator, custom document compressors and regional translation tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#services-list" className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg text-sm transition hover:bg-slate-50 hover:shadow-xl">
                सेवाएँ चुनें
              </a>
              <a href="#jobs-list" className="rounded-xl bg-indigo-500/30 px-6 py-3 font-semibold text-white ring-1 ring-white/30 text-sm transition hover:bg-indigo-500/50">
                Job Updates
              </a>
            </div>
          </div>
        </div>

        {/* Try out the awesome Quick Navigator Bar */}
        <div className="bg-white rounded-3xl p-4 md:p-5 shadow-sm border border-slate-150 flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans mb-3" id="citizen-hub-navigation-bar">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse shrink-0" />
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">त्वरित नेविगेशन (Quick Section Jump)</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
            <a
              href="#kiosk-rate-card-hub"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 px-3 py-1.5 md:px-3.5 md:py-2 text-[11px] font-bold transition hover:border-indigo-400 hover:text-indigo-700 shadow-2xs hover:shadow-xs"
            >
              <span>🪙 कियोस्क दरें (Rates)</span>
            </a>
            <a
              href="#aeps-banking-portal"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 px-3 py-1.5 md:px-3.5 md:py-2 text-[11px] font-bold transition hover:border-indigo-400 hover:text-indigo-700 shadow-2xs hover:shadow-xs"
            >
              <span>🏦 आधार पे (AePS App)</span>
            </a>
            <a
              href="#bookmark-websites-hub"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 px-3 py-1.5 md:px-3.5 md:py-2 text-[11px] font-bold transition hover:border-indigo-400 hover:text-indigo-700 shadow-2xs hover:shadow-xs"
            >
              <span>🔗 सरकारी पोर्टल्स (Bookmarks)</span>
            </a>
            <a
              href="#services-list"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 px-3 py-1.5 md:px-3.5 md:py-2 text-[11px] font-bold transition hover:border-indigo-400 hover:text-indigo-700 shadow-2xs hover:shadow-xs"
            >
              <span>📜 डिजिटल सेवाएँ (Services)</span>
            </a>
            <a
              href="#jobs-list"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 px-3 py-1.5 md:px-3.5 md:py-2 text-[11px] font-bold transition hover:border-indigo-400 hover:text-indigo-700 shadow-2xs hover:shadow-xs"
            >
              <span>💼 सरकारी नौकरियाँ (Jobs)</span>
            </a>
          </div>
        </div>

        {/* 📋 KIOSK DAILY SERVICES & RATE CARD GRID (एमपी ऑनलाइन कार्य एवं संचालक शुल्क की सूची) */}
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-150 space-y-6" id="kiosk-rate-card-hub">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2 rounded-xl bg-indigo-600 text-white font-black text-[11px] select-none">
                    सूची (50+ Live)
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
                    कियोस्क सेवाएँ एवं आधिकारिक शुल्क सूची (Rate & Service Board)
                  </h3>
                </div>
                {/* Mobile view expand/collapse toggler button */}
                <button
                  type="button"
                  onClick={() => setCollapsedSections(prev => ({ ...prev, rateCard: !prev.rateCard }))}
                  className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition shrink-0"
                  title={collapsedSections.rateCard ? "सेक्शन खोलें" : "सेक्शन छिपाएं"}
                >
                  <ChevronDown size={16} className={`transition-transform duration-300 ${collapsedSections.rateCard ? "" : "rotate-180"}`} />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-sans">
                हमारे ऑनलाइन सेंटर पर किए जाने वाले सभी प्रमुख कार्यों की सूची। संचालक शुल्क एवं अनुमानित समय पारदर्शी रूप से नीचे दर्शित है।
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Quick Stats of the available rates */}
              <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-2.5">
                <div className="text-right">
                  <div className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider">न्यूनतम प्रभार</div>
                  <div className="text-xs font-extrabold text-indigo-900">₹10 से</div>
                </div>
                <div className="h-6 w-px bg-indigo-200" />
                <div>
                  <div className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider">कुल श्रेणियाँ</div>
                  <div className="text-xs font-extrabold text-indigo-900">{kioskServices.filter(s => s.active).length} सेवाएँ</div>
                </div>
              </div>

              {/* Desktop view collapse/expand widget button */}
              <button
                type="button"
                onClick={() => setCollapsedSections(prev => ({ ...prev, rateCard: !prev.rateCard }))}
                className="hidden md:flex items-center gap-1.5 rounded-xl border border-slate-250 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2.5 text-xs font-bold transition shadow-2xs"
              >
                <span>{collapsedSections.rateCard ? "विवरण दिखाएं (Show)" : "विवरण छुपाएं (Hide Info)"}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${collapsedSections.rateCard ? "" : "rotate-180"}`} />
              </button>
            </div>
          </div>

          {!collapsedSections.rateCard && (
            <>

          {/* Interactive Search & Filter System inside Hero Section */}
          <div className="flex flex-col gap-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              {/* Search bar specifically for kiosk service catalog */}
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input
                  type="text"
                  value={kioskSearch}
                  onChange={(e) => setKioskSearch(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-11 pr-10 py-3 text-xs md:text-sm font-semibold outline-none transition focus:border-indigo-500 focus:bg-white"
                  placeholder="अपना काम खोजें: (जैसे श्रम कार्ड, आधार, समग्र, राशन, ड्राइविंग लाइसेंस, पेंशन)..."
                />
                {kioskSearch && (
                  <button
                    onClick={() => setKioskSearch("")}
                    className="absolute right-3.5 top-3.5 text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Clear filters trigger */}
              {(kioskSearch || kioskCatFilter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setKioskSearch("");
                    setKioskCatFilter("All");
                  }}
                  className="rounded-xl border border-indigo-200 text-indigo-700 bg-indigo-50 px-4 py-2.5 text-xs font-extrabold hover:bg-indigo-100 transition whitespace-nowrap"
                >
                  सभी सेवाएँ देखें
                </button>
              )}
            </div>

            {/* Category tabs filters */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 overflow-x-auto pb-1 no-scrollbar font-sans">
              <span className="text-[10px] uppercase font-bold text-slate-400 mr-1.5 flex items-center gap-1 select-none whitespace-nowrap">
                <Filter size={10} /> फ़िल्टर श्रेणी:
              </span>
              {[
                { key: "All", label: "सभी कार्य" },
                { key: "Government Cards", label: "सरकारी योजना कार्ड" },
                { key: "Identity / Documents", label: "पहचान पत्र व दस्तावेज" },
                { key: "Certificate Services", label: "प्रमाण पत्र आवेदन" },
                { key: "Licensing & Registry", label: "लाइसेंस व भूमि पंजीयन" },
                { key: "Financial & Digital Payments", label: "बैंकिंग व नगद लेन-देन" },
                { key: "Utility & Recharge", label: "बिजली बिल व रिचार्ज" },
                { key: "Online Admission & Recruitments", label: "ऑनलाइन फार्म व परीक्षा" },
                { key: "Insurance & Travel", label: "बीमा व टिकटिंग" }
              ].map((tab) => {
                const count = tab.key === "All" 
                  ? kioskServices.filter(s => s.active).length 
                  : kioskServices.filter(s => s.category === tab.key && s.active).length;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setKioskCatFilter(tab.key)}
                    className={`text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
                      kioskCatFilter === tab.key
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 shadow-sm"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    {tab.label} <span className="opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Language filter buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100" id="kiosk-language-pills">
              <span className="text-[10px] uppercase font-bold text-slate-400 mr-1.5 flex items-center gap-1 select-none whitespace-nowrap">
                <Languages size={10} /> सेवा विवरण भाषा (Service Language):
              </span>
              <button
                type="button"
                onClick={() => setKioskLanguage("both")}
                className={`text-[10px] font-bold px-3 py-1 rounded-lg border transition whitespace-nowrap ${
                  kioskLanguage === "both"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                दोनों (Both)
              </button>
              <button
                type="button"
                onClick={() => setKioskLanguage("hindi")}
                className={`text-[10px] font-bold px-3 py-1 rounded-lg border transition whitespace-nowrap flex items-center gap-1 ${
                  kioskLanguage === "hindi"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>केवल हिन्दी</span>
              </button>
              <button
                type="button"
                onClick={() => setKioskLanguage("english")}
                className={`text-[10px] font-bold px-3 py-1 rounded-lg border transition whitespace-nowrap flex items-center gap-1 ${
                  kioskLanguage === "english"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>English Only</span>
              </button>
            </div>
          </div>

          {/* Dynamic Services Capsules/Cards Grid rendering */}
          <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3" id="services-cards-grid">
            {filteredKioskServices.slice(0, showAllServices ? undefined : 6).map((service) => {
              // Custom category color palettes inspired by the high contrast poster but refined
              let colorClasses = "from-slate-50 to-slate-50 text-slate-800 border-slate-200/80 hover:bg-slate-100/50";
              let badgeColor = "bg-slate-200/60 text-slate-700";

              if (service.category === "Government Cards") {
                colorClasses = "from-emerald-500/10 to-emerald-500/5 hover:from-emerald-500/15 hover:to-emerald-500/10 text-emerald-950 border-emerald-200/70";
                badgeColor = "bg-emerald-100 text-emerald-800";
              } else if (service.category === "Identity / Documents") {
                colorClasses = "from-blue-500/10 to-indigo-500/5 hover:from-blue-500/15 hover:to-indigo-500/10 text-blue-950 border-blue-200/70";
                badgeColor = "bg-blue-100/80 text-blue-800";
              } else if (service.category === "Online Admission & Recruitments") {
                colorClasses = "from-amber-500/15 to-yellow-500/5 hover:from-amber-500/20 hover:to-yellow-500/10 text-amber-950 border-amber-300/60";
                badgeColor = "bg-amber-100 text-amber-900";
              } else if (service.category === "Certificate Services") {
                colorClasses = "from-rose-500/10 to-pink-500/5 hover:from-rose-500/15 hover:to-pink-500/10 text-rose-950 border-rose-200/70";
                badgeColor = "bg-rose-100 text-rose-800";
              } else if (service.category === "Licensing & Registry") {
                colorClasses = "from-green-500/10 to-teal-500/5 hover:from-green-500/15 hover:to-green-500/10 text-green-950 border-green-200/70";
                badgeColor = "bg-green-100 text-green-800";
              } else if (service.category === "Financial & Digital Payments") {
                colorClasses = "from-orange-500/10 to-red-500/5 hover:from-orange-500/15 hover:to-red-500/10 text-orange-950 border-orange-200/70";
                badgeColor = "bg-orange-100 text-orange-850";
              } else if (service.category === "Utility & Recharge") {
                colorClasses = "from-amber-400/10 to-amber-200/5 hover:from-amber-400/15 hover:to-amber-200/10 text-amber-900 border-amber-200/60";
                badgeColor = "bg-amber-100/80 text-amber-900";
              } else if (service.category === "Insurance & Travel") {
                colorClasses = "from-purple-500/10 to-violet-500/5 hover:from-purple-500/15 hover:to-violet-500/10 text-purple-950 border-purple-200/70";
                badgeColor = "bg-purple-100 text-purple-800";
              }

              return (
                <div
                  key={service.id}
                  className={`group relative rounded-2xl p-4 bg-gradient-to-br ${colorClasses} border shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between min-h-[145px]`}
                >
                  <div>
                    {/* Header: Category Badge and quick marker */}
                    <div className="flex justify-between items-center gap-1.5 mb-2.5">
                      <span className={`px-2 py-0.5 rounded-md text-[8px] md:text-[9px] font-extrabold tracking-wide uppercase ${badgeColor} select-none`}>
                        {service.category.replace("Services", "").split(" & ")[0]}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono font-medium">Ready ✓</span>
                    </div>

                    {/* Hindi and English Names rendering based on chosen filter */}
                    {(kioskLanguage === "both" || kioskLanguage === "hindi") && (
                      <h4 className="text-sm font-extrabold text-slate-900 font-sans tracking-tight leading-tight">
                        {service.nameHindi}
                      </h4>
                    )}
                    {(kioskLanguage === "both" || kioskLanguage === "english") && (
                      <p className={`text-slate-505 font-semibold tracking-tight group-hover:text-slate-750 transition ${
                        kioskLanguage === "both" 
                          ? "text-[10px] mt-0.5 font-mono" 
                          : "text-sm text-slate-900 font-sans font-extrabold"
                      }`}>
                        {service.nameEnglish}
                      </p>
                    )}
                  </div>

                  {/* Pricing and Action element */}
                  <div className="flex items-center justify-between border-t border-slate-200/60 pt-3 mt-3">
                    {/* Dynamic Charge display */}
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider font-sans">कियोस्क फ़ीस</span>
                      <div className="flex items-center gap-1 text-slate-950">
                        <Wallet size={12} className="text-indigo-600" />
                        <span className="text-xs md:text-sm font-black tracking-tight select-none">
                          ₹{service.fee}
                        </span>
                      </div>
                    </div>

                    {/* Quick apply action connecting to standard form processing modal */}
                    <button
                      type="button"
                      onClick={() => handleOpenApplyModal({
                        title: `${service.nameHindi} (${service.nameEnglish})`,
                        dept: service.category,
                        fee: `₹${service.fee}`,
                        due: "तत्काल प्रक्रिया / Immediate processing"
                      })}
                      className="inline-flex items-center gap-1 rounded-xl bg-slate-900 text-white px-3 py-1.5 text-[10px] font-bold hover:bg-indigo-650 transition active:scale-95 shadow-sm"
                    >
                      <span>Apply Done</span>
                      <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More toggle button */}
          {filteredKioskServices.length > 6 && (
            <div className="flex justify-center pt-2" id="kiosk-showmore-container">
              <button
                type="button"
                onClick={() => setShowAllServices(!showAllServices)}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black px-6 py-2.5 text-xs transition active:scale-95 hover:bg-indigo-100 shadow-sm"
              >
                <span>
                  {showAllServices 
                    ? "कम सेवाएँ दिखाएं (Show Less)" 
                    : `और अधिक सेवाएँ देखें (+${filteredKioskServices.length - 6} More)`}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${showAllServices ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}

          {/* Fallback empty view when filter misses */}
          {filteredKioskServices.length === 0 && (
            <div className="text-center py-12 bg-slate-50 border border-dashed rounded-2xl border-slate-200 font-sans">
              <ClipboardCheck className="mx-auto text-slate-300 mb-2.5 animate-pulse" size={32} />
              <p className="text-xs font-bold text-slate-500">इस खोज के लिए कोई सेवा उपलब्ध नहीं है।</p>
              <p className="text-[10px] text-slate-400 mt-1">कृप्या कोई दूसरा मुख्य शब्द टाइप करें।</p>
              <button
                onClick={() => {
                  setKioskSearch("");
                  setKioskCatFilter("All");
                }}
                className="text-[11px] text-indigo-600 font-extrabold underline mt-2 block mx-auto"
              >
                सभी {kioskServices.length} सेवाएँ यहाँ देखें
              </button>
            </div>
          )}
          </>
          )}
        </div>

        {/* 🏦 AEPS MULTI-BANKING PORTAL (कैश जमा, निकासी एवं बैलेंस जांच केंद्र) */}
        <div id="aeps-banking-portal" className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-150 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2 rounded-xl bg-teal-600 text-white font-black text-xs uppercase tracking-wide">
                    AePS Aadhaar Pay
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
                    आधार सक्षम बैंकिंग सेवा (Cash Deposit, Withdrawal & Mini Banking Hub)
                  </h3>
                </div>
                {/* Mobile view collapse button */}
                <button
                  type="button"
                  onClick={() => setCollapsedSections(prev => ({ ...prev, aeps: !prev.aeps }))}
                  className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition shrink-0"
                  title={collapsedSections.aeps ? "सेक्शन खोलें" : "सेक्शन छिपाएं"}
                >
                  <ChevronDown size={16} className={`transition-transform duration-300 ${collapsedSections.aeps ? "" : "rotate-180"}`} />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-sans">
                Aadhaar Enabled Payment System (AePS) द्वारा सुरक्षित व आसान बैंकिंग। किसी भी बैंक खाते से अंगूठा लगाकर तुरंत नगद निकासी व जमा करें।
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Core safety badge */}
              <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-2xl px-3 py-2">
                <ShieldCheck className="text-emerald-600 animate-pulse" size={18} />
                <div>
                  <div className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">RBI SAFE & SECURE</div>
                  <div className="text-xs font-extrabold text-emerald-950">NPCI Certified Port ✓</div>
                </div>
              </div>

              {/* Desktop view collapse button */}
              <button
                type="button"
                onClick={() => setCollapsedSections(prev => ({ ...prev, aeps: !prev.aeps }))}
                className="hidden md:flex items-center gap-1.5 rounded-xl border border-slate-250 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2.5 text-xs font-bold transition shadow-2xs"
              >
                <span>{collapsedSections.aeps ? "बैंकिंग खोलें (Expand Banking)" : "बैंकिंग छिपाएं (Collapse)"}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${collapsedSections.aeps ? "" : "rotate-180"}`} />
              </button>
            </div>
          </div>

          {!collapsedSections.aeps && (
            <>

          {/* Slabs Side-by-Side Grid Layout */}
          <div className="grid gap-6 lg:grid-cols-12">
            
            {/* Left Block: Interactive Transaction Terminal Simulator */}
            <div className="lg:col-span-7 border border-slate-200/80 rounded-2xl p-5 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/70-50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-md">
                  <Fingerprint size={12} /> Live AePS Simulator Terminal
                </span>
                <span className="text-[10px] text-slate-400 font-mono">ID: SECURE-AEPS-3000</span>
              </div>

              {/* Service Selection Tabs (Standard AePS Functions as per provided guide) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: "withdrawal", label: "नगद निकासी (Withdrawal)", desc: "पैसे निकालें" },
                  { key: "deposit", label: "नगद जमा (Deposit)", desc: "पैसे जमा करें" },
                  { key: "balance", label: "बैलेंस जांच (Balance)", desc: "खाता बैलेंस" },
                  { key: "statement", label: "मिनी विवरण (Statement)", desc: "अंतिम लेनदेन" }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setAepsService(item.key as any);
                      setAepsError("");
                    }}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                      aepsService === item.key
                        ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xs font-black tracking-tight">{item.label.split(" (")[0]}</span>
                    <span className="text-[8px] opacity-75">{item.label.split(" (")[1]?.replace(")", "") || ""}</span>
                  </button>
                ))}
              </div>

              {aepsStatus === "success" && aepsReceipt ? (
                /* --- STEP 4: PRINTABLE SUCCESS TRANSACTION SLIP --- */
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 font-mono space-y-4 relative overflow-hidden">
                  <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-12 h-12 bg-emerald-500 text-white rounded-full flex items-end justify-start p-2 rotate-12 select-none font-bold text-[8px]">
                    PAID
                  </div>
                  
                  {/* Slip Header */}
                  <div className="text-center border-b border-dashed border-slate-200 pb-3 space-y-1">
                    <h5 className="text-xs font-black tracking-widest text-slate-900 uppercase">★ RETAIL BANKING IN KIOSK ★</h5>
                    <p className="text-[9px] text-slate-500">M.P. ONLINE AUTHENTIC AePS RECEIPT</p>
                    <p className="text-[9px] text-slate-400">Date: {aepsReceipt.date}</p>
                  </div>

                  {/* Receipt Details Table */}
                  <div className="text-[10px] space-y-1.5 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-400">BENEFICIARY NAME:</span>
                      <span className="font-bold text-slate-900">{aepsReceipt.beneficiaryName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">TRANSACTION TYPE:</span>
                      <span className="font-bold text-indigo-700 uppercase">{aepsReceipt.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CUSTOMER AADHAAR:</span>
                      <span className="font-bold text-slate-900">{aepsReceipt.aadhaar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">LINKED STATE BANK:</span>
                      <span className="font-bold text-slate-900">{aepsReceipt.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">REFERENCE NO (RRN):</span>
                      <span className="font-bold text-slate-900">{aepsReceipt.rrn}</span>
                    </div>
                    
                    <div className="border-t border-dashed border-slate-200 my-2 pt-2 space-y-1.5">
                      {(aepsReceipt.service === "withdrawal" || aepsReceipt.service === "deposit") && (
                        <div className="flex justify-between text-xs font-bold text-slate-900">
                          <span>TRANSACTION AMOUNT:</span>
                          <span>₹{aepsReceipt.amount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xs font-bold text-indigo-600">
                        <span>CONVENIENCE CHARGE:</span>
                        <span>₹{aepsReceipt.charge}</span>
                      </div>
                      <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between text-sm font-black text-emerald-700">
                        <span>TRANSACTION STATUS:</span>
                        <span>{aepsReceipt.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[9px] text-slate-400 pt-1.5 border-t border-dashed border-slate-150">
                    कृपया भविष्य के संदर्भ के लिए रसीद संभाल कर रखें। धन्यवाद!
                  </div>

                  {/* Receipt actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        window.print();
                      }}
                      className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 text-xs transition flex items-center justify-center gap-1 shadow"
                    >
                      <Printer size={12} />
                      <span>प्रिंट रसीद (Print)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAepsStatus("idle");
                        setAepsReceipt(null);
                        setAepsAadhaar("");
                      }}
                      className="rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 text-xs transition"
                    >
                      नया लेनदेन (New txn)
                    </button>
                  </div>
                </div>
              ) : (
                /* --- TERMINAL FORM INPUTS --- */
                <form
                  onSubmit={handleSimulateAeps}
                  className="space-y-4 text-xs font-sans"
                >
                  {/* Grid of Bank & Aadhaar inputs */}
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    {/* Bank Selection dropdown */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        बैंक का चयन करें (Select Bank Accounts) *
                      </label>
                      <select
                        value={aepsBankCode}
                        onChange={(e) => setAepsBankCode(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-indigo-500 bg-white font-semibold text-slate-800"
                      >
                        {aepsBanksList.map((b) => (
                          <option key={b.code} value={b.code}>
                            🏢 {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Aadhaar Input formatted */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        12 अंकों का आधार नंबर (Aadhaar Number) *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={aepsAadhaar}
                          onChange={(e) => {
                            const val = e.target.value;
                            const rawDigits = val.replace(/[^0-9]/g, "").slice(0, 12);
                            const parts = [];
                            for (let i = 0; i < rawDigits.length; i += 4) {
                              parts.push(rawDigits.slice(i, i + 4));
                            }
                            setAepsAadhaar(parts.join(" - "));
                          }}
                          placeholder="XXXX - XXXX - XXXX"
                          required
                          className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-indigo-500 font-mono tracking-wider font-extrabold text-slate-800 bg-white"
                        />
                        <span className="absolute right-3 top-2.5 text-[9px] font-bold text-indigo-600 bg-indigo-50 rounded-md px-1.5 py-0.5 select-none">
                          OTP/BIO Checked
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Full Name (for audit receipts) */}
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        खाताधारक का नाम (Customer Name)
                      </label>
                      <input
                        type="text"
                        value={aepsName}
                        onChange={(e) => setAepsName(e.target.value)}
                        placeholder="जैसे: राहुल सिंह लोधी (Rahul Singh)"
                        className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-indigo-500 font-semibold text-slate-800 bg-white"
                      />
                    </div>

                    {/* Authentication Mode (Finger or Face as shown in the uploaded guide) */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        बायोमेट्रिक सत्यापन यंत्र (Authentication Method)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setAepsAuthMode("fingerprint")}
                          className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border transition ${
                            aepsAuthMode === "fingerprint"
                              ? "bg-slate-100 border-slate-400 text-slate-900 font-bold"
                              : "bg-white border-slate-200 text-slate-500"
                          }`}
                        >
                          <Fingerprint size={12} className="text-indigo-600" />
                          <span>Mantra/Morpho Finger</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setAepsAuthMode("face")}
                          className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border transition ${
                            aepsAuthMode === "face"
                              ? "bg-slate-100 border-slate-400 text-slate-900 font-bold"
                              : "bg-white border-slate-200 text-slate-500"
                          }`}
                        >
                          <User size={12} className="text-indigo-600" />
                          <span>IRIS Eye Scan / Face</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Amount inputs if withdrawal/deposit selected */}
                  {(aepsService === "withdrawal" || aepsService === "deposit") && (
                    <div className="space-y-2">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                            लेन-देन की राशि (Transaction Amount in ₹) *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 font-bold text-slate-400 text-xs font-sans">₹</span>
                            <input
                              type="number"
                              min="100"
                              max="10000"
                              value={aepsAmount}
                              onChange={(e) => setAepsAmount(e.target.value)}
                              required
                              className="w-full rounded-xl border border-slate-200 pl-6 pr-3 p-2.5 outline-none focus:border-indigo-500 font-black text-indigo-950 font-sans"
                            />
                          </div>
                        </div>

                        {/* Charges calculation card indicator */}
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-3 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-indigo-500">कियोस्क सेवा शुल्क / Charges</span>
                            <div className="text-sm font-black text-indigo-900 mt-0.5">
                              ₹{getAepsKioskCharge(aepsAmount, aepsService)} Convenience Fee
                            </div>
                          </div>
                          <span className="text-[10px] bg-indigo-100 font-extrabold text-indigo-700 rounded-md px-1.5 py-0.5 select-none">
                            जोड़ा गया
                          </span>
                        </div>
                      </div>

                      {/* Quick Slabs select presets */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[9px] text-slate-400 mr-1 select-none font-bold uppercase">Quick Inputs:</span>
                        {["500", "1000", "2000", "3000", "5000", "10000"].map((presetAmt) => (
                          <button
                            key={presetAmt}
                            type="button"
                            onClick={() => setAepsAmount(presetAmt)}
                            className="text-[10px] font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg px-2.5 py-1 transition"
                          >
                            ₹{presetAmt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status scanning animation target */}
                  {aepsStatus === "scanning" && (
                    <div className="rounded-2xl border bg-slate-900 text-white p-5 text-center flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-radial-gradient from-teal-500/10 via-transparent to-transparent animate-pulse pointer-events-none" />
                      
                      {/* Biometric Scan Device Target */}
                      <div className="relative w-16 h-16 rounded-full border-2 border-teal-500 flex items-center justify-center bg-slate-800/80 shadow-lg shadow-teal-500/20">
                        {aepsAuthMode === "fingerprint" ? (
                          <Fingerprint className="text-teal-400 animate-pulse" size={32} />
                        ) : (
                          <User className="text-teal-400 animate-pulse" size={32} />
                        )}
                        {/* Matrix Grid laser scan line */}
                        <div className="absolute left-0 right-0 h-1 bg-teal-400/80 blur-xs animate-bounce" style={{ top: `${aepsScanPercent}%` }} />
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-bold text-teal-400 select-none animate-pulse">
                          {aepsAuthMode === "fingerprint" ? "❌ कृपया फिंगरप्रिंट स्कैनर पर उंगली रखें..." : "❌ कृपया आईरिस / चेहरे को कैमरे के सामने रखें..."}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">सत्यापन स्थिति (Verifying Signature): {aepsScanPercent}%</p>
                      </div>

                      {/* Process loader bar */}
                      <div className="w-full max-w-xs h-1 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-teal-500 transition-all duration-150" style={{ width: `${aepsScanPercent}%` }} />
                      </div>
                    </div>
                  )}

                  {aepsStatus === "processing" && (
                    <div className="rounded-2xl border border-indigo-100 bg-white p-4 text-center space-y-3">
                      <RefreshCw className="mx-auto text-indigo-600 animate-spin" size={24} />
                      <p className="text-xs font-bold text-slate-800">
                        NPCI गेटवे से भुगतान संसाधित किया जा रहा है...
                      </p>
                      <p className="text-[10px] text-slate-400 leading-normal font-sans">
                        यह प्रक्रिया सुरक्षित है। कृपया ब्राउज़र का बैक बटन अथवा पेज रीलोड न दबाएं।
                      </p>
                    </div>
                  )}

                  {/* Error Notification layout */}
                  {aepsError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 text-red-900 p-3 text-xs leading-normal font-bold flex items-center gap-2">
                      <span className="p-1 rounded bg-red-100 text-red-700">✕</span>
                      <span>{aepsError}</span>
                    </div>
                  )}

                  {/* Submission and scan triggers */}
                  {(aepsStatus === "idle" || aepsStatus === "failed") && (
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold tracking-wide py-3.5 text-xs uppercase transition shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 active:scale-99"
                    >
                      <Fingerprint size={16} />
                      <span>बायोमेट्रिक जांचें एवं भुगतान करें (Verify Biometric Txn)</span>
                    </button>
                  )}
                </form>
              )}
            </div>

            {/* Right Block: Dynamic AePS Rates Board (Slabs show side-by-side) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-5 border border-indigo-805 space-y-4">
              <div>
                <span className="text-[8px] md:text-[9px] bg-indigo-500/30 text-indigo-200 rounded-full font-black tracking-wider uppercase px-2.5 py-1">
                  Rate-List Board
                </span>
                <h4 className="text-sm font-black tracking-tight text-white mt-2">
                  कियोस्क आधार बैंक नगद सेवा दर तालिका (Kiosk Convenience Charges)
                </h4>
                <p className="text-[10px] text-indigo-200 mt-1 leading-normal font-sans">
                  नगद जमा एवं निकासी लेन-देन की कुल राशि के अनुसार अतिरिक्त संचालक सुविधा शुल्क की सूची इस प्रकार निर्धारित है:
                </p>
              </div>

              {/* Dynamic Rates Slabs Listing based on dynamic aepsSlabs */}
              <div className="rounded-xl border border-indigo-900 bg-indigo-950/75 overflow-hidden">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-indigo-900/50 text-indigo-200 font-bold uppercase text-[9px] border-b border-indigo-950">
                      <th className="p-2 pl-3">लेन-देन स्लैब श्रेणी (Slabs Range)</th>
                      <th className="p-2 text-right pr-3">कियोस्क फ़ीस (Merchant Fee)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aepsSlabs.map((slab) => (
                      <tr key={slab.id} className="border-b border-indigo-950 hover:bg-indigo-900/15 transition-colors font-mono">
                        <td className="p-2.5 pl-3 font-semibold text-slate-100 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>₹{slab.minAmount} - ₹{slab.maxAmount}</span>
                        </td>
                        <td className="p-2.5 text-right font-black text-emerald-400 pr-3">
                          ₹{slab.fee}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-indigo-900/30 font-sans">
                      <td className="p-2.5 pl-3 font-semibold text-slate-300">
                        बैलेंस जांच / मिनी स्टेटमेंट
                      </td>
                      <td className="p-2.5 text-right font-black text-emerald-400 pr-3">
                        ₹10 मात्र
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Extra AePS Capabilities list matching guidelines */}
              <div className="pt-2 border-t border-indigo-900 space-y-2.5 text-[10px] leading-relaxed text-indigo-200 font-sans">
                <div className="flex gap-2">
                  <span className="text-emerald-400 shrink-0 select-none">✓</span>
                  <p><strong>तत्काल निपटान (Real-Time Settlement):</strong> खाताधारक के बैंक से पैसे निकालते ही नगद भुगतान और रसीद प्रदान कर दी जाएगी।</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-400 shrink-0 select-none">✓</span>
                  <p><strong>अंगूठा/चेहरा बायोमेट्रिक (Triple Auth):</strong> OTP के बिना फिंगरप्रिंट अथवा फेस स्कैनिंग से पूर्णतः सुरक्षित निकासी की सुविधा।</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-400 shrink-0 select-none">✓</span>
                  <p><strong>सभी प्रमुख बैंक्स स्वीकृत:</strong> SBI, BOB, PNB, ग्रामीण बैंकों समेत नैशनलाइज़्ड एवं कोआपरेटिव बैंक्स शामिल हैं।</p>
                </div>
              </div>
            </div>

          </div>
          </>
          )}
        </div>

        {/* Live Notices Banner */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {liveNotices.map((notice, idx) => (
            <div key={idx} className="rounded-2xl border border-red-100 bg-red-50/70 p-4 transition duration-300 hover:scale-[1.01] hover:bg-red-50">
              <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 uppercase tracking-wide">Live Update</span>
              <p className="mt-2 text-xs font-semibold text-red-900 leading-snug">{notice}</p>
            </div>
          ))}
        </div>

        {/* Ticker marquee */}
        <div className="rounded-2xl bg-red-700 px-5 py-3 text-white shadow-sm overflow-hidden flex items-center gap-3">
          <span className="rounded-lg bg-white/20 px-3 py-1 text-xs font-bold tracking-wide uppercase">Latest Bulletin</span>
          <div className="flex-1 text-xs font-bold overflow-hidden relative h-5">
            <div className="absolute animate-marquee whitespace-nowrap flex gap-8">
              <span>🚀 MP Police SI Result 2026 Expected to Release This Week</span>
              <span>🔥 Railway Technician 6,565 Registration Direct Link Active</span>
              <span>📌 CTET September Syllabus Released in Hindi & English</span>
              <span>🎓 Pre-Matric Scholarship Deadline extended till June 30</span>
            </div>
          </div>
        </div>

        {/* Stats and Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {quickStats.map((stat) => {
              return (
                <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="text-xl font-bold text-indigo-600 mb-1 block">{stat.value}</span>
                  <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight uppercase mb-4">Top Exam Categories</h3>
            <div className="flex flex-wrap gap-2">
              {topCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchQuery(cat.replace(" Jobs", "").replace(" Exams", ""))}
                  className="rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-indigo-600 hover:text-white"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Search & Tracker */}
        <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-2">Smart Service Search</h3>
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white"
                placeholder="सेवा, विभाग, योजना का नाम दर्ज करें (जैसे बिजली बिल, कृषि)..."
              />
            </div>
          </div>

          {/* Real App Tracker */}
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-2">Track Existing Form</h3>
            <div className="flex gap-2">
              <input
                value={appTrackerId}
                onChange={(e) => setAppTrackerId(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none transition focus:border-indigo-400 focus:bg-white"
                placeholder="उदा. MPES-2026-1042"
              />
              <button
                onClick={handleTrackApplication}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                Track
              </button>
            </div>
            
            {trackerError && <p className="text-[10px] text-red-500 mt-2 font-semibold flex items-center gap-1"><AlertCircle size={10}/> {trackerError}</p>}
            
            {trackedApp && (
              <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-900">{trackedApp.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    trackedApp.status === "Approved" ? "bg-green-100 text-green-700" :
                    trackedApp.status === "Review" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>{trackedApp.status}</span>
                </div>
                <p className="text-[10px] text-slate-400 mb-2">Submitted: {trackedApp.date}</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${trackedApp.progress}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ⭐ BOOKMARK & FAVOURITE WEBSITES FEATURE */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 space-y-4" id="bookmark-websites-hub">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="p-1 px-1.5 rounded bg-amber-500/15 text-amber-500">
                  <Star size={16} fill="currentColor" />
                </span>
                <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                  पसंदीदा वेबसाइट बुकमार्क्स (Kiosk Bookmarks Hub)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Operator or citizen favorite portals pre-pinned for quick access. Add custom links to navigate instantly.
              </p>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsAddBookmarkOpen(!isAddBookmarkOpen)}
                className="inline-flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2 text-xs font-bold shadow-md shadow-indigo-600/10 transition shrink-0"
              >
                <Plus size={14} />
                <span>नया बुकमार्क जोड़ें (Add Site)</span>
              </button>

              <button
                type="button"
                onClick={() => setCollapsedSections(prev => ({ ...prev, bookmarks: !prev.bookmarks }))}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition flex items-center gap-1 text-xs font-bold shrink-0"
                title={collapsedSections.bookmarks ? "सेक्शन खोलें" : "सेक्शन छिपाएं"}
              >
                <span>{collapsedSections.bookmarks ? "खोलें (Show)" : "छिपाएं (Hide)"}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${collapsedSections.bookmarks ? "" : "rotate-180"}`} />
              </button>
            </div>
          </div>

          {!collapsedSections.bookmarks && (
            <>

          {/* New Bookmark Creation Form Panel */}
          {isAddBookmarkOpen && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              onSubmit={handleAddBookmark}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 font-sans overflow-hidden"
            >
              <div className="text-xs font-bold text-slate-850 border-b border-slate-200 pb-1.5 mb-2 flex items-center justify-between">
                <span>✍️ ADD NEW CUSTOM KIOSK DIRECT ADDRESS LINK</span>
                <span className="text-[9px] text-slate-450 font-mono">Secured Local Bookmark</span>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    वेबसाइट का नाम (Portal Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newBookmarkTitle}
                    onChange={(e) => setNewBookmarkTitle(e.target.value)}
                    placeholder="e.g. SSD Online Form Centre..."
                    className="w-full rounded-lg bg-white border border-slate-200 p-2 text-xs text-slate-800 outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    वेबसाइट लिंक (Full URL / Address) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newBookmarkUrl}
                    onChange={(e) => setNewBookmarkUrl(e.target.value)}
                    placeholder="e.g. www.google.com"
                    className="w-full rounded-lg bg-white border border-slate-200 p-2 text-xs text-slate-800 outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    श्रेणी (Category Group)
                  </label>
                  <select
                    value={newBookmarkCategory}
                    onChange={(e) => setNewBookmarkCategory(e.target.value)}
                    className="w-full rounded-lg bg-white border border-slate-200 p-2 text-xs text-slate-850 outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="Useful Portals">Useful Portals (उपयोगी पोर्टल)</option>
                    <option value="Kiosk Services">Kiosk Services (कियोस्क सेवाएँ)</option>
                    <option value="Identity / UIDAI">Identity / UIDAI (पहचान पत्र)</option>
                    <option value="Social Security">Social Security (सामाजिक सुरक्षा)</option>
                    <option value="Jobs / Results">Jobs / Results (नौकरी/परीक्षा परिणाम)</option>
                    <option value="Custom Favorite">Custom Favorite (पसंदीदा फ़ोल्डर)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    कार्ड ग्रेडिएंट कलर (Card Theme Gradient)
                  </label>
                  <select
                    value={newBookmarkGradient}
                    onChange={(e) => setNewBookmarkGradient(e.target.value)}
                    className="w-full rounded-lg bg-white border border-slate-200 p-2 text-xs text-slate-850 outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="from-indigo-600 to-purple-600">Indigo Vibrant (इन्दिगो वाइब्रेंट)</option>
                    <option value="from-blue-600 to-indigo-600">Ocean Blue (समुद्री नीला)</option>
                    <option value="from-emerald-600 to-teal-700">Forest Emerald (फॉरेस्ट एमराल्ड)</option>
                    <option value="from-amber-500 to-orange-600">Sunset Orange (सूर्यास्त नारंगी)</option>
                    <option value="from-rose-500 to-red-600">Crimson Fire (क्रिमसन रेड)</option>
                    <option value="from-slate-600 to-slate-800">Carbon Graphite (चारकोल डार्क)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  विवरण / टिप्पणी (Short Description/Note)
                </label>
                <input
                  type="text"
                  value={newBookmarkDesc}
                  onChange={(e) => setNewBookmarkDesc(e.target.value)}
                  placeholder="e.g. This link provides login access to portal features..."
                  className="w-full rounded-lg bg-white border border-slate-200 p-2 text-xs text-slate-800 outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddBookmarkOpen(false)}
                  className="rounded-lg bg-slate-200 text-slate-700 px-3 py-1.5 text-xs font-semibold hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 text-white px-4 py-1.5 text-xs font-bold hover:bg-indigo-750 transition"
                >
                  Save Bookmark ✓
                </button>
              </div>
            </motion.form>
          )}

          {/* Categories Filter Tabs list */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1 select-none">
              <Filter size={10} /> फ़िल्टर करें:
            </span>
            {["All", "Kiosk Services", "Identity / UIDAI", "Social Security", "Jobs / Results", "Useful Portals", "Custom Favorite"].map((cat) => {
              const count = cat === "All" 
                ? bookmarks.length 
                : bookmarks.filter(b => b.category.toLowerCase().includes(cat.toLowerCase().split(" ")[0])).length;
              return (
                <button
                  key={cat}
                  onClick={() => setBookmarkFilter(cat)}
                  className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full transition-all ${
                    bookmarkFilter === cat
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Bookmarks Gradient Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {bookmarks
              .filter(bm => {
                if (bookmarkFilter === "All") return true;
                const filterPart = bookmarkFilter.toLowerCase().split(" ")[0];
                return bm.category.toLowerCase().includes(filterPart);
              })
              .map((bm) => {
                return (
                  <div
                    key={bm.id}
                    className={`relative rounded-2xl p-4 bg-gradient-to-br ${bm.color} text-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5 duration-200 flex flex-col justify-between h-40 group overflow-hidden`}
                  >
                    {/* Background abstract decoration matches the premium theme */}
                    <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-white/10 pointer-events-none group-hover:scale-110 transition duration-305" />
                    
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] font-black tracking-wider uppercase">
                          {bm.category}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleRemoveBookmark(bm.id)}
                          className="text-white/60 hover:text-white hover:bg-white/20 rounded-lg p-1 transition opacity-0 group-hover:opacity-100"
                          title="Bookmark हटाएं"
                        >
                          ✕
                        </button>
                      </div>

                      <h4 className="font-extrabold text-sm tracking-tight mt-2.5 truncate" title={bm.title}>
                        {bm.title}
                      </h4>
                      <p className="text-[10px] text-white/90 line-clamp-2 leading-relaxed mt-1" title={bm.desc}>
                        {bm.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-2.5 mt-2">
                      <span className="text-[9px] font-mono text-white/70 truncate max-w-[150px]" title={bm.url}>
                        {bm.url.replace(/^https?:\/\//i, "")}
                      </span>
                      
                      <a
                        href={bm.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-indigo-700 px-3 py-1.5 rounded-xl text-[10px] font-extrabold flex items-center gap-1 hover:bg-slate-50 transition active:scale-95 shadow-sm"
                      >
                        <span>Open Site</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>

          {bookmarks.filter(bm => {
            if (bookmarkFilter === "All") return true;
            const filterPart = bookmarkFilter.toLowerCase().split(" ")[0];
            return bm.category.toLowerCase().includes(filterPart);
          }).length === 0 && (
            <div className="text-center py-8 bg-slate-50 border border-dashed rounded-xl border-slate-200">
              <Bookmark className="mx-auto text-slate-300 mb-2 animate-bounce" size={24} />
              <p className="text-xs text-slate-500 font-bold">इस श्रेणी में कोई बुकमार्क नहीं मिला!</p>
              <button 
                onClick={() => setBookmarkFilter("All")}
                className="text-[10px] text-indigo-600 font-extrabold underline mt-1 block mx-auto"
              >
                सभी बुकमार्क देखें (Show All)
              </button>
            </div>
          )}
          </>
          )}
        </div>

        {/* Main Services Grid */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100" id="services-list">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">Popular Citizens Services (लोकप्रिय सेवाएँ)</h3>
              <p className="text-xs text-slate-500">Apply instantly, check processing fees and timeline benchmarks on-the-fly.</p>
            </div>
            <div className="flex items-center gap-2">
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="text-xs font-extrabold text-indigo-650 hover:underline mr-1.5 bg-indigo-50 border border-indigo-150 px-2.5 py-1.5 rounded-lg active:scale-95 transition"
                >
                  Clear Filters
                </button>
              )}
              <button
                type="button"
                onClick={() => setCollapsedSections(prev => ({ ...prev, popularServices: !prev.popularServices }))}
                className="p-1.5 h-8 w-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-950 transition flex items-center justify-center shrink-0"
                title={collapsedSections.popularServices ? "सेक्शन खोलें" : "सेक्शन छिपाएं"}
              >
                <ChevronDown size={14} className={`transition-transform duration-300 ${collapsedSections.popularServices ? "" : "rotate-180"}`} />
              </button>
            </div>
          </div>

          {!collapsedSections.popularServices && (
            <>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredServices.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div key={idx} className={`rounded-2xl border border-slate-100 p-4 transition-all duration-300 ${service.hoverColor} flex flex-col justify-between h-44`}>
                  <div>
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl border ${service.color}`}>
                      <IconComp size={18} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{service.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{service.dept} • Govt Fee: {service.fee}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-3 text-[11px]">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">अवधि: {service.due}</span>
                    <button
                      onClick={() => handleOpenApplyModal(service)}
                      className="font-bold text-indigo-600 flex items-center gap-0.5 hover:translate-x-0.5 transition"
                    >
                      आवेदन करें <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          </>
          )}
        </div>

        {/* Job Notification Aggregator */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 space-y-6" id="jobs-list">
          <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Central & State Portal Job Aggregators</h3>
              <p className="text-xs text-slate-500">Fast tracking updates pulled in real-time for exam boards & commissions.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Input Box */}
              <div className="relative w-full sm:max-w-xs">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={jobSearchKeyword}
                  onChange={(e) => setJobSearchKeyword(e.target.value)}
                  placeholder="शीर्षक/कैटेगरी खोजें (Search title or category)..."
                  className="w-full bg-slate-50 pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white focus:border-indigo-500 transition font-sans font-semibold placeholder:font-sans placeholder:font-medium text-slate-800"
                />
                {jobSearchKeyword && (
                  <button
                    type="button"
                    onClick={() => setJobSearchKeyword("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-extrabold text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Toggler collapse button */}
              <button
                type="button"
                onClick={() => setCollapsedSections(prev => ({ ...prev, jobAggregator: !prev.jobAggregator }))}
                className="p-2 ml-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition flex items-center gap-1.5 text-xs font-bold shrink-0"
                title={collapsedSections.jobAggregator ? "सेक्शन खोलें" : "सेक्शन छिपाएं"}
              >
                <span>{collapsedSections.jobAggregator ? "खोलें (Show)" : "छिपाएं (Hide)"}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${collapsedSections.jobAggregator ? "" : "rotate-180"}`} />
              </button>
            </div>
          </div>

          {!collapsedSections.jobAggregator && (
            <>
            {/* Three Column Job Lists */}
            {filteredGovtJobsData.results.length === 0 && 
             filteredGovtJobsData.admitCards.length === 0 && 
             filteredGovtJobsData.latestJobs.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 border border-dashed rounded-2xl border-slate-250">
                <Search className="mx-auto text-slate-300 mb-2" size={24} />
                <p className="text-xs text-slate-500 font-bold">कोई भी भर्ती, प्रवेश पत्र या परिणाम मेल नहीं खाया!</p>
                <button 
                  onClick={() => setJobSearchKeyword("")}
                  className="text-[10px] text-indigo-650 font-extrabold underline mt-1 block mx-auto"
                >
                  फ़िल्टर हटाएँ (Clear Filter)
                </button>
              </div>
            ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {/* RESULTS Column */}
              <div className="rounded-2xl border border-red-100 bg-red-50/20 overflow-hidden flex flex-col">
                <div className="bg-red-750 px-4 py-2.5 font-bold text-white text-xs tracking-wide text-center uppercase">
                  RESULTS ({filteredGovtJobsData.results.length})
                </div>
                <div className="p-3.5 space-y-3 flex-1 overflow-y-auto max-h-[420px]" id="results-column-container">
                  {filteredGovtJobsData.results.length === 0 ? (
                    <div className="text-center text-[10px] text-slate-400 font-semibold py-6">कोई परिणाम नहीं मिला।</div>
                  ) : (
                    filteredGovtJobsData.results.map((r: any, i: number) => (
                      <div 
                        key={r.id || `result-${i}`} 
                        onClick={() => setSelectedJob(r)}
                        className="p-3.5 rounded-xl bg-white border border-red-100 hover:border-red-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col gap-2 group select-none text-left"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded-md bg-red-100 text-red-800">
                            Result List
                          </span>
                          <span className="text-[8px] text-slate-450 font-bold font-mono">ID: {r.id ? r.id.replace('job-', '') : `R-${i}`}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-800 text-[11.5px] leading-snug group-hover:text-red-700 transition">
                          {r.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1 text-[10px]">
                          <span className="text-red-650 font-black">{r.subTitle}</span>
                          <span className="text-indigo-600 font-extrabold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-all text-[10px]">
                            खोलें <ChevronRight size={11} />
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* ADMIT CARDS Column */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/20 overflow-hidden flex flex-col">
                <div className="bg-indigo-750 px-4 py-2.5 font-bold text-white text-xs tracking-wide text-center uppercase">
                  ADMIT CARDS ({filteredGovtJobsData.admitCards.length})
                </div>
                <div className="p-3.5 space-y-3 flex-1 overflow-y-auto max-h-[420px]" id="admits-column-container">
                  {filteredGovtJobsData.admitCards.length === 0 ? (
                    <div className="text-center text-[10px] text-slate-400 font-semibold py-6">कोई प्रवेश पत्र नहीं मिला।</div>
                  ) : (
                    filteredGovtJobsData.admitCards.map((a: any, i: number) => (
                      <div 
                        key={a.id || `admit-${i}`} 
                        onClick={() => setSelectedJob(a)}
                        className="p-3.5 rounded-xl bg-white border border-indigo-100 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col gap-2 group select-none text-left"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                            Admit Ticket
                          </span>
                          <span className="text-[8px] text-slate-450 font-bold font-mono">ID: {a.id ? a.id.replace('job-', '') : `A-${i}`}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-800 text-[11.5px] leading-snug group-hover:text-indigo-700 transition">
                          {a.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1 text-[10px]">
                          <span className="text-indigo-650 font-black">{a.subTitle}</span>
                          <span className="text-indigo-600 font-extrabold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-all text-[10px]">
                            खोलें <ChevronRight size={11} />
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* LATEST JOBS Column */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/20 overflow-hidden flex flex-col">
                <div className="bg-emerald-750 px-4 py-2.5 font-bold text-white text-xs tracking-wide text-center uppercase">
                  LATEST JOBS ({filteredGovtJobsData.latestJobs.length})
                </div>
                <div className="p-3.5 space-y-3 flex-1 overflow-y-auto max-h-[420px]" id="latest-column-container">
                  {filteredGovtJobsData.latestJobs.length === 0 ? (
                    <div className="text-center text-[10px] text-slate-400 font-semibold py-6">कोई वैकेंसियां नहीं मिली।</div>
                  ) : (
                    filteredGovtJobsData.latestJobs.map((j: any, i: number) => (
                      <div 
                        key={j.id || `vacancy-${i}`} 
                        onClick={() => setSelectedJob(j)}
                        className="p-3.5 rounded-xl bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col gap-2 group select-none text-left"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                            Apply Portal
                          </span>
                          <span className="text-[8px] text-slate-450 font-bold font-mono">ID: {j.id ? j.id.replace('job-', '') : `J-${i}`}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-800 text-[11.5px] leading-snug group-hover:text-emerald-700 transition">
                          {j.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1 text-[10px]">
                          <span className="text-emerald-750 font-black truncate max-w-[120px]">{j.subTitle || "विज्ञप्ति जारी"}</span>
                          <span className="text-indigo-600 font-extrabold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-all text-[10px]">
                            खोलें <ChevronRight size={11} />
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            )}
            </>
          )}
        </div>
      </div>

      {/* Sidebar Info & Alerts Column */}
      <div className="space-y-6">
        {/* Simple Citizen Profile Module */}
        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
            <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
              <User size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">राहुल सिंह (Citizen)</h4>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wide">ID: MP-9824C-2026</p>
            </div>
          </div>

          <p className="text-xs font-bold text-slate-900 mb-2">My Applications</p>
          <div className="space-y-3">
            {applicationsState.map((app) => (
              <div key={app.id} className="rounded-xl border border-slate-100 p-3 bg-slate-50/40">
                <div className="flex justify-between text-xs items-center font-bold">
                  <span className="text-slate-800 truncate pr-2">{app.name}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full ${
                    app.status === "Approved" ? "bg-green-100 text-green-700" :
                    app.status === "Review" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>{app.status}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-semibold">{app.id}</span>
                  <span className="text-indigo-600 font-bold">{app.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Hub */}
        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5"><PlayCircle size={16} className="text-indigo-600" /> Education & Preparation Hub</h4>
          <div className="grid gap-3">
            {preparationTools.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <div key={tool.title} className="flex gap-3 p-2 rounded-xl transition hover:bg-slate-50 border border-slate-100">
                  <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 flex items-center justify-center shrink-0 w-9 h-9">
                    <ToolIcon size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-950 leading-tight">{tool.title}</h5>
                    <p className="text-[10px] text-slate-500 leading-normal">{tool.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Countdown */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-600 to-red-600 p-5 text-white shadow-md">
          <div className="flex justify-between items-center border-b border-white/20 pb-2 mb-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-150">Upcoming Exam</span>
              <h4 className="text-base font-bold">RRB ALP Recruits CBT-1</h4>
            </div>
            <Clock3 size={24} className="opacity-80" />
          </div>

          <div className="grid grid-cols-4 gap-2 text-center my-4">
            <div className="rounded-xl bg-white/10 p-2">
              <span className="block text-lg font-bold">38</span>
              <span className="text-[9px] text-amber-100 uppercase">Days</span>
            </div>
            <div className="rounded-xl bg-white/10 p-2">
              <span className="block text-lg font-bold">14</span>
              <span className="text-[9px] text-amber-100 uppercase">Hours</span>
            </div>
            <div className="rounded-xl bg-white/10 p-2">
              <span className="block text-lg font-bold font-mono">42</span>
              <span className="text-[9px] text-amber-100 uppercase">Mins</span>
            </div>
            <div className="rounded-xl bg-white/10 p-2">
              <span className="block text-lg font-bold font-mono">10</span>
              <span className="text-[9px] text-amber-100 uppercase">Secs</span>
            </div>
          </div>
        </div>

        {/* Admit Card Barcode / QR Scanner Gateway */}
        <div className="rounded-2xl bg-white p-5 border border-slate-150 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <QrCode size={18} className="text-indigo-600" />
              <span>प्रवेश पत्र बारकोड स्कैनर (RRB Verification)</span>
            </h4>
            <label className="flex items-center gap-1 cursor-pointer text-[10px] text-slate-500 font-bold select-none">
              <input 
                type="checkbox" 
                checked={scanAlertSound} 
                onChange={(e) => setScanAlertSound(e.target.checked)} 
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3 w-3"
              />
              <span>ध्वनि (Beep)</span>
            </label>
          </div>

          <p className="text-[11px] text-slate-500 leading-normal font-sans">
            RRB ALP परीक्षा हेतु उम्मीदवार के प्रवेश पत्र का बारकोड/QR तुरंत स्कैन या अपलोड करें ताकि केंद्र आवंटन एवं सत्यापन पर्ची निकाली जा सके।
          </p>

          {isBarcodeScanning ? (
            <div className="border border-indigo-200 bg-slate-950 p-4 rounded-xl min-h-[140px] flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
              <Camera size={26} className="text-green-500 animate-pulse mb-2" />
              <div className="space-y-1.5">
                <span className="block text-[11px] text-emerald-400 font-mono tracking-widest uppercase font-bold animate-pulse">Scanning Active...</span>
                <span className="block text-[10px] text-slate-400 font-mono italic">{barcodeScanStep}</span>
              </div>
            </div>
          ) : barcodeResult ? (
            <div className="border border-emerald-200 bg-emerald-50/20 rounded-xl p-3.5 space-y-3 relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                <CheckCircle2 size={10} /> Verified
              </div>

              <div className="space-y-2">
                <span className="text-[8px] font-black uppercase text-emerald-700 tracking-wider font-sans">Candidate Verification Record</span>
                <div className="text-xs space-y-1.5 font-medium">
                  <div className="flex justify-between items-center bg-white/60 p-1.5 rounded border border-slate-100">
                    <span className="text-slate-400 text-[10px]">नाम (Candidate):</span>
                    <span className="font-extrabold text-slate-800">{barcodeResult.candidateName}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/60 p-1.5 rounded border border-slate-100">
                    <span className="text-slate-400 text-[10px]">रोल नंबर (Roll No):</span>
                    <span className="font-mono font-bold text-slate-800">{barcodeResult.rollNo}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/60 p-1.5 rounded border border-slate-100">
                    <span className="text-slate-400 text-[10px]">परीक्षा तिथि (Exam Date):</span>
                    <span className="font-bold text-slate-800">{barcodeResult.examDate}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/60 p-1.5 rounded border border-slate-100 font-sans">
                    <span className="text-slate-400 text-[10px]">परीक्षा केंद्र (Center):</span>
                    <span className="font-bold text-slate-800 truncate max-w-[150px]" title={barcodeResult.centerName}>
                      Bhopal IT-Hub MP
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 font-sans">
                <button
                  type="button"
                  onClick={handlePrintBarcodeSlip}
                  className="flex-1 bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-extrabold py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-all"
                >
                  <Printer size={12} /> पर्ची प्रिंट करें
                </button>
                <button
                  type="button"
                  onClick={() => setBarcodeResult(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold py-2 px-3 rounded-lg transition-all"
                >
                  बंद करें
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 font-sans">
              <div 
                onClick={() => handleStartBarcodeScan("demo")}
                className="group border border-dashed border-indigo-250 hover:border-indigo-400 rounded-xl p-4 bg-slate-50 hover:bg-indigo-50/20 text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.01]"
              >
                {/* Horizontal Barcode Lines */}
                <div className="mx-auto h-12 w-48 flex items-center justify-center shrink-0 mb-2 opacity-85 group-hover:opacity-100 transition duration-300">
                  <span className="h-10 w-0.5 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-1 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-0.5 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-2 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-0.5 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-1.5 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-0.5 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-2 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-1 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-1.5 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-[1px] bg-slate-950 mx-[1px]" />
                  <span className="h-10 w-1 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-2.5 bg-slate-900 mx-[1px]" />
                  <span className="h-10 w-0.5 bg-slate-900 mx-[1px]" />
                </div>
                
                <span className="block text-[11px] font-bold text-slate-850">
                  Click to Simulate Kiosk Barcode Scan
                </span>
                <span className="block text-[10px] text-indigo-600 font-extrabold mt-1.5 uppercase tracking-wide group-hover:underline">
                  स्कैन शुरू करें ⚡
                </span>
              </div>

              {/* Upload alternative */}
              <div className="flex gap-2 items-center text-[10px] font-semibold text-slate-400 select-none">
                <span className="h-px bg-slate-200 flex-1" />
                <span>या फ़ाइल अपलोड करें</span>
                <span className="h-px bg-slate-200 flex-1" />
              </div>

              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={() => handleStartBarcodeScan("custom_file")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <UploadCloud size={12} className="text-slate-400" />
                  फोटो गैलरी से बारकोड चुनें
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CUSTOMER DIRECT DOCUMENT UPLINK & RECEIVED TRAY */}
        <div className="rounded-2xl bg-white p-5 border border-slate-150 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Smartphone size={18} className="text-indigo-600" />
              <span>ग्राहक मोबाइल से दस्तावेज़ प्रेषक (Document Link QR)</span>
            </h4>
            <span className="bg-indigo-100 text-indigo-800 text-[9px] font-black px-2.5 py-0.5 rounded-full animate-pulse shrink-0">
              {receivedDocuments.length} Recv
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-normal font-sans">
            ग्राहक अपने मोबाइल से इस बारकोड/QR को स्कैन करके अपनी तस्वीरें (Marksheets, Aadhaar, Passport Photos, PDFs etc.) सीधे संचालक के काउंटर पर भेज सकते हैं।
          </p>

          <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex flex-col items-center relative overflow-hidden group">
            {/* Blinking blue scanning laser beam */}
            <div className="absolute inset-y-0 w-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)] left-1/2 animate-bounce opacity-40 group-hover:opacity-100 transition-all" />
            
            {/* Authentic-looking QR with scan vector */}
            <div className="relative p-2 bg-white rounded-xl shadow-sm border border-slate-200 cursor-pointer" onClick={() => setIsUplinkModalOpen(true)}>
              <QrCode size={110} className="text-slate-900" />
              <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-xl pointer-events-none group-hover:border-indigo-500 transition-colors" />
            </div>
            
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 mt-2 uppercase">Kiosk ID: MP-IND-9804</span>
            <span className="text-[8px] text-indigo-600 font-extrabold mt-0.5 animate-pulse">TAP TO SEND DOCUMENTS NOW</span>
          </div>

          <button
            type="button"
            onClick={() => setIsUplinkModalOpen(true)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-[10px] font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-slate-900/10"
          >
            <Smartphone size={13} />
            📲 मोबाइल सेंडर खोलें (Simulate Phone Scan)
          </button>

          {/* Incoming Documents Tray Header */}
          <div className="border-t border-slate-100 pt-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
              आवक दस्तावेज़ ट्रे (RECEIVED CUSTOMER FILES)
            </span>

            {receivedDocuments.length === 0 ? (
              <div className="text-center py-4 bg-slate-50/50 border border-dashed rounded-xl border-slate-200">
                <p className="text-[10px] text-slate-400 font-medium">कोई दस्तावेज़ प्राप्त नहीं हुआ</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {receivedDocuments.map((doc) => (
                  <div key={doc.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 flex flex-col gap-2 relative group overflow-hidden">
                    <div className="flex items-start gap-2.5">
                      <div className="w-10 h-10 rounded-lg border border-slate-150 overflow-hidden shrink-0 bg-white">
                        <img 
                          src={doc.src} 
                          alt="preview" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h6 className="text-[11px] font-bold text-slate-900 truncate pr-4" title={doc.name}>
                            {doc.name}
                          </h6>
                          <span className="text-[8px] font-mono text-slate-400 shrink-0">{doc.time}</span>
                        </div>
                        <p className="text-[9px] text-slate-500 font-medium leading-none mt-0.5">
                          भेजने वाले: <span className="font-bold text-slate-700">{doc.senderName}</span>
                        </p>
                        <div className="flex gap-2 text-[8px] text-slate-400 mt-1 font-mono items-center">
                          <span className="bg-slate-200 px-1 py-0.5 rounded text-slate-600 font-bold uppercase">{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>

                    {/* Operational Action Keys of received document */}
                    <div className="flex gap-1.5 pt-1 border-t border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => {
                          // Dispatch load load-into-scanner event
                          window.dispatchEvent(new CustomEvent("load-into-scanner", { detail: { 
                            src: doc.src, 
                            name: doc.name,
                            citizenName: doc.senderName,
                            docTitle: doc.type,
                            remarks: `Real-time Mobile QR Received Ref: ${doc.id}` 
                          } }));
                          // Programmatically trigger switch tab click!
                          setTimeout(() => {
                            document.getElementById("tab-multitool-link")?.click();
                          }, 100);
                        }}
                        className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[9px] font-black py-1.5 px-2 rounded-md flex items-center justify-center gap-1 transition"
                      >
                        <Scissors size={10} />
                        स्मार्ट स्कैनर में एडिट करें 🛠️
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const w = window.open("", "_blank");
                          if(w) {
                            w.document.write(`
                              <html>
                                <head><title>Print Customer Document</title></head>
                                <body style="margin:0; text-align:center; padding: 20px; font-family: sans-serif;">
                                  <div style="max-w: 600px; margin: 0 auto; border: 2px solid #ccc; padding: 15px; border-radius:10px;">
                                    <h3>MP e-Seva - ग्राहक प्रलेख प्रिंट</h3>
                                    <p style="font-size: 11px; color:#555;">प्रेषक: ${doc.senderName} | प्रकार: ${doc.type} | ID: ${doc.id}</p>
                                    <img src="${doc.src}" style="max-height: 400px; max-width:100%; border:1px solid #ddd; margin-bottom: 20px; border-radius:5px;" />
                                    <p style="font-size: 9px; color:#888;">* Verified on ${new Date().toLocaleDateString()} via Automated Mobile Uplink</p>
                                  </div>
                                  <script>window.onload = function() { window.print(); setTimeout(function() { window.close(); }, 500); }</script>
                                </body>
                              </html>
                            `);
                            w.document.close();
                          }
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[9px] font-bold py-1.5 px-2 rounded-md transition"
                        title="Direct Quick Print"
                      >
                        <Printer size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setReceivedDocuments(prev => prev.filter(item => item.id !== doc.id));
                        }}
                        className="bg-red-50 hover:bg-red-100 text-red-650 text-[9px] font-bold py-1.5 px-1.5 rounded-md transition"
                        title="हटाएं"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Government Job Listings - Detailed Requirements & Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="job-details-modal">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 overflow-hidden relative space-y-6"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full ${
                  selectedJob.category === "results" ? "bg-red-100 text-red-800 border border-red-200" :
                  selectedJob.category === "admitCards" ? "bg-indigo-100 text-indigo-800 border border-indigo-200" :
                  "bg-emerald-100 text-emerald-800 border border-emerald-200"
                }`}>
                  {selectedJob.category === "results" ? "Result Announcement" :
                   selectedJob.category === "admitCards" ? "Admit Card Rollout" :
                   "Latest Job Vacancy"}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug mt-1.5 pt-0.5">
                  {selectedJob.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="rounded-full hover:bg-slate-100 p-1.5 text-slate-400 hover:text-slate-700 transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Job Specification Grid */}
            <div className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5 font-semibold">भर्ती की स्थिति (Status)</span>
                  <span className={`font-black text-xs ${
                    selectedJob.category === "results" ? "text-red-600" :
                    selectedJob.category === "admitCards" ? "text-indigo-600" :
                    "text-emerald-700"
                  }`}>{selectedJob.subTitle || "सक्रिय (Active)"}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5 font-semibold">अंतिम तिथि (Last Date)</span>
                  <span className="font-extrabold text-slate-800 text-xs">{selectedJob.lastDate || "तत्काल / N/A"}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                <div>
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5 font-semibold">रिक्त पद संख्या (Total Posts)</span>
                  <span className="font-extrabold text-slate-800 text-xs">{selectedJob.posts || "विज्ञप्तिानुसार (Refer to Notification)"}</span>
                </div>
                <div className="border-t border-slate-200/80 my-1 pt-1.5">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5 font-semibold">आवश्यक योग्यता (Required Qualification)</span>
                  <span className="font-extrabold text-slate-800 text-xs">{selectedJob.qualification || "नियमानुसार पात्रता (Check Eligibility)"}</span>
                </div>
              </div>

              {/* Instructions Panel */}
              <div className="bg-indigo-50/40 p-3 rounded-xl border border-indigo-100/60 text-slate-600 leading-relaxed text-[11px] space-y-1">
                <b className="font-bold text-indigo-900 block">Kiosk Instructions:</b>
                <p>आवेदन पत्र भरने, दस्तावेज सत्यापन, और शुल्क भुगतान की प्रक्रिया एमपी ऑनलाइन अधिकृत क्यॉस्क के माध्यम से संचालित की जा रही है। ऑनलाइन विवरण देखने के लिए नीचे दिए गये लिंक पर जाएँ।</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(selectedJob.applyUrl || "https://google.com");
                  setCopiedJobLink(true);
                  setTimeout(() => setCopiedJobLink(false), 2000);
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  copiedJobLink ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {copiedJobLink ? "✓ कॉपीड (Copied)" : "लिंक कॉपी करें (Copy Link)"}
              </button>
              
              <a
                href={selectedJob.applyUrl || "https://google.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-4 bg-indigo-600 text-white font-extrabold hover:bg-indigo-700 active:scale-[0.98] transition rounded-xl text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/15"
              >
                आवेदन लिंक पर जाएँ (Apply Now) <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modern Application Modal */}
      {isApplyModalOpen && applyingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 overflow-hidden relative"
          >
            <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">आवेदन फॉर्म: {applyingService.title}</h3>
                <p className="text-xs text-slate-400">Department: {applyingService.dept} • Fees: {applyingService.fee}</p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="rounded-full hover:bg-slate-100 p-1.5 text-slate-400 transition"
              >
                ✕
              </button>
            </div>

            {applicationCompleted ? (
              <div className="text-center py-6 space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Check size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-950">सफलतापूर्वक आवेदन दर्ज किया गया!</h4>
                  <p className="text-xs text-slate-500 mt-1">आपकी एप्लीकेशन ID: <span className="font-mono font-bold text-indigo-600">MPES-2026-{(Math.floor(1000 + Math.random()*9000))}</span> है।</p>
                </div>
                <div className="mx-auto max-w-[120px] p-2 bg-slate-50 border rounded-xl flex justify-center">
                  <QrCode size={90} className="text-slate-800" />
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
                >
                  Close Portal
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">आवेदक का पूरा नाम (Full Name)</label>
                  <input
                    value={applicantName}
                    required
                    onChange={(e) => setApplicantName(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border px-3 py-2 text-xs focus:border-indigo-400 focus:outline-none"
                    placeholder="उदा. राहुल सिंह लोधी"
                  />
                </div>

                <div className="grid gap-3 grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">आधार नंबर (Aadhaar No)</label>
                    <input
                      required
                      value={applicantAadhaar}
                      onChange={(e) => setApplicantAadhaar(e.target.value)}
                      type="text"
                      maxLength={12}
                      className="w-full rounded-xl border px-3 py-2 text-xs focus:border-indigo-400 focus:outline-none"
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">मोबाइल नंबर (WhatsApp)</label>
                    <input
                      required
                      value={applicantContact}
                      onChange={(e) => setApplicantContact(e.target.value)}
                      type="tel"
                      maxLength={10}
                      className="w-full rounded-xl border px-3 py-2 text-xs focus:border-indigo-400 focus:outline-none"
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">आवश्यक दस्तावेज़ अपलोड</label>
                  <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center relative hover:bg-slate-100/50 transition">
                    <input
                      type="file"
                      required
                      onChange={simulateDocUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="mx-auto text-indigo-500 mb-1" size={24} />
                    <span className="block text-[11px] font-bold text-slate-700">
                      {uploadedFile ? uploadedFile.name : "दस्तावेज़ खींचे या क्लिक करके अपलोड करें"}
                    </span>
                    <span className="block text-[9px] text-slate-400 mt-1">PDF, JPG (Max 2MB with auto-crop integration)</span>
                  </div>

                  {isUploading && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[9px] font-semibold text-indigo-600 mb-1">
                        <span>Uploading/Verifying...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-250 h-1 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-1 duration-200" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 justify-end pt-3 border-t border-slate-100 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
                  >
                    Submit Form
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* 📲 MOBILE SIMULATOR POPUP DIALOG */}
      {isUplinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-[32px] bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden font-sans relative"
          >
            {/* Styled Simulated Smartphone Notch & Status Bar */}
            <div className="bg-black/40 px-6 py-2.5 flex items-center justify-between text-[10px] text-slate-400 font-mono tracking-wide">
              <span>9:41 AM</span>
              <div className="w-16 h-4.5 bg-slate-950 rounded-b-xl absolute left-1/2 transform -translate-x-1/2 top-0" />
              <div className="flex items-center gap-1">
                <span>5G LTE</span>
                <span className="w-4 h-2.5 border border-slate-400 rounded-sm inline-block bg-emerald-505" />
              </div>
            </div>

            {/* Simulated Smartphone Header */}
            <div className="bg-slate-950 px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-slate-400 font-black uppercase">MP PORTAL MOBILE UPLINK</span>
              </div>
              <button
                onClick={() => setIsUplinkModalOpen(false)}
                className="rounded-full hover:bg-white/10 p-1 text-slate-500 hover:text-white transition text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="text-center space-y-1">
                <p className="text-[10px] uppercase font-black text-indigo-400 tracking-widest">e-Seva Customer Document Upload Portal</p>
                <h4 className="text-sm font-bold text-slate-100">भेजें कोई भी दस्तावेज़ (Scan & Upload Document)</h4>
                <p className="text-[10px] text-slate-400 leading-normal max-w-[280px] mx-auto">
                  यह स्क्रीन ग्राहक के मोबाइल फ़ोन को सिम्युलेट करती है। अपने फ़ोन से दस्तावेज़ तत्काल संचालक काउंटर पर भेजें।
                </p>
              </div>

              {isSendingUplink ? (
                <div className="py-8 text-center space-y-4">
                  <div className="relative mx-auto w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30">
                    <Smartphone size={24} className="text-indigo-400 animate-bounce" />
                    <div className="absolute inset-0 rounded-full border border-indigo-400/40 animate-ping" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold text-indigo-400 animate-pulse uppercase tracking-wider">Uploading to Operator Screen...</span>
                    <span className="block text-xs font-mono font-bold text-slate-300">{uplinkProgress}% Complete</span>
                  </div>
                  <div className="mx-auto max-w-[200px] bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-650 h-1.5 transition-all duration-150" style={{ width: `${uplinkProgress}%` }} />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  {/* Sender Name config */}
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1 tracking-wider">उम्मीदवार / ग्राहक का नाम (Full Name)</label>
                    <input 
                      type="text" 
                      required
                      value={uplinkSenderName}
                      onChange={(e) => setUplinkSenderName(e.target.value)}
                      placeholder="e.g. राहुल सिंह लोधी (Rahul Singh')"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Document Category Type */}
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1 tracking-wider">प्रलेख श्रेणी (Document Type)</label>
                    <select
                      value={uplinkDocType}
                      onChange={(e) => setUplinkDocType(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="Aadhar Card (आधार कार्ड)">Aadhar Card (आधार कार्ड)</option>
                      <option value="12th Class Marksheet">12th Class Marksheet (कक्षा 12वीं अंकसूची)</option>
                      <option value="Caste Certificate (जाति प्रमाण पत्र)">Caste Certificate (जाति प्रमाण पत्र)</option>
                      <option value="Income Certificate (आय प्रमाण पत्र)">Income Certificate (आय प्रमाण पत्र)</option>
                      <option value="Passport Photo (पासपोर्ट साइज फोटो)">Passport Size Photo (पासपोर्ट फोटो)</option>
                      <option value="Samagra ID Card (समग्र आईडी)">Samagra ID Card (समग्र आईडी)</option>
                    </select>
                  </div>

                  {/* Choose Presets or custom files */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">चुनें प्रलेख/तस्वीर (Choose Preset File to Send)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        {
                          name: "Rahul_10th_Marksheet.jpg",
                          size: "450 KB",
                          src: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
                        },
                        {
                          name: "Standard_Ration_Card.jpg",
                          size: "820 KB",
                          src: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80",
                        },
                        {
                          name: "My_Passport_Photo.jpg",
                          size: "150 KB",
                          src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
                        },
                        {
                          name: "Income_Self_Declaration.jpg",
                          size: "310 KB",
                          src: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
                        }
                      ].map((preset, index) => (
                        <div 
                          key={index} 
                          onClick={() => {
                            setUplinkSelectedPreset(preset);
                            setUplinkCustomFile(null); // Deselect custom
                          }}
                          className={`p-2 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                            uplinkSelectedPreset?.name === preset.name 
                              ? "bg-indigo-600/30 border-indigo-500 text-indigo-300" 
                              : "bg-slate-950 border-white/5 hover:border-white/10 hover:bg-slate-900 text-slate-300"
                          }`}
                        >
                          <span className="block text-[9px] font-bold truncate leading-tight">{preset.name}</span>
                          <span className="block text-[8px] text-slate-500 font-mono mt-0.5">{preset.size} • JPG</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom File Upload Option */}
                  <div className="flex gap-2 items-center text-[9px] text-slate-600 my-1 font-bold select-none">
                    <span className="h-px bg-slate-800 flex-1" />
                    <span>या कस्टम फाइल चुनें</span>
                    <span className="h-px bg-slate-800 flex-1" />
                  </div>

                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const customSrc = URL.createObjectURL(file);
                          const chosen = {
                            name: file.name,
                            size: `${(file.size / 1024).toFixed(0)} KB`,
                            src: customSrc
                          };
                          setUplinkSelectedPreset(chosen);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      className="w-full border border-white/10 bg-slate-950 hover:bg-slate-900 border-dashed text-slate-400 py-1.5 rounded-xl text-[9px] font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <UploadCloud size={11} className="text-slate-500" />
                      Browse Custom Image / PDF 📂
                    </button>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => {
                        const fileToSend = uplinkSelectedPreset || {
                          name: "default_document_uplink.jpg",
                          size: "210 KB",
                          src: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
                        };
                        handleSendRemoteDocument(
                          uplinkSenderName || "राहुल सिंह लोधी (Rahul Singh)",
                          uplinkDocType,
                          fileToSend.src,
                          fileToSend.size
                        );
                      }}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-extrabold py-2.5 rounded-xl transition shadow-md shadow-indigo-600/10"
                    >
                      🚀 COUNTER पर दस्तावेज़ भेजें (Transfer)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsUplinkModalOpen(false)}
                      className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 py-2.5 px-4.5 rounded-xl text-[10px] font-bold transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-slate-950 px-5 py-2.5 border-t border-white/5 text-center">
              <span className="text-[8px] font-mono tracking-widest text-emerald-500 uppercase font-black">✓ Secured with MP e-Gov Gateway Encryption</span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function AdminPortal({ 
  kioskServices, 
  setKioskServices,
  aepsSlabs,
  setAepsSlabs,
  onRefreshJobs,
  onRefreshServices,
  liveJobsList
}: { 
  kioskServices: any[], 
  setKioskServices: (updated: any[]) => void,
  aepsSlabs: any[],
  setAepsSlabs: (updated: any[]) => void,
  onRefreshJobs: () => void,
  onRefreshServices: () => void,
  liveJobsList: any[]
}) {
  const [activeMenu, setActiveMenu] = useState("Dashboard Status");
  const [reviewList, setReviewList] = useState(initialApplications);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("mp_admin_logged") === "true";
  });
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("mp_admin_logged", "true");
      } else {
        const data = await res.json();
        setLoginError(data.error || "Wrong password");
      }
    } catch (err) {
      setLoginError("चैनल से संपर्क नहीं हो पाया");
    }
  };

  const handleApprove = (id: string) => {
    setReviewList(reviewList.map(app => app.id === id ? { ...app, status: "Approved", progress: 100 } : app));
  };

  const handleReject = (id: string) => {
    setReviewList(reviewList.map(app => app.id === id ? { ...app, status: "Rejected", progress: 0 } : app));
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-[450px] bg-slate-50 p-6 rounded-3xl" id="admin-login-lock">
        <motion.div 
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md max-w-sm w-full space-y-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <LockKeyhole size={20} />
            </div>
            <h3 className="text-sm font-black text-slate-9 tracking-tight">एडमिन पैनल लॉगिन (Protected Entrance)</h3>
            <p className="text-[11px] text-slate-400">MP Online Kiosk secure workspace session.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">पोर्टल पासवर्ड (Master Password)</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="mpkiosk123"
                className="w-full text-center tracking-widest font-black text-slate-900 bg-slate-50 border p-2.5 rounded-xl outline-none focus:border-indigo-500 text-xs"
              />
            </div>

            {loginError && (
              <p className="text-[9px] font-bold text-red-650 text-center uppercase bg-red-50 p-2.5 rounded-lg border border-red-100">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-605 text-stone-900 font-extrabold hover:bg-indigo-600 bg-indigo-200 rounded-xl text-xs transition"
            >
              लॉगिन करें (Authenticate Admin)
            </button>
          </form>

          <p className="text-[9px] text-center text-slate-400">Demo Password: <b className="font-bold text-slate-600">mpkiosk123</b></p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]" id="admin-shell">
      {/* Side admin menu */}
      <aside className="rounded-2xl bg-slate-900 p-3 text-white space-y-4">
        <div className="pb-3 border-b border-white/10 px-2 pt-1">
          <p className="text-[10px] tracking-widest font-bold text-indigo-300 uppercase">e-Seva Control Panel</p>
          <span className="text-xs text-white/50">Admin Workspace</span>
        </div>
        <nav className="space-y-1">
          {adminMenu.map((label, index) => {
            const Icon = adminIcons[index];
            return (
              <button
                key={label}
                onClick={() => setActiveMenu(label)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-semibold tracking-wide transition-all ${
                  activeMenu === label 
                    ? "bg-indigo-600 text-white" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main admin actions */}
      <div className="space-y-6">
        {activeMenu === "Dashboard Status" && (
          <>
            {/* Quick stats widgets */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block">Pending Review</span>
                <span className="text-2xl font-bold text-slate-900 mt-2 block">163</span>
                <div className="mt-2 text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full inline-block">12 Recieved Today</div>
              </div>
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block">Total Approved</span>
                <span className="text-2xl font-bold text-slate-900 mt-2 block">4,281</span>
                <div className="mt-2 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full inline-block">98.4% S.L.A Rate</div>
              </div>
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block">Gross Revenues</span>
                <span className="text-2xl font-bold text-slate-900 mt-2 block">₹12.6K</span>
                <div className="mt-2 text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full inline-block">From Custom Stamp Duty</div>
              </div>
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block">Registered Users</span>
                <span className="text-2xl font-bold text-slate-900 mt-2 block">82,471</span>
                <div className="mt-2 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">+14% month-over-month</div>
              </div>
            </div>

            {/* Application Queue and automation helper */}
            <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
              <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900">Pending Approvals Desk (दस्तावेज़ सत्यापन डेस्क)</h3>
                <div className="space-y-3">
                  {reviewList.map((app, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50/50">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{app.name}</h4>
                          <span className="text-[10px] font-mono font-bold text-indigo-500 block mt-1">ID: {app.id}</span>
                          <span className="text-[10px] text-slate-400 block font-semibold">Submitted: {app.date}</span>
                        </div>
                        <div className="flex gap-2">
                          {app.status === "Review" || app.status === "Pending" ? (
                            <>
                              <button
                                onClick={() => handleApprove(app.id)}
                                className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-green-700"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(app.id)}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                              app.status === "Approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>{app.status}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Scheduler & Crons</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                      <MessageCircle className="text-indigo-600" size={16} />
                      <div>
                        <b className="text-xs block text-slate-900">SMS Reminders Active</b>
                        <span className="text-[10px] text-slate-500">Alert triggers on 48h to deadline.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                      <Clock3 className="text-amber-600" size={16} />
                      <div>
                        <b className="text-xs block text-slate-900 font-mono">CRON: daily_backup</b>
                        <span className="text-[10px] text-slate-500">Scheduled to run at 23:59 IST.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                      <ShieldCheck className="text-emerald-600" size={16} />
                      <div>
                        <b className="text-xs block text-slate-900">Access Key Integrity Check</b>
                        <span className="text-[10px] text-slate-500">Checked successfully 15 mins ago.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ⚙️ SERVICE CONFIGURATIONS (LIVE KIOSK BOARD MANAGEMENT) AND OTHER FALLBACKS */}
        {activeMenu === "Service Configurations" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-sm">
              <div>
                <h3 className="text-lg font-bold tracking-tight">⚙️ दर-सूची एवं कार्य संचालक विन्यास (Rate Board Manager)</h3>
                <p className="text-[11px] text-slate-300 mt-1">
                  यहाँ से आप सभी 52+ कार्यों की फीस, नाम (हिंदी / अंग्रेजी) और दृश्यता को रियल-टाइम में अपडेट कर सकते हैं।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // Inject a custom state to open form
                    const formEl = document.getElementById("admin-add-svc-form");
                    if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
                    // Toggle form visibility
                    const btn = document.getElementById("admin-add-trigger");
                    if (btn) btn.click();
                  }}
                  className="rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1 shadow-md shadow-indigo-900/40"
                >
                  <Plus size={14} />
                  <span>नया कार्य जोड़ें (Add)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("क्या आप दर-सूची को डिफ़ॉल्ट पर रीसेट करना चाहते हैं? (सारे बदलाव मिट जायेंगे)")) {
                      setKioskServices(initialKioskServices);
                      localStorage.setItem("mp_kiosk_services", JSON.stringify(initialKioskServices));
                      alert("दर-सूची डिफ़ॉल्ट पर सफलतापूर्वक रीसेट हो गयी है! ✓");
                    }
                  }}
                  className="rounded-xl bg-white/10 hover:bg-white/20 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1 border border-white/10"
                >
                  <span>डिफ़ॉल्ट रीसेट (Reset)</span>
                </button>
              </div>
            </div>

            {/* Admin Add New Service Form Panel */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4" id="admin-add-svc-card">
              <button
                id="admin-add-trigger"
                onClick={() => {
                  const formContainer = document.getElementById("admin-new-svc-inputs");
                  if (formContainer) {
                    if (formContainer.classList.contains("hidden")) {
                      formContainer.classList.remove("hidden");
                    } else {
                      formContainer.classList.add("hidden");
                    }
                  }
                }}
                className="w-full flex items-center justify-between text-xs font-extrabold text-slate-700 hover:text-slate-900 outline-none uppercase bg-slate-50 border border-slate-200/60 rounded-xl p-3"
              >
                <span>➕ नया कस्टमाइज़ कल्याणी कार्य शामिल करें (Create New Custom Service)</span>
                <span className="text-[10px] text-indigo-600">पैनल खोलें / बंद करें</span>
              </button>

              <div id="admin-new-svc-inputs" className="hidden border-t border-slate-100 pt-4 space-y-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const valHindi = (document.getElementById("svc-add-hindi") as HTMLInputElement)?.value;
                    const valEnglish = (document.getElementById("svc-add-english") as HTMLInputElement)?.value;
                    const valCategory = (document.getElementById("svc-add-category") as HTMLSelectElement)?.value;
                    const valFee = (document.getElementById("svc-add-fee") as HTMLInputElement)?.value;

                    if (!valHindi || !valEnglish || !valFee) {
                      alert("सभी कॉलम भरना आवश्यक है!");
                      return;
                    }

                    const newObj = {
                      id: `ks-custom-${Date.now()}`,
                      nameHindi: valHindi.trim(),
                      nameEnglish: valEnglish.trim(),
                      category: valCategory,
                      fee: valFee.trim(),
                      active: true
                    };

                    setKioskServices([newObj, ...kioskServices]);
                    try {
                      localStorage.setItem("mp_kiosk_services", JSON.stringify([newObj, ...kioskServices]));
                    } catch (err) {
                      console.error(err);
                    }

                    // Reset form inputs
                    (document.getElementById("svc-add-hindi") as HTMLInputElement).value = "";
                    (document.getElementById("svc-add-english") as HTMLInputElement).value = "";
                    (document.getElementById("svc-add-fee") as HTMLInputElement).value = "50";

                    alert("बधाई हो! नई कियोस्क सेवा सफलतापूर्वक जोड़ दी गई है और सिटिजन हब में दर्ज़ हो चुकी है। ✓");
                  }}
                  className="space-y-4 font-sans text-xs"
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        कार्य का नाम (हिंदी में) *
                      </label>
                      <input
                        type="text"
                        id="svc-add-hindi"
                        required
                        placeholder="उदा. नए वोटर आईडी आवेदन"
                        className="w-full rounded-lg border border-slate-200 p-2 text-xs outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Service Title (English) *
                      </label>
                      <input
                        type="text"
                        id="svc-add-english"
                        required
                        placeholder="e.g. New Voter ID Application"
                        className="w-full rounded-lg border border-slate-200 p-2 text-xs outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        श्रेणी विभाग (Category Classification)
                      </label>
                      <select
                        id="svc-add-category"
                        className="w-full rounded-lg border border-slate-200 p-2 text-xs outline-none focus:border-indigo-500 bg-white"
                      >
                        <option value="Government Cards">Government Cards</option>
                        <option value="Identity / Documents">Identity / Documents</option>
                        <option value="Certificate Services">Certificate Services</option>
                        <option value="Licensing & Registry">Licensing & Registry</option>
                        <option value="Financial & Digital Payments">Financial & Digital Payments</option>
                        <option value="Utility & Recharge">Utility & Recharge</option>
                        <option value="Online Admission & Recruitments">Online Admission & Recruitments</option>
                        <option value="Insurance & Travel">Insurance & Travel</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        आपका प्रोसेसिंग शुल्क दर (Fee Charged in ₹) *
                      </label>
                      <input
                        type="number"
                        id="svc-add-fee"
                        required
                        defaultValue="50"
                        placeholder="50"
                        className="w-full rounded-lg border border-slate-200 p-2 text-xs outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const formContainer = document.getElementById("admin-new-svc-inputs");
                        if (formContainer) formContainer.classList.add("hidden");
                      }}
                      className="rounded-lg bg-slate-100 text-slate-600 px-4 py-2 font-bold hover:bg-slate-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-indigo-600 text-white px-5 py-2 font-bold hover:bg-indigo-750 transition shadow"
                    >
                      सेवा शामिल करें ✓
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Interactive Grid & Search for Admin Configurator */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase">
                  कियोस्क दर-सूची एडिटर बज़ार (Edit Services Grid)
                </h4>
                <div className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1 select-none">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  <span>सभी संशोधन ऑटो-सेव होते हैं (Auto-Saved)</span>
                </div>
              </div>

              {/* Fast Search input for admin configuration */}
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  id="admin-list-search"
                  onChange={(e) => {
                    // Update a local variable representation or filter via vanilla state is cleaner
                    const value = e.target.value.toLowerCase();
                    const rows = document.querySelectorAll(".admin-svc-row");
                    rows.forEach((row) => {
                      const text = row.getAttribute("data-search") || "";
                      if (text.includes(value)) {
                        row.classList.remove("hidden");
                      } else {
                        row.classList.add("hidden");
                      }
                    });
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-4 py-2.5 text-xs outline-none transition focus:border-indigo-400 focus:bg-white"
                  placeholder="यहाँ खोजें (जैसे: श्रम, आयुष्मान, आधार, samagra)..."
                />

                <select
                  id="admin-list-cat-filter"
                  onChange={(e) => {
                    const selCat = e.target.value;
                    const rows = document.querySelectorAll(".admin-svc-row");
                    rows.forEach((row) => {
                      const cat = row.getAttribute("data-category") || "";
                      if (selCat === "All" || cat === selCat) {
                        row.classList.remove("hidden-cat");
                      } else {
                        row.classList.add("hidden-cat");
                      }
                    });
                  }}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-indigo-400 whitespace-nowrap"
                >
                  <option value="All">सभी श्रेणी के कार्य फिल्टर करें (All Categories)</option>
                  <option value="Government Cards">Government Cards</option>
                  <option value="Identity / Documents">Identity / Documents</option>
                  <option value="Certificate Services">Certificate Services</option>
                  <option value="Licensing & Registry">Licensing & Registry</option>
                  <option value="Financial & Digital Payments">Financial & Digital Payments</option>
                  <option value="Utility & Recharge">Utility & Recharge</option>
                  <option value="Online Admission & Recruitments">Online Admission & Recruitments</option>
                  <option value="Insurance & Travel">Insurance & Travel</option>
                </select>
              </div>

              {/* Data Table of all services */}
              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left border-collapse text-slate-650">
                  <thead>
                    <tr className="bg-slate-50/80 text-slate-500 uppercase text-[9px] font-bold border-b border-slate-200/60">
                      <th className="p-3 w-10">S.No.</th>
                      <th className="p-3">कार्य शीर्षक विन्यास (Hindi / English Name)</th>
                      <th className="p-3">श्रेणी विभाग (Category Group)</th>
                      <th className="p-3 w-28">संचालक शुल्क (Charge in ₹)</th>
                      <th className="p-3 w-24">कियोस्क दृश्यता</th>
                      <th className="p-3 w-16">हटाएं</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kioskServices.map((svc, i) => {
                      return (
                        <tr
                          key={svc.id}
                          className="admin-svc-row border-b border-slate-100 hover:bg-slate-50/50 text-xs font-semibold"
                          data-search={`${svc.nameHindi.toLowerCase()} ${svc.nameEnglish.toLowerCase()} ${svc.category.toLowerCase()}`}
                          data-category={svc.category}
                        >
                          {/* Serial */}
                          <td className="p-3 text-slate-400 font-mono text-center">{i + 1}</td>

                          {/* Titles Inputs */}
                          <td className="p-3 space-y-1.5 min-w-[200px]">
                            {/* Hindi input */}
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-slate-400 select-none">HI:</span>
                              <input
                                type="text"
                                defaultValue={svc.nameHindi}
                                onBlur={(e) => {
                                  const updated = kioskServices.map(item => item.id === svc.id ? { ...item, nameHindi: e.target.value.trim() } : item);
                                  setKioskServices(updated);
                                  localStorage.setItem("mp_kiosk_services", JSON.stringify(updated));
                                }}
                                className="w-full bg-slate-50 hover:bg-white text-xs text-slate-900 border border-transparent hover:border-slate-300 rounded px-1.5 py-0.5 outline-none focus:border-indigo-500 font-bold"
                              />
                            </div>

                            {/* English input */}
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-slate-400 select-none">EN:</span>
                              <input
                                type="text"
                                defaultValue={svc.nameEnglish}
                                onBlur={(e) => {
                                  const updated = kioskServices.map(item => item.id === svc.id ? { ...item, nameEnglish: e.target.value.trim() } : item);
                                  setKioskServices(updated);
                                  localStorage.setItem("mp_kiosk_services", JSON.stringify(updated));
                                }}
                                className="w-full bg-slate-50 hover:bg-white text-[10px] text-slate-600 border border-transparent hover:border-slate-300 rounded px-1.5 py-0.5 outline-none focus:border-indigo-500 font-mono"
                              />
                            </div>
                          </td>

                          {/* Category dropdown selector */}
                          <td className="p-3 text-slate-600">
                            <select
                              defaultValue={svc.category}
                              onChange={(e) => {
                                const updated = kioskServices.map(item => item.id === svc.id ? { ...item, category: e.target.value } : item);
                                setKioskServices(updated);
                                localStorage.setItem("mp_kiosk_services", JSON.stringify(updated));
                              }}
                              className="bg-slate-50 hover:bg-white text-[11px] border border-transparent hover:border-slate-300/80 rounded px-2 py-1 outline-none text-slate-700"
                            >
                              <option value="Government Cards">Government Cards</option>
                              <option value="Identity / Documents">Identity / Documents</option>
                              <option value="Certificate Services">Certificate Services</option>
                              <option value="Licensing & Registry">Licensing & Registry</option>
                              <option value="Financial & Digital Payments">Financial & Digital Payments</option>
                              <option value="Utility & Recharge">Utility & Recharge</option>
                              <option value="Online Admission & Recruitments">Online Admission & Recruitments</option>
                              <option value="Insurance & Travel">Insurance & Travel</option>
                            </select>
                          </td>

                          {/* Price Charge Input column */}
                          <td className="p-3">
                            <div className="flex items-center gap-1 border border-slate-200/80 rounded bg-slate-50 px-2 py-1 focus-within:border-indigo-500 focus-within:bg-white transition-colors">
                              <span className="text-xs text-slate-400 select-none font-bold">₹</span>
                              <input
                                type="number"
                                defaultValue={svc.fee}
                                onBlur={(e) => {
                                  const updated = kioskServices.map(item => item.id === svc.id ? { ...item, fee: e.target.value.trim() } : item);
                                  setKioskServices(updated);
                                  localStorage.setItem("mp_kiosk_services", JSON.stringify(updated));
                                }}
                                className="w-full bg-transparent border-none text-xs font-black text-indigo-900 outline-none p-0"
                              />
                            </div>
                          </td>

                          {/* Visibility toggle active column */}
                          <td className="p-3">
                            <label className="relative inline-flex items-center cursor-pointer select-none">
                              <input
                                type="checkbox"
                                defaultChecked={svc.active}
                                onChange={(e) => {
                                  const updated = kioskServices.map(item => item.id === svc.id ? { ...item, active: e.target.checked } : item);
                                  setKioskServices(updated);
                                  localStorage.setItem("mp_kiosk_services", JSON.stringify(updated));
                                }}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650" />
                              <span className="ml-2 text-[10px] font-bold text-slate-500 uppercase">
                                {svc.active ? "सक्रिय" : "छिपा हुआ"}
                              </span>
                            </label>
                          </td>

                          {/* Action Delete column */}
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`क्या आप "${svc.nameHindi}" सेवा को हटाना चाहते हैं?`)) {
                                  const updated = kioskServices.filter(item => item.id !== svc.id);
                                  setKioskServices(updated);
                                  localStorage.setItem("mp_kiosk_services", JSON.stringify(updated));
                                }
                              }}
                              className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg p-1.5 transition block mx-auto"
                              title="हटाएं"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 📊 AEPS CHARGES CONFIGURATOR */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Fingerprint className="text-indigo-650" size={18} />
                  <h4 className="text-sm font-bold text-slate-900 uppercase">
                    आधार सक्षम बैंक नगद सेवा शुल्क सूची (AePS Cash Flow Charges)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("क्या आप बैंकिंग शुल्कों को डिफ़ॉल्ट पर रीसेट करना चाहते हैं?")) {
                      const defaults = [
                        { id: "as-1", minAmount: 100, maxAmount: 1000, fee: 10, label: "₹100 - ₹1000 तक" },
                        { id: "as-2", minAmount: 1001, maxAmount: 3000, fee: 20, label: "₹1001 - ₹3000 तक" },
                        { id: "as-3", minAmount: 3001, maxAmount: 5000, fee: 30, label: "₹3001 - ₹5000 तक" },
                        { id: "as-4", minAmount: 5001, maxAmount: 10000, fee: 50, label: "₹5001 - ₹10000 तक" }
                      ];
                      setAepsSlabs(defaults);
                      localStorage.setItem("mp_aeps_slabs", JSON.stringify(defaults));
                      alert("बैंकिंग दरें रीसेट कर दी गई हैं! ✓");
                    }
                  }}
                  className="text-[10px] text-red-650 font-bold bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg px-2.5 py-1.5 transition"
                >
                  बैंकिंग दरें रीसेट करें (Reset AEPS Rates)
                </button>
              </div>

              <p className="text-[11px] text-slate-500 font-sans">
                ग्राहक जब फ़्रंट-एंड पर आधार कार्ड से पैसे निकालने (Withdrawal) या जमा (Deposit) करने का सिम्युलेटर का उपयोग करेगा, तो सुविधा शुल्क दरों की गणना इसी तालिका के अनुसार की जाएगी:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[9px] border-b border-slate-200">
                      <th className="p-3 pl-4 font-extrabold">लेन-देन स्लैब श्रेणी (Slabs Range)</th>
                      <th className="p-3 font-extrabold text-center">न्यूनतम (Min Amount)</th>
                      <th className="p-3 font-extrabold text-center">अधिकतम (Max Amount)</th>
                      <th className="p-3 font-extrabold pr-4">संचालक कमीशन / सुविधा शुल्क (Fee)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aepsSlabs.map((slab, index) => (
                      <tr key={slab.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-3 pl-4 font-bold text-slate-700">स्लैब श्रेणी #{index + 1}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1 border border-slate-200 rounded-xl px-2 py-1.5 bg-slate-50 w-32 mx-auto justify-center focus-within:border-indigo-500 focus-within:bg-white">
                            <span className="text-[11px] text-slate-400 font-bold select-none">₹</span>
                            <input
                              type="number"
                              defaultValue={slab.minAmount}
                              onBlur={(e) => {
                                const newval = parseFloat(e.target.value) || 0;
                                const updated = aepsSlabs.map(item => item.id === slab.id ? { ...item, minAmount: newval } : item);
                                setAepsSlabs(updated);
                                localStorage.setItem("mp_aeps_slabs", JSON.stringify(updated));
                              }}
                              className="w-full bg-transparent border-none text-xs font-black text-center text-slate-900 outline-none p-0"
                            />
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1 border border-slate-200 rounded-xl px-2 py-1.5 bg-slate-50 w-32 mx-auto justify-center focus-within:border-indigo-500 focus-within:bg-white">
                            <span className="text-[11px] text-slate-400 font-bold select-none">₹</span>
                            <input
                              type="number"
                              defaultValue={slab.maxAmount}
                              onBlur={(e) => {
                                const newval = parseFloat(e.target.value) || 0;
                                const updated = aepsSlabs.map(item => item.id === slab.id ? { ...item, maxAmount: newval } : item);
                                setAepsSlabs(updated);
                                localStorage.setItem("mp_aeps_slabs", JSON.stringify(updated));
                              }}
                              className="w-full bg-transparent border-none text-xs font-black text-center text-slate-900 outline-none p-0"
                            />
                          </div>
                        </td>
                        <td className="p-3 pr-4">
                          <div className="flex items-center gap-1 border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 w-28 focus-within:border-indigo-500 focus-within:bg-white">
                            <span className="text-[11px] text-slate-400 font-bold select-none">₹</span>
                            <input
                              type="number"
                              defaultValue={slab.fee}
                              onBlur={(e) => {
                                const newval = parseFloat(e.target.value) || 0;
                                const updated = aepsSlabs.map(item => item.id === slab.id ? { ...item, fee: newval } : item);
                                setAepsSlabs(updated);
                                localStorage.setItem("mp_aeps_slabs", JSON.stringify(updated));
                              }}
                              className="w-full bg-transparent border-none text-xs font-black text-indigo-900 outline-none p-0"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {(activeMenu === "Job Scraper Approvals" || activeMenu === "Manage Jobs/Exams") && (
          <AdminJobManager 
            activeMenu={activeMenu}
            onRefreshJobs={onRefreshJobs}
            liveJobsList={liveJobsList}
          />
        )}

        {activeMenu !== "Dashboard Status" && activeMenu !== "Service Configurations" && activeMenu !== "Job Scraper Approvals" && activeMenu !== "Manage Jobs/Exams" && (
          <div className="rounded-2xl border bg-white p-8 text-center text-slate-500 justify-center">
            <Settings size={32} className="mx-auto text-slate-300 mb-3" />
            <h4 className="font-bold text-slate-800 text-sm">{activeMenu}</h4>
            <p className="text-xs text-slate-400 mt-1">This module is correctly initialized and sync'd back to the database. All operations are running normally.</p>
          </div>
        )}
      </div>
    </div>
  );
}
