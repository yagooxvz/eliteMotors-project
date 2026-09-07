import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Check,
  MessageCircle,
} from 'lucide-react'
import { vehicles } from '../data/vehicles'
import { formatPrice, formatMileage } from '../utils/formatters'

export function VehicleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const vehicle = vehicles.find(v => v.id === id)

  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    if (!vehicle) navigate('/veiculos')
    window.scrollTo(0, 0)
    setActiveImage(0)
  }, [id])

  const nextImage = useCallback(() => {
    if (!vehicle) return
    setActiveImage(prev => (prev + 1) % vehicle.images.length)
  }, [vehicle])

  const prevImage = useCallback(() => {
    if (!vehicle) return
    setActiveImage(prev => (prev - 1 + vehicle.images.length) % vehicle.images.length)
  }, [vehicle])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
        if (e.key === 'Escape') setLightboxOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, nextImage, prevImage])

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxOpen])

  if (!vehicle) return null

  const stats = [
    { label: 'Quilometragem', value: formatMileage(vehicle.mileage), icon: Gauge },
    { label: 'Ano', value: String(vehicle.year), icon: Calendar },
    { label: 'Câmbio', value: vehicle.transmission, icon: Settings },
    { label: 'Combustível', value: vehicle.fuel, icon: Fuel },
  ]

  return (
    <main className="pt-20 bg-white">
      {/* Breadcrumb */}
      <div className="container-xl py-5 border-b border-gray-100">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-gray-700 transition-colors">Início</Link>
          <span>/</span>
          <Link to="/veiculos" className="hover:text-gray-700 transition-colors">Estoque</Link>
          <span>/</span>
          <span className="text-gray-700">{vehicle.brand} {vehicle.model}</span>
        </nav>
      </div>

      <div className="container-xl py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            {/* Main image */}
            <div
              className="relative aspect-[16/10] overflow-hidden bg-gray-50 cursor-zoom-in mb-3"
              onClick={() => setLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={vehicle.images[activeImage]}
                  alt={`${vehicle.brand} ${vehicle.model} - foto ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  loading={activeImage === 0 ? 'eager' : 'lazy'}
                />
              </AnimatePresence>

              {/* Navigation arrows */}
              {vehicle.images.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); prevImage() }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={18} className="text-gray-700" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); nextImage() }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight size={18} className="text-gray-700" />
                  </button>
                </>
              )}

              {/* Counter */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1">
                {activeImage + 1} / {vehicle.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {vehicle.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-all duration-200 ${
                    i === activeImage ? 'border-gray-900' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Ver foto ${i + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>

            {/* Stats — "Cada Número Verificado" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-10"
            >
              <div className="mb-5">
                <span className="text-eyebrow block">Transparência total</span>
                <h2 className="text-xl font-light text-gray-900 mt-1">
                  Cada número,{' '}
                  <span className="text-gray-400">verificado</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="bg-gray-50 p-5 border border-gray-100"
                  >
                    <Icon size={14} className="text-gray-400 mb-3" />
                    <div className="text-xl font-light text-gray-900 mb-0.5">{value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-400">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-4">Descrição</h3>
              <p className="text-sm leading-relaxed text-gray-600">{vehicle.description}</p>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-4">Equipamentos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={12} className="text-gray-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-4">Especificações</h3>
              <div className="border-t border-gray-100">
                {Object.entries(vehicle.specs).map(([key, value]) => {
                  const labels: Record<string, string> = {
                    engine: 'Motor',
                    power: 'Potência',
                    torque: 'Torque',
                    acceleration: 'Aceleração',
                    topSpeed: 'Velocidade máx.',
                    doors: 'Portas',
                    seats: 'Lugares',
                    trunkCapacity: 'Porta-malas',
                    weight: 'Peso',
                    color: 'Cor',
                  }
                  return (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-xs text-gray-400 uppercase tracking-wide">{labels[key] || key}</span>
                      <span className="text-sm font-medium text-gray-800">{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              {/* Vehicle info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-eyebrow text-gray-400 block mb-2">{vehicle.brand} · {vehicle.category}</span>
                <h1 className="heading-md text-gray-900 mb-2">{vehicle.model}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-6">
                  <span>{vehicle.year}</span>
                  <span>·</span>
                  <span>{formatMileage(vehicle.mileage)}</span>
                  <span>·</span>
                  <span>{vehicle.fuel}</span>
                </div>

                <div className="py-6 border-t border-b border-gray-100 mb-8">
                  <span className="text-eyebrow text-gray-400 block mb-1">Preço</span>
                  <span className="text-4xl font-light text-gray-900">{formatPrice(vehicle.price)}</span>
                </div>
              </motion.div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3 mb-8">
                <a
                  href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-4 text-xs font-semibold tracking-widest uppercase hover:bg-emerald-600 transition-colors duration-300"
                >
                  <MessageCircle size={14} />
                  Tenho Interesse — WhatsApp
                </a>
                <Link
                  to="/contato"
                  className="flex items-center justify-center gap-2 border border-gray-900 text-gray-900 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  Solicitar Informações
                </Link>
              </div>

              {/* Contact form */}
              <div className="border border-gray-100 p-6 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900 mb-1">Fale com um consultor</h3>
                <p className="text-xs text-gray-400 mb-5">Responderemos em até 2 horas úteis.</p>
                <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault() }}>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Seu telefone"
                    className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                  />
                  <textarea
                    placeholder="Mensagem (opcional)"
                    rows={3}
                    className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#1a1a2e] transition-colors duration-300"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-14 pt-8 border-t border-gray-100">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-medium tracking-wide text-gray-400 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Voltar ao estoque
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
              aria-label="Fechar lightbox"
            >
              <X size={24} />
            </button>

            <button
              onClick={e => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
              aria-label="Foto anterior"
            >
              <ArrowLeft size={24} />
            </button>

            <motion.img
              key={activeImage}
              src={vehicle.images[activeImage]}
              alt=""
              className="max-w-[90vw] max-h-[85vh] object-contain"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            />

            <button
              onClick={e => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
              aria-label="Próxima foto"
            >
              <ArrowRight size={24} />
            </button>

            <div className="absolute bottom-4 text-white/50 text-xs">
              {activeImage + 1} / {vehicle.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
