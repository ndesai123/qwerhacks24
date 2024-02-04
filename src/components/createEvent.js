// eventPage.js
import React, { useState } from 'react';
import '../styles/createEvent.css';
import { auth, db } from '../firebase.js'; 
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore"; 
import Swal from 'sweetalert2'
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth';



function EventPage() {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  }
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    handleMenuClose();
  };

  const createEvent = () => {
    handleMenuClose();
  };
  const signOutGoogle = () => {
    signOut(auth);
  };

  const handleFormSubmit = async () => {
    // Get user information
    const user = auth.currentUser;
    if (!user) {
      console.error('User not signed in.');
      return;
    }

    // Get form values and perform actions
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventTime = document.getElementById("eventTime").value;
    const eventLocation = document.getElementById("eventLocation").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const combinedDateTime = new Date(`${eventDate}T${eventTime}`) 
    const unixTimestamp = Math.floor(combinedDateTime.getTime() / 1000);


    if (!eventName || !eventDate || !eventTime || !eventLocation || !eventDescription) {
      // Show an error popup using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all required fields!',
        confirmButtonColor: "#436850",

      });
      return;
    }


    // You can perform further actions with the eventData, such as sending it to a server or displaying it.
    try {
      // Add data to Firestore
      const docRef = await addDoc(collection(db, "event"), {
        owner: user.uid, // Assuming user.uid is the unique user ID
        username: user.email,
        eventName,
        date: unixTimestamp,
        eventLocation,
        eventDescription,
        participants: [user.uid],
      });
      console.log('Event data stored successfully with ID:', docRef.id);

      navigate('/submitted');

    } catch (error) {
      console.error('Error storing event data:', error);
    }
  };

  return (
    <div>
      <header>
          <div class="top-bar">
            <label class="main-title">Submit an Event</label>
            <Avatar alt={auth.currentUser.displayName} 
                    src={auth.currentUser.photoURL} 
                    sx={{ width: 56, height: 56, marginTop: 2 }} onClick={handleMenuOpen} />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
            <Link to="/account">
                <MenuItem onClick={goToProfile}>My Profile</MenuItem>
            </Link>
            <Link to="/create-event">
              <MenuItem onClick={createEvent}>Create Event</MenuItem>
</Link>
              <MenuItem onClick={signOutGoogle}>Sign Out</MenuItem>
            </Menu>
          </div>
        <div>
          <form id="eventForm" class="box">
              <button class="button-box" type="button" onClick={ handleBack } >
                  <label class="button-text">Back</label>
              </button>
              
              <hr class="line"/>
              <div>
                  <label class="subheading">Event Title:</label><br/>
                  <input class="subtext" type="text" id="eventName" name="eventName" required />
              </div>

              <div>
                  <label class="subheading">Date and Time:</label><br/>
                  <div class="column-count">
                      <input type="date" id="eventDate" name="eventDate" class="subtext-split" required />
                      <input type="time" id="eventTime" name="eventTime" class="subtext-split" required />
                  </div>
              </div>

              <div>
                  <label class="subheading">Location:</label><br/>
                  <input type="text" id="eventLocation" name="eventLocation" class="subtext" required />
              </div>

              <div>
                  <label class="subheading">Event Description:</label> <br/>
                  <textarea id="eventDescription" name="eventDescription" rows="10" class="subtext" required></textarea>
              </div>
              <div>
                <button type="button" class="submit-button" onClick={ handleFormSubmit }>
                  <label className="button-text">Submit</label>
                </button>
              </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default EventPage;
