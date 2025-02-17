import React from 'react';
import { useParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';

export default function Invoice() {
  const { orderId } = useParams();

  // Mock order data - replace with actual data fetch
  const order = {
    id: orderId,
    date: new Date('2024-03-10'),
    items: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        quantity: 1,
      },
    ],
    total: 299.99,
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St, City, Country',
    },
  };

  const downloadInvoice = () => {
    const doc = new jsPDF();
    
    // Add company logo/header
    doc.setFontSize(20);
    doc.text('Modern Shop', 20, 20);
    
    // Add invoice details
    doc.setFontSize(12);
    doc.text(`Invoice #${order.id}`, 20, 40);
    doc.text(`Date: ${format(order.date, 'MMMM d, yyyy')}`, 20, 50);
    
    // Add customer details
    doc.text('Bill To:', 20, 70);
    doc.text(order.customer.name, 20, 80);
    doc.text(order.customer.email, 20, 90);
    doc.text(order.customer.address, 20, 100);
    
    // Add items
    doc.text('Items:', 20, 120);
    let y = 130;
    order.items.forEach((item) => {
      doc.text(`${item.name} x ${item.quantity}`, 20, y);
      doc.text(`$${item.price.toFixed(2)}`, 150, y);
      y += 10;
    });
    
    // Add total
    doc.text(`Total: $${order.total.toFixed(2)}`, 150, y + 20);
    
    // Save the PDF
    doc.save(`invoice-${order.id}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Invoice #{orderId}</h1>
        <button
          onClick={downloadInvoice}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Download className="h-5 w-5 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Invoice To:
              </h2>
              <p className="text-gray-600">{order.customer.name}</p>
              <p className="text-gray-600">{order.customer.email}</p>
              <p className="text-gray-600">{order.customer.address}</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Invoice Details:
              </h2>
              <p className="text-gray-600">
                Date: {format(order.date, 'MMMM d, yyyy')}
              </p>
              <p className="text-gray-600">Invoice #{orderId}</p>
            </div>
          </div>

          <div className="mt-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">
                    Total:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-8 border-t pt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Payment Information
            </h2>
            <p className="text-gray-600">
              Please include the invoice number with your payment.
            </p>
            <p className="text-gray-600">
              All payments should be made within 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}