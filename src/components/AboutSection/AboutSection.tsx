import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-gray-50">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left decorative image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80"
                alt="Showroom Élite Motors"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative border */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-gray-200 hidden lg:block" />
            {/* Badge */}
            <div className="absolute bottom-6 right-6 bg-white px-5 py-4 shadow-md">
              <div className="text-2xl font-light text-gray-900">Est.</div>
              <div className="text-3xl font-semibold text-gray-900 leading-none">2012</div>
            </div>
          </motion.div>

          {/* Right text */}
          <div className="lg:col-span-7 lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-eyebrow block mb-4">Sobre a Élite Motors</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="heading-lg text-gray-900 mb-6"
            >
              Mais de uma{' '}
              <span className="font-light text-gray-400">
                década
                <br />
                de excelência
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="body-lg mb-4 max-w-lg"
            >
              Fundada em 2012, a Élite Motors nasceu com um único objetivo: oferecer ao mercado brasileiro os melhores veículos premium com uma experiência de compra à altura.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="body-lg mb-8 max-w-lg"
            >
              Nosso showroom oferece um ambiente exclusivo onde cada detalhe foi pensado para proporcionar uma experiência única. Da recepção à entrega das chaves, cuidamos de cada passo com atenção e dedicação.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.3 }}
            >
              <Link
                to="/sobre"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-all duration-300 group"
              >
                Conheça nossa história
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
