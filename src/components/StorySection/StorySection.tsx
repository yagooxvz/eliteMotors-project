import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    alt: 'Cliente satisfeito com seu novo BMW',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80',
    alt: 'Família com novo veículo',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80',
    alt: 'Entrega de veículo premium',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80',
    alt: 'Showroom da concessionária',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    alt: 'Momento de entrega especial',
    span: 'col-span-2 row-span-1',
  },
]

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.12,
      ease: 'easeOut' as const,
    },
  }),
}

export function StorySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-white overflow-hidden">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="order-2 lg:order-1"
          >
            <span className="text-eyebrow block mb-5">Nossa Comunidade</span>
            <h2 className="heading-lg text-gray-900 mb-6">
              Quem Compra,{' '}
              <span className="font-light text-gray-400">
                Faz Parte
                <br />
                da Nossa
                <br />
                História
              </span>
            </h2>
            <p className="body-lg mb-8 max-w-md">
              Cada entrega é única. Cada cliente, especial. Ao longo dos anos, construímos mais do que uma concessionária — construímos relações duradouras com famílias, empresários e apaixonados por automóveis de todo o Brasil.
            </p>
            <div className="flex items-center gap-10 py-8 border-t border-gray-100">
              {[
                { num: '2.400+', label: 'Veículos entregues' },
                { num: '12', label: 'Anos de mercado' },
                { num: '98%', label: 'Clientes satisfeitos' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-light text-gray-900">{stat.num}</div>
                  <div className="text-xs text-gray-400 mt-1 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Gallery grid */}
          <div className="order-1 lg:order-2">
            {/* Desktop asymmetric grid */}
            <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-3 h-[520px]">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className={`${img.span} overflow-hidden cursor-pointer group`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="md:hidden flex gap-3 overflow-x-auto scrollbar-hide pb-4 -mx-5 px-5">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="flex-shrink-0 w-60 h-44 overflow-hidden"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
