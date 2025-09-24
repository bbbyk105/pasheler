'use client';

import Link from 'next/link';
import { useCart } from '../../components/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CartContent() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-stone-100 rounded-full mx-auto mb-6">
              <i className="ri-shopping-bag-line text-2xl text-stone-600"></i>
            </div>
            <h1 className="text-3xl font-serif text-stone-800 mb-4">Your cart is empty</h1>
            <p className="text-stone-600 mb-8">Discover our bestselling products and add them to your cart.</p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              CONTINUE SHOPPING
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-serif text-stone-800">Shopping Cart</h1>
            <button
              onClick={clearCart}
              className="text-sm text-stone-600 hover:text-stone-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 p-6 bg-stone-50 rounded-lg">
                    <div className="w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium text-stone-800">{item.name}</h3>
                      <p className="text-stone-600">{item.price}</p>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-stone-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                          >
                            <i className="ri-subtract-line text-sm"></i>
                          </button>
                          <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                          >
                            <i className="ri-add-line text-sm"></i>
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium text-stone-800">
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-stone-50 p-6 rounded-lg sticky top-24">
                <h2 className="text-xl font-serif text-stone-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Subtotal</span>
                    <span className="text-stone-800">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Shipping</span>
                    <span className="text-stone-800">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Tax</span>
                    <span className="text-stone-800">${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-stone-200 pt-4">
                    <div className="flex justify-between font-medium">
                      <span className="text-stone-800">Total</span>
                      <span className="text-stone-800">${(totalPrice * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="block w-full py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer text-center"
                >
                  PROCEED TO CHECKOUT
                </Link>
                
                <Link 
                  href="/"
                  className="block w-full py-3 text-center border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}