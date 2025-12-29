import { useState } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'

const Header = ({ darkMode, setDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              DOT APP
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#support" className="text-sm text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 transition-colors">
              Support
            </a>
            <a href="#contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-fuchsia-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-fuchsia-600 transition-colors">
              Login
            </button>

            <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-full hover:opacity-90 transition-opacity">
              Sign Up
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2">
              {darkMode ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
            <nav className="flex flex-col gap-4">
              <a href="#support" className="text-sm text-gray-600 dark:text-gray-300">Support</a>
              <a href="#contact" className="text-sm text-gray-600 dark:text-gray-300">Contact</a>
              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button className="flex-1 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-full">Login</button>
                <button className="flex-1 py-2 text-sm text-white bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-full">Sign Up</button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
