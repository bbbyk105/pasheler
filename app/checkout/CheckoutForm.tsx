
'use client';

import { useState } from 'react';
import { useCart } from '../../components/CartContext';
import { translations } from '../../lib/translations';
import { formatPrice, getShippingFee } from '../../lib/currency';
import { DeliveryMethod } from '../../lib/types';

interface CheckoutFormProps {
  onOrderComplete: (orderData: any) => void;
}

export default function CheckoutForm({ onOrderComplete }: CheckoutFormProps) {
  const { items, getTotalPrice, clearCart, language, currency } = useCart();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: language === 'ja' ? 'Japan' : 'United States',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getTotalPrice();
  const shippingFee = deliveryMethod === 'delivery' ? getShippingFee(currency) : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingFee + tax;

  const deliveryMethods: DeliveryMethod[] = [
    {
      id: 'delivery',
      name: language === 'ja' ? '宅配便' : 'Home Delivery',
      fee: getShippingFee(currency),
      description: language === 'ja' ? '配送料：' : 'Delivery Fee: '
    },
    {
      id: 'pickup',
      name: language === 'ja' ? '対面受け取り' : 'Pickup in Person',
      fee: 0,
      description: language === 'ja' ? '対面受け取り：無料' : 'Pickup in Person: Free'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderNumber = 'ORD-' + Date.now().toString().slice(-8);
    
    const orderData = {
      orderNumber,
      items: [...items],
      subtotal,
      shipping: shippingFee,
      tax,
      total,
      deliveryMethod,
      customerInfo: formData,
      currency,
      language
    };

    clearCart();
    onOrderComplete(orderData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <div className="bg-stone-50 p-6 rounded-lg">
        <h2 className="text-xl font-serif text-stone-800 mb-6">{t.checkout.contactInfo}</h2>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder={language === 'ja' ? 'メールアドレス' : 'Email address'}
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
          />
          <input
            type="tel"
            name="phone"
            placeholder={language === 'ja' ? '電話番号' : 'Phone number'}
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
          />
        </div>
      </div>

      {/* Delivery Method */}
      <div className="bg-stone-50 p-6 rounded-lg">
        <h2 className="text-xl font-serif text-stone-800 mb-6">{t.checkout.deliveryMethod}</h2>
        <div className="space-y-3">
          {deliveryMethods.map((method) => (
            <label key={method.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="deliveryMethod"
                value={method.id}
                checked={deliveryMethod === method.id}
                onChange={(e) => setDeliveryMethod(e.target.value as 'delivery' | 'pickup')}
                className="w-4 h-4 text-stone-800 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium text-stone-800">{method.name}</span>
                  <span className="text-stone-600">
                    {method.fee === 0 ? t.common.free : formatPrice(method.fee, currency)}
                  </span>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Pickup Information */}
        {deliveryMethod === 'pickup' && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-stone-800 mb-2">{t.checkout.pickupLocation}</h3>
            <div className="text-sm text-stone-600 whitespace-pre-line">
              {t.checkout.pickupDetails}
            </div>
          </div>
        )}
      </div>

      {/* Shipping Address - Only show for delivery */}
      {deliveryMethod === 'delivery' && (
        <div className="bg-stone-50 p-6 rounded-lg">
          <h2 className="text-xl font-serif text-stone-800 mb-6">{t.checkout.shippingAddress}</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder={language === 'ja' ? '名' : 'First name'}
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
              />
              <input
                type="text"
                name="lastName"
                placeholder={language === 'ja' ? '姓' : 'Last name'}
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder={language === 'ja' ? '住所' : 'Address'}
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder={language === 'ja' ? '市区町村' : 'City'}
                value={formData.city}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
              />
              <input
                type="text"
                name="state"
                placeholder={language === 'ja' ? '都道府県' : 'State'}
                value={formData.state}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zipCode"
                placeholder={language === 'ja' ? '郵便番号' : 'ZIP code'}
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="pr-8 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm cursor-pointer"
              >
                <option value="Japan">{language === 'ja' ? '日本' : 'Japan'}</option>
                <option value="United States">{language === 'ja' ? 'アメリカ合衆国' : 'United States'}</option>
                <option value="Canada">{language === 'ja' ? 'カナダ' : 'Canada'}</option>
                <option value="United Kingdom">{language === 'ja' ? 'イギリス' : 'United Kingdom'}</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Payment Information */}
      <div className="bg-stone-50 p-6 rounded-lg">
        <h2 className="text-xl font-serif text-stone-800 mb-6">{t.checkout.paymentInfo}</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="nameOnCard"
            placeholder={language === 'ja' ? 'カード名義人' : 'Name on card'}
            value={formData.nameOnCard}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
          />
          <input
            type="text"
            name="cardNumber"
            placeholder={language === 'ja' ? 'カード番号' : 'Card number'}
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
              className="px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleInputChange}
              required
              className="px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting 
          ? (language === 'ja' ? '処理中...' : 'Processing...') 
          : `${t.checkout.completeOrder} (${formatPrice(total, currency)})`
        }
      </button>
    </form>
  );
}
