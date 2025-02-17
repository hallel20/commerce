import { User, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import { useStore } from '../lib/store';
// import { redirect } from 'react-router-dom';

export default function Account() {
  const { user } = useStore() 
  
  const paymentMethods = [
    {
      id: '1',
      type: 'Visa',
      last4: '4242',
      expiry: '12/24',
    },
  ]

  if(!user) return
  // const user = {
  //   name: 'John Doe',
  //   email: 'john@example.com',
  //   phone: '+1 (555) 123-4567',
  //   address: '123 Main St, City, Country',
  

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {user.account?.firstName + " " + user.account?.lastName}
              </h2>
              <p className="text-gray-500">Member since March 2024</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>{user.account?.phone}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>{user.account?.address}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Payment Methods
              </h3>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {method.type} ending in {method.last4}
                        </p>
                        <p className="text-sm text-gray-500">
                          Expires {method.expiry}
                        </p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                ))}
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Add New Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}