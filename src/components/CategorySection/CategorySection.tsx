import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../../data/vehicles'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
}

export function CategorySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <span className="text-eyebrow block mb-3">Navegue por tipo</span>
            <h2 className="heading-lg text-gray-900">
              Categorias
              <br />
              <span className="text-gray-400 font-light">de Veículos</span>
            </h2>
          </div>
          <Link
            to="/veiculos"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors group"
          >
            Ver todos
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Categories grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={cardVariants}>
              <Link
                to={`/veiculos?categoria=${cat.id}`}
                className="group block relative overflow-hidden bg-gray-50 aspect-[3/4] hover:-translate-y-1 transition-transform duration-500"
              >
                {/* Image */}
                <div className="absolute inset-0 image-zoom">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium text-sm tracking-wide mb-0.5">
                    {cat.name}
                  </h3>
                  <p className="text-white/60 text-xs">
                    {cat.count} {cat.count === 1 ? 'veículo' : 'veículos'}
                  </p>
                </div>

                {/* Arrow on hover */}
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
                  <ArrowRight size={12} className="text-gray-900" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
