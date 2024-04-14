import React, { useState } from 'react'
import "./SignupForm.css"
import { Link } from 'react-router-dom';

const Step1 = () => {
    const [accType,setAccType] = useState("Customer");
    const [email,setEmail] = useState("");
    const accTypes = ["Customer","Employee","Manager"];
    return (
        <form className="form-s1">
            <div className="email-enter-wrapper">
                <label htmlFor="email-enter">Enter your email address:</label> <br/>
                <div>
                    <input type="email" id="email-enter" placeholder="abc@xyz.mnp" value={email} onChange={(event)=> {setEmail(event.target.value)}} />
                </div>
            </div>
            <div className="account-type-wrapper">
                <label htmlFor="account-type">Account for:</label> 
                <select id="account-type" className="account-type" value={accType} onChange={(event)=> {setAccType(event.target.value)}}>
                    {accTypes.map((t) => <option value={t}>{t}</option>)}
                </select>
            </div>
            <div className="continue-btn">
                <button className="submit-email-loginform" type="submit">Continue</button>
            </div>
        </form>
    );
}
const Step2 = () => {
    const [code,setCode] = useState("");
    return (
        <form className="form-s2">
            <span className="inform1-s2">We have sent verification code to your email address. Enter the code to continue:</span>
            <div className="input-code">
                <input type="text" id="verification-code" value={code} onChange={(event) => {setCode(event.target.value)}} />
                <span></span>
            </div>
            <span className="inform2-s2">The verification code will expire in <span style={{color:"#CD1010"}}>2 minutes.</span></span>
            <div className="continue-btn">
                <button className="submit-code-loginform" type="submit">Continue</button>
            </div>
        </form>
    );
}
const Step3 = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [surname,setSurname] = useState("");
    const [dob,setDob] = useState("");
    const [gender,setGender] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    return (
        <form className="form-s3">
            <div className="inform-s3">
                <span>Your email has been verified. Please complete your information below: </span>
            </div>
            <div className="form-s3-row">
                <div className="email-field">
                    <label htmlFor="email">Email address: {"(*)"}</label> <br/>
                    <input type="text" id="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
                </div>
                <div className="password-field">
                    <label htmlFor="password">Password: {"(*)"}</label> <br/>
                    <input type="text" id="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />
                </div>
            </div>
            <div className="form-s3-row">
                <div className="firstname-field">
                    <label htmlFor="firstname">First Name: {"(*)"}</label> <br/>
                    <input type="text" id="firstname" value={firstName} onChange={(event) => {setFirstName(event.target.value)}} />
                </div>
                <div className="surname-field">
                    <label htmlFor="surname">Surname:</label> <br/>
                    <input type="text" id="surname" value={surname} onChange={(event) => {setSurname(event.target.value)}} />
                </div>
            </div>
            <div className="form-s3-row">
                <div className="dob-field">
                    <label htmlFor="dob">Date of birth:</label> <br/>
                    <input type="text" id="dob" value={dob} onChange={(event) => {setDob(event.target.value)}} />
                </div>
                <div className="gender-field">
                    <label htmlFor="gender">Gender:</label> <br/>
                    <input type="text" id="gender" value={gender} onChange={(event) => {setGender(event.target.value)}} />
                </div>
            </div>
            <div className="form-s3-row">
                <div className="address-field">
                    <label htmlFor="address">Address:</label> <br/>
                    <input type="text" id="address" value={address} onChange={(event) => {setAddress(event.target.value)}} />
                </div>
                <div className="phone-field"> 
                    <label htmlFor="phone">Phone number: {"(*)"}</label> <br/>
                    <input type="text" id="phone" value={phone} onChange={(event) => {setPhone(event.target.value)}} />
                </div>
            </div>
            <div className="continue-btn">
                <button className="submit-info-loginform" type="submit">Submit</button>
            </div>
            
            
        </form>
    );
}
const Step4 = (accountType) => {
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
const SignupForm = () => {
    const [step,setStep] = useState(1);
    return (
        <div className="signupform">
            <div className="signupform-header">
                <span className="ph--arrow-left" onClick={() => {setStep((step === 1 ) ? 1 : (step-1));
                                                                }}>
                </span>
                <span>Create new account</span>
                <span className="ph--arrow-right" onClick={() => {setStep((step === 4 ) ? 4 : (step+1));
                                                                }}>
                </span>
            </div>
            <div className="signupform-content">
                {(step === 1) ? <Step1/> : ( (step === 2) ? <Step2/> : ((step === 3) ? <Step3/> : <Step4/>) )}
            </div>
        </div>
    )
}

export default SignupForm;
