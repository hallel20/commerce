import React from 'react';

export default function Shipping() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
      <div className="prose prose-blue max-w-none">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Processing Time</h2>
        <p className="text-gray-600 mb-4">
          Orders are typically processed within 1-2 business days. During peak seasons or sales events, processing times may be slightly longer.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Shipping Methods</h2>
        <p className="text-gray-600 mb-4">
          We offer several shipping options:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-600">
          <li>Standard Shipping (5-7 business days)</li>
          <li>Express Shipping (2-3 business days)</li>
          <li>Next Day Delivery (order by 2 PM for next-day delivery)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Shipping Costs</h2>
        <p className="text-gray-600 mb-4">
          Shipping costs are calculated based on the weight of your order and your location. Free shipping is available for orders over $50 within the continental United States.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. International Shipping</h2>
        <p className="text-gray-600 mb-4">
          We ship to most countries worldwide. International shipping times vary by location and may take 7-21 business days. Additional customs fees may apply.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Order Tracking</h2>
        <p className="text-gray-600 mb-4">
          Once your order ships, you will receive a confirmation email with tracking information. You can also track your order through your account dashboard.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Lost or Damaged Packages</h2>
        <p className="text-gray-600 mb-4">
          We are not responsible for lost or damaged packages once they have been handed over to the shipping carrier. However, we will assist you in filing claims with the carrier if needed.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Address Changes</h2>
        <p className="text-gray-600 mb-4">
          If you need to change your shipping address after placing an order, please contact us immediately. We cannot guarantee address changes once the order has been processed.
        </p>
      </div>
    </div>
  );
}