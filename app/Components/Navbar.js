"use client"

import { useState } from "react"
import { Menu, X, ChevronDown, LogOut } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </div>

        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">
            Option 1
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Option 2
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Option 3
          </a>
        </div>

        <div className="hidden md:flex items-center">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-white focus:outline-none"
            >
              <Image src="/logo.png" alt="User" width={32} height={32} className="rounded-full mr-2" />
              <span>User</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1">
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-600">
                  <LogOut className="inline mr-2 h-4 w-4" />
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-700">
            Option 1
          </a>
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-700">
            Option 2
          </a>
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-700">
            Option 3
          </a>
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-700">
            <LogOut className="inline mr-2 h-4 w-4" />
            Logout
          </a>
        </div>
      )}
    </nav>
  )
}

