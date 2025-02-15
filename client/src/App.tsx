import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { Orders } from './pages/Orders';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Account } from './pages/Account';
import { Invoice } from './pages/Invoice';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Shipping } from './pages/Shipping';
import { Returns } from './pages/Returns';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId/invoice" element={<Invoice />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="account" element={<Account />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="returns" element={<Returns />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App