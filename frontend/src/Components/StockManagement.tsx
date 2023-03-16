import React, {useEffect, useState} from "react";
import axios from "axios";
import {StockModel} from "../Models/ListProductStockModel";
import {ProductCardModel, RootProduct} from "../Models/ProductCardModel";
import {ProductCategory, RootProductCategory} from "../Models/CategoryModel";
import StockCard from "./StockCard";
import {ProductWithStockModel} from "../Models/ProductWithStockModel";
import {RootStockObject, Stock} from "../Models/StockModel";


export const StockManagement=()=>{

    const [productNameValue, setProductNameValue]=useState("");
    const [descriptionValue, setDescriptionValue]=useState("");
    const [categoryValue, setCategoryValue]=useState("all")
    const [priceValue, setPriceValue]=useState(0);
    const [minStockLevel, setMinStockLevel]=useState(0);
    const [allProducts,setAllProducts]=useState<ProductCardModel[]>([]);
    const [selectedProduct,setSelectedProduct]=useState<ProductCardModel>();
    const [categoryList,setCategoryList]=useState<ProductCategory[]>([]);
    const [stockQuantity,setStockQuantity]=useState(0);
    const [stockList,setStockList]=useState<Stock[]>([]);
    const [currentStockQuantity,setCurrentStockQuantity]=useState(0);
    let line;
    let block;

    function HandleProductNameChange(e: {
        target: { value: React.SetStateAction<string> };
    }) {
        setProductNameValue(e.target.value)
    }

    function HandleDescriptionChange(e: {
        target: { value: React.SetStateAction<string> };
    }) {
        setDescriptionValue(e.target.value)
    }

    function HandlePriceChange(e: {
        target: { value: React.SetStateAction<String> };
    }) {
        let x: number = +e.target.value;
        setPriceValue(x)
    }

    function HandleStockLevelChange(e: {
        target: { value: React.SetStateAction<String> };
    }) {
        let x: number = +e.target.value;
        setMinStockLevel(x)
    }

    function HandleStockQuantityChange(e: {
        target: { value: React.SetStateAction<String> };
    }) {
        let x: number = +e.target.value;
        setStockQuantity(x)
    }


    function HandleChangeDropdown(event: React.ChangeEvent<HTMLSelectElement>) {
        setCategoryValue(event.currentTarget.value);
    }

    function HandleChangeProduct(event: React.ChangeEvent<HTMLSelectElement>){
        axios.get<ProductCardModel>("http://localhost:3000/products/"+event.currentTarget.value)
            .then(response=>{
                setSelectedProduct(response.data);
                getCategoryName(response.data.categoryId);
                stockList.forEach(item=> {
                    if(item.productName===response.data.productName){
                        setCurrentStockQuantity(item.currentStock)
                    }
                })
            });
        }

        async function AddStock(){
        await axios
            .post<ProductWithStockModel>("http://localhost:3000/products/addstock",
                {"productId":selectedProduct?.productId,"quantity":stockQuantity})
            .then(response=>{setCurrentStockQuantity(response.data.currentStock);
        })
        }

    async function PickStock(){
        await axios
            .post<ProductWithStockModel>("http://localhost:3000/products/pickstock",
                {"productId":selectedProduct?.productId,"quantity":stockQuantity})
            .then(response=>{setCurrentStockQuantity(response.data.currentStock);
            })
    }


async function getAllProducts(){
        axios.get<RootProduct>("http://localhost:3000/products")
            .then(response=>{setAllProducts(response.data.products)})
}

    async function getProductCategories(){
        axios
            .get<RootProductCategory>('http://localhost:3000/products/category')
            .then(response=>{
                setCategoryList(response.data.productCategories);
            });
    }
    useEffect(()=>{
        getAllProducts();
    },[])

    useEffect(() => {
        getProductCategories();
    },[])
    useEffect(()=>{
        getAllStock();
    },[])

    function getCategoryName(props: string | undefined){
        categoryList.forEach(item=>{if(item.categoryId===props){
        line= <h4>{item.category}</h4>
        }});

    }

    async function getAllStock(){
        await axios
            .get<RootStockObject>("http://localhost:3000/products/stock")
            .then(response=>{setStockList(response.data.stock)});

        }

    return(<div className="prodManagement" onSubmit={getProductCategories}>
            <h2>Stock Management</h2>
            <select id="selectPRODUCT" name="SelectProduct" className="selectProduct" onChange={HandleChangeProduct}>
                {allProducts.map(item=><option value={item.productId}>{item.productName}</option>)}
            </select>
            {block}
            <br/>
            <li>Product Name : {selectedProduct?.productName}</li>
            <br/>
            <li>Description  :{selectedProduct?.description}</li>
            <br/>
            <li>Min Stock    :{selectedProduct?.minStockLevel}</li>
            <br/>
            <li>Price    : {selectedProduct?.price}</li>
            <br></br>
            <li>Current Stock :{currentStockQuantity}</li>
            <br></br>
            <label>Quantity to add:</label>
            <br></br>
            <input type="text" id="addStockQuantity" className="addStockQuantity" placeholder="0" value={stockQuantity} onChange={HandleStockQuantityChange}></input>
            <br></br>
            <br></br>
            <button id="addStockButton" name="button" type="button" className="addStockButton" onClick={AddStock}>Add Stock</button>
            <button id="picStockButton" name="button" type="button" className="pickStockButton" onClick={PickStock}>Pick Stock</button>
            <br></br>
        </div>

    );
}
export default StockManagement
