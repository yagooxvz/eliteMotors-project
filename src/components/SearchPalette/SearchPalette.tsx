import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowRight,
  Calendar,
  Gauge,
  ChevronDown,
  ChevronUp,
  Check,
} from 'lucide-react'
import { vehicles } from '../../data/vehicles'
import { formatPrice, formatMileage } from '../../utils/formatters'
import type { Vehicle } from '../../data/vehicles'

/* ─────────────────────────── Types ─────────────────────────── */

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc' | 'mileage-asc'

interface Filters {
  sort: SortOption
  yearMin: number | ''
  yearMax: number | ''
  priceMin: number | ''
  priceMax: number | ''
  category: string
  transmission: string
  fuel: string
  mileageMax: number | ''
}

const defaultFilters: Filters = {
  sort: 'relevance',
  yearMin: '',
  yearMax: '',
  priceMin: '',
  priceMax: '',
  category: '',
  transmission: '',
  fuel: '',
  mileageMax: '',
}

const sortLabels: Record<SortOption, string> = {
  relevance: 'Relevância',
  'price-asc': 'Menor Preço',
  'price-desc': 'Maior Preço',
  'year-desc': 'Mais Novos',
  'year-asc': 'Mais Antigos',
  'mileage-asc': 'Menor KM',
}

const allYears = [...new Set(vehicles.map(v => v.year))].sort((a, b) => a - b)
const allCategories = [...new Set(vehicles.map(v => v.category))].sort()
const allTransmissions = [...new Set(vehicles.map(v => v.transmission))].sort()
const allFuels = [...new Set(vehicles.map(v => v.fuel))].sort()

/* ─────────────────────────── Helpers ─────────────────────────── */

function applyFilters(query: string, filters: Filters): Vehicle[] {
  let result = vehicles.filter(v => {
    const q = query.toLowerCase()
    const matchesQuery =
      !q ||
      v.brand.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      String(v.year).includes(q)

    const matchesCategory = !filters.category || v.category === filters.category
    const matchesTransmission = !filters.transmission || v.transmission === filters.transmission
    const matchesFuel = !filters.fuel || v.fuel === filters.fuel
    const matchesYearMin = !filters.yearMin || v.year >= Number(filters.yearMin)
    const matchesYearMax = !filters.yearMax || v.year <= Number(filters.yearMax)
    const matchesPriceMin = !filters.priceMin || v.price >= Number(filters.priceMin)
    const matchesPriceMax = !filters.priceMax || v.price <= Number(filters.priceMax)
    const matchesMileage = !filters.mileageMax || v.mileage <= Number(filters.mileageMax)

    return (
      matchesQuery &&
      matchesCategory &&
      matchesTransmission &&
      matchesFuel &&
      matchesYearMin &&
      matchesYearMax &&
      matchesPriceMin &&
      matchesPriceMax &&
      matchesMileage
    )
  })

  switch (filters.sort) {
    case 'price-asc': result.sort((a, b) => a.price - b.price); break
    case 'price-desc': result.sort((a, b) => b.price - a.price); break
    case 'year-desc': result.sort((a, b) => b.year - a.year); break
    case 'year-asc': result.sort((a, b) => a.year - b.year); break
    case 'mileage-asc': result.sort((a, b) => a.mileage - b.mileage); break
  }

  return result
}

function hasActiveFilters(f: Filters) {
  return (
    f.sort !== 'relevance' ||
    f.yearMin !== '' || f.yearMax !== '' ||
    f.priceMin !== '' || f.priceMax !== '' ||
    f.category !== '' || f.transmission !== '' ||
    f.fuel !== '' || f.mileageMax !== ''
  )
}

/* ─────────────────────────── Sub-components ─────────────────────────── */

function FilterPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  onReset: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden border-t border-gray-100"
    >
      <div className="px-4 py-4 space-y-4">
        {/* Sort */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Ordenar por
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(sortLabels) as SortOption[]).map(s => (
              <button
                key={s}
                onClick={() => onChange({ sort: s })}
                className={`text-xs px-3 py-1.5 border transition-all duration-200 ${
                  filters.sort === s
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {sortLabels[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Category */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              Categoria
            </p>
            <select
              value={filters.category}
              onChange={e => onChange({ category: e.target.value })}
              className="w-full text-xs border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="">Todas</option>
              {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Transmission */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              Câmbio
            </p>
            <select
              value={filters.transmission}
              onChange={e => onChange({ transmission: e.target.value })}
              className="w-full text-xs border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="">Todos</option>
              {allTransmissions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Fuel */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              Combustível
            </p>
            <select
              value={filters.fuel}
              onChange={e => onChange({ fuel: e.target.value })}
              className="w-full text-xs border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="">Todos</option>
              {allFuels.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          {/* Max mileage */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              KM máximo
            </p>
            <select
              value={filters.mileageMax}
              onChange={e => onChange({ mileageMax: e.target.value === '' ? '' : Number(e.target.value) })}
              className="w-full text-xs border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="">Sem limite</option>
              <option value="10000">Até 10.000 km</option>
              <option value="30000">Até 30.000 km</option>
              <option value="60000">Até 60.000 km</option>
              <option value="100000">Até 100.000 km</option>
            </select>
          </div>
        </div>

        {/* Year range */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
            Ano (de — até)
          </p>
          <div className="flex items-center gap-2">
            <select
              value={filters.yearMin}
              onChange={e => onChange({ yearMin: e.target.value === '' ? '' : Number(e.target.value) })}
              className="flex-1 text-xs border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="">Mínimo</option>
              {allYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <span className="text-gray-300 text-xs">–</span>
            <select
              value={filters.yearMax}
              onChange={e => onChange({ yearMax: e.target.value === '' ? '' : Number(e.target.value) })}
              className="flex-1 text-xs border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="">Máximo</option>
              {[...allYears].reverse().map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* Price range */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
            Preço (de — até)
          </p>
          <div className="flex items-center gap-2">
            <select
              value={filters.priceMin}
              onChange={e => onChange({ priceMin: e.target.value === '' ? '' : Number(e.target.value) })}
              className="flex-1 text-xs border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="">Mínimo</option>
              <option value="100000">R$ 100.000</option>
              <option value="200000">R$ 200.000</option>
              <option value="400000">R$ 400.000</option>
              <option value="600000">R$ 600.000</option>
              <option value="1000000">R$ 1.000.000</option>
            </select>
            <span className="text-gray-300 text-xs">–</span>
            <select
              value={filters.priceMax}
              onChange={e => onChange({ priceMax: e.target.value === '' ? '' : Number(e.target.value) })}
              className="flex-1 text-xs border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="">Máximo</option>
              <option value="200000">R$ 200.000</option>
              <option value="400000">R$ 400.000</option>
              <option value="600000">R$ 600.000</option>
              <option value="1000000">R$ 1.000.000</option>
              <option value="3000000">R$ 3.000.000</option>
            </select>
          </div>
        </div>

        {/* Reset */}
        {hasActiveFilters(filters) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-1"
          >
            <button
              onClick={onReset}
              className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors border-b border-gray-200 pb-0.5"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function ResultItem({
  vehicle,
  isActive,
  onSelect,
  onHover,
}: {
  vehicle: Vehicle
  isActive: boolean
  onSelect: () => void
  onHover: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isActive) ref.current?.scrollIntoView({ block: 'nearest' })
  }, [isActive])

  return (
    <motion.button
      ref={ref}
      layout
      layoutId={`result-${vehicle.id}`}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 ${
        isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
      }`}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-14 h-10 overflow-hidden bg-gray-100">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-400">
            {vehicle.brand}
          </span>
          <span className="text-gray-200">·</span>
          <span className="text-[9px] font-medium text-gray-300 uppercase tracking-wider">
            {vehicle.category}
          </span>
        </div>
        <p className="text-sm font-medium text-gray-900 truncate">{vehicle.model}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <Calendar size={9} /> {vehicle.year}
          </span>
          <span className="text-gray-200">·</span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <Gauge size={9} /> {formatMileage(vehicle.mileage)}
          </span>
        </div>
      </div>

      {/* Price + arrow */}
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-medium text-gray-900">{formatPrice(vehicle.price)}</p>
        <ArrowRight
          size={12}
          className={`ml-auto mt-1 transition-all duration-200 ${
            isActive ? 'translate-x-0.5 text-gray-700' : 'text-gray-300'
          }`}
        />
      </div>
    </motion.button>
  )
}

/* ─────────────────────────── Main Component ─────────────────────────── */

export function SearchPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [showFilters, setShowFilters] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const results = applyFilters(query, filters)
  const hasResults = results.length > 0
  const isActive = hasActiveFilters(filters)

  // Open / close
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setFilters(defaultFilters)
    setShowFilters(false)
    setActiveIndex(0)
  }, [])

  // Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        isOpen ? close() : open()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, open, close])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Keyboard navigation in results
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex(i => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex(i => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        navigate(`/veiculos/${results[activeIndex].id}`)
        close()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, results, activeIndex, navigate, close])

  // Reset active index on query/filter change
  useEffect(() => setActiveIndex(0), [query, filters])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const patchFilter = (patch: Partial<Filters>) =>
    setFilters(prev => ({ ...prev, ...patch }))

  const handleSelect = (vehicle: Vehicle) => {
    navigate(`/veiculos/${vehicle.id}`)
    close()
  }

  const showPanel = query.length > 0 || isActive || showFilters

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={open}
        aria-label="Abrir pesquisa (Ctrl+K)"
        className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors duration-200 group"
      >
        <Search size={16} />
        <span className="hidden lg:block text-xs text-gray-300 border border-gray-200 rounded px-1.5 py-0.5 font-mono group-hover:border-gray-400 transition-colors">
          ⌘K
        </span>
      </button>

      {/* Palette overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[200] bg-black/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={close}
            />

            {/* Palette modal */}
            <motion.div
              className="fixed z-[201] top-[12vh] left-1/2 w-full max-w-xl -translate-x-1/2 shadow-xl bg-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ willChange: 'transform, opacity' }}
            >
              <LayoutGroup>
                {/* Search input bar */}
                <motion.div layout className="flex items-center gap-3 px-4 h-14 border-b border-gray-100">
                  <Search size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Buscar veículos, marcas, categorias..."
                    className="flex-1 text-sm text-gray-900 placeholder-gray-300 bg-transparent focus:outline-none"
                    aria-label="Campo de busca"
                  />
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Filter toggle */}
                    {showPanel && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setShowFilters(v => !v)}
                        className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1.5 border transition-all duration-200 ${
                          showFilters || isActive
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-200 text-gray-500 hover:border-gray-400'
                        }`}
                        aria-label="Filtros"
                      >
                        <SlidersHorizontal size={10} />
                        Filtrar
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white/70 ml-0.5" />
                        )}
                        {showFilters ? <ChevronUp size={9} /> : <ChevronDown size={9} />}
                      </motion.button>
                    )}

                    {/* Clear / Close */}
                    {(query || isActive) ? (
                      <button
                        onClick={() => { setQuery(''); setFilters(defaultFilters) }}
                        className="text-gray-300 hover:text-gray-600 transition-colors"
                        aria-label="Limpar busca"
                      >
                        <X size={15} />
                      </button>
                    ) : (
                      <button
                        onClick={close}
                        className="text-gray-300 hover:text-gray-600 transition-colors"
                        aria-label="Fechar pesquisa"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* Filter panel */}
                <AnimatePresence>
                  {showFilters && (
                    <FilterPanel
                      filters={filters}
                      onChange={patchFilter}
                      onReset={() => setFilters(defaultFilters)}
                    />
                  )}
                </AnimatePresence>

                {/* Results */}
                <AnimatePresence mode="wait">
                  {showPanel && (
                    <motion.div
                      layout
                      className="max-h-[52vh] overflow-y-auto"
                    >
                      {hasResults ? (
                        <motion.div layout>
                          {/* Result count */}
                          <motion.div
                            layout
                            className="px-4 py-2 border-b border-gray-50"
                          >
                            <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-300">
                              {results.length} {results.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}
                            </span>
                          </motion.div>

                          {/* Items */}
                          {results.map((vehicle, i) => (
                            <ResultItem
                              key={vehicle.id}
                              vehicle={vehicle}
                              isActive={activeIndex === i}
                              onSelect={() => handleSelect(vehicle)}
                              onHover={() => setActiveIndex(i)}
                            />
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="px-4 py-10 text-center"
                        >
                          <p className="text-sm text-gray-400">Nenhum veículo encontrado.</p>
                          <p className="text-xs text-gray-300 mt-1">
                            Tente buscar por outro nome ou ajuste os filtros.
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer keyboard hint */}
                <motion.div
                  layout
                  className="flex items-center justify-between px-4 py-2.5 border-t border-gray-50 bg-gray-50/50"
                >
                  <div className="flex items-center gap-4">
                    {[
                      { key: '↑↓', label: 'navegar' },
                      { key: '↵', label: 'abrir' },
                      { key: 'Esc', label: 'fechar' },
                    ].map(hint => (
                      <span key={hint.key} className="flex items-center gap-1">
                        <kbd className="text-[9px] font-mono bg-white border border-gray-200 text-gray-400 px-1.5 py-0.5 rounded">
                          {hint.key}
                        </kbd>
                        <span className="text-[9px] text-gray-300">{hint.label}</span>
                      </span>
                    ))}
                  </div>
                  {isActive && (
                    <span className="flex items-center gap-1 text-[9px] text-gray-400">
                      <Check size={9} className="text-gray-400" />
                      Filtros ativos
                    </span>
                  )}
                </motion.div>
              </LayoutGroup>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
