import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/menuData';
import { sound } from '../utils/audio';
import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Clock,
  Star,
  Plus,
  Trash2,
  CheckCircle2,
  ChefHat,
  Bike,
  Store,
  CalendarDays,
  Utensils,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  FileText,
  ShieldCheck,
  Eye,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    orders,
    updateOrderStatus,
    menuItems,
    addMenuItem,
    toggleItemStock,
    deleteMenuItem,
    reservations,
    updateReservationStatus,
    setReceiptOrder,
    setIsReceiptOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'menu' | 'reservations' | 'analytics'
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  // Add Item Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'coffee',
    price: 199,
    originalPrice: 249,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    isChefsSpecial: false,
    prepTime: '10 mins',
    calories: '200 kcal',
    description: '',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&auto=format&fit=crop&q=80',
    customizable: false
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.summary?.total || 0), 0);
  const totalCompletedOrders = orders.filter(o => o.orderStatus === 'delivered').length;
  const activeOrdersCount = orders.filter(o => o.orderStatus !== 'delivered').length;

  const handleCreateItem = (e) => {
    e.preventDefault();
    addMenuItem({
      ...newItem,
      price: Number(newItem.price),
      originalPrice: Number(newItem.originalPrice)
    });
    setIsAddModalOpen(false);
    setNewItem({
      name: '',
      category: 'coffee',
      price: 199,
      originalPrice: 249,
      isVeg: true,
      isSpicy: false,
      isBestseller: false,
      isChefsSpecial: false,
      prepTime: '10 mins',
      calories: '200 kcal',
      description: '',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&auto=format&fit=crop&q=80',
      customizable: false
    });
  };

  const handleStatusAdvance = (order) => {
    let nextStatus = 'delivered';
    if (order.orderStatus === 'received') nextStatus = 'in_kitchen';
    else if (order.orderStatus === 'in_kitchen') nextStatus = 'out_for_delivery';
    else if (order.orderStatus === 'out_for_delivery') nextStatus = 'delivered';
    
    sound.playAdminAlert();
    updateOrderStatus(order.id, nextStatus);
  };

  // Filtered menu for admin
  const filteredMenu = menuItems.filter(item => {
    if (selectedCatFilter !== 'all' && item.category !== selectedCatFilter) return false;
    if (menuSearch.trim()) {
      return item.name.toLowerCase().includes(menuSearch.toLowerCase());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 pb-16">
      
      {/* Top Admin Header Bar */}
      <div className="bg-stone-900 border-b border-stone-800 sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-serif">Zaika Cafe Operations Portal</h1>
                <p className="text-xs text-stone-400">Live Kitchen Display, Menu Management & Analytics</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1.5 bg-stone-950 p-1 rounded-2xl border border-stone-800 text-xs font-semibold overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'orders'
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Live Kitchen ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'menu'
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Menu Catalog ({menuItems.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reservations')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'reservations'
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Bookings ({reservations.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'analytics'
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Sales Analytics</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs">
              <span>Gross Revenue Today</span>
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
            <h3 className="text-2xl font-black text-white font-mono">₹{totalRevenue.toLocaleString()}</h3>
            <div className="flex items-center space-x-1 text-emerald-400 text-[11px] font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% vs yesterday</span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs">
              <span>Active Orders Queue</span>
              <span className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <h3 className="text-2xl font-black text-amber-400 font-mono">{activeOrdersCount} Pending</h3>
            <p className="text-[11px] text-stone-400">Avg Kitchen Prep: 11 mins</p>
          </div>

          <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs">
              <span>Total Orders Placed</span>
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <ShoppingBag className="w-4 h-4" />
              </span>
            </div>
            <h3 className="text-2xl font-black text-white font-mono">{orders.length}</h3>
            <p className="text-[11px] text-stone-400">{totalCompletedOrders} Fulfilled Successfully</p>
          </div>

          <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs">
              <span>Customer Satisfaction</span>
              <span className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400">
                <Star className="w-4 h-4" />
              </span>
            </div>
            <h3 className="text-2xl font-black text-white font-mono">4.92 / 5.0</h3>
            <p className="text-[11px] text-stone-400">Based on 1,480+ Cafe Ratings</p>
          </div>

        </div>

        {/* TAB 1: Live Kitchen Display Kanban Board */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white font-serif">Kitchen Order Tickets (KOT)</h2>
                <p className="text-xs text-stone-400">Move tickets across stages to update customer live tracking.</p>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {[
                { key: 'received', title: '1. New Orders', color: 'border-yellow-500/40 bg-yellow-500/5', badge: 'bg-yellow-500 text-stone-950', nextLabel: 'Move to Cooking' },
                { key: 'in_kitchen', title: '2. In Kitchen', color: 'border-orange-500/40 bg-orange-500/5', badge: 'bg-orange-500 text-stone-950', nextLabel: 'Dispatch / Serve' },
                { key: 'out_for_delivery', title: '3. Out / Ready', color: 'border-blue-500/40 bg-blue-500/5', badge: 'bg-blue-500 text-white', nextLabel: 'Mark Delivered' },
                { key: 'delivered', title: '4. Completed', color: 'border-emerald-500/40 bg-emerald-500/5', badge: 'bg-emerald-500 text-stone-950', nextLabel: null }
              ].map((col) => {
                const colOrders = orders.filter(o => o.orderStatus === col.key);

                return (
                  <div key={col.key} className={`p-4 rounded-3xl border ${col.color} space-y-3 flex flex-col min-h-[450px]`}>
                    <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                      <span className="font-bold text-xs text-white">{col.title}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${col.badge}`}>
                        {colOrders.length}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[550px] pr-1">
                      {colOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 space-y-2.5 transition text-xs shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-black text-amber-400 font-mono">#{ord.id}</span>
                            <span className="text-[10px] text-stone-400">
                              {new Date(ord.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div>
                            <p className="font-bold text-white text-xs">{ord.customer.name}</p>
                            <p className="text-[10px] text-stone-400">
                              {ord.customer.type === 'dinein' ? ord.customer.tableNumber : ord.customer.address}
                            </p>
                          </div>

                          {/* Items List */}
                          <div className="bg-stone-950 p-2 rounded-xl space-y-1 text-[11px] divide-y divide-stone-800/60">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="pt-1 first:pt-0 flex justify-between">
                                <span className="text-stone-300">
                                  <strong className="text-amber-400">{it.quantity}x</strong> {it.name}
                                </span>
                                <span className="text-stone-400 font-mono">₹{(it.unitPrice || it.price) * it.quantity}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-stone-800 text-[11px]">
                            <span className="text-stone-400">Total: <strong className="text-white font-mono">₹{ord.summary.total}</strong></span>
                            
                            <button
                              onClick={() => {
                                setReceiptOrder(ord);
                                setIsReceiptOpen(true);
                              }}
                              className="text-stone-400 hover:text-amber-400 flex items-center space-x-1"
                              title="Print KOT"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>KOT</span>
                            </button>
                          </div>

                          {/* Advance Status Button */}
                          {col.nextLabel && (
                            <button
                              onClick={() => handleStatusAdvance(ord)}
                              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] rounded-xl transition shadow"
                            >
                              {col.nextLabel} ➔
                            </button>
                          )}
                        </div>
                      ))}

                      {colOrders.length === 0 && (
                        <div className="h-32 flex items-center justify-center text-center text-stone-600 text-xs">
                          No orders here
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        )}

        {/* TAB 2: Menu Catalog Manager */}
        {activeTab === 'menu' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white font-serif">Menu Catalog & Inventory</h2>
                <p className="text-xs text-stone-400">Add new creations, adjust prices, and toggle in-stock availability.</p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Food Item</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-stone-900 rounded-2xl border border-stone-800 text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  placeholder="Filter menu items..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
                <select
                  value={selectedCatFilter}
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="bg-stone-950 border border-stone-800 text-stone-300 font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Menu Items Table */}
            <div className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950/80 text-stone-400 border-b border-stone-800 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Dish</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Diet</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4 text-center">Stock Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {filteredMenu.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-850/60 transition">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                              <p className="font-bold text-white text-xs">{item.name}</p>
                              <p className="text-[10px] text-stone-400 max-w-xs truncate">{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 capitalize text-stone-400">{item.category}</td>
                        <td className="p-4 font-mono font-bold text-amber-400">₹{item.price}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.isVeg ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {item.isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-yellow-400">★ {item.rating}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => toggleItemStock(item.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition ${
                              item.inStock
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/10 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {item.inStock ? '● In Stock' : '✕ Sold Out'}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteMenuItem(item.id)}
                            className="p-2 rounded-xl bg-stone-800 hover:bg-red-900/50 hover:text-red-300 text-stone-400 transition"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Table Reservations Manager */}
        {activeTab === 'reservations' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-white font-serif">Table Reservations</h2>
              <p className="text-xs text-stone-400">Review, seat, and approve customer dine-in table requests.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 font-mono">#{res.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      res.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {res.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm">{res.name}</h4>
                    <p className="text-stone-400 text-xs">{res.phone}</p>
                  </div>

                  <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800/80 space-y-1 text-stone-300">
                    <p>📅 <strong className="text-white">{res.date}</strong> at <strong className="text-amber-400">{res.time}</strong></p>
                    <p>👥 Guests: <strong className="text-white">{res.guests} people</strong></p>
                    <p>📍 Atmosphere: <strong className="text-white">{res.area}</strong></p>
                    {res.occasion && <p>🎉 Occasion: <span className="text-stone-400">{res.occasion}</span></p>}
                  </div>

                  {res.status === 'Pending' ? (
                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={() => updateReservationStatus(res.id, 'Confirmed')}
                        className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-xs transition"
                      >
                        Confirm Booking
                      </button>
                      <button
                        onClick={() => updateReservationStatus(res.id, 'Declined')}
                        className="px-3 py-2 bg-stone-800 hover:bg-red-900 text-stone-300 hover:text-white font-bold rounded-xl text-xs transition"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateReservationStatus(res.id, 'Seated')}
                      className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs transition"
                    >
                      Seat Guests at Table
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Sales Analytics Charts */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white font-serif">Revenue & Sales Performance</h2>
              <p className="text-xs text-stone-400">Weekly breakdown and top category profit analysis.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Daily Sales Bar Representation */}
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
                <h3 className="font-bold text-white text-sm">Weekly Daily Revenue</h3>
                <div className="h-60 flex items-end justify-between gap-3 pt-6">
                  {[
                    { day: 'Mon', val: 18500, h: '45%' },
                    { day: 'Tue', val: 22000, h: '55%' },
                    { day: 'Wed', val: 29400, h: '70%' },
                    { day: 'Thu', val: 26000, h: '62%' },
                    { day: 'Fri', val: 38500, h: '88%' },
                    { day: 'Sat', val: 45200, h: '98%' },
                    { day: 'Sun (Today)', val: 42850, h: '94%' }
                  ].map((bar) => (
                    <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-[10px] text-amber-400 font-mono font-bold">₹{Math.round(bar.val / 1000)}k</span>
                      <div
                        className="w-full rounded-2xl bg-gradient-to-t from-amber-600 to-yellow-400 transition-all duration-500 hover:brightness-110 shadow-lg shadow-amber-500/20"
                        style={{ height: bar.h }}
                      />
                      <span className="text-[10px] text-stone-400 font-medium">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Contribution */}
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <h3 className="font-bold text-white text-sm">Top Revenue Categories</h3>
                <div className="space-y-3.5 pt-2">
                  {[
                    { name: 'Signature Coffees & Brews', pct: 34, amount: '₹14,569', color: 'bg-amber-500' },
                    { name: 'Pizzas & Pastas', pct: 28, amount: '₹11,998', color: 'bg-orange-500' },
                    { name: 'Chef Special Combos', pct: 20, amount: '₹8,570', color: 'bg-yellow-500' },
                    { name: 'Desserts & Lava Cakes', pct: 12, amount: '₹5,142', color: 'bg-rose-500' },
                    { name: 'Starters & Quick Bites', pct: 6, amount: '₹2,571', color: 'bg-purple-500' }
                  ].map((cat) => (
                    <div key={cat.name} className="space-y-1.5">
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">{cat.name}</span>
                        <span className="text-amber-400 font-mono">{cat.amount} ({cat.pct}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                        <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Add New Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-6 overflow-hidden shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white font-serif">Add Dish to Zaika Menu</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-3">
              <div>
                <label className="text-stone-400 block mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saffron Pistachio Latte"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-400 block mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Dish Photo URL (Unsplash)</label>
                <input
                  type="url"
                  required
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Description & Ingredients</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Describe taste, ingredients..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-4 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.isVeg}
                    onChange={(e) => setNewItem({ ...newItem, isVeg: e.target.checked })}
                    className="rounded bg-stone-800 text-amber-500"
                  />
                  <span>Pure Vegetarian</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.isBestseller}
                    onChange={(e) => setNewItem({ ...newItem, isBestseller: e.target.checked })}
                    className="rounded bg-stone-800 text-amber-500"
                  />
                  <span>Bestseller Badge</span>
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition shadow-lg"
                >
                  Publish to Menu Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
