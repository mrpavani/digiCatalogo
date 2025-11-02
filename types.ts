export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  isEnabled: boolean;
}

export interface User {
  id: number;
  username: string;
  password?: string; // Senha é opcional para não ser exposta desnecessariamente
  role: 'admin' | 'user';
  isEnabled: boolean;
}