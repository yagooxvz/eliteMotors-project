import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Como funciona o processo de compra?',
    answer:
      'Nossa equipe realiza um atendimento personalizado para entender suas necessidades. Após escolher o veículo ideal, cuidamos de toda a documentação, transferência e opções de financiamento para você. O processo é simples, transparente e sem burocracia.',
  },
  {
    question: 'Os veículos possuem garantia?',
    answer:
      'Todos os nossos veículos passam por inspeção técnica completa de 150 pontos antes de integrarem nosso estoque. Oferecemos garantia de 6 a 12 meses, conforme o modelo. Trabalhamos apenas com veículos em excelente estado de conservação.',
  },
  {
    question: 'Posso fazer uma avaliação do meu veículo atual?',
    answer:
      'Sim! Realizamos avaliação gratuita do seu veículo. Você pode trazer seu carro ao nosso showroom ou solicitar uma avaliação online enviando fotos e informações. O valor de avaliação pode ser usado como entrada na compra de um novo veículo.',
  },
  {
    question: 'Vocês trabalham com financiamento?',
    answer:
      'Trabalhamos com os principais bancos do mercado, incluindo Santander, Bradesco, Itaú e BV Financeira. Conseguimos as melhores taxas e condições de pagamento adaptadas ao seu perfil. Aprovação em até 2 horas.',
  },
  {
    question: 'Posso agendar uma visita ao showroom?',
    answer:
      'Claro! Atendemos de segunda a sábado, das 9h às 18h. Você pode agendar sua visita pelo WhatsApp, telefone ou através do formulário de contato no site. Nosso showroom fica localizado na Av. das Nações Unidas, 12345, São Paulo - SP.',
  },
  {
    question: 'Vocês fazem envio para outros estados?',
    answer:
      'Sim, realizamos a entrega de veículos em todo o território nacional. Trabalhamos com transportadoras homologadas que garantem a integridade do veículo durante o transporte. Entre em contato para mais detalhes sobre custos e prazos de entrega.',
  },
]

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors leading-relaxed">
          {faq.question}
        </span>
        <span className="flex-shrink-0 mt-0.5">
          {isOpen ? (
            <Minus size={16} className="text-gray-400" />
          ) : (
            <Plus size={16} className="text-gray-400" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-6 text-sm leading-relaxed text-gray-500">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <span className="text-eyebrow block mb-4">FAQ</span>
            <h2 className="heading-md text-gray-900 mb-6">
              Respondemos
              <br />
              <span className="font-light text-gray-400">suas dúvidas</span>
            </h2>
            <p className="body-lg text-sm">
              Não encontrou o que precisava? Fale diretamente com nossos consultores via WhatsApp.
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-xs font-semibold tracking-widest uppercase bg-gray-900 text-white px-6 py-3.5 hover:bg-[#1a1a2e] transition-colors duration-300"
            >
              WhatsApp
            </a>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8"
          >
            <div className="border-t border-gray-100">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
