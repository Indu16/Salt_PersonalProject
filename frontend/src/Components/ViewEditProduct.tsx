import React, {useEffect, useState} from "react";
import axios from "axios";
import {StockModel} from "../Models/ListProductStockModel";
import {ProductCardModel, RootProduct} from "../Models/ProductCardModel";
import {ProductCategory, RootProductCategory} from "../Models/CategoryModel";


export const ViewEditProduct=()=>{

    const [productNameValue, setProductNameValue]=useState("");
    const [descriptionValue, setDescriptionValue]=useState("");
    const [categoryValue, setCategoryValue]=useState("all")
    const [priceValue, setPriceValue]=useState(0);
    const [minStockLevel, setMinStockLevel]=useState(0);
    const [allProducts,setAllProducts]=useState<ProductCardModel[]>([])
    const [selectedProduct,setSelectedProduct]=useState<ProductCardModel>();
    const [categoryList,setCategoryList]=useState<ProductCategory[]>([])
    let line;

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

    function HandleChangeDropdown(event: React.ChangeEvent<HTMLSelectElement>) {
        setCategoryValue(event.currentTarget.value);
    }

    function HandleChangeProduct(event: React.ChangeEvent<HTMLSelectElement>){
        axios.get<ProductCardModel>("http://localhost:3000/products/"+event.currentTarget.value)
            .then(response=>{
                setSelectedProduct(response.data);
                getCategoryName(response.data.categoryId);
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
        getProductCategories()
    },[]);

    async function AddProduct() {
        await axios.post("http://localhost:3000/products", {
            "productName": productNameValue,
            "description": descriptionValue,
            "price": priceValue,
            "category": categoryValue,
            "minStockLevel": minStockLevel
        }).then(response => {
            console.log(response)
        })
    }

    function getCategoryName(props: string | undefined){
        categoryList.forEach(item=>{if(item.categoryId===props){
        line= <h4>{item.category}</h4>
        }});

    }


    return(<div className="prodManagement" onSubmit={AddProduct}>
            <h2>View / Edit Product</h2>
            <select id="selectPRODUCT" name="SelectProduct" className="selectProduct" onChange={HandleChangeProduct}>
                {allProducts.map(item=><option value={item.productId}>{item.productName}</option>)}
            </select>
            <br></br>
            <label>Product Name: </label>
            <br></br>
            <input type="text" id="prodNameInput" className="prodNameInput" placeholder={selectedProduct?.productName}value={productNameValue} onChange={HandleProductNameChange}></input>
            <br></br>
            <br></br>
            <label>Description:</label>
            <br></br>
            <input type="text" id="descriptionInput" className="descriptionInput" placeholder={selectedProduct?.description}value={descriptionValue} onChange={HandleDescriptionChange}></input>
            <br></br>
            <br></br>
            <label>Price: {selectedProduct?.price}</label>
            <br></br>
            <input type="text" id="price" className="productPrice" placeholder="0" value={priceValue} onChange={HandlePriceChange}></input>
            <br></br>
            <br></br>
            <label>Minimum Stock Level:{selectedProduct?.minStockLevel}</label>
            <br></br>
            <input type="text" id="minStock" className="minStock" placeholder="0" value={minStockLevel} onChange={HandleStockLevelChange}></input>
            <br></br>
            <br></br>
            <div className="dropDown">
                <label>Select Category:</label>{line}<br></br>
                <select id="selectCategory" name="Filter CaTEGORY" className="selectCATEGORY" onChange={HandleChangeDropdown}>
                    {categoryList.map(item=><option value={item.categoryId}>{item.category}</option>)}
                </select>
            </div><br></br>
            <button id="editProductButton" name="button" type="submit" className="editProductButton">Update Product</button>
            <br></br>
        </div>

    );
}
export default ViewEditProduct
