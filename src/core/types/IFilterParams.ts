export interface IFilterParams {
  limit?: number;
  transactionType?: "rental" | "reservation" | "sale" | "mortgage";
  search?: string;
  sort?: "last_updated" | "price" | "area" | "created_at";
  order?: "ASC" | "DESC";
  propertyType?: "apartment" | "villa" | "house" | "land" | "commercial";
  location?: string;
  minRent?: number;
  maxRent?: number;
  minArea?: number;
  maxArea?: number;
  maxPrice?: number;
  minMortgage?: number;
  maxMortgage?: number;
}
