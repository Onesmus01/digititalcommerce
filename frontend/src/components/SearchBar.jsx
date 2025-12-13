import React from 'react'
import { Search, User, ShoppingCart } from 'lucide-react';

const SearchBar = () => {
  return (
       <div className="flex-1 mx-4 flex justify-center">
          <div className="relative hidden md:inline-flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search Product here..."
              className="w-full pr-14 pl-4 py-2 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-blue-600 focus-within:shadow-md rounded-r-full hover:bg-blue-700 transition-colors">
              <Search size={20} className="text-white" />
            </button>
          </div>
        </div>
  )
}

export default SearchBar
