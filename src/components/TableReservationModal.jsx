import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CalendarDays,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  MapPin,
  Heart
} from 'lucide-react';

export const TableReservationModal = () => {
  const {
    isReservationOpen,
    setIsReservationOpen,
    user,
    addReservation
  } = useApp();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2026-08-25');
  const [time, setTime] = useState('19:30');
  const [area, setArea] = useState('Rooftop Lounge');
  const [occasion, setOccasion] = useState('Casual Hangout');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  if (!isReservationOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = addReservation({
      name,
      phone,
      guests,
      date,
      time,
      area,
      occasion,
      notes
    });
    setConfirmedBookingId(res.id);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-serif">Reserve a Cafe Table</h3>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white font-serif">Table Reservation Confirmed!</h4>
            <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
              We look forward to hosting you, <strong className="text-amber-300">{name}</strong>! Your booking ID is <strong className="text-white font-mono">{confirmedBookingId}</strong> for {guests} guests on {date} at {time}.
            </p>
            <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-xs text-stone-300 inline-block">
              📍 Area: <span className="text-amber-400 font-bold">{area}</span> • {occasion}
            </div>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition"
              >
                Back to Menu
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
            
            {/* Name & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-stone-400 text-[11px] font-semibold">Your Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-stone-400 text-[11px] font-semibold">Contact Phone</span>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Guests Count */}
            <div className="space-y-2">
              <span className="text-stone-300 font-bold uppercase tracking-wider text-[11px] block">
                Number of Guests
              </span>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 4, 6, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      guests === num
                        ? 'bg-amber-500 text-stone-950 border-amber-500'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {num} {num === 8 ? '+' : 'ppl'}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-stone-400 text-[11px] font-semibold">Date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-stone-400 text-[11px] font-semibold">Time Slot</span>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="14:00">02:00 PM (Afternoon)</option>
                  <option value="17:00">05:00 PM (Evening Chai)</option>
                  <option value="19:30">07:30 PM (Dinner)</option>
                  <option value="21:00">09:00 PM (Late Night)</option>
                </select>
              </div>
            </div>

            {/* Seating Area */}
            <div className="space-y-2">
              <span className="text-stone-300 font-bold uppercase tracking-wider text-[11px] block">
                Seating Atmosphere Preference
              </span>
              <div className="grid grid-cols-3 gap-2">
                {['Indoor AC Lounge', 'Garden Patio', 'Rooftop Lounge'].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setArea(loc)}
                    className={`p-2.5 rounded-xl text-center border text-[11px] font-semibold transition ${
                      area === loc
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div className="space-y-2">
              <span className="text-stone-300 font-bold uppercase tracking-wider text-[11px] block">
                Special Occasion
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Casual Hangout', 'Birthday', 'Date Night', 'Business Meeting'].map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`py-1.5 px-2 rounded-xl text-center border text-[10px] font-semibold transition ${
                      occasion === occ
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Notes */}
            <div className="space-y-1">
              <span className="text-stone-400 text-[11px]">Special Requests / Decoration</span>
              <input
                type="text"
                placeholder="e.g. Quiet corner, high chair, birthday candle..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-amber-500/25 transition"
              >
                Confirm Table Reservation
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
