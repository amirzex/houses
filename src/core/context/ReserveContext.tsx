"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { searchProperties as getData } from '@/core/api/landing/api';
import { getHouseById as getPropertyById } from '@/core/api/houses/api';
import { ReserveContextType, FilterParams, Property } from '@/core/types/IReserveContext';

const ReserveContext = createContext<ReserveContextType | undefined>(undefined);

export const ReserveProvider = ({ children }: { children: React.ReactNode }) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [filters, setFiltersState] = useState<FilterParams>({
        page: 1,
        limit: 9,
        sort: "last_updated"
    });
    const [loading, setLoading] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    const initialFetchDone = useRef(false);
    const fetchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const isFetchingRef = useRef(false);

    const prepareFiltersForApi = useCallback((filterParams: FilterParams) => {
        return {
            ...filterParams,
            page: filterParams.page ? Number(filterParams.page) : 1,
            limit: filterParams.limit ? Number(filterParams.limit) : 9,
            minPrice: filterParams.minPrice ? Number(filterParams.minPrice) : undefined,
            maxPrice: filterParams.maxPrice ? Number(filterParams.maxPrice) : undefined,
            sort: filterParams.sort || "last_updated",
            location: filterParams.location || '',
            search: filterParams.search || '',
            name: filterParams.name || filterParams.search || '',
        };
    }, []);

    const fetchProperties = useCallback(async (params?: FilterParams, isManualFetch = false) => {

        if (isFetchingRef.current && !isManualFetch) {
            return;
        }

        try {
            isFetchingRef.current = true;
            setLoading(true);
            setError(null);

            const apiParams = prepareFiltersForApi(params || filters);
            // console.log('Fetching properties with params:', apiParams);

            const response = await getData(apiParams);
            // console.log('Properties response:', response);

            setProperties(response);
            setFilteredProperties(response);
            setTotalCount(response?.length || 0);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'خطا در دریافت اطلاعات');
            // console.error('Error fetching properties:', err);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, []);

    const fetchPropertyById = useCallback(async (id: string) => {

        if (selectedProperty?.id === id && !loadingDetail) {
            return;
        }

        try {
            setLoadingDetail(true);
            setError(null);

            // console.log('Fetching property with id:', id);

            if (properties.length > 0) {
                const existingProperty = properties.find(p => p.id === id);
                if (existingProperty) {
                    // console.log('Property found in existing properties:', existingProperty);
                    setSelectedProperty(existingProperty);
                    setLoadingDetail(false);
                    return;
                }
            }


            const response = await getPropertyById(id);
            // console.log('Property detail response:', response);

            setSelectedProperty(response);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'خطا در دریافت اطلاعات ملک');
            console.error('Error fetching property:', err);
        } finally {
            setLoadingDetail(false);
        }
    }, []);

    const setFilters = useCallback((newFilters: FilterParams) => {

        if (fetchTimeoutRef.current) {
            clearTimeout(fetchTimeoutRef.current);
        }

        setFiltersState(prev => {
            const updated = { ...prev, ...newFilters, page: 1 };

            
            fetchTimeoutRef.current = setTimeout(() => {
                fetchProperties(updated, true);
            }, 300); 

            return updated;
        });
    }, [fetchProperties]);

    const clearFilters = useCallback(() => {
        const defaultFilters: FilterParams = {
            page: 1,
            limit: 9,
            sort: "last_updated"
        };
        setFiltersState(defaultFilters);
        fetchProperties(defaultFilters, true);
    }, [fetchProperties]);

    const selectProperty = useCallback((property: Property | null) => {
        setSelectedProperty(property);
    }, []);

   
    useEffect(() => {
        if (!initialFetchDone.current) {
            fetchProperties(undefined, true);
            initialFetchDone.current = true;
        }

        
        return () => {
            if (fetchTimeoutRef.current) {
                clearTimeout(fetchTimeoutRef.current);
            }
        };
    }, [fetchProperties]);

    const value: ReserveContextType = {
        properties,
        filteredProperties,
        selectedProperty,
        filters,
        loading: loading || loadingDetail,
        error,
        totalCount,
        setFilters,
        clearFilters,
        fetchProperties: (params) => fetchProperties(params, true), // صریحاً manual رو true کن
        fetchPropertyById,
        selectProperty
    };

    return (
        <ReserveContext.Provider value={value}>
            {children}
        </ReserveContext.Provider>
    );
};

export const useReserve = () => {
    const context = useContext(ReserveContext);
    if (context === undefined) {
        throw new Error('useReserve must be used within a ReserveProvider');
    }
    return context;
};