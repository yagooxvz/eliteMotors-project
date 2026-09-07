import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Gauge, Calendar, Fuel } from 'lucide-react'
import { vehicles } from '../../data/vehicles'
import { formatPrice, formatMileage } from '../../utils/formatters'

const heroVehicle = vehicles.find(v => v.isFeatured) || vehicles[0]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.0, ease: 'easeOut' as const, delay: 0.3 },
  },
}

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 bg-white overflow-hidden">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh] py-16">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:gap-8"
          >
            <motion.div variants={itemVariants}>
              <span className="text-eyebrow">Destaque da Semana</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="heading-xl text-gray-900"
            >
              {heroVehicle.brand}
              <br />
              <span className="font-medium">{heroVehicle.model}</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="body-lg max-w-md">
              {heroVehicle.description.slice(0, 140)}...
            </motion.p>

            {/* Quick specs */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100"
            >
              <div>
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <Calendar size={13} />
                  <span className="text-eyebrow text-gray-400">Ano</span>
                </div>
                <span className="text-lg font-medium text-gray-900">
                  {heroVehicle.year}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <Gauge size={13} />
                  <span className="text-eyebrow text-gray-400">KM</span>
                </div>
                <span className="text-lg font-medium text-gray-900">
                  {formatMileage(heroVehicle.mileage)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <Fuel size={13} />
                  <span className="text-eyebrow text-gray-400">Câmbio</span>
                </div>
                <span className="text-lg font-medium text-gray-900">
                  {heroVehicle.transmission}
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="text-eyebrow text-gray-400 mb-1">Preço</div>
              <div className="text-3xl font-light text-gray-900 mb-6">
                {formatPrice(heroVehicle.price)}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/veiculos/${heroVehicle.id}`}
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-[#1a1a2e] transition-all duration-300 group"
                >
                  Ver Detalhes
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Link>
                <Link
                  to="/veiculos"
                  className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-7 py-4 text-xs font-semibold tracking-widest uppercase hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                >
                  Ver Estoque
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Vehicle image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden bg-gray-50">
              <motion.img
                src={heroVehicle.images[0]}
                alt={`${heroVehicle.brand} ${heroVehicle.model}`}
                className="w-full h-full object-cover"
                loading="eager"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              />
              {/* Label badge */}
              <div className="absolute top-4 left-4 bg-white px-3 py-1.5">
                <span className="text-eyebrow text-gray-500">{heroVehicle.category}</span>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gray-100 -z-10 hidden lg:block" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-gray-300"
        >
          <div className="w-px h-8 bg-gray-200" />
          <span className="text-eyebrow text-gray-300">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
