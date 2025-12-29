const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              DOT APP
            </span>
          </a>

          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} DOT APP. All rights reserved.
          </p>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <a href="#support" className="text-sm text-gray-500 dark:text-gray-400 hover:text-fuchsia-600 transition-colors">
              Support
            </a>
            <a href="#privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-fuchsia-600 transition-colors">
              Privacy
            </a>
            <a href="#terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-fuchsia-600 transition-colors">
              Terms
            </a>
            <a href="#contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-fuchsia-600 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
