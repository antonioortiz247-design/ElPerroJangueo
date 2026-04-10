export type Category = "Mojitos" | "Azulitos" | "Especiales" | "Promos";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image_url: string;
  active: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "new" | "processing" | "completed";
  created_at: string;
  customer_name?: string | null;
  customer_phone?: string | null;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface Announcement {
  id: string;
  text: string;
  active: boolean;
}
