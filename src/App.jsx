import { useState } from 'react'
import reactLogo from './assets/hero.JPG'
import viteLogo from './assets/hero.JPG'
import heroImg from './assets/hero.JPG'
import './App.css'

import { RouterProvider } from "react-router";
import router from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/common/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />

      </CartProvider>
    </AuthProvider>
    
  )
};

export default App

