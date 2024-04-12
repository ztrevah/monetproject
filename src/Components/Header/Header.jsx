import React from "react";
import "./Header.css";
import logo from "../assets/media/shoplogo.png";
import { LoginForm } from "../LoginForm/LoginForm";

// function gotoHome() {
//     location.href="index.html";
// }

class Navbar extends React.Component {
    constructor(){
        super();
        this.state = {isLogin: false};
    }
    render() {
        return (
            <div className="header_bar1">
                <img className="header_logo" src={logo} alt="Shop logo" />
                <nav className="header_navbar">
                    <ul>
                        <li><a href="about.html">About</a></li>
                        <li><a href="product.html">Products</a></li>
                    </ul>
                </nav>
                <div className="search-bar">
                    <form id="searchform" action="product.html">
                        <div className="search-bar1">
                            <span className="material-symbols-outlined">search</span>
                            <div className="search-inputdiv">
                                <input className="search-input" type="search" placeholder="Search" />
                            </div>
                            <span className="gg--close-o"></span>
                        </div>
                    </form>
                </div>
                <div id="customer_area">
                    <button className="signin_button">Sign in</button>
                </div>
            </div>
        );
    }
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
                <LoginForm />
            </header>
        </div>
    );
}

export default Header;
