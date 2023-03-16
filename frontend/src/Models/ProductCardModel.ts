export interface ProductCardModel {
    productId: string;
    productName: string;
    description: string;
    price: number;
    categoryId: string;
    minStockLevel: number;
}

export interface RootProduct {
    products: ProductCardModel[];
}
