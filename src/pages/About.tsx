import { motion } from 'framer-motion'

const timeline = [
  { year: '2012', title: 'Fundação', desc: 'Abrimos as portas com uma seleção exclusiva de veículos premium em São Paulo.' },
  { year: '2015', title: 'Expansão', desc: 'Nos tornamos referência no segmento com mais de 500 veículos entregues.' },
  { year: '2018', title: 'Novo Showroom', desc: 'Inauguramos nosso showroom de 2.000m² com experiência de compra única.' },
  { year: '2021', title: 'Digital', desc: 'Lançamos nossa plataforma digital para facilitar a busca e compra de veículos.' },
  { year: '2024', title: 'Hoje', desc: 'Mais de 2.400 clientes satisfeitos e consolidados como a principal concessionária premium do Brasil.' },
]

export function About() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-eyebrow block mb-4">Nossa história</span>
            <h1 className="heading-xl text-gray-900 mb-6">
              Sobre a
              <br />
              <span className="font-light text-gray-400">Élite Motors</span>
            </h1>
            <p className="body-lg">
              Uma jornada de mais de uma década dedicada a oferecer os melhores veículos premium com um atendimento que vai além do esperado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full-width image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=80"
          alt="Showroom Élite Motors"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-eyebrow block mb-4">Nossa missão</span>
              <h2 className="heading-md text-gray-900 mb-6">
                Conectar pessoas aos{' '}
                <span className="font-light text-gray-400">veículos dos seus sonhos</span>
              </h2>
              <p className="body-lg mb-4">
                Na Élite Motors, acreditamos que a compra de um veículo é muito mais do que uma transação comercial. É a realização de um sonho, a conquista de um objetivo, o início de novas aventuras.
              </p>
              <p className="body-lg">
                Por isso, tratamos cada cliente com atenção individualizada, garantindo que cada detalhe seja perfeito — do primeiro contato à entrega das chaves.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '2.400+', label: 'Veículos entregues' },
                { num: '12', label: 'Anos de experiência' },
                { num: '98%', label: 'Satisfação dos clientes' },
                { num: '150+', label: 'Marcas no estoque' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-gray-50 p-6"
                >
                  <div className="text-3xl font-light text-gray-900 mb-1">{stat.num}</div>
                  <div className="text-xs text-gray-400 tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="historia" className="py-24 bg-gray-50">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <span className="text-eyebrow block mb-3">Linha do tempo</span>
            <h2 className="heading-md text-gray-900">
              Nossa trajetória
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`flex gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="md:w-1/2 md:px-10">
                    <div className={`bg-white border border-gray-100 p-6 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      <span className="text-eyebrow text-gray-300 block mb-2">{item.year}</span>
                      <h3 className="text-base font-medium text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="hidden md:flex w-0 items-start justify-center pt-6">
                    <div className="w-3 h-3 bg-gray-900 rounded-full ring-4 ring-white -translate-x-1.5" />
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
