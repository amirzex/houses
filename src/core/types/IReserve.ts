// core/types/IReserve.ts
export interface FastReserveProps {
  searchParams: {
    page?: string;
    limit?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    location?: string;
    city?: string;
    search?: string;
    q?: string;
    name?: string;
    total: string;
    [key: string]: string | number | undefined;
  };
}
