import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { MenuGrid } from './components/MenuGrid';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LiveOrderTracker } from './components/LiveOrderTracker';
import { OrderReceiptModal } from './components/OrderReceiptModal';
import { TableReservationModal } from './components/TableReservationModal';
import { AcademicOverviewModal } from './components/AcademicOverviewModal';
import { AdminDashboard } from './components/AdminDashboard';
import {
  Coffee,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Share2,
  GraduationCap
} from 'lucide-react';

const MainContent = () => {
  const {
    isAdminView,
    setIsReservationOpen,
    setSelectedCategory,
    setIsAcademicModalOpen
  } = useApp();

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-stone-950">
        <Navbar />
        <AdminDashboard />
        <OrderReceiptModal />
        <AcademicOverviewModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950">
      <Navbar />

      <main className="flex-1">
        <HeroBanner />
        <CategoryNav />
        <MenuGrid />
      </main>

      <ItemCustomizerModal />
      <CartDrawer />
      <CheckoutModal />
      <LiveOrderTracker />
      <OrderReceiptModal />
      <TableReservationModal />
      <AcademicOverviewModal />

      <footer className="bg-stone-900/90 border-t border-stone-800 text-stone-400 text-xs mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-black">
                  <Coffee className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1 font-serif text-xl font-bold text-white">
                  <span>ZAIKA</span>
                  <span className="text-amber-400 font-sans font-light">CAFÉ</span>
                </div>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                A modern gourmet cafe experience blending traditional Indian zaika spices with specialty artisanal coffee, wood-fired sourdough pizzas, and single-origin desserts.
              </p>
              <div className="flex items-center space-x-3 text-stone-400">
                <a href="#website" className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 flex items-center justify-center transition" title="Website">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#share" className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 flex items-center justify-center transition" title="Share">
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Explore Menu</h4>
              <ul className="space-y-2 text-stone-400 text-xs">
                <li>
                  <button onClick={() => setSelectedCategory('coffee')} className="hover:text-amber-400 transition">
                    Signature Hot Coffees & Brews
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedCategory('pizza-pasta')} className="hover:text-amber-400 transition">
                    Wood-fired Sourdough Pizzas
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedCategory('zaika-specials')} className="hover:text-amber-400 transition">
                    Zaika Indian Comfort Bowls
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedCategory('desserts')} className="hover:text-amber-400 transition">
                    Belgian Molten Lava Cakes & Waffles
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedCategory('combos')} className="hover:text-amber-400 transition">
                    Chef's Value Combos
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Visit & Contact</h4>
              <ul className="space-y-2.5 text-xs text-stone-400">
                <li className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>39, Rajiv Gandhi Education City, Sonepat, Haryana – 131029</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Open Daily: 08:30 AM – 11:30 PM</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>+91 1800 120 4040 / 0130-2203000</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>orders@zaikacafe.in</span>
                </li>
              </ul>
            </div>

            <div
              onClick={() => setIsAcademicModalOpen(true)}
              className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2.5 cursor-pointer hover:border-amber-500/50 transition group shadow-md"
              title="Click to view full Academic Project Dossier"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-amber-400">
                  <GraduationCap className="w-5 h-5 group-hover:scale-110 transition" />
                  <span className="font-bold text-xs uppercase tracking-wider">Academic Project</span>
                </div>
                <span className="text-[10px] text-amber-400/80 font-bold group-hover:underline">View Specs ➔</span>
              </div>
              <p className="text-[11px] text-stone-300 font-medium">
                Bachelor of Computer Applications (BCA) Final Capstone Project
              </p>
              <div className="text-[10px] text-stone-400 space-y-0.5 border-t border-stone-800/80 pt-2">
                <p><strong>Developed by:</strong> Kashish (42222210089)</p>
                <p><strong>Guided by:</strong> Dr. Neeraj Dahiya</p>
                <p><strong>University:</strong> SRM University Delhi-NCR</p>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
            <p>© 2026 Zaika Café. All rights reserved. Crafted for food lovers.</p>
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsReservationOpen(true)} className="hover:text-amber-400">
                Table Reservations
              </button>
              <span>•</span>
              <button onClick={() => setIsAcademicModalOpen(true)} className="hover:text-amber-400">
                Project Specs
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
