import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/menuData';
import {
  Sparkles,
  Coffee,
  CupSoda,
  UtensilsCrossed,
  Pizza,
  Soup,
  Sandwich,
  Cake,
  Layers
} from 'lucide-react';

const iconMap = {
  Sparkles,
  Coffee,
  CupSoda,
  UtensilsCrossed,
  Pizza,
  Soup,
  Sandwich,
  Cake,
  Layers
};

export const CategoryNav = () => {
  const { selectedCategory, setSelectedCategory, menuItems } = useApp();

  return (
    <div className="sticky top-20 z-30 bg-stone-950/90 backdrop-blur-md py-3 border-y border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all'
              ? menuItems.length
              : menuItems.filter(i => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl whitespace-nowrap text-xs font-bold transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/25 transform scale-105'
                    : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 hover:bg-stone-850 border border-stone-800'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isSelected ? 'text-stone-950' : 'text-amber-400'}`} />
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    isSelected ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
