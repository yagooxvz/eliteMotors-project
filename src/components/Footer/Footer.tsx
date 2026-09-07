import { Link } from 'react-router-dom'
import { Share2, Globe, Play, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0D0D12] text-white">
      {/* CTA banner */}
      <div className="border-b border-white/5">
        <div className="container-xl py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <span className="text-eyebrow text-white/40 block mb-3">Encontre o seu</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
                O veículo dos seus sonhos
                <br />
                <span className="text-white/40">está aqui</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/veiculos"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-7 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-gray-100 transition-colors duration-300 group"
              >
                Ver Estoque
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-4 text-xs font-semibold tracking-widest uppercase hover:border-white/60 transition-colors duration-300"
              >
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-xl py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <div className="text-xl font-light tracking-[0.3em] uppercase text-white">
                Élite
                <span className="font-semibold">Motors</span>
              </div>
              <div className="text-[9px] font-medium tracking-[0.4em] text-white/30 uppercase mt-1">
                Concessionária Premium
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              Mais de uma década entregando excelência, qualidade e satisfação para cada cliente.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Share2, href: '#', label: 'Instagram' },
                { Icon: Globe, href: '#', label: 'Facebook' },
                { Icon: Play, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links institucional */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-6">
              Institucional
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Sobre Nós', href: '/sobre' },
                { label: 'Nossa História', href: '/sobre#historia' },
                { label: 'Equipe', href: '/sobre#equipe' },
                { label: 'Trabalhe Conosco', href: '/contato' },
                { label: 'Contato', href: '/contato' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links veículos */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-6">
              Veículos
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Todos os Veículos', href: '/veiculos' },
                { label: 'SUVs', href: '/veiculos?categoria=suv' },
                { label: 'Esportivos', href: '/veiculos?categoria=esportivo' },
                { label: 'Sedans', href: '/veiculos?categoria=sedan' },
                { label: 'Picapes', href: '/veiculos?categoria=picape' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-6">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-white/30 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/40 leading-relaxed">
                  Av. das Nações Unidas, 12345
                  <br />
                  São Paulo - SP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-white/30 flex-shrink-0" />
                <a
                  href="tel:+551199999999"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  (11) 9999-9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-white/30 flex-shrink-0" />
                <a
                  href="mailto:contato@elitemotors.com.br"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  contato@elitemotors.com.br
                </a>
              </li>
            </ul>

            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-emerald-500/20 transition-colors duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-xl py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {year} Élite Motors. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Política de Privacidade', href: '#' },
              { label: 'Termos de Uso', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
