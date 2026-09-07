import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { VehicleCard } from '../components/VehicleCard/VehicleCard'
import { useVehicleFilters } from '../hooks/useVehicleFilters'

const sortOptions = [
  { value: 'newest', label: 'Mais Recentes' },
  { value: 'price-asc', label: 'Menor Preço' },
  { value: 'price-desc', label: 'Maior Preço' },
  { value: 'mileage-asc', label: 'Menor KM' },
]

export function Vehicles() {
  const [searchParams] = useSearchParams()
  const { filters, filteredVehicles, updateFilter, resetFilters, brands, categories } = useVehicleFilters()
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const categoria = searchParams.get('categoria')
    if (categoria) {
      const map: Record<string, string> = {
        suv: 'SUV',
        esportivo: 'Esportivo',
        sedan: 'Sedan',
        hatchback: 'Hatchback',
        picape: 'Picape',
      }
      if (map[categoria]) {
        updateFilter('category', map[categoria])
      }
    }
  }, [searchParams])

  return (
    <main className="pt-20">
      {/* Page header */}
      <section className="py-16 md:py-20 border-b border-gray-100 bg-white">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-eyebrow block mb-3">Nosso estoque</span>
            <h1 className="heading-lg text-gray-900">
              Veículos
              <span className="font-light text-gray-400"> Disponíveis</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container-xl">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border border-gray-200 px-4 py-2.5 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                <SlidersHorizontal size={13} />
                Filtros
                {Object.values(filters).some(v => v && v !== 'newest') && (
                  <span className="bg-gray-900 text-white rounded-full w-4 h-4 text-[9px] flex items-center justify-center">
                    !
                  </span>
                )}
              </button>
              {/* Active filters chips */}
              {filters.category && (
                <button
                  onClick={() => updateFilter('category', '')}
                  className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1.5 hover:bg-gray-200 transition-colors"
                >
                  {filters.category}
                  <X size={10} />
                </button>
              )}
              {filters.brand && (
                <button
                  onClick={() => updateFilter('brand', '')}
                  className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1.5 hover:bg-gray-200 transition-colors"
                >
                  {filters.brand}
                  <X size={10} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 hidden sm:block">
                {filteredVehicles.length} {filteredVehicles.length === 1 ? 'veículo' : 'veículos'}
              </span>
              {/* Sort */}
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={e => updateFilter('sort', e.target.value as typeof filters.sort)}
                  className="appearance-none text-xs font-medium tracking-wide border border-gray-200 px-4 py-2.5 pr-8 bg-white cursor-pointer focus:outline-none focus:border-gray-900 transition-colors"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: 'hidden' }}
                className="mb-8"
              >
                <div className="border border-gray-100 p-6 bg-gray-50">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {/* Marca */}
                    <div>
                      <label className="text-eyebrow text-gray-400 block mb-2">Marca</label>
                      <select
                        value={filters.brand}
                        onChange={e => updateFilter('brand', e.target.value)}
                        className="w-full text-sm border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900"
                      >
                        <option value="">Todas</option>
                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    {/* Categoria */}
                    <div>
                      <label className="text-eyebrow text-gray-400 block mb-2">Categoria</label>
                      <select
                        value={filters.category}
                        onChange={e => updateFilter('category', e.target.value)}
                        className="w-full text-sm border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900"
                      >
                        <option value="">Todas</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    {/* Câmbio */}
                    <div>
                      <label className="text-eyebrow text-gray-400 block mb-2">Câmbio</label>
                      <select
                        value={filters.transmission}
                        onChange={e => updateFilter('transmission', e.target.value)}
                        className="w-full text-sm border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900"
                      >
                        <option value="">Todos</option>
                        <option value="Automático">Automático</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                      </select>
                    </div>

                    {/* Combustível */}
                    <div>
                      <label className="text-eyebrow text-gray-400 block mb-2">Combustível</label>
                      <select
                        value={filters.fuel}
                        onChange={e => updateFilter('fuel', e.target.value)}
                        className="w-full text-sm border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900"
                      >
                        <option value="">Todos</option>
                        <option value="Flex">Flex</option>
                        <option value="Gasolina">Gasolina</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Híbrido">Híbrido</option>
                        <option value="Elétrico">Elétrico</option>
                      </select>
                    </div>

                    {/* Preço máx */}
                    <div>
                      <label className="text-eyebrow text-gray-400 block mb-2">Preço máx.</label>
                      <select
                        value={filters.priceMax ?? ''}
                        onChange={e => updateFilter('priceMax', e.target.value ? Number(e.target.value) : null)}
                        className="w-full text-sm border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-900"
                      >
                        <option value="">Sem limite</option>
                        <option value="200000">R$ 200.000</option>
                        <option value="400000">R$ 400.000</option>
                        <option value="600000">R$ 600.000</option>
                        <option value="1000000">R$ 1.000.000</option>
                      </select>
                    </div>

                    {/* Reset */}
                    <div className="flex items-end">
                      <button
                        onClick={resetFilters}
                        className="w-full text-xs font-semibold tracking-widest uppercase text-gray-500 border border-gray-200 py-2 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                      >
                        Limpar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Vehicle grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredVehicles.map((vehicle, i) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} variant="default" index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-400 mb-4">Nenhum veículo encontrado com os filtros selecionados.</p>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold tracking-widest uppercase text-gray-900 border-b border-gray-900 pb-0.5"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
