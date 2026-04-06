export enum categorys {
  PASTA = "Pasta",
  PIZZA = "Pizza",
  BURGER = "Burger",
  BIRYANI = "Biryani",
}
export interface IMealForm {
  name: string;
  category: categorys;
  description: string;
  price: number;
  image?: string;
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
