// eventPage.js
import React from 'react';
import './styles/createEvent.css';
import { Link } from "react-router-dom";
import AdventureBuddiesImage1 from './styles/images/AdventureBuddies1.png'

function Submitted() {

  return (
    <div>
        <h1>Your Event has been Successfully Submitted!</h1>
        <img src={AdventureBuddiesImage1} height="500"></img>
        <br></br>
        <Link to="/">
        <button>Back to Home</button>
        </Link>
    </div>
  );
}

export default Submitted;
