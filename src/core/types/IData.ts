export interface IData {
  id: string;
  title: string | undefined;
  address: string;
  photos: string;
  rate: string;
  discounted_price: string | null;
  price: number;
  tags: string[];
  last_updated: string;
  capacity: number;
  location: string;
  categories: {
    name: string;
  };
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  num_comments: number;
  discount_id: string | null;
  transaction_type: string;
  sellerId: string;
  sellerName: string;
  caption: string;
  bookings: number;
  favoriteId: string | null;
  isFavorite: boolean;
  data?: string;
  item: string;
  size: string;
  total: number;
  city: string;
}

export type IDataArray = IData[];
