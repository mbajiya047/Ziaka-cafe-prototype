import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  Clock,
  Bike,
  ChefHat,
  ShoppingBag,
  Phone,
  MessageSquare,
  FileText,
  MapPin,
  Sparkles,
  ArrowRight,
  Store
} from 'lucide-react';

export const LiveOrderTracker = () => {
  const {
    isTrackerOpen,
    setIsTrackerOpen,
    activeTrackingOrderId,
    orders,
    setReceiptOrder,
    setIsReceiptOpen
  } = useApp();

  const currentOrder = orders.find(o => o.id === activeTrackingOrderId) || orders[0];

  // Rider animated progress along path
  const [riderProgress, setRiderProgress] = useState(40);

  useEffect(() => {
    if (!currentOrder) return;
    if (currentOrder.orderStatus === 'received') setRiderProgress(10);
    else if (currentOrder.orderStatus === 'in_kitchen') setRiderProgress(35);
    else if (currentOrder.orderStatus === 'out_for_delivery') setRiderProgress(70);
    else if (currentOrder.orderStatus === 'delivered') setRiderProgress(100);
  }, [currentOrder?.orderStatus]);

  if (!isTrackerOpen || !currentOrder) return null;

  const handleOpenReceipt = () => {
    setReceiptOrder(currentOrder);
    setIsReceiptOpen(true);
  };

  const steps = [
    {
      id: 'received',
      title: 'Order Confirmed',
      desc: 'Zaika kitchen received your ticket',
      icon: ShoppingBag
    },
    {
      id: 'in_kitchen',
      title: 'Cooking & Crafting',
      desc: 'Freshly prepared by our master chefs',
      icon: ChefHat
    },
    {
      id: 'out_for_delivery',
      title: currentOrder.customer.type === 'dinein' ? 'Served to Table' : 'Out for Delivery',
      desc: currentOrder.customer.type === 'dinein' ? 'Captain serving your order' : 'Rider is on the way',
      icon: currentOrder.customer.type === 'dinein' ? Store : Bike
    },
    {
      id: 'delivered',
      title: 'Delivered & Enjoy',
      desc: 'Bon Appetit! Enjoy your meal',
      icon: CheckCircle2
    }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'received': return 0;
      case 'in_kitchen': return 1;
      case 'out_for_delivery': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(currentOrder.orderStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-amber-400 font-mono">#{currentOrder.id}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold capitalize">
                {currentOrder.orderStatus.replace('_', ' ')}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-serif">Live Order Status</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenReceipt}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 transition"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Bill / Invoice</span>
            </button>

            <button
              onClick={() => setIsTrackerOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {/* Top ETA & Live Indicator Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/20 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-400 animate-spin-slow" />
              </div>
              <div>
                <p className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">Estimated Delivery</p>
                <h4 className="text-xl font-black text-white font-mono">{currentOrder.estimatedTime}</h4>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-stone-400 block">Fulfillment</span>
              <span className="text-xs font-bold text-stone-200 capitalize">
                {currentOrder.customer.type} Mode
              </span>
            </div>
          </div>

          {/* 4-Stage Animated Horizontal Stepper */}
          <div className="py-2">
            <div className="grid grid-cols-4 gap-2 relative">
              
              {/* Background Connecting Line */}
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-stone-800 -z-0">
                <div
                  className="h-full bg-amber-500 transition-all duration-700"
                  style={{ width: `${(currentStepIdx / 3) * 100}%` }}
                />
              </div>

              {steps.map((st, idx) => {
                const isCompleted = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                const Icon = st.icon;

                return (
                  <div key={st.id} className="flex flex-col items-center text-center space-y-2 z-10">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition duration-300 shadow-md ${
                        isCompleted
                          ? 'bg-amber-500 text-stone-950 shadow-amber-500/30 font-bold'
                          : 'bg-stone-950 text-stone-600 border border-stone-800'
                      } ${isCurrent ? 'ring-4 ring-amber-500/20 scale-110' : ''}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`text-[11px] font-bold ${isCompleted ? 'text-white' : 'text-stone-500'}`}>
                        {st.title}
                      </p>
                      <p className="text-[9px] text-stone-500 hidden sm:block mt-0.5">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Simulated Live Map */}
          {currentOrder.customer.type === 'delivery' && (
            <div className="relative h-48 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
              
              {/* Map SVG Pattern / Styling */}
              <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#44403c" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Roads */}
                <path d="M 20 120 Q 150 40 300 100 T 580 80" fill="none" stroke="#78716c" strokeWidth="4" strokeDasharray="6 6" />
                <path d="M 80 180 C 200 160 350 70 540 50" fill="none" stroke="#f59e0b" strokeWidth="3" />
              </svg>

              {/* Cafe Start Pin */}
              <div className="absolute top-1/3 left-12 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-stone-950 flex items-center justify-center shadow-lg text-stone-950 font-black">
                  ☕
                </div>
                <span className="text-[9px] bg-stone-900/90 text-amber-300 px-1.5 py-0.5 rounded font-bold mt-1 border border-stone-700">
                  Zaika Cafe
                </span>
              </div>

              {/* Customer Destination Pin */}
              <div className="absolute top-1/4 right-14 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-stone-950 flex items-center justify-center shadow-lg text-stone-950">
                  <MapPin className="w-4 h-4 text-stone-950 fill-stone-950" />
                </div>
                <span className="text-[9px] bg-stone-900/90 text-emerald-300 px-1.5 py-0.5 rounded font-bold mt-1 border border-stone-700">
                  Your Address
                </span>
              </div>

              {/* Moving Delivery Rider Marker */}
              <div
                className="absolute top-1/2 transition-all duration-1000 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${riderProgress}%` }}
              >
                <div className="relative">
                  <span className="absolute -inset-1 rounded-full bg-amber-400/40 animate-ping" />
                  <div className="w-9 h-9 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl border-2 border-stone-950 z-10">
                    <Bike className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-[9px] bg-amber-500 text-stone-950 font-black px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                  {currentOrder.rider ? currentOrder.rider.name : 'Rider'}
                </span>
              </div>

              {/* Live Status Overlay Badge */}
              <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-sm px-2.5 py-1 rounded-xl border border-stone-700 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-stone-300 font-bold">GPS Live Telemetry Sync</span>
              </div>

            </div>
          )}

          {/* Delivery Rider Info Card */}
          {currentOrder.rider && (
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-lg border border-amber-500/30">
                  {currentOrder.rider.name[0]}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h5 className="font-bold text-white text-xs">{currentOrder.rider.name}</h5>
                    <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.2 rounded text-[10px] font-black">
                      ★ {currentOrder.rider.rating}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{currentOrder.rider.vehicle}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert(`Calling rider ${currentOrder.rider.name} at ${currentOrder.rider.phone}`)}
                  className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-800 transition"
                  title="Call Rider"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert(`Opening live chat with rider ${currentOrder.rider.name}`)}
                  className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-800 transition"
                  title="Message Rider"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Ordered Items Summary */}
          <div className="space-y-2">
            <h5 className="font-bold text-stone-300 uppercase tracking-wider text-[11px]">
              Order Items ({currentOrder.items.length})
            </h5>
            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 divide-y divide-stone-800/60">
              {currentOrder.items.map((it, idx) => (
                <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <p className="text-white font-medium">
                      <span className="text-amber-400 font-bold">{it.quantity}x</span> {it.name}
                    </p>
                    {it.selectedSize && (
                      <span className="text-[10px] text-stone-400 block">{it.selectedSize}</span>
                    )}
                  </div>
                  <span className="font-mono text-stone-300 font-semibold">
                    ₹{(it.unitPrice || it.price) * it.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Paid Total</span>
            <span className="text-lg font-black text-amber-400 font-mono">₹{currentOrder.summary.total}</span>
          </div>

          <button
            onClick={handleOpenReceipt}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 transition"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Download Invoice PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
