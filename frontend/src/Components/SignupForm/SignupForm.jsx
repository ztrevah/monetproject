import React, { useState } from 'react';
import "./SignupForm.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Step1 = () => {
    const accTypes = ["Customer","Employee","Manager"];
    const [inputs,setInputs] = useState({email: "",accountType: "Customer"});
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const handleChange = e => {
        setInputs(values => ({...values, [e.target.name]: e.target.value}));
        
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:9090/backend/auth/signups1",inputs);
            console.log(res);
            navigate("/signup/step2");
        } catch(err) {
            console.log(err);
            setError(err.response.data);
        }
        
    };
    
    return (
        <form className="form-s1">
            <div className="email-enter-wrapper">
                <label htmlFor="email-enter">Enter your email address:</label> <br/>
                <div>
                    <input type="email" name="email" id="email-enter" placeholder="abc@xyz.mnp" onChange={handleChange} />
                    <br/>
                    <span style={{color: "red"}}>{error}</span>
                </div>
            </div>
            <div className="account-type-wrapper">
                <label htmlFor="account-type">Account for:</label> 
                <select id="account-type" className="account-type" name="accountType" onChange={handleChange}>
                    {accTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            <div className="continue-btn">
                <button className="submit-email-loginform" type="submit" onClick={handleSubmit}>Continue</button>
            </div>
        </form>
    );
}
const Step2 = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [surname,setSurname] = useState("");
    const [dob,setDob] = useState("");
    const [gender,setGender] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [code,setCode] = useState("");
    return (
        <form className="form-s3">
            <div className="inform-s3">
                <span>We have sent verification code to your email address. Enter the code and fill in your information to create account:</span>
            </div>
            <div className="form-s3-row1">
                <div className="verification-code-field">
                    <label htmlFor="code" className="form-s3-label">Verification code: {"(*)"}</label> <br/>
                    <div>
                        <input type="text" id="code" value={code} onChange={(event) => {setCode(event.target.value)}} />
                        <div className="resend-code">
                            <span className="mdi--refresh"></span>
                            <span>Resend code</span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="form-s3-row">
                <div className="email-field">
                    <label htmlFor="email" className="form-s3-label">Email address: {"(*)"}</label> 
                    <input type="email" id="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
                </div>
                <div className="password-field">
                    <label htmlFor="password" className="form-s3-label">Password: {"(*)"}</label> 
                    <input type="password" id="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />
                </div>
            </div>
            <div className="form-s3-row">
                <div className="firstname-field">
                    <label htmlFor="firstname" className="form-s3-label">First Name: {"(*)"}</label> 
                    <input type="text" id="firstname" value={firstName} onChange={(event) => {setFirstName(event.target.value)}} />
                </div>
                <div className="surname-field">
                    <label htmlFor="surname" className="form-s3-label">Surname:</label> 
                    <input type="text" id="surname" value={surname} onChange={(event) => {setSurname(event.target.value)}} />
                </div>
            </div>
            <div className="form-s3-row">
                <div className="dob-field">
                    <label htmlFor="dob" className="form-s3-label">Date of birth:</label> 
                    <input type="text" id="dob" value={dob} onChange={(event) => {setDob(event.target.value)}} />
                </div>
                <div className="gender-field">
                    <label htmlFor="gender" className="form-s3-label">Gender:</label> 
                    <input type="text" id="gender" value={gender} onChange={(event) => {setGender(event.target.value)}} />
                </div>
            </div>
            <div className="form-s3-row">
                <div className="address-field">
                    <label htmlFor="address" className="form-s3-label">Address:</label> 
                    <input type="text" id="address" value={address} onChange={(event) => {setAddress(event.target.value)}} />
                </div>
                <div className="phone-field"> 
                    <label htmlFor="phone" className="form-s3-label">Phone number: {"(*)"}</label> 
                    <input type="text" id="phone" value={phone} onChange={(event) => {setPhone(event.target.value)}} />
                </div>
            </div>
            <div className="continue-btn">
                <button className="submit-info-loginform" type="submit">Create account</button>
            </div>
            
            
        </form>
    );
}
const Step3 = (accountType) => {
    if(true) {
        return (
            <div className="form-s4">
                <div className="inform-s4">
                    <span>Your account has been created.</span> <br/>
                    <span>Welcome to our online shop! </span>
                </div>
                <div className="continue-btn">
                    <Link to="/">Let's start</Link>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="form-s4">
                <span>Your request to create an employee/manager account has been sent. We will inform you via your email address soon!</span>
                <div className="continue-btn">
                    <button className="finish-signup" type="submit">Back to home</button>
                </div>
            </div>
        );
    }
    
}

const SignupForm = (props) => {
    return (
        <div className="signupform">
            <div className="signupform-header">
                <span>Create new account</span>
            </div>
            <div className="signupform-content">
                {(props.step === 1) ? <Step1/> : ( (props.step === 2) ? <Step2/> : <Step3/> )}
            </div>
        </div>
    )
}

export default SignupForm;
