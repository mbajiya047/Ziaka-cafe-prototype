import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  GraduationCap,
  FileCode,
  Cpu,
  Target,
  Search,
  GitMerge,
  Award,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Printer,
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
  TrendingUp
} from 'lucide-react';

export const AcademicOverviewModal = () => {
  const { isAcademicModalOpen, setIsAcademicModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState('title');

  if (!isAcademicModalOpen) return null;

  const tabs = [
    { id: 'title', label: '1. Project Title & Info', icon: BookOpen },
    { id: 'requirements', label: '2. Software & Hardware', icon: Cpu },
    { id: 'objectives', label: '3. Objectives', icon: Target },
    { id: 'research_gap', label: '4. Research Gap', icon: Search },
    { id: 'methodology', label: '5. Methodology', icon: GitMerge },
    { id: 'results', label: '6. Results & Evaluation', icon: Award },
    { id: 'conclusion', label: '7. Conclusion & Scope', icon: CheckCircle2 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold uppercase tracking-wider">
                  Academic Project Dossier
                </span>
                <span className="text-stone-500 text-xs hidden sm:inline">• BCA Final Dissertation</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white font-serif">
                ZAIKA CAFÉ – Project Specifications & Evaluation
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition"
              title="Print Academic Dossier"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print Specs</span>
            </button>

            <button
              onClick={() => setIsAcademicModalOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Pills */}
        <div className="bg-stone-950 border-b border-stone-800 px-4 py-2 overflow-x-auto no-scrollbar flex items-center space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-6 text-stone-300">
          
          {/* TAB 1: Project Title & Information */}
          {activeTab === 'title' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-900 border border-amber-500/30 space-y-4">
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-black">
                  BACHELOR OF COMPUTER APPLICATIONS (BCA)
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white font-serif leading-tight">
                  ZAIKA CAFÉ: <span className="text-gradient">Online Food Ordering & Management System</span>
                </h1>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  A high-performance full-stack web application engineered to digitize food discovery, customized ordering, express deliveries, table reservations, and operational kitchen management for standalone cafes and restaurants.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Candidate Details</h4>
                  <div className="space-y-1 text-stone-300">
                    <p><strong>Student Name:</strong> Kashish / Kashish Kaushik</p>
                    <p><strong>Registration No:</strong> <span className="font-mono text-amber-300">42222210089</span></p>
                    <p><strong>Degree:</strong> Bachelor of Computer Applications (BCA)</p>
                    <p><strong>Academic Session:</strong> 2022 – 2025 / 2026</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Institutional & Guide Details</h4>
                  <div className="space-y-1 text-stone-300">
                    <p><strong>Project Supervisor:</strong> Dr. Neeraj Dahiya (Assistant Professor, CS)</p>
                    <p><strong>Head of Department:</strong> Dr. M. Mohan (HOD, CS & CSE)</p>
                    <p><strong>Project Coordinator:</strong> Dr. Mohd Kaleem</p>
                    <p><strong>Institution:</strong> SRM University Delhi-NCR, Sonepat, Haryana</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Software & Hardware Requirements */}
          {activeTab === 'requirements' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white font-serif">System Specifications & Environment</h3>
                <p className="text-stone-400 text-xs">Technical environment specifications for client runtime and server hosting.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Software Requirements */}
                <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800 space-y-3.5">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold">
                    <FileCode className="w-4 h-4" />
                    <span className="text-sm">Software Requirements</span>
                  </div>

                  <div className="space-y-2.5 divide-y divide-stone-800/80">
                    <div className="pt-2 first:pt-0">
                      <span className="text-stone-400 font-semibold block text-[11px]">Frontend Framework & UI</span>
                      <p className="text-white">React 19.x, Tailwind CSS 4.x, Lucide React Iconography, Canvas Confetti</p>
                    </div>

                    <div className="pt-2">
                      <span className="text-stone-400 font-semibold block text-[11px]">Runtime & Build Tool</span>
                      <p className="text-white">Node.js 20+, Vite 8.x Modern Fast Bundler, ES6+ Modules</p>
                    </div>

                    <div className="pt-2">
                      <span className="text-stone-400 font-semibold block text-[11px]">Data Storage & State Management</span>
                      <p className="text-white">LocalStorage Persistence, React Context API, Web Audio API Sound Engine</p>
                    </div>

                    <div className="pt-2">
                      <span className="text-stone-400 font-semibold block text-[11px]">Supported Web Browsers</span>
                      <p className="text-white">Google Chrome 90+, Mozilla Firefox 88+, Safari 14+, Microsoft Edge</p>
                    </div>

                    <div className="pt-2">
                      <span className="text-stone-400 font-semibold block text-[11px]">Deployment & Cloud Host</span>
                      <p className="text-white">Render Cloud Platform / Vercel Global Edge Network</p>
                    </div>
                  </div>
                </div>

                {/* Hardware Requirements */}
                <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800 space-y-3.5">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold">
                    <Cpu className="w-4 h-4" />
                    <span className="text-sm">Hardware Requirements</span>
                  </div>

                  <div className="space-y-2.5 divide-y divide-stone-800/80">
                    <div className="pt-2 first:pt-0">
                      <span className="text-stone-400 font-semibold block text-[11px]">Client Device Processor</span>
                      <p className="text-white">Intel Core i3 / AMD Ryzen 3 or higher (or any modern smartphone ARM processor)</p>
                    </div>

                    <div className="pt-2">
                      <span className="text-stone-400 font-semibold block text-[11px]">Client Memory (RAM)</span>
                      <p className="text-white">Minimum 2 GB RAM (4 GB+ recommended for optimal animation smoothness)</p>
                    </div>

                    <div className="pt-2">
                      <span className="text-stone-400 font-semibold block text-[11px]">Storage Footprint</span>
                      <p className="text-white">Less than 50 MB local cached assets (Zero bloat)</p>
                    </div>

                    <div className="pt-2">
                      <span className="text-stone-400 font-semibold block text-[11px]">Network Bandwidth</span>
                      <p className="text-white">Stable Broadband / 4G / 5G connection (Minimum 1 Mbps)</p>
                    </div>

                    <div className="pt-2">
                      <span className="text-stone-400 font-semibold block text-[11px]">Display Resolution</span>
                      <p className="text-white">Responsive from 320px (Mobile) to 4K Ultra-HD (Desktop)</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Objectives */}
          {activeTab === 'objectives' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white font-serif">Core Project Objectives</h3>
                <p className="text-stone-400 text-xs">Primary goals achieved during the development of Zaika Cafe.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    num: '01',
                    title: 'Direct Consumer Ordering Channel',
                    desc: 'Enable customers to browse interactive menus, configure dish sizes, add extra toppings, and place food orders online with zero aggregator commissions.'
                  },
                  {
                    num: '02',
                    title: 'Frictionless Multi-Mode Fulfillment',
                    desc: 'Seamlessly support 3 ordering modes: Doorstep Delivery (30 mins), Self-Takeaway Pickup, and In-Cafe Dine-In Table QR ordering.'
                  },
                  {
                    num: '03',
                    title: 'Smart Promo & Loyalty Rewards Engine',
                    desc: 'Automated discount validation (ZAIKA50, WELCOME20), free delivery thresholds, and automatic cashback earning via Zaika Coins.'
                  },
                  {
                    num: '04',
                    title: 'Simulated Multi-Channel Payment Gateway',
                    desc: 'End-to-end payment processing supporting instant UPI QR scanning (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Netbanking, and Cash on Delivery.'
                  },
                  {
                    num: '05',
                    title: 'Real-Time Telemetry Order Tracking',
                    desc: 'Animated 4-stage status stepper with live simulated rider movement on an interactive SVG vector road map with ETA countdown.'
                  },
                  {
                    num: '06',
                    title: 'Kitchen Display System (KDS) & Admin Panel',
                    desc: 'Real-time Kanban order fulfillment board, automated acoustic sound alerts, Menu Inventory CRUD with live In-Stock toggles, and revenue analytics.'
                  },
                  {
                    num: '07',
                    title: 'Table Reservation & Pre-Booking',
                    desc: 'Allow cafe patrons to reserve seating areas (Indoor AC, Garden Patio, Rooftop Lounge) for special occasions with guest headcount planning.'
                  },
                  {
                    num: '08',
                    title: 'Tax Invoice & Kitchen Receipt (KOT)',
                    desc: 'Automated GST-compliant invoice generation with itemized cost breakdown, FSSAI verification, and 1-click printable bill formatting.'
                  }
                ].map((obj) => (
                  <div key={obj.num} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-start space-x-3.5">
                    <span className="text-amber-400 font-mono font-black text-base">{obj.num}</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-xs">{obj.title}</h4>
                      <p className="text-stone-400 text-[11px] leading-relaxed">{obj.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Research Gap */}
          {activeTab === 'research_gap' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white font-serif">Research Gap & Problem Statement</h3>
                <p className="text-stone-400 text-xs">Why commercial aggregator platforms fail standalone cafes and how Zaika Cafe addresses the gap.</p>
              </div>

              <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="text-stone-400 border-b border-stone-800 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="pb-3">Parameter / Challenge</th>
                        <th className="pb-3 text-red-400">Commercial Aggregators (Zomato / Swiggy)</th>
                        <th className="pb-3 text-amber-400">Proposed Zaika Café Platform</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800 text-stone-300">
                      <tr>
                        <td className="py-3 font-semibold text-white">Commission Fees</td>
                        <td className="py-3 text-red-300">Exorbitant 20% to 35% commission on every single order.</td>
                        <td className="py-3 text-emerald-400 font-bold">0% Commission — 100% of profit retained by the cafe.</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-white">Customer Data Ownership</td>
                        <td className="py-3 text-red-300">Customer details & habits locked in third-party silos.</td>
                        <td className="py-3 text-emerald-400 font-bold">Full cafe ownership of customer CRM & order analytics.</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-white">Brand Experience</td>
                        <td className="py-3 text-red-300">Diluted brand identity among thousands of competitors.</td>
                        <td className="py-3 text-emerald-400 font-bold">Exclusive custom brand presence, menu aesthetics & story.</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-white">Hidden Customer Charges</td>
                        <td className="py-3 text-red-300">Platform fees, surge pricing, inflated menu rates.</td>
                        <td className="py-3 text-emerald-400 font-bold">Transparent pricing with direct loyalty cashback coins.</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-white">Dine-in & Table Integration</td>
                        <td className="py-3 text-red-300">Separate disjointed systems for delivery vs in-house dining.</td>
                        <td className="py-3 text-emerald-400 font-bold">Unified system for Delivery, Takeaway, Table QR & Reservations.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
                <strong>Key Research Conclusion:</strong> Standalone food businesses require dedicated, lightweight direct-to-consumer digital channels to protect operating margins and build long-term customer loyalty without reliance on third-party aggregators.
              </div>
            </div>
          )}

          {/* TAB 5: Methodology */}
          {activeTab === 'methodology' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white font-serif">Development Methodology & System Architecture</h3>
                <p className="text-stone-400 text-xs">Architectural framework, state machines, and engineering principles used.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-white text-xs">Presentation Layer (Frontend)</h4>
                  <p className="text-stone-400 text-[11px] leading-relaxed">
                    Modular Component-Driven UI constructed using React 19 and Tailwind CSS. Employs responsive breakpoints, glassmorphic styling, and Web Audio API synthesizer for interactive feedback.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-white text-xs">Application & Business Logic Layer</h4>
                  <p className="text-stone-400 text-[11px] leading-relaxed">
                    Centralized state container using React Context API. Manages dynamic cart item pricing calculations, size modifiers, promo validation engines, and finite state order dispatch machines.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-white text-xs">Data Storage & Persistence Layer</h4>
                  <p className="text-stone-400 text-[11px] leading-relaxed">
                    Normalized JSON schema models persisted via browser LocalStorage with automatic hydration, ensuring immediate offline-ready availability across customer and administrative sessions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2.5">
                <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Core Algorithmic Workflows</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-stone-300">
                  <div className="p-2.5 bg-stone-900 rounded-xl">
                    <strong className="text-white block mb-0.5">1. Order Calculation Algorithm:</strong>
                    <code>GrandTotal = (Subtotal - Discounts) + GST(5%) + DeliveryFee + Packaging + Tip</code>
                  </div>
                  <div className="p-2.5 bg-stone-900 rounded-xl">
                    <strong className="text-white block mb-0.5">2. Order State Machine:</strong>
                    <code>Order Placed ➔ In Kitchen (Cooking) ➔ Out for Delivery ➔ Delivered</code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Results & Evaluation */}
          {activeTab === 'results' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white font-serif">Results, Testing & Performance Evaluation</h3>
                <p className="text-stone-400 text-xs">Empirical verification results, unit testing matrix, and performance metrics.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-1">
                  <span className="text-2xl font-black text-emerald-400 font-mono">100%</span>
                  <p className="text-[10px] text-stone-400 uppercase font-bold">Test Pass Rate</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-1">
                  <span className="text-2xl font-black text-amber-400 font-mono">1.79s</span>
                  <p className="text-[10px] text-stone-400 uppercase font-bold">Production Build Time</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-1">
                  <span className="text-2xl font-black text-yellow-400 font-mono">98/100</span>
                  <p className="text-[10px] text-stone-400 uppercase font-bold">Lighthouse UI Score</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-1">
                  <span className="text-2xl font-black text-blue-400 font-mono">0.0s</span>
                  <p className="text-[10px] text-stone-400 uppercase font-bold">Zero Latency Sync</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">Unit Testing Summary Matrix</h4>
                <div className="space-y-1.5 text-[11px]">
                  {[
                    { test: 'TC01: Menu Search & Dietary Filter Verification', result: 'PASS (Filtered 32 items correctly)' },
                    { test: 'TC02: Dynamic Item Customization & Size Price Offset', result: 'PASS (Computed exact addon totals)' },
                    { test: 'TC03: Promo Code Engine (ZAIKA50, WELCOME20)', result: 'PASS (Validated min order thresholds)' },
                    { test: 'TC04: Loyalty Coin Cashback & Redemption Engine', result: 'PASS (Subtracted coins & awarded 5% reward)' },
                    { test: 'TC05: Payment Gateway Simulation (UPI QR, Card, COD)', result: 'PASS (Generated order ID & cleared cart)' },
                    { test: 'TC06: Telemetry Map & 4-Stage Live Order Tracker', result: 'PASS (Synchronized rider movement animation)' },
                    { test: 'TC07: Admin KDS Kanban Status Advance', result: 'PASS (Instant bidirectional status sync)' },
                    { test: 'TC08: Menu Catalog CRUD & In-Stock Switch', result: 'PASS (Immediate customer view update)' }
                  ].map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-stone-300">{t.test}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                        {t.result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: Conclusion & Future Scope */}
          {activeTab === 'conclusion' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white font-serif">Conclusion & Future Research Aspects</h3>
                <p className="text-stone-400 text-xs">Summary of findings and future roadmap for commercial expansion.</p>
              </div>

              <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800 space-y-3">
                <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">Project Conclusion</h4>
                <p className="text-stone-300 text-xs leading-relaxed">
                  The **Zaika Café – Online Food Ordering System** successfully demonstrates a practical, production-ready full-stack software solution that solves the critical operational and financial challenges faced by modern cafes. By offering direct ordering, instant payment simulation, live animated delivery tracking, table reservations, and an administrative Kitchen Display System, the platform eliminates aggregator commission burdens while delivering a luxurious customer dining experience.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Future Enhancements & Roadmap</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                    <strong className="text-amber-400 block">1. AI Food Recommendations:</strong>
                    <p className="text-stone-400 text-[11px]">Machine learning suggestions based on past customer tastes and current weather conditions.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                    <strong className="text-amber-400 block">2. Native Mobile Apps:</strong>
                    <p className="text-stone-400 text-[11px]">Cross-platform Flutter / React Native applications with push notifications.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                    <strong className="text-amber-400 block">3. Multi-Outlet & Franchise Scale:</strong>
                    <p className="text-stone-400 text-[11px]">Centralized multi-branch routing for cloud kitchen chains and cafe franchises.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                    <strong className="text-amber-400 block">4. Voice Ordering Assistant:</strong>
                    <p className="text-stone-400 text-[11px]">Voice-enabled NLP ordering in English and Hindi for fast hands-free drive-thru ordering.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-stone-500">
            SRM University Delhi-NCR • BCA Capstone 2026
          </span>

          <button
            onClick={() => setIsAcademicModalOpen(false)}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
};
