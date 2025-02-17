import React from 'react';

export default function Returns() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns Policy</h1>
      <div className="prose prose-blue max-w-none">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Return Window</h2>
        <p className="text-gray-600 mb-4">
          You have 30 days from the date of delivery to return your items. All returned items must be in their original condition with tags attached and in their original packaging.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Eligible Items</h2>
        <p className="text-gray-600 mb-4">
          Most items are eligible for return. However, the following items cannot be returned:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-600">
          <li>Personal care items</li>
          <li>Undergarments</li>
          <li>Customized products</li>
          <li>Digital downloads</li>
          <li>Gift cards</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Return Process</h2>
        <p className="text-gray-600 mb-4">
          To initiate a return:
        </p>
        <ol className="list-decimal pl-6 mb-4 text-gray-600">
          <li>Log into your account and go to your orders</li>
          <li>Select the item you wish to return</li>
          <li>Choose your return reason</li>
          <li>Print the return shipping label</li>
          <li>Package your item securely</li>
          <li>Drop off at any authorized shipping location</li>
        </ol>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Refunds</h2>
        <p className="text-gray-600 mb-4">
          Once we receive and inspect your return, we will notify you of the status of your refund. If approved, your refund will be processed to the original method of payment within 5-7 business days.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Return Shipping</h2>
        <p className="text-gray-600 mb-4">
          For standard returns, customers are responsible for return shipping costs. Free returns are available for defective items or incorrect shipments.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Exchanges</h2>
        <p className="text-gray-600 mb-4">
          We do not process direct exchanges. If you need a different size or color, please return your item for a refund and place a new order for the desired item.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Damaged Items</h2>
        <p className="text-gray-600 mb-4">
          If you receive a damaged item, please contact our customer service within 48 hours of delivery with photos of the damage.
        </p>
      </div>
    </div>
  );
}