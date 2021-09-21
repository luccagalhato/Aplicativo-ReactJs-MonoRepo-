export interface ShoppingItem {
  urlImg?: string;
  id: string;
  qty?: number;
  name?: string;
  optionalItems: OptionalItem[];
  value: number;
}

export interface OptionalItem {
  qty: number;
  name: string;
}
