import React from 'react';
import { CartItem } from '../types';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout
}) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <h2 className="text-lg font-bold text-gray-900 flex items-center uppercase">
              Cart ({cartItems.length})
            </h2>
            <button 
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-gray-50">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-white p-6 rounded-full border border-gray-100">
                    <ShoppingBag className="h-12 w-12 text-gray-300" />
                </div>
                <div>
                    <p className="text-gray-900 font-bold text-lg">Your cart is empty</p>
                    <p className="text-gray-500 text-sm mt-1">Start shopping to add items to your cart</p>
                </div>
                <button 
                    onClick={onClose} 
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors uppercase text-sm"
                >
                    Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-3 rounded border border-gray-200">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden flex items-center justify-center bg-white p-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-sm font-medium text-gray-900">
                        <h3 className="line-clamp-2 pr-4">{item.title}</h3>
                        <p className="ml-4 font-bold">AED {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm mt-2">
                      <div className="flex items-center border border-gray-300 rounded bg-white">
                        <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 px-2 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 font-medium text-gray-900 min-w-[1.5rem] text-center">{item.quantity}</span>
                         <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 px-2 hover:bg-gray-50 text-gray-600"
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="font-medium text-blue-600 hover:text-blue-800 flex items-center text-xs uppercase"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-6 bg-white">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal (Inc. VAT)</p>
                <p>AED {total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-xs text-gray-500 mb-6 bg-pink-50 p-2 border border-pink-100 rounded text-center">
                 Add AED 50.00 more for free shipping
              </p>
              <button
                onClick={onCheckout}
                className="flex w-full items-center justify-center rounded border border-transparent bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-blue-700 transition-all uppercase"
              >
                Checkout
              </button>
              <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;