import fs from "node:fs";
import path from "node:path";

export interface JobItem {
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

export interface KioskService {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  fee: string;
  category: string;
  active: boolean;
}

export interface DatabaseSchema {
  jobs: JobItem[];
  pendingJobs: JobItem[];
  kioskServices: KioskService[];
}

const DB_FILE = path.join(process.cwd(), "src", "data", "db.json");

// Define initial data in case db.json doesn't exist
const initialKioskServices: KioskService[] = [
  { id: "ks-1", nameHindi: "समग्र ID सदस्य जोड़ना / हटाना", nameEnglish: "Samagra ID Member Operations", fee: "50", category: "Government Cards", active: true },
  { id: "ks-2", nameHindi: "मूल निवासी प्रमाण पत्र", nameEnglish: "Domicile Certificate Application", fee: "80", category: "Certificate Services", active: true },
  { id: "ks-3", nameHindi: "आय प्रमाण पत्र", nameEnglish: "Income Certificate Application", fee: "80", category: "Certificate Services", active: true },
  { id: "ks-4", nameHindi: "जाति प्रमाण पत्र (SC/ST/OBC)", nameEnglish: "Caste Certificate MP", fee: "100", category: "Certificate Services", active: true },
  { id: "ks-5", nameHindi: "खसरा / खतौनी (B1) प्रतिलिपि", nameEnglish: "Land Records Map B1 Kopie", fee: "40", category: "Licensing & Registry", active: true },
  { id: "ks-6", nameHindi: "डिजिटल राशन कार्ड प्रिंट", nameEnglish: "E-Ration Card Digital Copy", fee: "55", category: "Government Cards", active: true },
  { id: "ks-7", nameHindi: "MP पुलिस चरित्र सत्यापन", nameEnglish: "Police Character Certificate", fee: "120", category: "Certificate Services", active: true },
  { id: "ks-8", nameHindi: "श्रम योजना कार्ड (Majuur)", nameEnglish: "Shramik Card Enrollment MP", fee: "60", category: "Government Cards", active: true },
  { id: "ks-9", nameHindi: "नवीन आधार पंजीकरण", nameEnglish: "New Aadhaar Enrolment", fee: "0", category: "Identity / Documents", active: true },
  { id: "ks-10", nameHindi: "आधार बायोमेट्रिक / पता अपडेट", nameEnglish: "Aadhaar Biometric & Address Edit", fee: "100", category: "Identity / Documents", active: true },
  { id: "ks-11", nameHindi: "पेंशन योजना पंजीयन", nameEnglish: "Social Pension Schemes Application", fee: "75", category: "Government Cards", active: true },
  { id: "ks-12", nameHindi: "ई-श्रम नया पंजीयन", nameEnglish: "E-Shram Card Registration Portal", fee: "50", category: "Government Cards", active: true },
];

const initialJobs: JobItem[] = [
  {
    id: "job-1",
    title: "MPESB Police SI & Subedar",
    subTitle: "Result 2026 – Out",
    category: "results",
    applyUrl: "https://esb.mp.gov.in",
    createdAt: new Date().toISOString()
  },
  {
    id: "job-2",
    title: "UPSSSC Pharmacist Eligibility",
    subTitle: "Result 2026 – Out",
    category: "results",
    applyUrl: "http://upsssc.gov.in",
    createdAt: new Date().toISOString()
  },
  {
    id: "job-3",
    title: "DSSSB PGT Sanskrit",
    subTitle: "Result 2026 – Out",
    category: "results",
    applyUrl: "https://dsssb.delhi.gov.in",
    createdAt: new Date().toISOString()
  },
  {
    id: "job-4",
    title: "Indian Army Agniveer CEE",
    subTitle: "Admit Card 2026 – Out",
    category: "admitCards",
    applyUrl: "https://joinindianarmy.nic.in",
    createdAt: new Date().toISOString()
  },
  {
    id: "job-5",
    title: "SSC GD Constable",
    subTitle: "Admit Card 2026 – Out",
    category: "admitCards",
    applyUrl: "https://ssc.gov.in",
    createdAt: new Date().toISOString()
  },
  {
    id: "job-6",
    title: "RRB NTPC 10+2 UG",
    subTitle: "Admit Card 2026 – Out",
    category: "admitCards",
    applyUrl: "https://indianrailways.gov.in",
    createdAt: new Date().toISOString()
  },
  {
    id: "job-7",
    title: "UPSC CDS-II Online Form 2026",
    subTitle: "Apply Now",
    category: "latestJobs",
    posts: "450 Posts",
    qualification: "Degree / B.Tech",
    lastDate: "20 June 2026",
    applyUrl: "https://upsc.gov.in",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "job-8",
    title: "Railway RRB ALP Online Form 2026",
    subTitle: "11,127 Posts",
    category: "latestJobs",
    posts: "11,127 Posts",
    qualification: "10th / ITI",
    lastDate: "28 June 2026",
    applyUrl: "https://rrbcdg.gov.in",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "job-9",
    title: "Railway RRB Technician Online Form 2026",
    subTitle: "6,565 Posts",
    category: "latestJobs",
    posts: "6,565 Posts",
    qualification: "10th / ITI / Physics Math",
    lastDate: "15 July 2026",
    applyUrl: "https://rrbcdg.gov.in",
    featured: false,
    createdAt: new Date().toISOString()
  }
];

const initialPendingJobs: JobItem[] = [
  {
    id: "scraped-pending-1",
    title: "MPPSC State Forest Service Notification 2026",
    subTitle: "150 Posts",
    category: "latestJobs",
    posts: "150 Posts",
    qualification: "Degree (Science/Engineering)",
    lastDate: "29 July 2026",
    applyUrl: "https://mppsc.mp.gov.in",
    scrapedFrom: "mppsc.mp.gov.in",
    createdAt: new Date().toISOString()
  },
  {
    id: "scraped-pending-2",
    title: "SSC CGL Exam Admit Card Download Phase I",
    subTitle: "Admit Card Out",
    category: "admitCards",
    applyUrl: "https://ssc.gov.in",
    scrapedFrom: "ssc.gov.in",
    createdAt: new Date().toISOString()
  }
];

export function loadDatabase(): DatabaseSchema {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const defaultDb: DatabaseSchema = {
      jobs: initialJobs,
      pendingJobs: initialPendingJobs,
      kioskServices: initialKioskServices,
    };
    saveDatabase(defaultDb);
    return defaultDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse DB file. Resetting to defaults.", error);
    const defaultDb: DatabaseSchema = {
      jobs: initialJobs,
      pendingJobs: initialPendingJobs,
      kioskServices: initialKioskServices,
    };
    saveDatabase(defaultDb);
    return defaultDb;
  }
}

export function saveDatabase(data: DatabaseSchema): void {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write database file:", error);
  }
}
