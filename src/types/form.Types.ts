export enum categorys {
  PASTA = "pasta",
  PIZZA = "pizza",
  BURGER = "burger",
  BIRYANI = "biryani",
  CHAWMIN = "chawmin",
  LOCAL_FOOD = "local food",
}
export interface IMealForm {
  name: string;
  category: categorys;
  description: string;
  price: number;
  image?: string;
  cookingTime?: number;
  deliveryTime?: number;
}

export interface IProviderProfile {
  restaurantName: string;
  description: string;
  address: string;
  phone: string;
}

export interface IFormReviewData {
  rating: number;
  comment: string;
}

export interface IProfileUpdateForm {
  name: string | null;
  image: string | null;
}
