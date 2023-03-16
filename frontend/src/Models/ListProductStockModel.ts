export interface StockModel {
    productName: string;
    description: string;
    price: number;
    category: string;
    minStockLevel: number;
    currentStock: number;
}

export interface RootStock {
    stock: StockModel[];
}

