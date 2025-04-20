import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, placeOrder } from "../api";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "Cash on Delivery"
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const res = await getCart(currentUser.token);
        setCartItems(res.data);
        const totalAmt = res.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalAmt);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser) fetchCart();
  }, [currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all the required fields");
      return;
    }

    try {
      setIsLoading(true);
      const orderData = {
        items: cartItems,
        ...form,
        totalPrice: total
      };
      await placeOrder(currentUser.token, orderData);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order failed:", err);
      alert("Something went wrong while placing the order.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to view your cart and place orders.</p>
          <button 
            onClick={() => navigate("/signin")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="text-2xl font-bold text-orange-500">Foodell</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-orange-500">Home</a>
            <a href="/dishes" className="text-gray-700 hover:text-orange-500">Dishes</a>
            <a href="/orders" className="text-gray-700 hover:text-orange-500">Orders</a>
            <a href="/contact" className="text-gray-700 hover:text-orange-500">Contact</a>
          </div>
          <div>
            <button 
              onClick={() => navigate("/signin")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-200"
            >
              Sign in
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Complete Your Order</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              {isLoading && cartItems.length === 0 ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <>
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your complete address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Online Payment">Online Payment</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || cartItems.length === 0}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${
                    isLoading || cartItems.length === 0 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-orange-500">Foodell</span>
              <p className="text-gray-500 text-sm mt-1">Delicious food delivered to your doorstep</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-orange-500">Terms</a>
              <a href="#" className="text-gray-500 hover:text-orange-500">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-orange-500">Contact</a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-6">
            © {new Date().getFullYear()} Foodell. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderPage;