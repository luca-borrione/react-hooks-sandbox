export type Product = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = Product & {
  quantity: number;
};

export type CartContextType = {
  addItem: (product: Product) => void;
  clear: () => void;
  clearItem: (productId: string) => void;
  items: CartItem[];
  removeItem: (productId: string) => void;
  totalItems: number;
  totalPrice: number;
};
