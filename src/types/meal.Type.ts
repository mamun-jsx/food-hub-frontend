// meal reviews
export interface IReview {
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    image: string | null;
  };
}
// meal object
export interface IMeal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  providerId: string;
  category: string;
  cookingTime?: number;
  deliveryTime?: number;
  reviews: IReview[];
}

// If your API returns the object wrapped in "data"
export interface IMealResponse {
  success: boolean;
  data: IMeal;
}
