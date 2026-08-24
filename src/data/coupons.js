export const PROMO_COUPONS = [
  {
    code: 'ZAIKA50',
    title: '50% OFF up to ₹100',
    description: 'Valid on orders above ₹199',
    minOrder: 199,
    discountType: 'percentage',
    discountValue: 50,
    maxDiscount: 100,
    tag: 'MOST POPULAR'
  },
  {
    code: 'WELCOME20',
    title: 'Flat 20% OFF',
    description: 'Welcome special on orders above ₹250',
    minOrder: 250,
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 150,
    tag: 'NEW USER'
  },
  {
    code: 'CAFEFREE',
    title: 'Free Express Delivery',
    description: 'Saves ₹49 delivery charges on orders above ₹299',
    minOrder: 299,
    discountType: 'free_delivery',
    discountValue: 49,
    maxDiscount: 49,
    tag: 'FREE DELIVERY'
  },
  {
    code: 'FESTIVE100',
    title: 'Flat ₹100 OFF',
    description: 'Celebration discount on orders above ₹499',
    minOrder: 499,
    discountType: 'flat',
    discountValue: 100,
    maxDiscount: 100,
    tag: 'BIG SAVINGS'
  }
];
