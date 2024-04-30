import React from 'react';
import Header from '../Components/Header/Header';
import SignupForm from '../Components/SignupForm/SignupForm';
import Footer from '../Components/Footer/Footer';

const Signup = (props) => {
  return (
    <>
      <Header />
      <main>
        <SignupForm step={props.step}/>
      </main>
      <Footer />
    </>
  )
}

export default Signup;