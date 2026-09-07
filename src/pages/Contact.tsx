import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

export function Contact() {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-eyebrow block mb-3">Vamos conversar</span>
            <h1 className="heading-xl text-gray-900">
              Entre em
              <br />
              <span className="font-light text-gray-400">Contato</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-4"
            >
              <div className="space-y-8">
                {[
                  {
                    Icon: MapPin,
                    title: 'Endereço',
                    lines: ['Av. das Nações Unidas, 12345', 'São Paulo - SP, 04578-000'],
                  },
                  {
                    Icon: Phone,
                    title: 'Telefone',
                    lines: ['(11) 9999-9999', '(11) 9999-0000'],
                  },
                  {
                    Icon: Mail,
                    title: 'E-mail',
                    lines: ['contato@elitemotors.com.br', 'vendas@elitemotors.com.br'],
                  },
                  {
                    Icon: Clock,
                    title: 'Horário',
                    lines: ['Segunda a Sexta: 9h às 18h', 'Sábado: 9h às 16h'],
                  },
                ].map(({ Icon, title, lines }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 border border-gray-100 flex items-center justify-center">
                      <Icon size={16} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
                        {title}
                      </h3>
                      {lines.map(l => (
                        <p key={l} className="text-sm text-gray-700 leading-relaxed">{l}</p>
                      ))}
                    </div>
                  </div>
                ))}

                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-emerald-600 transition-colors w-fit"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <form className="space-y-5" onSubmit={e => { e.preventDefault() }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-eyebrow text-gray-400 block mb-2">Nome *</label>
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      required
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-eyebrow text-gray-400 block mb-2">Telefone *</label>
                    <input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-eyebrow text-gray-400 block mb-2">E-mail</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-eyebrow text-gray-400 block mb-2">Assunto</label>
                  <select className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-gray-900 transition-colors bg-white">
                    <option>Interesse em veículo</option>
                    <option>Avaliação do meu veículo</option>
                    <option>Financiamento</option>
                    <option>Agendamento de visita</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div>
                  <label className="text-eyebrow text-gray-400 block mb-2">Mensagem</label>
                  <textarea
                    rows={5}
                    placeholder="Como podemos ajudá-lo?"
                    className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-[#1a1a2e] transition-colors duration-300"
                >
                  Enviar Mensagem
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
