import React, { useContext, useEffect, useState } from 'react';
import "./CartView.css";
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const priceToString = (price) => {
  const price_tmp = price.toString();
  const l = price_tmp.length;
  let tmp = "";
  for(let i=0;i<l;i++) {
    if(i%3 === 0 && i > 0) tmp += ",";
    tmp += price_tmp[l-1-i];
    
  }
  return tmp.split('').reverse().join('');
}

const CartView = () => {
  const {currentUser} = useContext(AuthContext);
  const [cartItems,setCartItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if(currentUser) {
      const getCartDetails = async () => {
        try {
          const res = await axios.post("http://localhost:9090/backend/cart/details",{customerid: currentUser.uid},{withCredentials: true});
          setCartItems(res.data);
        } catch (err) {
          console.log(err);
          navigate("/error");
        }
      }
      getCartDetails();
    }
    else navigate("/error");
  },[currentUser,navigate]);
  console.log(cartItems);
  return (
    <div className="cartview">
      <div className="cartview-title">
        <span>Home / Your cart</span>
      </div>
      <div className="cartview-content">
        <div className="cartitems">
          {cartItems?.map((item,index) => {
            return (
            <div className="cartitemdiv-wrapper" key={index}>
              <div className="cartitemdiv">
                <div className="cartitem-checkbox">
                  <span className="ci--checkbox-unchecked"></span>
                </div>
                <div className="cartitem-img">
                  <img src={item.imgurl} alt="" />
                </div>
                <div className="cartitem-detail">
                  <div className="cartitem-name">
                    <span>{item.productname}</span>
                  </div>
                  <div className="cartitem-id">
                    <span>{item.productid}</span>
                  </div>
                  <div className="cartitem-quantity">
                    <div><span>Quantity: </span></div> 
                    <div className="quantityarea">
                      <span className="ic--round-minus"></span>
                      <span className="quantityvalue">{item.quantity}</span>
                      <span className="ic--round-plus"></span>
                    </div> 
                  </div>
                  <div className="cartitem-price">
                    <span>Total: <span style={{color: "#CD1010"}}>{priceToString(item.quantity * item.unitprice)}₫</span></span>
                  </div>
                </div>
                <div className="cartitem-erasebtn">
                  <span className="ph--x-bold"></span>
                </div>
              </div>
            </div>
            )
          })}
        </div>
        <div className="cartview-summary">
          <div className="summary-title"><span>Summary</span></div>
          <div className="summary-totalprice">
            <span>Total price:</span>
            <span></span>
          </div>
          <div className="makepaymentbtn">
            <button>MAKE YOUR PAYMENT</button>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default CartView;