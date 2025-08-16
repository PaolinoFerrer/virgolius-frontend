import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { BarChart3, Search, User, Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black text-lime-400 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8" />
          <span className="text-2xl font-bold font-mono">IOSOAI.COM</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#classifiche" className="hover:text-white transition-colors">
            Classifiche
          </a>
          <a href="#cerca-piatti" className="hover:text-white transition-colors">
            Cerca Piatti
          </a>
          <a href="#foodblogger" className="hover:text-white transition-colors">
            FoodBlogger
          </a>
          <a href="#info" className="hover:text-white transition-colors">
            Info
          </a>
        </nav>

        {/* Search and User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-lime-400 hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-lime-400 hover:text-white">
            <User className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-lime-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
          <nav className="flex flex-col space-y-4 mt-4">
            <a href="#classifiche" className="hover:text-white transition-colors">
              Classifiche
            </a>
            <a href="#cerca-piatti" className="hover:text-white transition-colors">
              Cerca Piatti
            </a>
            <a href="#foodblogger" className="hover:text-white transition-colors">
              FoodBlogger
            </a>
            <a href="#info" className="hover:text-white transition-colors">
              Info
            </a>
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
              <Button variant="ghost" size="sm" className="text-lime-400 hover:text-white">
                <Search className="h-5 w-5 mr-2" />
                Cerca
              </Button>
              <Button variant="ghost" size="sm" className="text-lime-400 hover:text-white">
                <User className="h-5 w-5 mr-2" />
                Accedi
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

