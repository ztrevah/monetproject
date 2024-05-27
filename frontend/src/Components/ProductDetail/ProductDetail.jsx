import React, {useEffect, useState} from "react";
import "./ProductDetail.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const ProductDetail = () => {
  const param = useParams(); 
  const [productDetails, setProductDetails] = useState({});
  const [numberPurchaseItems,setNumberPurchaseItems] = useState(0);
  const [displayedImageIndex,setdisplayedImageIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const res = await axios.post("http://localhost:9090/backend/search/getProductDetails",param,{withCredentials: true});
        setProductDetails(res.data);
      } catch (err) {
        console.log(err);
        navigate("/error");
      }
    }
    getProductDetail();
  },[param, navigate]);
  console.log(productDetails);
  const purchaseQuantityIncrement = () => {
    if(numberPurchaseItems < productDetails.quantity) setNumberPurchaseItems(numberPurchaseItems + 1);
    else setNumberPurchaseItems(productDetails.quantity);
  }
  const purchaseQuantityDecrement = () => {
    if(numberPurchaseItems > 0) setNumberPurchaseItems(numberPurchaseItems - 1);
    else setNumberPurchaseItems(0);
  }
  const enterPurchaseQuantity = (e) => {
    const num = parseInt(e.target.value);
    if(num) {
      if(num < 0) setNumberPurchaseItems(0);
      else if(num <= productDetails.quantity) setNumberPurchaseItems(num);
      else setNumberPurchaseItems(productDetails.quantity);
    }
    else setNumberPurchaseItems(0);
  }
  console.log(numberPurchaseItems); 
  return (
    <div className="productdetails">
      <div className="title">
        <span>Home / Products / {productDetails.productname}</span>
      </div>
      <div className="productdetail-wrapper">
        <div className="productimage-wrapper">
          <div className="imagelist">
            <div><span className="mingcute--up-fill"></span></div>
            {productDetails.imgurl?.map((url,index) => {
              return <div key={index} onClick={() => {setdisplayedImageIndex(index)}}><img src={url} alt={productDetails.productid} /></div>
            })}
            <div><span className="mingcute--down-fill"></span></div>
          </div>
          <div className="displayedimage">
            <img src={productDetails.imgurl?.at(displayedImageIndex)} alt={productDetails.productid} />
          </div>
        </div>
        <div className="productinfo-wrapper">
          <div className="name">
            <span>{productDetails.productname?.toUpperCase()}</span>
          </div>
          <div className="id">
            <span>Product ID: {productDetails.productid}</span>
          </div>
          <div className="price">
            <span>{productDetails.unitprice/1000},000₫</span>
          </div>
          <div className="quantity">
            <div className="quantity-input">
              <div><label htmlFor="quantity">Quantity: </label></div>
              <div className="inputarea">
                <span className="ic--round-minus" onClick={purchaseQuantityDecrement}></span>
                <input type="number" id="quantity" min={0} max={productDetails.quantity} value={numberPurchaseItems} onChange={enterPurchaseQuantity}/>
                <span className="ic--round-plus" onClick={purchaseQuantityIncrement}></span>
              </div>
            </div>
            <div className="quantity-left">
              <span>{"("}There {productDetails.quantity > 0 ? "are" : "is"} {productDetails.quantity} item{productDetails.quantity > 0 && "s"} left.{")"}</span>
            </div>
            
          </div>
          <div className="purchaseoptions">
            <div className="buybutton-wrapper">
              <button>Buy now!</button>
            </div>
            <div className="cartbutton-wrapper">
              <button><span className="bytesize--cart"></span><br/>Add to cart</button>
            </div>
          </div>
          <div className="description">
            <div className="description-title">
              <span>Product details</span>
              <span className="mingcute--down-fill"></span>
            </div>
            <div className="description-content">
              {productDetails.description || ""}
            </div>
          </div>
        </div>
      </div>


    </div>
    
  )
}

export default ProductDetail;