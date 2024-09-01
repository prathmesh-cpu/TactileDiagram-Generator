import React from 'react'
import signupImg from "../assets/signup.png";
import Template from './Template';


function Signup({ setIsLoggedIn }) {
  return (
    <Template
      title="Join with Insights for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to help visually imapact"
      image={signupImg}
      formType="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default Signup