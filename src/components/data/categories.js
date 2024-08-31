import { BoxerShorts, denimjeans } from "../Images/Images";

// src/data/categories.js
export const categories = [
  {
    name: 'DENIM JEANS',
    products: [
      { name: 'Slim Fit Jeans', image: denimjeans, price: '₹999', mrp: '₹1299' },
      { name: 'Straight Leg Jeans', image: denimjeans, price: '₹1199', mrp: '₹1499' },
      // Add more products
    ]
  },
  {
    name: 'Boxer Shorts',
    products: [
      { name: 'Cotton Boxer', image: BoxerShorts, price: '₹399', mrp: '₹499' },
      { name: 'Silk Boxer', image: BoxerShorts, price: '₹699', mrp: '₹899' },
      // Add more products
    ]
  },
  // Add other categories similarly
];
