import { useState, useCallback, useMemo } from 'react'
import type { Vehicle } from '../data/vehicles'
import { vehicles } from '../data/vehicles'

export interface FilterState {
  brand: string
  category: string
  transmission: string
  fuel: string
  yearMin: number | null
  yearMax: number | null
  priceMin: number | null
  priceMax: number | null
  mileageMax: number | null
  sort: 'newest' | 'price-asc' | 'price-desc' | 'mileage-asc'
}

const initialFilters: FilterState = {
  brand: '',
  category: '',
  transmission: '',
  fuel: '',
  yearMin: null,
  yearMax: null,
  priceMin: null,
  priceMax: null,
  mileageMax: null,
  sort: 'newest',
}

export const useVehicleFilters = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [])

  const filteredVehicles = useMemo((): Vehicle[] => {
    let result = [...vehicles]

    if (filters.brand) result = result.filter(v => v.brand === filters.brand)
    if (filters.category) result = result.filter(v => v.category === filters.category)
    if (filters.transmission) result = result.filter(v => v.transmission === filters.transmission)
    if (filters.fuel) result = result.filter(v => v.fuel === filters.fuel)
    if (filters.yearMin) result = result.filter(v => v.year >= filters.yearMin!)
    if (filters.yearMax) result = result.filter(v => v.year <= filters.yearMax!)
    if (filters.priceMin) result = result.filter(v => v.price >= filters.priceMin!)
    if (filters.priceMax) result = result.filter(v => v.price <= filters.priceMax!)
    if (filters.mileageMax) result = result.filter(v => v.mileage <= filters.mileageMax!)

    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'mileage-asc':
        result.sort((a, b) => a.mileage - b.mileage)
        break
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return result
  }, [filters])

  const brands = useMemo(() => [...new Set(vehicles.map(v => v.brand))].sort(), [])
  const categories = useMemo(() => [...new Set(vehicles.map(v => v.category))].sort(), [])

  return { filters, filteredVehicles, updateFilter, resetFilters, brands, categories }
}
