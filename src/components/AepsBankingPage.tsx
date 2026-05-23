import React, { useState, useEffect } from "react";
import {
  Fingerprint,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  Coins,
  ShieldCheck,
  Landmark,
  ChevronRight,
  Database,
  Search,
  BookOpen,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AepsBankingPage() {
  const [selectedBank, setSelectedBank] = useState<string>("State Bank of India");
  const [aadhaarNumber, setAadhaarNumber] = useState<string>("");
  const [transactionType, setTransactionType] = useState<"Withdrawal" | "Deposit" | "Balance" | "Statement">("Withdrawal");
  const [amount, setAmount] = useState<string>("2000");
  const [customerName, setCustomerName] = useState<string>("");
  const [fingerprintVerified, setFingerprintVerified] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanMessage, setScanMessage] = useState<string>("");

  const [receipt, setReceipt] = useState<any | null>(null);
  const [logs, setLogs] = useState<any[]>([]);

  const banks = [
    "State Bank of India",
    "Bank of Baroda",
    "Punjab National Bank",
    "Madhya Pradesh Gramin Bank",
    "Central Bank of India",
    "Union Bank of India",
    "HDFC Bank",
    "ICICI Bank"
  ];

  const quickAmounts = ["500", "1000", "2000", "3000", "5000", "10000"];

  useEffect(() => {
    // Add default initial log entries on load
    setLogs([
      { stamp: "10:14:02 AM", msg: "AEPS API version 2.5 secure bank handshake verified.", type: "system" },
      { stamp: "10:14:03 AM", msg: "Biometric Mantra MFS100 driver active, calibration healthy.", type: "system" }
    ]);
  }, []);

  const addLog = (msg: string, type: "system" | "success" | "error" = "system") => {
    const timeStr = new Date().toLocaleTimeString();
    setLogs(prev => [{ stamp: timeStr, msg, type }, ...prev]);
  };

  const calculateConvenienceFee = (amtVal: number): number => {
    if (transactionType === "Balance" || transactionType === "Statement") return 0;
    if (amtVal <= 1000) return 10;
    if (amtVal <= 3000) return 20;
    if (amtVal <= 5000) return 30;
    return 50;
  };

  const handleFingerprintScan = () => {
    if (!customerName.trim()) {
      alert("कृपया खाताधारक का नाम (Customer Name) दर्ज करें!");
      return;
    }
    if (aadhaarNumber.replace(/\s/g, "").length !== 12) {
      alert("कृपया सही 12-अंकीय आधार नंबर दर्ज करें!");
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setScanMessage("एमएफएस100 स्कैनर सक्रिय हो रहा है... (Initializing Bio sensor)");
    setFingerprintVerified(false);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setFingerprintVerified(true);
          setScanMessage("फिंगरप्रिंट स्कैन सफलतापूर्वक सत्यापित! (Bio Verified ✓)");
          addLog(`Biometric auth succeeded for Aadhaar ending in ...${aadhaarNumber.slice(-4)}`, "success");
          
          // Play simulation sound if available
          try {
            const synth = window.speechSynthesis;
            if (synth) {
              const utter = new SpeechSynthesisUtterance("फिंगरप्रिंट सत्यापित हो गया है");
              utter.lang = "hi-IN";
              utter.rate = 1.1;
              synth.speak(utter);
            }
          } catch(e){}

          return 100;
        }
        if (prev === 30) {
          setScanMessage("स्कैनर सेंसर पर अपनी उंगली रखें... (Place finger on Mantra sensor)");
        }
        if (prev === 70) {
          setScanMessage("बायोमेट्रिक विवरण की जांच की जा रही है... (Decrypting 256-bit ISO template)");
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleProcessTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fingerprintVerified) {
      alert("कृपया पहले फिंगरप्रिंट सत्यापित करें (Verify biometrics first)!");
      return;
    }

    const amtNum = transactionType === "Withdrawal" || transactionType === "Deposit" ? parseInt(amount) || 0 : 0;
    
    if ((transactionType === "Withdrawal" || transactionType === "Deposit") && amtNum <= 0) {
      alert("कृपया वैध राशि दर्ज करें!");
      return;
    }

    const serviceCharge = calculateConvenienceFee(amtNum);
    const mockRef = "TXN" + Date.now().toString().slice(3, 13);
    const balanceRemaining = transactionType === "Withdrawal" 
                             ? Math.max(1540, 24500 - amtNum) 
                             : (transactionType === "Deposit" ? 8400 + amtNum : 12450);

    const generatedReceipt = {
      bank: selectedBank,
      aadhaar: `XXXX XXXX ${aadhaarNumber.slice(-4)}`,
      customer: customerName,
      type: transactionType,
      amount: amtNum,
      fee: serviceCharge,
      refId: mockRef,
      date: new Date().toLocaleString(),
      status: "SUCCESSFUL",
      availableBalance: balanceRemaining,
      terminal: "MPE-KIOSK-3000"
    };

    setReceipt(generatedReceipt);
    addLog(`Transaction ${transactionType} worth ₹${amtNum} on ${selectedBank} was APPROVED. Ref: ${mockRef}`, "success");
    setFingerprintVerified(false); // Reset biometric verify for next task
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Top Title Bar */}
      <div className="bg-white rounded-3xl border p-5 shadow-sm space-y-2">
        <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-650">🏦</span>
          आधार सक्षम बैंकिंग सेवा (Cash Deposit, Withdrawal & Mini Banking Hub)
        </h2>
        <p className="text-xs text-slate-500 font-medium select-none">AEPS Multi-Banking ATM Terminal for direct micro-banking, cashless deposits, and mini-statements query simulation.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-12 font-sans">
        
        {/* Left Side: Simulation form (8 Columns) */}
        <div className="md:col-span-8 space-y-6">
          
          <form onSubmit={handleProcessTransaction} className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b pb-2">📦 AEPS ATM INPUT CONSOLE</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1 text-xs font-bold text-slate-700">
                <label className="block text-[10px] text-slate-400 uppercase">बैंक का चयन करें (Select Bank) *</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold cursor-pointer"
                >
                  {banks.map((b, idx) => (
                    <option key={idx} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 text-xs font-bold text-slate-700">
                <label className="block text-[10px] text-slate-400 uppercase">खाताधारक का नाम (Customer Name) *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल सिंह लोधी"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1 text-xs font-bold text-slate-700">
                <label className="block text-[10px] text-slate-400 uppercase">12 अंकीय आधार नंबर (Aadhaar Number) *</label>
                <input
                  type="text"
                  required
                  maxLength={12}
                  placeholder="12-digit Aadhaar"
                  value={aadhaarNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setAadhaarNumber(val);
                  }}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium font-mono"
                />
              </div>

              <div className="space-y-1 text-xs font-bold text-slate-700">
                <label className="block text-[10px] text-slate-400 uppercase">लेन-देन प्रकार (Transaction Mode) *</label>
                <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl border select-none">
                  {[
                    { id: "Withdrawal", label: "निकासी", detail: "Cash Out" },
                    { id: "Deposit", label: "जमा", detail: "Deposit" },
                    { id: "Balance", label: "बैलेंस", detail: "Inquiry" },
                    { id: "Statement", label: "विवरण", detail: "Mini Slip" }
                  ].map((x) => (
                    <button
                      type="button"
                      key={x.id}
                      onClick={() => setTransactionType(x.id as any)}
                      className={`py-1.5 rounded-lg text-[10px] font-bold text-center border-0 ${
                        transactionType === x.id 
                          ? "bg-slate-900 text-white shadow-sm" 
                          : "text-slate-600 hover:text-slate-900 text-[9px]"
                      }`}
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Amount input for Withdrawal & Deposit */}
            {(transactionType === "Withdrawal" || transactionType === "Deposit") && (
              <div className="space-y-2 border-t pt-2 text-xs font-bold text-slate-700">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-slate-400 uppercase">निकासी / जमा राशि (Amount in ₹) *</label>
                  <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full inline-block">
                    कियोस्क सुविधा शुल्क: ₹{calculateConvenienceFee(parseInt(amount) || 0)} लागू
                  </span>
                </div>
                
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400 text-sm font-bold">₹</span>
                  <input
                    type="text"
                    required
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setAmount(val);
                    }}
                    className="w-full pl-7 pr-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-6 gap-2 select-none">
                  {quickAmounts.map((q) => (
                    <button
                      type="button"
                      key={q}
                      onClick={() => setAmount(q)}
                      className="py-1 px-2 border bg-slate-50 hover:bg-slate-100 rounded-lg text-[10px] font-bold hover:border-slate-400 transition"
                    >
                      +₹{q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 🛑 Biometric scan panel */}
            <div className="border border-slate-200 bg-slate-50/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-3 text-left">
                <div className="relative shrink-0">
                  <div className={`p-3.5 rounded-2xl border transition-all duration-350 ${
                    fingerprintVerified 
                      ? "bg-emerald-100 text-emerald-600 border-emerald-300" 
                      : (isScanning ? "bg-red-50 text-red-500 border-red-200" : "bg-slate-100 text-slate-400 border-slate-200")
                  }`}>
                    <Fingerprint size={28} className={isScanning ? "animate-pulse" : ""} />
                  </div>
                  {isScanning && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-ping" />
                  )}
                  {fingerprintVerified && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">Mantra Sensor Diagnostic</span>
                  <p className="text-xs font-extrabold text-slate-800">{isScanning ? "बायोमेट्रिक फिंगर स्कैनर सक्रिय..." : (fingerprintVerified ? "फ़िंगरप्रिंट प्रमाणित (Verified✓)" : "बायोमेट्रिक उंगली स्कैन करें")}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{scanMessage || "Mantra MFS100 on Client Port: 9100 - Ready"}</p>
                </div>
              </div>

              <div className="w-full sm:w-auto flex flex-col gap-2 shrink-0 select-none">
                <button
                  type="button"
                  onClick={handleFingerprintScan}
                  disabled={isScanning}
                  className="py-2.5 px-4 bg-slate-900 border text-white hover:bg-slate-800 text-[10px] font-black uppercase tracking-wider rounded-xl transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Fingerprint size={14} />
                  <span>फिंगरप्रिंट स्कैन करें (Scan)</span>
                </button>
                {isScanning && (
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full leading-none transition-all duration-150" style={{ width: `${scanProgress}%` }} />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!fingerprintVerified}
              className={`w-full py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider shadow transition-all ${
                fingerprintVerified
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer active:scale-95"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
              }`}
            >
              लेन-देन पूरा करें (Process secure AEPS Transaction)
            </button>
          </form>

          {/* Receipts display section */}
          {receipt && (
            <div className="bg-emerald-50 border border-emerald-250 p-6 rounded-3xl space-y-4 animate-scale-up text-left relative overflow-hidden" id="aeps-receipt">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-32 h-32 bg-emerald-100/40 rounded-full" />
              <div className="flex justify-between items-center border-b border-emerald-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-500 text-white font-black text-[10px]">✓ SLIP</span>
                  <h4 className="text-sm font-extrabold text-emerald-950">ग्राहक लेन-देन रसीद (AEPS Bank receipt)</h4>
                </div>
                <button
                  onClick={() => alert("Initiating silent direct print to connected Laser Spool on Spool Address port 9100. Verification healthy!")}
                  className="py-1 px-3 bg-white hover:bg-slate-100 text-[10px] font-black uppercase border border-emerald-300 rounded-lg text-slate-800 transition flex items-center gap-1 active:scale-95 select-none"
                >
                  <Printer size={12} />
                  <span>रसीद प्रिंट (Print)</span>
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-xs font-semibold text-slate-700 leading-normal">
                <div className="space-y-1">
                  <span className="text-[9px] text-emerald-600 font-bold uppercase block">Bank Name</span>
                  <span className="text-slate-900 font-extrabold">{receipt.bank}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-emerald-600 font-bold uppercase block">Customer Name</span>
                  <span className="text-slate-900 font-extrabold">{receipt.customer}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-emerald-600 font-bold uppercase block">Aadhaar Number</span>
                  <span className="text-slate-900 font-mono">{receipt.aadhaar}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-emerald-600 font-bold uppercase block">Reference / RRN</span>
                  <span className="text-slate-900 font-mono select-all font-extrabold">{receipt.refId}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-emerald-600 font-bold uppercase block">Receipt Date</span>
                  <span className="text-slate-950">{receipt.date}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-emerald-600 font-bold uppercase block">Txn Status</span>
                  <span className="text-emerald-700 font-bold uppercase tracking-widest">{receipt.status}</span>
                </div>
              </div>

              <div className="bg-white border border-emerald-200 rounded-2xl p-4 mt-2 flex flex-wrap justify-between items-center gap-3">
                <div className="text-left font-sans">
                  <span className="text-[9px] text-slate-400 block font-bold uppercase">TXN AMOUNT</span>
                  <span className="text-xl font-bold font-mono text-slate-800">₹{(receipt.amount || 0).toLocaleString()}</span>
                </div>
                
                <div className="text-left font-sans">
                  <span className="text-[9px] text-slate-400 block font-bold uppercase">CONVENIENCE CHARGE</span>
                  <span className="text-xs font-bold text-slate-700">₹{receipt.fee}</span>
                </div>

                <div className="text-left font-sans">
                  <span className="text-[9px] text-emerald-600 block font-bold uppercase">LEDGER LEDGER BALANCE</span>
                  <span className="text-sm font-bold text-slate-900">₹{(receipt.availableBalance || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Commission boards & logs (4 Columns) */}
        <div className="md:col-span-4 space-y-6 text-left">
          
          {/* Slabs guide */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 shadow space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-1">
              <Coins size={14} className="text-amber-400 animate-pulse" /> Rate-List Commerce Board
            </h4>

            <p className="text-[10px] text-slate-400 leading-normal">
              AEPS conveniences standards mandated by government rules. Verify that customers pay correct service charges based on withdrawal brackets.
            </p>

            <div className="space-y-2 text-xs font-semibold font-mono">
              {[
                { range: "₹100 - ₹1000", fee: "₹10", commission: "₹2.50" },
                { range: "₹1001 - ₹3000", fee: "₹20", commission: "₹4.80" },
                { range: "₹3001 - ₹5000", fee: "₹30", commission: "₹6.50" },
                { range: "₹5001 - ₹10000", fee: "₹50", commission: "₹10.00" }
              ].map((slab, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-2 last:border-0 last:pb-0">
                  <span className="text-[11px] text-slate-300">{slab.range}</span>
                  <div className="flex gap-3 text-[10px]">
                    <span className="text-amber-400 font-bold font-sans">Fee: {slab.fee}</span>
                    <span className="text-teal-400 font-medium font-sans">Comm: {slab.commission}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Secure Audit Logs */}
          <div className="bg-white border rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                <Database size={11} /> audit console
              </span>
              <button
                onClick={() => setLogs(logs.slice(0, 1))}
                className="text-[9px] font-extrabold text-slate-400 hover:text-slate-600 uppercase"
              >
                Clear
              </button>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-thin text-[10px] font-mono leading-normal">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-slate-50 last:border-0 pb-1.5 last:pb-0">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[8px] font-bold">
                    <span>[{log.stamp}]</span>
                    <span className={`px-1 rounded uppercase tracking-wide text-[7px] ${
                      log.type === "success" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-650"
                    }`}>
                      {log.type}
                    </span>
                  </div>
                  <p className="text-slate-700 font-medium mt-0.5">{log.msg}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
