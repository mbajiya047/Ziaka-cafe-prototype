export const INITIAL_ORDERS = [
  {
    id: 'ZK-9082',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    customer: {
      name: 'Aarav Sharma',
      phone: '+91 98765 43210',
      address: 'Flat 402, Royal Palms, Sector 14, Sonepat',
      type: 'delivery'
    },
    items: [
      {
        id: 'p1',
        name: 'Zaika Special Paneer Makhani Sourdough Pizza',
        price: 399,
        quantity: 1,
        selectedSize: 'Regular 8-inch',
        selectedAddOns: ['Cheese Burst Crust']
      },
      {
        id: 'c1',
        name: 'Zaika Saffron Pistachio Cappuccino',
        price: 249,
        quantity: 2,
        selectedSize: 'Regular (250ml)',
        selectedAddOns: []
      }
    ],
    summary: {
      subtotal: 976,
      discount: 100,
      deliveryFee: 0,
      gst: 43.8,
      packagingFee: 20,
      tip: 30,
      coinsUsed: 0,
      total: 969.8
    },
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    orderStatus: 'out_for_delivery', // 'received' | 'in_kitchen' | 'out_for_delivery' | 'delivered'
    estimatedTime: '8 mins',
    rider: {
      name: 'Rajesh Kumar',
      phone: '+91 98112 34567',
      rating: 4.9,
      vehicle: 'Hero Electric (HR-10-AB-4321)'
    }
  },
  {
    id: 'ZK-9081',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    customer: {
      name: 'Priya Verma',
      phone: '+91 98234 56789',
      tableNumber: 'Table 4 (Garden)',
      type: 'dinein'
    },
    items: [
      {
        id: 'cb1',
        name: 'Zaika Royal Cafe Trio Feast',
        price: 549,
        quantity: 1,
        selectedSize: null,
        selectedAddOns: []
      },
      {
        id: 'b2',
        name: 'Mango Passion Fruit Popping Boba',
        price: 259,
        quantity: 1,
        selectedSize: 'Regular (400ml)',
        selectedAddOns: []
      }
    ],
    summary: {
      subtotal: 808,
      discount: 50,
      deliveryFee: 0,
      gst: 37.9,
      packagingFee: 0,
      tip: 0,
      coinsUsed: 50,
      total: 745.9
    },
    paymentMethod: 'Table QR Pay',
    paymentStatus: 'Paid',
    orderStatus: 'delivered',
    estimatedTime: 'Delivered',
    rider: null
  },
  {
    id: 'ZK-9083',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    customer: {
      name: 'Devansh Malhotra',
      phone: '+91 99887 76655',
      address: 'Hostel 3, SRM University Campus, Sonepat',
      type: 'delivery'
    },
    items: [
      {
        id: 's1',
        name: 'Truffle & Peri Peri Crispy Fries',
        price: 199,
        quantity: 2,
        selectedSize: null,
        selectedAddOns: ['Melted Cheddar Cheese Sauce']
      },
      {
        id: 'w1',
        name: 'Crunchy Paneer Tikka Brioche Burger',
        price: 239,
        quantity: 1,
        selectedSize: null,
        selectedAddOns: []
      }
    ],
    summary: {
      subtotal: 686,
      discount: 100,
      deliveryFee: 49,
      gst: 31.7,
      packagingFee: 20,
      tip: 20,
      coinsUsed: 0,
      total: 706.7
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'in_kitchen',
    estimatedTime: '18 mins',
    rider: {
      name: 'Amit Singh',
      phone: '+91 97123 98765',
      rating: 4.8,
      vehicle: 'Honda Activa (HR-10-XY-9988)'
    }
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: 'RES-101',
    name: 'Kavita Sundaram',
    phone: '+91 98450 11223',
    guests: 4,
    date: '2026-08-25',
    time: '19:30',
    area: 'Rooftop Lounge',
    occasion: 'Birthday Celebration',
    status: 'Confirmed'
  },
  {
    id: 'RES-102',
    name: 'Rohan Gupta',
    phone: '+91 97110 55443',
    guests: 2,
    date: '2026-08-25',
    time: '20:00',
    area: 'Indoor AC Corner',
    occasion: 'Anniversary Date',
    status: 'Pending'
  }
];
