import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Flame, Clock, Plus, Minus, Sparkles, ChefHat } from 'lucide-react';

export const MenuItemCard = ({ item }) => {
  const { cart, addToCart, updateCartQuantity, setCustomizingItem } = useApp();

  // Find if item is already in cart
  const cartItemsMatching = cart.filter(c => c.id === item.id);
  const totalInCart = cartItemsMatching.reduce((acc, c) => acc + c.quantity, 0);

  const handleAddClick = () => {
    if (item.customizable || (item.sizes && item.sizes.length > 0) || (item.addOns && item.addOns.length > 0)) {
      setCustomizingItem(item);
    } else {
      addToCart(item);
    }
  };

  return (
    <div className={`group rounded-3xl glass-card overflow-hidden flex flex-col justify-between border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 ${!item.inStock ? 'opacity-60 grayscale-[0.3]' : ''}`}>
      
      {/* Image & Top Badges Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-900">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay for readable badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.isBestseller && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow-md">
              Bestseller
            </span>
          )}
          {item.isChefsSpecial && (
            <span className="px-2 py-0.5 rounded-md bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 shadow-md">
              <ChefHat className="w-3 h-3" />
              <span>Chef's Pick</span>
            </span>
          )}
        </div>

        {/* Dietary / Spicy Badges (Top Right) */}
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
          {/* Veg / Non-Veg Indicator */}
          <div className="w-5 h-5 rounded-md bg-stone-950/80 backdrop-blur-sm border border-stone-700 flex items-center justify-center">
            {item.isVeg ? (
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Pure Veg" />
            ) : (
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" title="Non-Veg" />
            )}
          </div>

          {item.isSpicy && (
            <div className="w-5 h-5 rounded-md bg-stone-950/80 backdrop-blur-sm border border-stone-700 flex items-center justify-center" title="Spicy">
              <Flame className="w-3 h-3 text-red-500" />
            </div>
          )}
        </div>

        {/* Prep Time & Calories Floating Pill */}
        <div className="absolute bottom-2.5 left-3 flex items-center space-x-2 text-[11px] text-stone-300 font-medium z-10">
          <div className="flex items-center space-x-1 bg-stone-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-stone-800">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{item.prepTime}</span>
          </div>
          {item.calories && (
            <span className="bg-stone-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-stone-800 text-[10px] text-stone-400">
              {item.calories}
            </span>
          )}
        </div>

        {/* Out of stock banner */}
        {!item.inStock && (
          <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="px-3 py-1 bg-red-900/80 text-red-200 border border-red-700 text-xs font-bold rounded-lg uppercase tracking-wider">
              Sold Out Today
            </span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* Rating & Review Count */}
          <div className="flex items-center space-x-1.5 text-xs">
            <div className="flex items-center space-x-1 bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-md font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{item.rating}</span>
            </div>
            <span className="text-stone-500 text-[11px]">({item.reviewsCount} reviews)</span>
          </div>

          {/* Dish Title */}
          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition font-serif leading-snug line-clamp-1">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom Price & Add to Cart Controls */}
        <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg font-black text-amber-400 font-mono">₹{item.price}</span>
              {item.originalPrice && item.originalPrice > item.price && (
                <span className="text-xs text-stone-500 line-through font-mono">
                  ₹{item.originalPrice}
                </span>
              )}
            </div>
            {item.customizable && (
              <span className="text-[10px] text-amber-400/80 font-medium block">Customizable</span>
            )}
          </div>

          {/* Action Button */}
          {item.inStock ? (
            totalInCart > 0 && !item.customizable ? (
              <div className="flex items-center space-x-2 bg-stone-900 border border-amber-500/40 rounded-xl p-1 shadow-md">
                <button
                  onClick={() => updateCartQuantity(cartItemsMatching[0].cartItemId, -1)}
                  className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-amber-400 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-black text-white w-4 text-center">{totalInCart}</span>
                <button
                  onClick={() => updateCartQuantity(cartItemsMatching[0].cartItemId, 1)}
                  className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 flex items-center justify-center text-stone-950 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddClick}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-500 text-amber-400 hover:text-stone-950 font-bold text-xs transition duration-200 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{item.customizable ? 'Customize' : 'ADD'}</span>
              </button>
            )
          ) : (
            <span className="text-xs text-stone-500 italic">Unavailable</span>
          )}

        </div>

      </div>

    </div>
  );
};
