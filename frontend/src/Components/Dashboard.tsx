import React, {useEffect, useState} from "react";
import '../CSS Styling/Dashboard.css';
import axios from "axios";
import homedecor from "./resources/homedecor.png";
import candle1 from "./resources/candle1.png";
import candle3 from "./resources/candle3.png";
import homedecor2  from "./resources/homedecor 2.png";
// import footwear1 from "./resources/Ladies-Footwear.png";
// import menshoes from "./resources/Men-Shoes1.png";
// import table from "./resources/table.png";

import {ProductCategory, RootProductCategory} from "../Models/CategoryModel";
import {RootStock} from "../Models/ListProductStockModel";
import StockCard from "./StockCard";
import DashboardProductCard from "./DashboardProductCard";
import {ProductCardModel, RootProduct} from "../Models/ProductCardModel";

export const Dashboard=()=>{
    const [categoryValue,setCategoryValue]=useState<String>("738e8880-c1e9-11ed-afa1-0242ac120002");
    const [categoryList,setCategoryList]=useState<ProductCategory[]>([]);
    const [productList,setProductList]=useState<ProductCardModel[]>([]);
    let block;


    function HandleChangeDropdown(event: React.ChangeEvent<HTMLSelectElement>) {
            setCategoryValue(event.currentTarget.value);
            GetProductsByCategoryID(event.currentTarget.value);
        }


   async function getProductCategories(){
        axios
            .get<RootProductCategory>('http://localhost:3000/products/category')
            .then(response=>{
                setCategoryList(response.data.productCategories);
            });
    }



    // function GetStock(){
    //     axios
    //         .get<RootStock>("http://localhost:3000/products/stock")
    //         .then(response=>{
    //             block=response.data.stock.map(item=><StockCard
    //                 productName={item.productName} description={item.description}
    //                 price={item.price} categoryId={item.category}
    //                 minStockLevel={item.minStockLevel} currentStock={item.currentStock}></StockCard>)
    //             });
    // }
    //GetProductCategories();
    useEffect(() => {
        getProductCategories()
    },[]);

    async function GetProductsByCategory()
    {
    await axios
        .get <RootProduct>("http://localhost:3000/products/category/"+categoryValue)
        .then(response=>{setProductList(response.data.products)})
    }
    async function GetProductsByCategoryID(props:String)
    {
        await axios
            .get <RootProduct>("http://localhost:3000/products/category/"+props)
            .then(response=>{setProductList(response.data.products)})
    }

    useEffect(()=>{
        GetProductsByCategory();
    },[])

    return(

        <div className="dashboard">
        <div className="card">
           <img className="homedecor 2" src= {homedecor2} ></img>
           <img className="candle1" src= {candle1} ></img>
           <div className="homedecor">
             <h1><em>Products in my store......</em></h1>
            </div>
        </div>
            <div className="gallerySection">
                <div className="drop-down">
                    <h4>Filter Category:</h4>
                    <select id="selectCategory" name="Filter Category" className="selectCategory" onChange={HandleChangeDropdown}>
                        {categoryList.map(item=><option value={item.categoryId}>{item.category}</option>)}
                    </select>
                </div>
                {productList.map(item=>
                    <DashboardProductCard productId={item.productId} productName={item.productName}
                                          description={item.description} price={item.price}
                                          categoryId={item.categoryId} minStockLevel={item.minStockLevel}/>
                )}
                <hr></hr>
            </div>
        </div>


    );

}
export default Dashboard
