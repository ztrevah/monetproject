import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/media/shoplogo.png";
import { LoginForm } from "../LoginForm/LoginForm";
import { Link } from "react-router-dom";


function Navbar() {
    const [signinPopUp,setSigninPopup] = useState(false);
    const openSigninPopup = () => {
        setSigninPopup(true);
    }
    return (
        <div className="header_bar1">
            <Link to="/" className="header_logo_wrapper"><img className="header_logo" src={logo} alt="Shop logo" /></Link>
            <nav className="header_navbar">
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/products">Products</Link></li>
                </ul>
            </nav>
            <div className="search-bar">
                <form id="searchform" action="product.html">
                    <div className="search-bar1">
                        <span className="material-symbols-outlined">search</span>
                        <div className="search-inputdiv">
                            <input className="search-input" type="search" placeholder="Search" />
                        </div>
                    </div>
                </form>
            </div>
            <div id="customer_area">
                <button className="signin_button" onClick={openSigninPopup}>Sign in</button>
            </div>
            <LoginForm trigger={signinPopUp} setTrigger={setSigninPopup} />
        </div>
        
    );
}
const lovemessages = ["They say when you meet the love of your life, time stops, and that's true.",
                    "If love is blind, why is lingerie so popular?",
                    "Every day with you is a wonderful addition to my life's journey.",
                    "Every day I continue to chose you, and every day that choice gets easier and easier",
                    "I want to be the reason behind your beautiful smile today and every day."];
let i=0;
class SloganBar extends React.Component {
    constructor() {
        super();
        this.state = {slogan: lovemessages[i]};
    }
    incrementLoveMessageBar = () => {
        i++;
        i %= lovemessages.length;
        this.setState({slogan: lovemessages[i]});
    }
    decrementLoveMessageBar = () => {
        i--; i+= lovemessages.length;
        i %= lovemessages.length;
        this.setState({slogan: lovemessages[i]});
    }
    render() {
        return (
            <div className="header_bar2">
                <span className="ic--round-less-than" onClick={this.decrementLoveMessageBar}></span>
                <span id="lovemessage">{this.state.slogan}</span>
                <span className="ic--round-greater-than" onClick={this.incrementLoveMessageBar}></span>
            </div>
        );
    }
}
const Header = () => {
    return (
        <div className="header-bar">
            <header>
                <Navbar />
                <SloganBar />
            </header>
        </div>
    );
}

export default Header;
