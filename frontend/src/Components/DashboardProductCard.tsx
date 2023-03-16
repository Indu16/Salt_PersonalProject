import React, {useEffect, useState} from "react";
import {ProductCardModel, RootProduct} from "../Models/ProductCardModel";
export const DashboardProductCard=(props:ProductCardModel)=>{
    const data=props;
    return(
            <li>{data.productName}</li>
    );

}
export default DashboardProductCard
