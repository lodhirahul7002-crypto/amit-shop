import express from "express";
import path from "node:path";
import { createServer as createViteServer } from "vite";
import { loadDatabase, saveDatabase, JobItem, KioskService } from "./src/server/db";
import { executeAutoScraper } from "./src/server/scraper";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Log requests
  app.use((req, res, next) => {
    console.log(`[Express] ${req.method} ${req.url}`);
    next();
  });

  // Load database on launch
  const db = loadDatabase();
  console.log(`[DB] Database initialized successfully. Live Jobs: ${db.jobs.length}, Pending: ${db.pendingJobs.length}`);

  // Auto trigger scraper on startup (keeps queue hydrated) and run periodically
  try {
    const res = executeAutoScraper();
    console.log(`[Startup Scraper] Added ${res.newItemsCount} pending scraped jobs to validation queue.`);
  } catch (err) {
    console.error("[Startup Scraper] Failed to run initial scrape:", err);
  }

  // Run scraper every 5 minutes automatically in the background
  setInterval(() => {
    try {
      console.log("[Auto-Scraper] Running cron scraper interval...");
      executeAutoScraper();
    } catch (err) {
      console.error("[Auto-Scraper] Interval cron scraping error:", err);
    }
  }, 5 * 60 * 1000);

  /* =========================================================================
     API ENDPOINTS - SERVICES
     ========================================================================= */

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // GET: Kiosk Services Fee Deck
  app.get("/api/kiosk-services", (req, res) => {
    const currentDb = loadDatabase();
    res.json(currentDb.kioskServices);
  });

  // POST: Create or Update single/all Kiosk Services (Admin Action)
  app.post("/api/kiosk-services/save", (req, res) => {
    const currentDb = loadDatabase();
    const serviceData = req.body as KioskService;

    if (!serviceData || !serviceData.id) {
       res.status(400).json({ error: "Invalid kiosk service record" });
       return;
    }

    const idx = currentDb.kioskServices.findIndex(k => k.id === serviceData.id);
    if (idx !== -1) {
      // update
      currentDb.kioskServices[idx] = { ...currentDb.kioskServices[idx], ...serviceData };
    } else {
      // create
      currentDb.kioskServices.push(serviceData);
    }

    saveDatabase(currentDb);
    res.json({ success: true, message: "Kiosk rates updated successfully!", data: currentDb.kioskServices });
  });

  /* =========================================================================
     API ENDPOINTS - JOBS / RESULTS / ADMIT CARDS
     ========================================================================= */

  // GET: Live public jobs lists
  app.get("/api/jobs", (req, res) => {
    const currentDb = loadDatabase();
    const publicJobs = currentDb.jobs.filter(j => !j.hidden);
    res.json(publicJobs);
  });

  // GET: Scraper Queue Pending Approvals (Admin Action)
  app.get("/api/scraper/pending", (req, res) => {
    const currentDb = loadDatabase();
    res.json(currentDb.pendingJobs);
  });

  // POST: Trigger Manual Web Scrape of official boards
  app.post("/api/scraper/trigger", (req, res) => {
    try {
      const result = executeAutoScraper();
      const currentDb = loadDatabase();
      res.json({
        success: true,
        message: `Scraper executed! Retrieved ${result.newItemsCount} new announcements from exam boards.`,
        pendingCount: currentDb.pendingJobs.length,
        items: result.items
      });
    } catch (err: any) {
      res.status(500).json({ error: "Scraper task failed to execute", details: err.message });
    }
  });

  // POST: Manually Create a Live Announcement
  app.post("/api/jobs/add", (req, res) => {
    const currentDb = loadDatabase();
    const payload = req.body;

    if (!payload.title || !payload.category) {
       res.status(400).json({ error: "Title and Category are required" });
       return;
    }

    const newJob: JobItem = {
      id: `job-${Date.now()}`,
      title: payload.title,
      subTitle: payload.subTitle || "Apply Now",
      category: payload.category as any,
      posts: payload.posts,
      qualification: payload.qualification,
      lastDate: payload.lastDate,
      applyUrl: payload.applyUrl || "https://google.com/search?q=" + encodeURIComponent(payload.title),
      featured: !!payload.featured,
      hidden: false,
      createdAt: new Date().toISOString()
    };

    currentDb.jobs.unshift(newJob);
    saveDatabase(currentDb);
    res.json({ success: true, message: "Job uploaded successfully", data: newJob });
  });

  // POST: Approve a pending Scraped Item
  app.post("/api/jobs/approve", (req, res) => {
    const currentDb = loadDatabase();
    const { id, title, subTitle, category, posts, qualification, lastDate, applyUrl, featured } = req.body;

    if (!id) {
       res.status(400).json({ error: "Missing job ID to approve" });
       return;
    }

    // 1. Remove from pendingJobs
    const beforeLength = currentDb.pendingJobs.length;
    currentDb.pendingJobs = currentDb.pendingJobs.filter(j => j.id !== id);

    // 2. Generate a valid public JobItem and add to jobs
    const approvedJob: JobItem = {
      id: id.startsWith("scraped-") ? id.replace("scraped-", "job-") : `job-${Date.now()}`,
      title: title || "New Approved Notification",
      subTitle: subTitle || "Apply Now",
      category: category || "latestJobs",
      posts,
      qualification,
      lastDate,
      applyUrl: applyUrl || "https://google.com",
      featured: !!featured,
      hidden: false,
      createdAt: new Date().toISOString()
    };

    currentDb.jobs.unshift(approvedJob);
    saveDatabase(currentDb);

    res.json({ 
      success: true, 
      message: "Scraped announcement verified and approved live!", 
      data: approvedJob,
      pendingCount: currentDb.pendingJobs.length 
    });
  });

  // POST: Reject & Dismiss a pending Scraped Item
  app.post("/api/jobs/reject", (req, res) => {
    const currentDb = loadDatabase();
    const { id } = req.body;

    if (!id) {
       res.status(400).json({ error: "Missing job ID to reject" });
       return;
    }

    currentDb.pendingJobs = currentDb.pendingJobs.filter(j => j.id !== id);
    saveDatabase(currentDb);

    res.json({ 
      success: true, 
      message: "Scraped item deleted from queue without approval.",
      pendingCount: currentDb.pendingJobs.length
    });
  });

  // POST: Update standard live job attributes (Edit Action)
  app.post("/api/jobs/edit", (req, res) => {
    const currentDb = loadDatabase();
    const updated = req.body as JobItem;

    if (!updated || !updated.id) {
       res.status(400).json({ error: "Missing ID for edit payload" });
       return;
    }

    const idx = currentDb.jobs.findIndex(j => j.id === updated.id);
    if (idx === -1) {
       res.status(404).json({ error: "Job item not found" });
       return;
    }

    currentDb.jobs[idx] = {
      ...currentDb.jobs[idx],
      ...updated
    };

    saveDatabase(currentDb);
    res.json({ success: true, message: "Live job listing modified successfully!", data: currentDb.jobs[idx] });
  });

  // POST: Hard Delete a live job
  app.post("/api/jobs/delete", (req, res) => {
    const currentDb = loadDatabase();
    const { id } = req.body;

    if (!id) {
       res.status(400).json({ error: "Missing job ID to delete" });
       return;
    }

    currentDb.jobs = currentDb.jobs.filter(j => j.id !== id);
    saveDatabase(currentDb);

    res.json({ success: true, message: "Announcement deleted from public view successfully." });
  });

  // POST: Protect login credentials check
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === "mpkiosk123") {
      res.json({ success: true, token: "admin_token_" + Date.now() });
    } else {
      res.status(401).json({ success: false, error: "अमान्य एडमिन पासवर्ड! (Wrong Password)" });
    }
  });

  /* =========================================================================
     VITE / PRODUCTION STATIC SERVING LAYER
     ========================================================================= */

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("[Vite] Dev middleware integrated successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("[Vite] Production static server activated.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`===============================================`);
    console.log(`  M.P. ONLINE eSeva Portal Server Live!`);
    console.log(`  Address: http://0.0.0.0:${PORT}`);
    console.log(`  Admin Secret Key (Demo): mpkiosk123`);
    console.log(`===============================================`);
  });
}

startServer();
