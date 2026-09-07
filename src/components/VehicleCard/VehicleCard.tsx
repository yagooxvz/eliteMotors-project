import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gauge, Calendar, Fuel, ArrowRight, Zap } from 'lucide-react'
import type { Vehicle } from '../../data/vehicles'
import { formatPrice, formatMileage } from '../../utils/formatters'

interface VehicleCardProps {
  vehicle: Vehicle
  variant?: 'default' | 'featured' | 'compact'
  index?: number
}

export function VehicleCard({ vehicle, variant = 'default', index = 0 }: VehicleCardProps) {
  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
        className="group"
      >
        <Link
          to={`/veiculos/${vehicle.id}`}
          className="block bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
            <motion.img
              src={vehicle.images[0]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
            {/* Category badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-600">
                {vehicle.category}
              </span>
            </div>
            {/* Price on hover */}
            <div className="absolute top-3 right-3 bg-gray-900 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-white text-xs font-medium">{formatPrice(vehicle.price)}</span>
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            <div className="mb-3">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                {vehicle.brand}
              </span>
              <h3 className="text-lg font-medium text-gray-900 leading-tight mt-0.5">
                {vehicle.model}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-gray-100 mb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-gray-400">
                  <Calendar size={11} />
                  <span className="text-[9px] uppercase tracking-wider">Ano</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{vehicle.year}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-gray-400">
                  <Gauge size={11} />
                  <span className="text-[9px] uppercase tracking-wider">KM</span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {formatMileage(vehicle.mileage)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-gray-400">
                  <Fuel size={11} />
                  <span className="text-[9px] uppercase tracking-wider">Câmbio</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{vehicle.transmission}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xl font-light text-gray-900">
                {formatPrice(vehicle.price)}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-gray-500 group-hover:text-gray-900 transition-colors group/arrow">
                Ver mais
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Default/compact variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="group"
    >
      <Link
        to={`/veiculos/${vehicle.id}`}
        className="block bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-400"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-2 py-1">
            <span className="text-[9px] font-semibold tracking-widest uppercase text-gray-500">
              {vehicle.category}
            </span>
          </div>
          {vehicle.fuel === 'Elétrico' || vehicle.fuel === 'Híbrido' ? (
            <div className="absolute top-2.5 right-2.5 bg-emerald-50 border border-emerald-200 px-2 py-1 flex items-center gap-1">
              <Zap size={9} className="text-emerald-500" />
              <span className="text-[9px] font-semibold tracking-wider uppercase text-emerald-600">
                {vehicle.fuel}
              </span>
            </div>
          ) : null}
        </div>

        {/* Info */}
        <div className="p-4">
          <span className="text-[9px] font-semibold tracking-widest uppercase text-gray-400">
            {vehicle.brand}
          </span>
          <h3 className="text-sm font-medium text-gray-900 mt-0.5 mb-3">
            {vehicle.model} · {vehicle.year}
          </h3>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span>{formatMileage(vehicle.mileage)}</span>
            <span className="w-px h-3 bg-gray-200" />
            <span>{vehicle.transmission}</span>
            <span className="w-px h-3 bg-gray-200" />
            <span>{vehicle.fuel}</span>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-base font-medium text-gray-900">
              {formatPrice(vehicle.price)}
            </span>
            <ArrowRight
              size={14}
              className="text-gray-300 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all duration-300"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
