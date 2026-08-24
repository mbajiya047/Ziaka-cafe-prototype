import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MENU_ITEMS } from '../data/menuData';
import { INITIAL_ORDERS, INITIAL_RESERVATIONS } from '../data/initialOrders';
import { PROMO_COUPONS } from '../data/coupons';
import { sound } from '../utils/audio';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('zaika_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('zaika_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('zaika_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('zaika_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState({
    name: 'Kashish',
    email: 'kashish@srmuniversity.ac.in',
    phone: '+91 98765 43210',
    coins: 150,
    addresses: [
      { id: 'addr1', label: 'Home', address: 'B-204, Green Meadows, Sector 15, Sonepat', isDefault: true },
      { id: 'addr2', label: 'University', address: 'SRM University Campus, Rajiv Gandhi Education City, Sonepat', isDefault: false }
    ]
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDiet, setFilterDiet] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [orderMode, setOrderMode] = useState('delivery');
  const [tableNumber, setTableNumber] = useState('Table 4');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isAcademicModalOpen, setIsAcademicModalOpen] = useState(false);
  const [receiptOrder, setReceiptOrder] = useState(null);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [useCoins, setUseCoins] = useState(false);
  const [deliveryTip, setDeliveryTip] = useState(30);

  useEffect(() => {
    localStorage.setItem('zaika_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('zaika_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zaika_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('zaika_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, options = {}) => {
    sound.playAddToCart();
    const size = options.size || (item.sizes ? item.sizes[0].name : null);
    const sizeOffset = options.size
      ? (item.sizes?.find(s => s.name === options.size)?.priceOffset || 0)
      : 0;
    const addOns = options.addOns || [];
    const addOnsCost = addOns.reduce((acc, a) => {
      const found = item.addOns?.find(ao => ao.name === a);
      return acc + (found ? found.price : 0);
    }, 0);
    const itemUnitPrice = (item.price + sizeOffset + addOnsCost);
    const instructions = options.instructions || '';

    const cartItemId = `${item.id}-${size || 'std'}-${addOns.sort().join('-')}-${instructions ? 'notes' : ''}`;

    setCart(prev => {
      const existing = prev.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map(i =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            id: item.id,
            name: item.name,
            image: item.image,
            unitPrice: itemUnitPrice,
            isVeg: item.isVeg,
            selectedSize: size,
            selectedAddOns: addOns,
            instructions,
            quantity: 1
          }
        ];
      }
    });
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setUseCoins(false);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  let couponDiscount = 0;
  if (appliedCoupon && cartSubtotal >= (appliedCoupon.minOrder || 0)) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscount = Math.min((cartSubtotal * appliedCoupon.discountValue) / 100, appliedCoupon.maxDiscount);
    } else if (appliedCoupon.discountType === 'flat') {
      couponDiscount = appliedCoupon.discountValue;
    } else if (appliedCoupon.discountType === 'free_delivery') {
      couponDiscount = 49;
    }
  }

  const baseDeliveryFee = orderMode === 'delivery' ? (cartSubtotal >= 299 ? 0 : 49) : 0;
  const deliveryFee = appliedCoupon?.discountType === 'free_delivery' ? 0 : baseDeliveryFee;
  const packagingFee = orderMode === 'delivery' ? 20 : (orderMode === 'pickup' ? 10 : 0);
  const gst = parseFloat(((cartSubtotal - couponDiscount) * 0.05).toFixed(2));
  const coinsDiscount = useCoins ? Math.min(user.coins, Math.floor(cartSubtotal * 0.2)) : 0;

  const grandTotal = Math.max(
    0,
    parseFloat((cartSubtotal - couponDiscount - coinsDiscount + deliveryFee + packagingFee + (orderMode === 'delivery' ? deliveryTip : 0) + gst).toFixed(2))
  );

  const placeOrder = (orderDetails) => {
    sound.playOrderSuccess();
    const newOrderId = `ZK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      timestamp: new Date().toISOString(),
      customer: {
        name: orderDetails.name || user.name,
        phone: orderDetails.phone || user.phone,
        address: orderDetails.address || (user.addresses[0]?.address),
        tableNumber: orderMode === 'dinein' ? (orderDetails.tableNumber || tableNumber) : null,
        type: orderMode
      },
      items: [...cart],
      summary: {
        subtotal: cartSubtotal,
        discount: couponDiscount,
        coinsUsed: coinsDiscount,
        deliveryFee,
        packagingFee,
        gst,
        tip: orderMode === 'delivery' ? deliveryTip : 0,
        total: grandTotal
      },
      paymentMethod: orderDetails.paymentMethod || 'UPI (Google Pay)',
      paymentStatus: 'Paid',
      orderStatus: 'received',
      estimatedTime: orderMode === 'dinein' ? '15 mins' : '25-30 mins',
      rider: orderMode === 'delivery' ? {
        name: 'Vikram Choudhary',
        phone: '+91 98721 00234',
        rating: 4.95,
        vehicle: 'Ather 450X (HR-10-CZ-1994)'
      } : null
    };

    const earnedCoins = Math.floor(grandTotal * 0.05);
    setUser(prev => ({
      ...prev,
      coins: prev.coins - coinsDiscount + earnedCoins
    }));

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setActiveTrackingOrderId(newOrderId);
    setIsCheckoutOpen(false);
    setIsTrackerOpen(true);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            orderStatus: newStatus,
            estimatedTime: newStatus === 'delivered' ? 'Delivered' : ord.estimatedTime
          };
        }
        return ord;
      })
    );
  };

  const addMenuItem = (newItem) => {
    const item = {
      ...newItem,
      id: `custom-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };
    setMenuItems(prev => [item, ...prev]);
  };

  const toggleItemStock = (itemId) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, inStock: !item.inStock } : item))
    );
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addReservation = (booking) => {
    const res = {
      ...booking,
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Confirmed'
    };
    setReservations(prev => [res, ...prev]);
    sound.playOrderSuccess();
    return res;
  };

  const updateReservationStatus = (resId, newStatus) => {
    setReservations(prev =>
      prev.map(r => (r.id === resId ? { ...r, status: newStatus } : r))
    );
  };

  const activeOrder = orders.find(o => o.id === activeTrackingOrderId) || orders[0];

  return (
    <AppContext.Provider
      value={{
        menuItems,
        setMenuItems,
        orders,
        reservations,
        user,
        setUser,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        totalCartCount,
        appliedCoupon,
        setAppliedCoupon,
        useCoins,
        setUseCoins,
        deliveryTip,
        setDeliveryTip,
        couponDiscount,
        coinsDiscount,
        deliveryFee,
        packagingFee,
        gst,
        grandTotal,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        filterDiet,
        setFilterDiet,
        sortBy,
        setSortBy,
        orderMode,
        setOrderMode,
        tableNumber,
        setTableNumber,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isReservationOpen,
        setIsReservationOpen,
        isReceiptOpen,
        setIsReceiptOpen,
        isAcademicModalOpen,
        setIsAcademicModalOpen,
        receiptOrder,
        setReceiptOrder,
        customizingItem,
        setCustomizingItem,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        isTrackerOpen,
        setIsTrackerOpen,
        activeOrder,
        placeOrder,
        updateOrderStatus,
        addMenuItem,
        toggleItemStock,
        deleteMenuItem,
        addReservation,
        updateReservationStatus,
        isAdminView,
        setIsAdminView,
        coupons: PROMO_COUPONS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
