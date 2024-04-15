import React from 'react';
import Header from '../Components/Header/Header';
import SignupForm from '../Components/SignupForm/SignupForm';
import Footer from '../Components/Footer/Footer';

const Signup = () => {
  return (
    <>
      <Header />
      <main>
        <SignupForm />
      </main>
      <Footer />
    </>
  )
}

export default Signup;