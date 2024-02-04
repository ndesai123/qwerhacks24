// eventPage.js
import React from 'react';
import './styles/createEvent.css';
import { Link } from "react-router-dom";
import AdventureBuddiesImage1 from './styles/images/AdventureBuddies1.png'

function Submitted() {

  return (
    <div class = "SubmitInterface">
      <div><h1 class= "headerText centering">Your Event has been Successfully Submitted!</h1></div>
        
        <div class = "centering"><img src={AdventureBuddiesImage1} height="300"></img></div>
        <div class = "centering">
          <br></br>
          <Link to="/">
          <button class = "button-style-white button-text-white" >Back to Home</button>
        </Link>
        </div>
    </div>
  );
}

export default Submitted;
