export interface BaseItem {
  name: string;
  price: number;
  description: string;
  isOnSale: boolean;
  stockCount: number;
  imgUrl: string;
}

export interface Item extends BaseItem {
  id: string;
}
