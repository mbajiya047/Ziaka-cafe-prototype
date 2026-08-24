import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Check, Utensils, Sparkles } from 'lucide-react';

export const ItemCustomizerModal = () => {
  const { customizingItem, setCustomizingItem, addToCart } = useApp();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (customizingItem) {
      setSelectedSize(customizingItem.sizes ? customizingItem.sizes[0].name : null);
      setSelectedAddOns([]);
      setInstructions('');
    }
  }, [customizingItem]);

  if (!customizingItem) return null;

  const currentSizeObj = customizingItem.sizes?.find(s => s.name === selectedSize);
  const sizePrice = currentSizeObj ? currentSizeObj.priceOffset : 0;

  const addOnsTotal = selectedAddOns.reduce((sum, name) => {
    const addOn = customizingItem.addOns?.find(a => a.name === name);
    return sum + (addOn ? addOn.price : 0);
  }, 0);

  const finalItemPrice = customizingItem.price + sizePrice + addOnsTotal;

  const toggleAddOn = (name) => {
    setSelectedAddOns(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleAddToCart = () => {
    addToCart(customizingItem, {
      size: selectedSize,
      addOns: selectedAddOns,
      instructions: instructions.trim()
    });
    setCustomizingItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header with Dish Image & Close Button */}
        <div className="relative h-44 w-full bg-stone-950 shrink-0">
          <img
            src={customizingItem.image}
            alt={customizingItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
          
          <button
            onClick={() => setCustomizingItem(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-950/70 hover:bg-stone-900 text-stone-300 hover:text-white flex items-center justify-center border border-stone-700 transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-xl font-bold text-white font-serif">{customizingItem.name}</h3>
            <p className="text-xs text-amber-400 font-mono font-semibold">Base Price: ₹{customizingItem.price}</p>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-5 space-y-6 overflow-y-auto flex-1 text-xs">
          
          {/* Sizes Selection */}
          {customizingItem.sizes && customizingItem.sizes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-stone-300 font-bold uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                  <span>1. Choose Portion Size</span>
                  <span className="text-amber-400 font-normal">(Required)</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {customizingItem.sizes.map((size) => {
                  const isSelected = selectedSize === size.name;
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                          : 'bg-stone-850 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-white">{size.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <span className="text-[11px] mt-1 text-stone-400 font-mono">
                        {size.priceOffset > 0 ? `+₹${size.priceOffset}` : 'Standard'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons Checklist */}
          {customizingItem.addOns && customizingItem.addOns.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-stone-300 font-bold uppercase tracking-wider text-[11px] block">
                2. Select Add-ons & Extras
              </label>

              <div className="space-y-2">
                {customizingItem.addOns.map((addOn) => {
                  const isChecked = selectedAddOns.includes(addOn.name);
                  return (
                    <div
                      key={addOn.name}
                      onClick={() => toggleAddOn(addOn.name)}
                      className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/80 text-white'
                          : 'bg-stone-850 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium text-stone-200">{addOn.name}</span>
                      </div>
                      <span className="font-mono text-amber-400 font-semibold">+₹{addOn.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chef Instructions */}
          <div className="space-y-2">
            <label className="text-stone-300 font-bold uppercase tracking-wider text-[11px] block">
              3. Special Cooking Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Less spicy, oat milk extra hot, no onions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 text-xs"
            />
          </div>

        </div>

        {/* Footer with Computed Price & Add Button */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Item Total</span>
            <span className="text-xl font-black text-amber-400 font-mono">₹{finalItemPrice}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customized Item</span>
          </button>
        </div>

      </div>

    </div>
  );
};
