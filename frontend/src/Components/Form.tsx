
import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import ViewEditProduct from "./ViewEditProduct";
import {ProductCategory, RootProductCategory} from "../Models/CategoryModel";
import StockManagement from "./StockManagement";

export const  Form = ()=>{
    const [productNameValue, setProductNameValue]=useState("");
    const [descriptionValue, setDescriptionValue]=useState("");
    const [categoryValue, setCategoryValue]=useState("all")
    const [priceValue, setPriceValue]=useState(0);
    const [minStockLevel, setMinStockLevel]=useState(0);
    const [categoryList,setCategoryList]=useState<ProductCategory[]>([])

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

        async function GetCategory() {
            await axios.get(("http://localhost:3000/products/category")).then(response => {
                console.log(response)
            })
        }
    async function getProductCategories(){
        axios
            .get<RootProductCategory>('http://localhost:3000/products/category')
            .then(response=>{
                setCategoryList(response.data.productCategories);
            });
    }

    useEffect(() => {
        getProductCategories()
    },[]);



    return (

        <div className="Product">

            <h2>Add Product</h2>
            <form id="addProductForm" className="addProductForm" onSubmit={AddProduct}>
                <div className="prodManagement">
                    <div>
                <label>Product Name:</label>
                    <br></br>
                    <input type="text" id="prodNameInput" className="prodNameInput" placeholder="Product Name" value={productNameValue} onChange={HandleProductNameChange}></input>
                    <br></br>
                    <br></br>
                <label>Description:</label>
                    <br></br>
                    <input type="text" id="descriptionInput" className="descriptionInput" placeholder="Description" value={descriptionValue} onChange={HandleDescriptionChange}></input>
                    <br></br>
                    <br></br>
                    <label>Price:</label>
                    <br></br>
                    <input type="text" id="price" className="productPrice" placeholder="0" value={priceValue}  onChange={HandlePriceChange}></input>
                    <br></br>
                    <br></br>
                    <label>Minimum Stock Level:</label>
                    <br></br>
                    <input type="text" id="minStock" className="minStock" placeholder="0" value={minStockLevel} onChange={HandleStockLevelChange}></input>
                    <br></br>
                    <br></br>
                <div className="dropDown">
                    <label>Select Category:</label><br></br>
                    <select id="selectCategory" name="Filter CaTEGORY" className="selectCATEGORY" onChange={HandleChangeDropdown}>
                        <option value="all">all</option>
                        {categoryList.map(item=><option value={item.categoryId}>{item.category}</option>)}
                    </select>
                </div><br></br>
                <button id="addProductBtn" name="button" type="submit" className="addProductBtn">Add Product</button>
                   <br></br>
                </div>
                </div>
                <div className="prodManagement">
                <ViewEditProduct/>
                </div>
                <div className="prodManagement">
                    <StockManagement/>
                </div>
            </form>
        </div>
    );

}
export default Form

