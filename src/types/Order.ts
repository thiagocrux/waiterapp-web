export interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: {
    _id: string;
    product: {
      _id: string;
      name: string;
      description: string;
      imagePath: string;
      price: number;
      ingredients: { _id: string; name: string; icon: string }[];
      category: string;
    };
    quantity: number;
  }[];
  createdAt: string;
}
