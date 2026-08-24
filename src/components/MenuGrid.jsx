import React from 'react';
import { useApp } from '../context/AppContext';
import { MenuItemCard } from './MenuItemCard';
import { Filter, Flame, Leaf, Sparkles, ArrowUpDown, SearchX } from 'lucide-react';

export const MenuGrid = () => {
  const {
    menuItems,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    filterDiet,
    setFilterDiet,
    sortBy,
    setSortBy,
    setSelectedCategory
  } = useApp();

  // Filter items
  let filtered = menuItems.filter(item => {
    // 1. Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // 2. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCategory) return false;
    }

    // 3. Dietary Filter
    if (filterDiet === 'veg' && !item.isVeg) return false;
    if (filterDiet === 'non-veg' && item.isVeg) return false;
    if (filterDiet === 'spicy' && !item.isSpicy) return false;
    if (filterDiet === 'chefs' && !item.isChefsSpecial) return false;

    return true;
  });

  // Sort items
  filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    // default: popular
    return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800/80">
        
        {/* Left: Quick Dietary Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setFilterDiet('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filterDiet === 'all'
                ? 'bg-stone-100 text-stone-950 font-bold'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            All Dishes
          </button>

          <button
            onClick={() => setFilterDiet(filterDiet === 'veg' ? 'all' : 'veg')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filterDiet === 'veg'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-md shadow-emerald-500/20'
                : 'bg-stone-900 text-emerald-400 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Pure Veg</span>
          </button>

          <button
            onClick={() => setFilterDiet(filterDiet === 'spicy' ? 'all' : 'spicy')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filterDiet === 'spicy'
                ? 'bg-red-500 text-white font-bold shadow-md shadow-red-500/20'
                : 'bg-stone-900 text-red-400 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Spicy Bites</span>
          </button>

          <button
            onClick={() => setFilterDiet(filterDiet === 'chefs' ? 'all' : 'chefs')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filterDiet === 'chefs'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-amber-400 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chef's Choice</span>
          </button>
        </div>

        {/* Right: Sort By Dropdown & Count */}
        <div className="flex items-center justify-between md:justify-end space-x-3 text-xs">
          <span className="text-stone-500 font-medium">
            Showing <strong className="text-stone-300">{filtered.length}</strong> items
          </span>

          <div className="flex items-center space-x-2 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-stone-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="popular" className="bg-stone-900 text-stone-300">Most Popular</option>
              <option value="rating" className="bg-stone-900 text-stone-300">Highest Rated</option>
              <option value="price-asc" className="bg-stone-900 text-stone-300">Price: Low to High</option>
              <option value="price-desc" className="bg-stone-900 text-stone-300">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Dishes Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto">
            <SearchX className="w-8 h-8 text-stone-500" />
          </div>
          <h3 className="text-lg font-bold text-white">No mouth-watering items found</h3>
          <p className="text-stone-400 text-xs max-w-sm mx-auto">
            We couldn't find anything matching your current search or filter combination.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterDiet('all');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-amber-500 text-stone-950 text-xs font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
};
