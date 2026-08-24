import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Printer, Download, CheckCircle2, Coffee, QrCode } from 'lucide-react';

export const OrderReceiptModal = () => {
  const { isReceiptOpen, setIsReceiptOpen, receiptOrder } = useApp();

  if (!isReceiptOpen || !receiptOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <span className="text-xs font-bold text-stone-300">Tax Invoice & Kitchen Receipt</span>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={() => setIsReceiptOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Bill Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-stone-950 text-stone-300 space-y-5 text-xs font-mono">
          
          {/* Cafe Header */}
          <div className="text-center space-y-1 pb-4 border-b border-dashed border-stone-800">
            <div className="flex items-center justify-center space-x-1.5 text-amber-400 font-bold text-lg font-serif">
              <Coffee className="w-5 h-5" />
              <span>ZAIKA CAFÉ</span>
            </div>
            <p className="text-[11px] text-stone-400">39, Rajiv Gandhi Education City, Sonepat, Haryana</p>
            <p className="text-[10px] text-stone-500">GSTIN: 06AABCZ1234F1Z8 | FSSAI: 10822005000123</p>
            <p className="text-[10px] text-stone-500">Helpline: +91 1800 120 4040</p>
          </div>

          {/* Invoice Meta */}
          <div className="grid grid-cols-2 gap-2 text-[11px] pb-3 border-b border-dashed border-stone-800">
            <div>
              <p className="text-stone-500">ORDER NO:</p>
              <p className="text-white font-bold">#{receiptOrder.id}</p>
            </div>
            <div className="text-right">
              <p className="text-stone-500">DATE & TIME:</p>
              <p className="text-white">
                {new Date(receiptOrder.timestamp).toLocaleDateString()} {new Date(receiptOrder.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div>
              <p className="text-stone-500">CUSTOMER:</p>
              <p className="text-white">{receiptOrder.customer.name}</p>
            </div>
            <div className="text-right">
              <p className="text-stone-500">MODE:</p>
              <p className="text-amber-400 uppercase font-bold">{receiptOrder.customer.type}</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-stone-400 border-b border-stone-800 pb-1 text-[11px]">
              <span className="w-8">QTY</span>
              <span className="flex-1">ITEM DESCRIPTION</span>
              <span className="w-16 text-right">AMOUNT</span>
            </div>

            {receiptOrder.items.map((it, idx) => (
              <div key={idx} className="flex justify-between text-stone-300 py-1 text-[11px]">
                <span className="w-8 font-bold text-amber-400">{it.quantity}x</span>
                <div className="flex-1 pr-2">
                  <p className="text-white font-medium">{it.name}</p>
                  {it.selectedSize && <span className="text-[9px] text-stone-500">({it.selectedSize})</span>}
                </div>
                <span className="w-16 text-right font-bold text-white">
                  ₹{(it.unitPrice || it.price) * it.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-1.5 pt-3 border-t border-dashed border-stone-800 text-[11px]">
            <div className="flex justify-between text-stone-400">
              <span>Subtotal:</span>
              <span>₹{receiptOrder.summary.subtotal}</span>
            </div>

            {receiptOrder.summary.discount > 0 && (
              <div className="flex justify-between text-amber-400">
                <span>Discount / Promo:</span>
                <span>-₹{receiptOrder.summary.discount}</span>
              </div>
            )}

            {receiptOrder.summary.coinsUsed > 0 && (
              <div className="flex justify-between text-yellow-400">
                <span>Zaika Coins Applied:</span>
                <span>-₹{receiptOrder.summary.coinsUsed}</span>
              </div>
            )}

            <div className="flex justify-between text-stone-400">
              <span>Delivery Charges:</span>
              <span>₹{receiptOrder.summary.deliveryFee}</span>
            </div>

            <div className="flex justify-between text-stone-400">
              <span>Packaging & Services:</span>
              <span>₹{receiptOrder.summary.packagingFee}</span>
            </div>

            <div className="flex justify-between text-stone-400">
              <span>GST (CGST 2.5% + SGST 2.5%):</span>
              <span>₹{receiptOrder.summary.gst}</span>
            </div>

            <div className="pt-2 border-t-2 border-dashed border-stone-700 flex justify-between items-center text-sm font-bold text-white">
              <span>NET TOTAL PAID:</span>
              <span className="text-base text-amber-400">₹{receiptOrder.summary.total}</span>
            </div>
          </div>

          {/* Payment & Status Stamp */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between text-[10px]">
            <div>
              <p className="text-stone-500">PAYMENT METHOD:</p>
              <p className="text-emerald-400 font-bold">{receiptOrder.paymentMethod} (PAID)</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center">
              <QrCode className="w-8 h-8 text-stone-950" />
            </div>
          </div>

          {/* Footer message */}
          <div className="text-center text-[10px] text-stone-500 pt-2 border-t border-dashed border-stone-800">
            <p>Thank you for choosing Zaika Café!</p>
            <p className="text-[9px] mt-0.5">Please share your experience on Google & Instagram @ZaikaCafe</p>
          </div>

        </div>

      </div>
    </div>
  );
};
