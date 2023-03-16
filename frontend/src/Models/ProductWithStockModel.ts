export interface ProductWithStockModel {
    productName: string;
    description: string;
    price: number;
    category: string;
    minStockLevel: number;
    currentStock: number;
}
