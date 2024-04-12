import React from 'react'
import logo from "../assets/media/shoplogo.png";

export const LoginForm = () => {
  return (
    <div className="popupLoginForm">
        <div className="header-loginform">
            <span className="gg--close-o"></span>
            <br />
            <img className="logo-loginform" src={logo} alt="Shop logo" />
            <br />
            <h2>Sign in</h2>
            <form>
                <div className="form-element">
                    <label htmlFor="username">Username/ Email address:</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className="form-element">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className="form-element">
                    <input type="checkbox" name="rememberme" id="rememberme" />
                    <label htmlFor="rememberme">Remember me</label>
                </div>
                <div className="form-element">
                    <button>Sign in</button>
                </div>
            </form>
            <span><a href="">Forget your password?</a></span>
            <br />
            <span>Haven't got an account? <a href="">Sign up</a></span>
        </div>
    </div>
  )
}
