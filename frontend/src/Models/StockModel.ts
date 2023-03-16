export interface Stock {
    productName: string;
    description: string;
    price: number;
    category: string;
    minStockLevel: number;
    currentStock: number;
}

export interface RootStockObject {
    stock: Stock[];
}

