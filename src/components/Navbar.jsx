import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  ShoppingBag,
  Search,
  Coins,
  Radio,
  Clock,
  Sparkles,
  ShieldCheck,
  CalendarDays,
  Bike,
  Store,
  UtensilsCrossed,
  X
} from 'lucide-react';

export const Navbar = () => {
  const {
    totalCartCount,
    setIsCartOpen,
    user,
    orderMode,
    setOrderMode,
    searchQuery,
    setSearchQuery,
    isAdminView,
    setIsAdminView,
    setIsReservationOpen,
    orders,
    setActiveTrackingOrderId,
    setIsTrackerOpen,
    tableNumber,
    setTableNumber
  } = useApp();

  const activeLiveOrder = orders.find(
    o => o.orderStatus === 'received' || o.orderStatus === 'in_kitchen' || o.orderStatus === 'out_for_delivery'
  );

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => setIsAdminView(false)}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center transform transition hover:rotate-6">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
                <Coffee className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-serif">ZAIKA</span>
                <span className="text-2xl font-light tracking-wide text-amber-400">CAFÉ</span>
              </div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">Artisanal Brews & Bites</p>
            </div>
          </div>

          {/* Center: Fulfillment Mode Switcher */}
          {!isAdminView && (
            <div className="hidden md:flex items-center bg-stone-900/90 p-1.5 rounded-full border border-stone-800 shadow-inner">
              <button
                onClick={() => setOrderMode('delivery')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  orderMode === 'delivery'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/30'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery (25-30m)</span>
              </button>

              <button
                onClick={() => setOrderMode('pickup')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  orderMode === 'pickup'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/30'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Takeaway</span>
              </button>

              <button
                onClick={() => setOrderMode('dinein')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  orderMode === 'dinein'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/30'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Dine-In ({tableNumber})</span>
              </button>
            </div>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Table Reservation Button */}
            {!isAdminView && (
              <button
                onClick={() => setIsReservationOpen(true)}
                className="hidden lg:flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 text-xs font-semibold border border-stone-800 transition"
              >
                <CalendarDays className="w-4 h-4 text-amber-400" />
                <span>Book Table</span>
              </button>
            )}

            {/* Active Live Order Pill */}
            {activeLiveOrder && !isAdminView && (
              <button
                onClick={() => {
                  setActiveTrackingOrderId(activeLiveOrder.id);
                  setIsTrackerOpen(true);
                }}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium animate-soft-pulse hover:bg-amber-500/20 transition"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>Track #{activeLiveOrder.id}</span>
              </button>
            )}

            {/* Loyalty Coins Badge */}
            {!isAdminView && (
              <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-semibold">
                <Coins className="w-3.5 h-3.5 text-yellow-400" />
                <span>{user.coins} Coins</span>
              </div>
            )}

            {/* Cart Trigger Button */}
            {!isAdminView && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalCartCount > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-stone-950 text-amber-400 text-[11px] font-black animate-bounce">
                    {totalCartCount}
                  </span>
                )}
              </button>
            )}

            {/* Admin Switcher Pill */}
            <button
              onClick={() => setIsAdminView(prev => !prev)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                isAdminView
                  ? 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${isAdminView ? 'text-red-400' : 'text-stone-400'}`} />
              <span>{isAdminView ? 'Exit Admin' : 'Admin Panel'}</span>
            </button>

          </div>
        </div>

        {/* Mobile Sub-bar for order mode and search */}
        {!isAdminView && (
          <div className="md:hidden pb-3 pt-1 flex items-center justify-between gap-2">
            <div className="flex bg-stone-900 p-1 rounded-xl border border-stone-800 flex-1">
              <button
                onClick={() => setOrderMode('delivery')}
                className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg text-center ${
                  orderMode === 'delivery' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                }`}
              >
                Delivery
              </button>
              <button
                onClick={() => setOrderMode('pickup')}
                className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg text-center ${
                  orderMode === 'pickup' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                }`}
              >
                Takeaway
              </button>
              <button
                onClick={() => setOrderMode('dinein')}
                className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg text-center ${
                  orderMode === 'dinein' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                }`}
              >
                Dine-In
              </button>
            </div>
            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-3 py-1.5 bg-stone-900 text-amber-400 rounded-xl border border-stone-800 text-[11px] font-semibold flex items-center space-x-1"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
