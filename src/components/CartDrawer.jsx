import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  Coins,
  HeartHandshake,
  ArrowRight,
  ShoppingBag,
  Bike,
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    appliedCoupon,
    setAppliedCoupon,
    useCoins,
    setUseCoins,
    user,
    deliveryTip,
    setDeliveryTip,
    couponDiscount,
    coinsDiscount,
    deliveryFee,
    packagingFee,
    gst,
    grandTotal,
    orderMode,
    setIsCheckoutOpen,
    coupons
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || inputCoupon).trim().toUpperCase();
    const found = coupons.find(c => c.code === code);
    if (!found) {
      setCouponError('Invalid promo code. Try ZAIKA50 or WELCOME20.');
      return;
    }
    if (cartSubtotal < found.minOrder) {
      setCouponError(`Min order of ₹${found.minOrder} required for ${found.code}.`);
      return;
    }
    setAppliedCoupon(found);
    setCouponError('');
    setInputCoupon('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white font-serif">Your Zaika Order</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Content (Scrollable) */}
          {cart.length > 0 ? (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
              
              {/* Order Mode Summary */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950 border border-stone-800 text-xs">
                <div className="flex items-center space-x-2">
                  <Bike className="w-4 h-4 text-amber-400" />
                  <span className="text-stone-300 font-medium capitalize">
                    {orderMode} Order
                  </span>
                </div>
                {orderMode === 'delivery' && (
                  <span className="text-amber-400 font-semibold">
                    {cartSubtotal >= 299 ? 'Free Delivery Unlocked!' : 'Add ₹' + (299 - cartSubtotal) + ' for Free Delivery'}
                  </span>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 flex items-start space-x-3"
                  >
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 mt-0.5"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="text-xs font-black text-amber-400 font-mono shrink-0">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>

                      {/* Customization Badges */}
                      {(item.selectedSize || item.selectedAddOns?.length > 0) && (
                        <div className="flex flex-wrap gap-1 text-[10px] text-stone-400">
                          {item.selectedSize && (
                            <span className="bg-stone-800 px-1.5 py-0.5 rounded text-stone-300">
                              {item.selectedSize}
                            </span>
                          )}
                          {item.selectedAddOns?.map((add) => (
                            <span key={add} className="bg-stone-800 px-1.5 py-0.5 rounded text-amber-300">
                              +{add}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Chef Instruction */}
                      {item.instructions && (
                        <p className="text-[10px] text-stone-500 italic">"{item.instructions}"</p>
                      )}

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center space-x-2 bg-stone-900 border border-stone-700 rounded-lg p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, -1)}
                            className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, 1)}
                            className="w-5 h-5 flex items-center justify-center text-amber-400 hover:text-amber-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-500 hover:text-red-400 transition p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupons Module */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                    Offers & Promo Codes
                  </span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <div>
                        <p className="font-bold text-amber-400">'{appliedCoupon.code}' Applied!</p>
                        <p className="text-[10px] text-stone-400">You save ₹{couponDiscount}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-stone-400 hover:text-red-400 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code (e.g. ZAIKA50)"
                        value={inputCoupon}
                        onChange={(e) => {
                          setInputCoupon(e.target.value);
                          setCouponError('');
                        }}
                        className="flex-1 px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 uppercase placeholder-stone-600 text-xs focus:outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-red-400 font-medium">{couponError}</p>
                    )}

                    {/* Quick Coupon Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {coupons.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => handleApplyCoupon(c.code)}
                          className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-dashed border-amber-500/40 text-[11px] font-bold text-amber-300 hover:border-amber-500 transition"
                        >
                          {c.code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Zaika Loyalty Coins Module */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Coins className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Zaika Coins</h5>
                    <p className="text-[10px] text-stone-400">
                      Balance: {user.coins} Coins ({user.coins} INR)
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useCoins}
                    onChange={(e) => setUseCoins(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {/* Delivery Partner Tip (Only in delivery mode) */}
              {orderMode === 'delivery' && (
                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-stone-300">
                    <HeartHandshake className="w-4 h-4 text-rose-400" />
                    <span>Tip your Delivery Hero</span>
                  </div>
                  <p className="text-[10px] text-stone-500">100% of your tip goes directly to your rider.</p>
                  
                  <div className="flex items-center space-x-2 pt-1">
                    {[0, 20, 30, 50].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDeliveryTip(amount)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition ${
                          deliveryTip === amount
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                        }`}
                      >
                        {amount === 0 ? 'None' : `₹${amount}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bill Details Breakdown */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                <h5 className="font-bold text-stone-300 uppercase tracking-wider text-[11px] pb-1 border-b border-stone-800">
                  Bill Summary
                </h5>

                <div className="flex justify-between text-stone-400">
                  <span>Item Subtotal</span>
                  <span className="font-mono">₹{cartSubtotal}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <span className="font-mono">-₹{couponDiscount}</span>
                  </div>
                )}

                {coinsDiscount > 0 && (
                  <div className="flex justify-between text-yellow-400 font-semibold">
                    <span>Zaika Coins Redeemed</span>
                    <span className="font-mono">-₹{coinsDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-400">
                  <span>Delivery Fee</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>

                {packagingFee > 0 && (
                  <div className="flex justify-between text-stone-400">
                    <span>Restaurant Packaging</span>
                    <span className="font-mono">₹{packagingFee}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-400">
                  <span>GST & Cafe Taxes (5%)</span>
                  <span className="font-mono">₹{gst}</span>
                </div>

                {orderMode === 'delivery' && deliveryTip > 0 && (
                  <div className="flex justify-between text-rose-300 font-medium">
                    <span>Delivery Partner Tip</span>
                    <span className="font-mono">₹{deliveryTip}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-sm font-bold text-white">
                  <span>To Pay</span>
                  <span className="text-lg font-black text-amber-400 font-mono">₹{grandTotal}</span>
                </div>
              </div>

            </div>
          ) : (
            /* Empty Cart View */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-stone-950 border border-stone-800 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-stone-600" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">Your cart is empty</h3>
              <p className="text-stone-400 text-xs max-w-xs leading-relaxed">
                Good food is just a click away. Explore our chef-crafted menu and fill your cart!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
              >
                Browse Menu
              </button>
            </div>
          )}

          {/* Footer Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Total Payable</span>
                <span className="text-xl font-black text-amber-400 font-mono">₹{grandTotal}</span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition transform active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
