import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { vehicles } from '../../data/vehicles'
import { VehicleCard } from '../VehicleCard/VehicleCard'

const featured = vehicles.filter(v => v.isFeatured).slice(0, 4)

export function FeaturedVehicles() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-gray-50">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <span className="text-eyebrow block mb-3">Selecionados a dedo</span>
            <h2 className="heading-lg text-gray-900">
              Destaques
              <br />
              <span className="text-gray-400 font-light">da Semana</span>
            </h2>
          </div>
          <Link
            to="/veiculos"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors group"
          >
            Ver estoque completo
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid de veículos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((vehicle, i) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} variant="featured" index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center sm:hidden"
        >
          <Link
            to="/veiculos"
            className="inline-flex items-center gap-2 border border-gray-900 text-gray-900 px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Ver estoque completo
            <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
