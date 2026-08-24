import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  MapPin,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Phone,
  User,
  Sparkles,
  Radio,
  Banknote
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    user,
    orderMode,
    tableNumber,
    setTableNumber,
    cart,
    grandTotal,
    placeOrder
  } = useApp();

  const [step, setStep] = useState(1); // 1: Info & Address, 2: Payment
  const [selectedAddressId, setSelectedAddressId] = useState(user.addresses[0]?.id || 'addr1');
  const [customAddress, setCustomAddress] = useState('');
  const [phone, setPhone] = useState(user.phone);
  const [customerName, setCustomerName] = useState(user.name);
  const [deliverySpeed, setDeliverySpeed] = useState('express'); // 'express' | 'schedule'

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [upiApp, setUpiApp] = useState('gpay');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('892');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleCompletePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      const chosenAddress = selectedAddressId === 'custom'
        ? customAddress
        : (user.addresses.find(a => a.id === selectedAddressId)?.address || user.addresses[0]?.address);

      placeOrder({
        name: customerName,
        phone,
        address: chosenAddress,
        tableNumber: orderMode === 'dinein' ? tableNumber : null,
        paymentMethod:
          paymentMethod === 'upi' ? `UPI (${upiApp.toUpperCase()})` :
          paymentMethod === 'card' ? `Card ending ${cardNumber.slice(-4)}` :
          paymentMethod === 'netbanking' ? 'Netbanking (HDFC Bank)' : 'Cash / Pay at Table'
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-serif">Express Secure Checkout</h3>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Header */}
        <div className="flex border-b border-stone-800 bg-stone-950 text-xs">
          <div
            onClick={() => setStep(1)}
            className={`flex-1 py-3 text-center font-bold cursor-pointer transition border-b-2 ${
              step === 1
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            1. Details & Destination
          </div>
          <div
            onClick={() => setStep(2)}
            className={`flex-1 py-3 text-center font-bold cursor-pointer transition border-b-2 ${
              step === 2
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            2. Payment (₹{grandTotal})
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {/* STEP 1: Details & Address */}
          {step === 1 && (
            <div className="space-y-5">
              
              {/* Contact Info */}
              <div className="space-y-3">
                <label className="text-stone-300 font-bold uppercase tracking-wider text-[11px] block">
                  Contact Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-stone-400 text-[10px]">Your Full Name</span>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 w-3.5 h-3.5 text-stone-500" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-stone-400 text-[10px]">Phone Number (for updates)</span>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3 w-3.5 h-3.5 text-stone-500" />
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Mode Destination */}
              {orderMode === 'delivery' && (
                <div className="space-y-3">
                  <label className="text-stone-300 font-bold uppercase tracking-wider text-[11px] block">
                    Delivery Address
                  </label>

                  <div className="space-y-2">
                    {user.addresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`p-3.5 rounded-2xl border flex items-start space-x-3 cursor-pointer transition ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-500 text-white'
                              : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-white text-xs">{addr.label}</span>
                              {addr.isDefault && (
                                <span className="bg-stone-800 text-[10px] px-1.5 py-0.2 rounded text-stone-400">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-400 mt-0.5">{addr.address}</p>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                        </div>
                      );
                    })}

                    {/* Add Custom address option */}
                    <div
                      onClick={() => setSelectedAddressId('custom')}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                        selectedAddressId === 'custom'
                          ? 'bg-amber-500/10 border-amber-500 text-white'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs">Enter Another Address / GPS Pin</span>
                        {selectedAddressId === 'custom' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      {selectedAddressId === 'custom' && (
                        <textarea
                          rows={2}
                          placeholder="House / Flat No., Landmark, Street Name..."
                          value={customAddress}
                          onChange={(e) => setCustomAddress(e.target.value)}
                          className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {orderMode === 'dinein' && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Dine-in Table Ordering</span>
                  </div>
                  <p className="text-stone-400 text-xs">
                    Food will be delivered straight to your table by our cafe captains.
                  </p>
                  <div className="flex items-center space-x-3">
                    <span className="text-stone-300 font-medium">Select Table:</span>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="bg-stone-900 border border-stone-700 text-white font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:border-amber-500"
                    >
                      <option value="Table 1 (Indoor)">Table 1 (Indoor AC)</option>
                      <option value="Table 2 (Indoor)">Table 2 (Indoor AC)</option>
                      <option value="Table 3 (Window)">Table 3 (Window View)</option>
                      <option value="Table 4 (Garden)">Table 4 (Garden Patio)</option>
                      <option value="Table 5 (Rooftop)">Table 5 (Rooftop)</option>
                    </select>
                  </div>
                </div>
              )}

              {orderMode === 'pickup' && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <span className="text-amber-400 font-bold">Self-Pickup at Zaika Cafe</span>
                  <p className="text-stone-400 text-xs">
                    Pick up your hot, fresh parcel at Zaika Cafe Counter, 39 Rajiv Gandhi Education City, Sonepat.
                  </p>
                </div>
              )}

              {/* Delivery Speed */}
              <div className="space-y-2">
                <label className="text-stone-300 font-bold uppercase tracking-wider text-[11px] block">
                  Delivery Speed
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliverySpeed('express')}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex items-center space-x-3 ${
                      deliverySpeed === 'express'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="font-bold text-xs">Instant Express</p>
                      <p className="text-[10px] text-stone-400">20-30 Minutes</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setDeliverySpeed('schedule')}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex items-center space-x-3 ${
                      deliverySpeed === 'schedule'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                    <div>
                      <p className="font-bold text-xs">Schedule Ahead</p>
                      <p className="text-[10px] text-stone-400">Today Evening</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Payment Gateway Simulation */}
          {step === 2 && (
            <div className="space-y-5">
              
              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: QrCode },
                  { id: 'card', label: 'Cards', icon: CreditCard },
                  { id: 'netbanking', label: 'Netbanking', icon: ShieldCheck },
                  { id: 'cod', label: 'Cash', icon: Banknote }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = paymentMethod === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setPaymentMethod(tab.id)}
                      className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1.5 transition ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />
                      <span className="font-bold text-[10px]">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Tab */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-xs">Instant UPI & QR Code</h4>
                      <p className="text-[10px] text-stone-400">Scan using any UPI app or click quick pay</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                      Zero Surcharge
                    </span>
                  </div>

                  {/* QR Code Demo Box */}
                  <div className="flex items-center justify-center p-4 bg-white rounded-2xl mx-auto w-40 h-40 shadow-inner">
                    <div className="text-stone-950 text-center flex flex-col items-center justify-center space-y-1">
                      <QrCode className="w-24 h-24 text-stone-900" />
                      <span className="text-[9px] font-black tracking-widest uppercase">ZAIKA CAFÉ UPI</span>
                    </div>
                  </div>

                  {/* UPI Apps selector */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setUpiApp(app.toLowerCase())}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                          upiApp === app.toLowerCase()
                            ? 'bg-amber-500 text-stone-950 border-amber-500'
                            : 'bg-stone-900 text-stone-300 border-stone-800'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Tab */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                  <div className="space-y-1">
                    <span className="text-stone-400 text-[10px]">Card Number</span>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-stone-400 text-[10px]">Valid Thru</span>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-stone-400 text-[10px]">CVV / CVC</span>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[10px] text-stone-500">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>256-Bit SSL Encrypted End-to-End</span>
                  </div>
                </div>
              )}

              {/* Netbanking Tab */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                  <span className="text-stone-300 font-bold block">Select Bank</span>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank) => (
                      <div
                        key={bank}
                        className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-500 cursor-pointer text-xs font-semibold"
                      >
                        {bank}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COD Tab */}
              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <span className="text-amber-400 font-bold block">
                    {orderMode === 'dinein' ? 'Pay Cash at Table' : 'Cash on Delivery (COD)'}
                  </span>
                  <p className="text-stone-400 text-xs">
                    Please keep exact change of <strong className="text-white">₹{grandTotal}</strong> ready upon delivery.
                  </p>
                </div>
              )}

              {/* Total Summary Mini Bar */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold">Total Amount</span>
                  <span className="text-lg font-black text-amber-400 font-mono">₹{grandTotal}</span>
                </div>
                <span className="text-stone-400 text-xs">{cart.length} items</span>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between shrink-0">
          {step === 1 ? (
            <>
              <span className="text-stone-400 text-xs">Step 1 of 2</span>
              <button
                onClick={() => setStep(2)}
                className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition transform active:scale-95"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-stone-400 hover:text-white text-xs font-semibold"
              >
                Back to Details
              </button>

              <button
                disabled={isProcessing}
                onClick={handleCompletePayment}
                className="flex items-center space-x-2 px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Authorizing Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{grandTotal} & Place Order</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
