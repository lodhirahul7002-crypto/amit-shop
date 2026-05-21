import { DatabaseSchema, JobItem, loadDatabase, saveDatabase } from "./db.js";

// Helper generator to simulate realistic scraped government announcements
const BOARD_MOCKS = {
  results: [
    { title: "MP High Court Junior Judicial Assistant Exam Result 2026", subTitle: "Out", applyUrl: "https://mphc.gov.in" },
    { title: "SSC Stenographer Grade C & D Result Scorecard 2026", subTitle: "Scorecard Out", applyUrl: "https://ssc.gov.in" },
    { title: "Indian Navy INCET 01/2026 Direct Merit List", subTitle: "Result Out", applyUrl: "https://joinindiannavy.gov.in" },
    { title: "MP Board Class 10th & 12th Supplementary Result", subTitle: "Available Now", applyUrl: "https://mpbse.nic.in" },
    { title: "IBPS RRB Clerk (Office Assistant) Phase-II Final Merit Result", subTitle: "Declared", applyUrl: "https://ibps.in" }
  ],
  admitCards: [
    { title: "MPPSC State Service (Prelims) Exam Admit Card 2026", subTitle: "Admit Card Out", applyUrl: "https://mppsc.mp.gov.in" },
    { title: "NTA JEE Mains Phase-II Session Admit Card", subTitle: "Download Now", applyUrl: "https://jeemain.nta.ac.in" },
    { title: "Bihar Police Sub Inspector (SI) Physical Test Admit Card", subTitle: "Out", applyUrl: "https://bpssc.bih.nic.in" },
    { title: "Railway RRB Technician Grade-I Hall Ticket", subTitle: "Download Active", applyUrl: "https://rrbcdg.gov.in" },
    { title: "UP Police Constable Re-Exam City Intimation Slip", subTitle: "Intimation Out", applyUrl: "https://uppbpb.gov.in" }
  ],
  latestJobs: [
    { title: "MP ESB Group 4 Allied Services Recruitment 2026", subTitle: "3,260 Posts", posts: "3,260 Posts", qualification: "12th Pass / CPCT Certificate", lastDate: "18 August 2026", applyUrl: "https://esb.mp.gov.in" },
    { title: "Indian Army TGC-140 Entry For Engineers (July Course)", subTitle: "Apply Online", posts: "42 Posts", qualification: "B.E. / B.Tech (Final Year eligible)", lastDate: "22 June 2026", applyUrl: "https://joinindianarmy.nic.in" },
    { title: "Delhi Metro DMRC Executive & Non-Executive Officers Recruitment", subTitle: "180 Vacancies", posts: "180 Vacancies", qualification: "Diploma / Degree (Engg/Admin)", lastDate: "10 July 2026", applyUrl: "https://delhimetrorail.com" },
    { title: "Staff Selection Commission SSC MTS & Havaldar Bharti 2026", subTitle: "8,500+ Posts", posts: "8,500+ Posts", qualification: "10th Class Pass", lastDate: "31 July 2026", applyUrl: "https://ssc.gov.in" },
    { title: "UPSC Civil Services Central IAS/IFS Application Form 2026", subTitle: "1,056 Posts", posts: "1,056 Posts", qualification: "Any Graduate Degree", lastDate: "15 June 2026", applyUrl: "https://upsc.gov.in" }
  ]
};

const BOARD_DOMAINS = [
  "esb.mp.gov.in",
  "mppsc.mp.gov.in",
  "ssc.gov.in",
  "upsc.gov.in",
  "rrbcdg.gov.in",
  "joinindianarmy.nic.in",
  "mphc.gov.in"
];

/**
 * Executes a simulated web-scraping task from various official boards.
 * Generates updates, verifies against duplicates in both Live and Pending DB,
 * and inserts new items into the "pendingJobs" approval queue.
 */
export function executeAutoScraper(): { newItemsCount: number; items: JobItem[] } {
  console.log("[Scraper] Initiating scraper run...");
  const db = loadDatabase();
  const newItems: JobItem[] = [];

  // Randomly pull 2 to 4 announcements to simulate freshly found listings
  const totalScrapCount = Math.floor(Math.random() * 3) + 2; 

  const categories = ["results", "admitCards", "latestJobs"] as const;

  for (let i = 0; i < totalScrapCount; i++) {
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const mockPool = BOARD_MOCKS[randomCat];
    const itemTemplate = mockPool[Math.floor(Math.random() * mockPool.length)];

    // Check if duplicate already exists in live jobs or pending list
    const isDuplicate = 
      db.jobs.some(j => j.title.toLowerCase() === itemTemplate.title.toLowerCase()) ||
      db.pendingJobs.some(j => j.title.toLowerCase() === itemTemplate.title.toLowerCase()) ||
      newItems.some(j => j.title.toLowerCase() === itemTemplate.title.toLowerCase());

    if (!isDuplicate) {
      const randomDomain = BOARD_DOMAINS[Math.floor(Math.random() * BOARD_DOMAINS.length)];
      
      const newJob: JobItem = {
        id: `scraped-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: itemTemplate.title,
        subTitle: itemTemplate.subTitle,
        category: randomCat,
        posts: (itemTemplate as any).posts || undefined,
        qualification: (itemTemplate as any).qualification || undefined,
        lastDate: (itemTemplate as any).lastDate || undefined,
        applyUrl: itemTemplate.applyUrl,
        scrapedFrom: randomDomain,
        createdAt: new Date().toISOString()
      };

      newItems.push(newJob);
    }
  }

  if (newItems.length > 0) {
    db.pendingJobs = [...newItems, ...db.pendingJobs];
    saveDatabase(db);
  }

  console.log(`[Scraper] Scraper execution ended. Found ${newItems.length} new announcements!`);
  return {
    newItemsCount: newItems.length,
    items: newItems
  };
}
