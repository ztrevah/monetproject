import React, { useContext, useEffect, useState } from 'react'
import "./PurchaseView.css"
import { AuthContext } from '../../Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

let totalPrice = 0;
const PurchaseView = (props) => {
    const {state} = useLocation();
    const orderList = state.orderlist;
    const successful = state.successful;
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    const [inputs,setInputs] = useState({});
    useEffect(() => {
        if(currentUser && orderList) {
            totalPrice = 0;
            setInputs(values => ({...values, firstname : currentUser.firstname}));
            setInputs(values => ({...values, surname : currentUser.surname}));
            setInputs(values => ({...values, phone : currentUser.phone}));
            setInputs(values => ({...values, address : currentUser.address}));
            setInputs(values => ({...values, note : ""}));
            setInputs(values => ({...values, orderitems : orderList}));
            for(let i=0;i<orderList.length;i++) {
                totalPrice += (orderList[i].unitprice * orderList[i].quantity);
            } 
            setInputs(values => ({...values, totalprice : totalPrice}));
        }
        else if(successful === false) { 
            navigate("/error");
        }
    },[currentUser, navigate, orderList,successful]);
    
    const placeOrder = async () => {
        try {
            const res = await axios.post("http://localhost:9090/backend/order/create",inputs,{withCredentials: true});
            console.log(res);
            navigate("/purchase",{state: {successful: true},replace: true})
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleChange = (e) => {
        setInputs(values => ({...values, [e.target.name]: e.target.value}));
    }
    
    console.log(inputs);
    if(state.successful) {
        return (
        <div className="purchaseview">
            <div className="purchaseview-title">
                <span className="material-symbols--order-approve"></span><br /><br />
                <span style={{fontWeight: "500"}}>You have successfully created a new order.<br />You can follow your order in tracking order page.</span>
                
            </div>
        </div>);
    }
    return (
    <div className="purchaseview">
        <div className="purchaseview-title">
            <span>Complete your order</span>
        </div>
        <div className="checkout-content">
            <div className="checkout-form">
                <div className="client-info">
                    <div className="client-info-title">
                        <span>Delivery information:</span>
                    </div>
                    <div className="client-name">
                        <div className="firstname">
                            <label htmlFor="firstname">First name:</label>
                            <input type="text" id="firstname" name="firstname" defaultValue={currentUser?.firstname} onChange={handleChange} />
                        </div>
                        <div className="surname">
                            <label htmlFor="surname">Surname:</label>
                            <input type="text" id="surname" name="surname" defaultValue={currentUser?.surname} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="client-phone">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" defaultValue={currentUser?.phone} onChange={handleChange} />
                    </div>
                    <div className="client-email">
                        <label htmlFor="Email">Email:</label>
                        <input type="email" id="Email" name="Email" defaultValue={currentUser?.email} readOnly={true} />
                    </div>
                    <div className="client-address">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" defaultValue={currentUser?.address} onChange={handleChange} />
                    </div>
                    <div className="client-note">
                        <label htmlFor="note">Note:</label>
                        <textarea id="note" name="note" rows={2} maxLength={255} onChange={handleChange} />
                    </div>
                </div>
                <div className="payment-method">
                    <div className="payment-method-title"><span>Payment method</span></div>
                    <div className="methodlist">
                        <div className="cod-wrapper">
                            <div className="cod-btn">
                                <input type="radio" value="Cash on delivery" id="cod" name = "paymentmethod" onChange={handleChange}/>
                            </div>
                            <div className="cod-text">
                                <label htmlFor="cod">Cash on delivery {`(COD)`}&nbsp;</label>
                                <span className="mdi--cod"></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="checkout-summary">
                <div className="checkout-summary-title"><span>Order summary:</span></div>
                <div className="order-detail">
                    {orderList?.map((item,index) => {
                        return (
                        <div className="orderitemdiv" key={index}>
                            <div className="orderitem-img">
                                <img src={item.imgurl} alt="" />
                            </div>
                            <div className="orderitem-name-id">
                                <div className="orderitem-name">
                                    <span>{item.productname}</span>
                                </div>
                                <div className="orderitem-id">
                                    <span>{item.productid}</span>
                                </div>
                            </div>
                            <div className="orderitem-quantity">
                                <span>x{item.quantity}</span>
                            </div>
                            <div className="orderitem-price">
                                <span>{priceToString(item.quantity * item.unitprice)}đ</span>
                            </div>
                        </div>);
                    })}
                </div>
                <div className="order-price">
                    <span style={{fontSize: "24px",fontWeight: "600"}}>Total price</span>
                    <span style={{fontSize: "20px",color: "#CD1010"}}>{priceToString(totalPrice)}đ</span>
                </div>
                <div className="placeorderbtn">
                    <button onClick={placeOrder}>PLACE ORDER</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default PurchaseView