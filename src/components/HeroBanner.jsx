import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sparkles, Clock, Flame, Award, ArrowRight, ShieldCheck } from 'lucide-react';

export const HeroBanner = () => {
  const { searchQuery, setSearchQuery, setSelectedCategory, setIsReservationOpen } = useApp();

  const trendingTags = ['Saffron Cappuccino', 'Makhani Pizza', 'Molten Lava Cake', 'Karak Chai', 'Peri Peri Fries'];

  return (
    <div className="relative overflow-hidden pt-6 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Experience Authentic Indian Cafe Culture</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-serif">
              Crafted Brews & <br />
              <span className="text-gradient">Delectable Zaika Bites</span>
            </h1>

            {/* Sub-text */}
            <p className="text-stone-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              From royal saffron-infused cappuccinos to wood-fired makhani sourdough pizzas. Freshly prepared with artisanal ingredients and delivered to your doorstep in 30 minutes.
            </p>

            {/* Big Interactive Search Bar */}
            <div className="relative max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-amber-400" />
                <input
                  type="text"
                  placeholder="Search for coffee, sourdough pizza, pasta, dessert..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-28 py-4 bg-stone-900/90 border border-stone-700/70 rounded-2xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm shadow-xl transition"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs hover:bg-stone-700"
                  >
                    Clear
                  </button>
                ) : (
                  <span className="absolute right-4 text-xs text-amber-400/80 font-medium hidden sm:inline">
                    Live Filter
                  </span>
                )}
              </div>

              {/* Trending Quick Searches */}
              <div className="flex items-center flex-wrap gap-2 mt-3 pt-1">
                <span className="text-xs text-stone-500 font-medium">Trending:</span>
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-stone-900/60 hover:bg-stone-800 text-stone-400 hover:text-amber-300 text-xs border border-stone-800/80 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges / Trust Metric */}
            <div className="grid grid-cols-3 gap-3 pt-3 max-w-lg border-t border-stone-800/80">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold">30 Mins</p>
                  <p className="text-stone-500 text-[10px]">Express Delivery</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold">100% Fresh</p>
                  <p className="text-stone-500 text-[10px]">Wood-Fired & Made Fresh</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-yellow-400 shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold">4.9 ★ Rating</p>
                  <p className="text-stone-500 text-[10px]">10,000+ Happy Foodies</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Promo Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Promo Card 1: Royal Trio Combo */}
            <div
              onClick={() => setSelectedCategory('combos')}
              className="group relative rounded-3xl overflow-hidden glass-card p-5 border border-stone-800 cursor-pointer hover:border-amber-500/40 transition"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2 z-10 max-w-[65%]">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider">
                    CHEF'S FEAST COMBO
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition font-serif">
                    Zaika Royal Trio Feast
                  </h3>
                  <p className="text-stone-400 text-xs line-clamp-2">
                    Cappuccino + Sourdough Makhani Pizza + Molten Lava Cake at ₹549.
                  </p>
                  <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-semibold pt-1">
                    <span>Order Combo</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                  </div>
                </div>
                <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg shrink-0 group-hover:scale-105 transition duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=80"
                    alt="Royal Feast"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Promo Card 2: Table Dine-in & Rewards */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setIsReservationOpen(true)}
                className="rounded-3xl glass-card p-4 border border-stone-800 cursor-pointer hover:border-amber-500/40 transition"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-white">Table Booking</h4>
                <p className="text-[11px] text-stone-400 mt-1">Rooftop & AC seating reservations.</p>
              </div>

              <div
                onClick={() => setSelectedCategory('desserts')}
                className="rounded-3xl glass-card p-4 border border-stone-800 cursor-pointer hover:border-amber-500/40 transition"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center mb-3">
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="text-sm font-bold text-white">Lava Cakes & Bakery</h4>
                <p className="text-[11px] text-stone-400 mt-1">Single-origin Belgian dark chocolates.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
