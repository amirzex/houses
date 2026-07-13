// src/core/types/reserveContext.types.ts
export interface FilterParams {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  location?: string;
  search?: string;
  name?: string;
}

export interface Property {
  id: string;
  name: string;
  title: string;
  price: number;
  location: string;
  images: string[];
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  search?: string;
  address?: string;
  photos?: string;
}

export interface ReserveContextType {
  // state
  properties: Property[];
  filteredProperties: Property[];
  selectedProperty: Property | null;
  filters: FilterParams;
  loading: string | boolean;
  error: string | null;
  totalCount: number;

  // actions
  setFilters: (filters: FilterParams) => void;
  clearFilters: () => void;
  fetchProperties: (params?: FilterParams) => Promise<void>;
  fetchPropertyById: (id: string) => Promise<void>;
  selectProperty: (property: Property | null) => void;
}
