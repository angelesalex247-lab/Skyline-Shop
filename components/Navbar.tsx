import React from 'react';
import { ShoppingCart, Search, Menu, User, PlusCircle } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onSellClick: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  userEmail: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onCartClick, 
  onHomeClick, 
  onSellClick,
  searchTerm, 
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  userEmail
}) => {
  return (
    <div className="sticky top-0 z-40 w-full flex flex-col">
      {/* Main Header - Pink */}
      <nav className="w-full bg-[#ff3399] py-3 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 gap-4">
            
            {/* Logo */}
            <div className="flex items-center cursor-pointer shrink-0" onClick={onHomeClick}>
              <span className="font-black text-2xl tracking-tighter text-white uppercase italic">SKYLINE</span>
            </div>

            {/* Search Bar - Wide and Prominent */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4 relative">
              <input
                type="text"
                className="block w-full pl-4 pr-10 py-2 rounded-md border-0 focus:ring-0 text-sm font-medium"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4 md:space-x-6 text-white font-semibold text-sm">
              <div className="hidden md:flex items-center cursor-pointer hover:opacity-80 group relative">
                <span className="mr-1">العربية</span>
                <span className="border-l border-white/40 h-3 mx-2"></span>
                <div className="flex items-center">
                    <User className="h-5 w-5 mr-1" />
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] font-normal">Hello, PrincTariq</span>
                        <span className="text-xs font-bold max-w-[100px] truncate">{userEmail}</span>
                    </div>
                </div>
              </div>

               {/* Mobile User Icon */}
               <div className="md:hidden flex items-center">
                  <User className="h-6 w-6" />
               </div>

              {/* Sell Button */}
              <div 
                onClick={onSellClick}
                className="flex items-center cursor-pointer hover:bg-black/10 px-2 py-1 rounded transition-colors"
              >
                <PlusCircle className="h-5 w-5 md:mr-1" />
                <span className="font-bold hidden md:inline">Sell</span>
              </div>

              <div className="hidden md:flex items-center cursor-pointer hover:opacity-80">
                <span className="border-l border-white/40 h-6 mx-2"></span>
                <span className="font-bold">Cart</span>
                <button 
                    onClick={onCartClick}
                    className="relative ml-2 p-1"
                >
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-[#ff3399] bg-white rounded-full">
                        {cartCount}
                    </span>
                    )}
                </button>
              </div>

              {/* Mobile Cart Icon */}
              <button 
                onClick={onCartClick}
                className="md:hidden relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-[#ff3399] bg-white rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pt-3 pb-1">
           <input
              type="text"
              className="block w-full px-4 py-2 rounded-md border-0 text-sm"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </nav>

      {/* Sub-Header Categories */}
      <div className="bg-white border-b border-gray-200 hidden md:block">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-6 overflow-x-auto py-2 scrollbar-hide">
                  <div className="flex items-center text-blue-600 font-bold text-xs uppercase cursor-pointer hover:underline whitespace-nowrap">
                      ALL CATEGORIES
                      <Menu className="h-3 w-3 ml-1" />
                  </div>
                  <div className="h-4 border-l border-gray-300"></div>
                  {CATEGORIES.map(cat => (
                      <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`text-xs font-bold uppercase whitespace-nowrap hover:text-blue-600 transition-colors ${
                              activeCategory === cat ? 'text-blue-600' : 'text-gray-600'
                          }`}
                      >
                          {cat}
                      </button>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default Navbar;