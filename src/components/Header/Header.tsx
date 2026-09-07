import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { useScrollY } from '../../hooks/useScrollAnimation'
import { SearchPalette } from '../SearchPalette/SearchPalette'

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Estoque', href: '/veiculos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]

export function Header() {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isScrolled = scrollY > 60

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100"
        animate={{
          height: isScrolled ? '60px' : '80px',
          boxShadow: isScrolled
            ? '0 1px 20px rgba(0,0,0,0.08)'
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container-xl h-full flex items-center justify-between">
          {/* Nav esquerda */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-medium tracking-widest uppercase transition-colors duration-300 hover:text-gray-400 ${
                  location.pathname === link.href
                    ? 'text-gray-900'
                    : 'text-gray-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo centro */}
          <Link
            to="/"
            className="flex items-center justify-center flex-shrink-0"
          >
            <motion.div
              className="text-center"
              animate={{ scale: isScrolled ? 0.9 : 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="text-xl font-light tracking-[0.3em] text-gray-900 uppercase">
                Élite
              </span>
              <span className="text-xl font-semibold tracking-[0.3em] text-gray-900 uppercase">
                Motors
              </span>
              <div className="text-[9px] font-medium tracking-[0.4em] text-gray-400 uppercase mt-0.5">
                Concessionária Premium
              </div>
            </motion.div>
          </Link>

          {/* Nav direita */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-medium tracking-widest uppercase transition-colors duration-300 hover:text-gray-400 ${
                  location.pathname === link.href
                    ? 'text-gray-900'
                    : 'text-gray-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <SearchPalette />
            <Link
              to="/contato"
              className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border border-gray-900 text-gray-900 px-5 py-2.5 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <Phone size={12} />
              Fale Conosco
            </Link>
          </div>

          {/* Hamburger mobile + search */}
          <div className="md:hidden flex items-center gap-3">
            <SearchPalette />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-900 hover:text-gray-500 transition-colors"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-between px-5 h-20 border-b border-gray-100">
              <span className="text-xl font-light tracking-[0.3em] text-gray-900 uppercase">
                Élite<span className="font-semibold">Motors</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-gray-900"
                aria-label="Fechar menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <Link
                    to={link.href}
                    className="block py-5 text-4xl font-light tracking-tight text-gray-900 border-b border-gray-100 hover:text-gray-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-8 border-t border-gray-100">
              <Link
                to="/contato"
                className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase bg-gray-900 text-white w-full py-4 hover:bg-gray-700 transition-colors"
              >
                <Phone size={12} />
                Fale Conosco
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
