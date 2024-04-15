import React from 'react'
import logo from "../assets/media/shoplogo.png";
import "../LoginForm/LoginForm.css"
import { Link } from 'react-router-dom';

export const LoginForm = (props) => {
  return (props.trigger) ? (
    <>
        <div className="overlay" onClick={() => props.setTrigger(false)}></div>
        <div className="popupLoginForm">
            <div className="close-btn">
                <span className="gg--close-o" onClick={() => props.setTrigger(false)}></span>
            </div>
            <div className="header-loginform">
                <img className="logo-loginform" src={logo} alt="Shop logo" />
                <br />
                <span>Sign in</span>
            </div>
            <div className="loginform">
                <form method="post">
                    <div className="form-element1 form-element">
                        <label htmlFor="username">Username/ Email address:</label>
                        <br />
                        <input type="email" name="username" id="username" />
                    </div>
                    <div className="form-element2 form-element">
                        <label htmlFor="password">Password:</label>
                        <br />
                        <input type="password" name="password" id="password" />
                    </div>
                    <div className="form-element3 form-element">
                        <input type="checkbox" name="rememberme" id="rememberme" />
                        <label htmlFor="rememberme">Remember me</label>
                    </div>
                    <div className="form-element4 form-element">
                        <button type="submit">Sign in</button>
                    </div>
                </form>
            </div>
            <div className="optional-login">
                <div className="op1">
                    <span><Link to="/forgotpassword">Forget your password?</Link></span>
                </div>
                <div className="op2">
                    <span>Haven't got an account? <Link to="/signup">Sign up</Link></span>
                </div>
            </div>
        </div>
    </>
  ) : "";
}
