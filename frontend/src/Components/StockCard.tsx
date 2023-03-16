import React from "react";
import {StockModel} from "../Models/ListProductStockModel";
import {ProductCardModel} from "../Models/ProductCardModel";

export const StockCard=(props:ProductCardModel)=>{
    const data=props;
    return(<div>
            <li>{data.productName}</li>
            <li>{data.description}</li>
            <li>{data.minStockLevel}</li>
            <li></li>
        </div>

    );
}
export default StockCard
