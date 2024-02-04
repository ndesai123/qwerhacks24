import "./styles/index.css"
import { Link } from "react-router-dom";
import AdventureBuddiesImage1 from './styles/images/AdventureBuddies1.png'
import { Avatar, Menu, MenuItem } from '@mui/material';
import { auth, db } from './firebase.js'; 
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';

function Profile(){
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };
      const [anchorEl, setAnchorEl] = useState(null);
      const goToProfile = () => {
        handleMenuClose();
      };
      const createEvent = () => {
        handleMenuClose();
      };
      const signOutGoogle = () => {
        signOut(auth);
      };
    return(
        
        
        <div>
            <div class = "flex-container">
                <div class="headerBackground">
                    <div class = "flex-container">
                        <label class = "headerText">My Profile</label>
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
                        <div>          
                            <Link to="/">
                                <img src={AdventureBuddiesImage1} height="100"></img>
                            </Link>
                        </div>
                    </div>
                        
                </div>
            </div>
                
                
            <div class = "flex-container">
                <div class = "profilebox">
                    <div class = "profileboxtext">My Events</div>
                    <hr class="line"></hr>
                    <div class = "flex_vertical">
                        <div class = "eventitem">
                        <p class="eventText">Event Title</p>
                            <p class="eventText">Date</p>
                            <p class = "eventText">Location</p>
                            <button type = "button" class = "topbutton">Modify Event</button>
                        </div>
                        <div class = "eventitem">
                        <p class="eventText">Event Title</p>
                            <p class="eventText">Date</p>
                            <p class = "eventText">Location</p>
                            <button type = "button" class = "topbutton">Modify Event</button>
                        </div>
                        <button type = "button" class = "profilebutton">
                            <Link to="/create-event">
                                <label class = "buttontext">Create Event</label>
                            </Link>
                        </button>
                    
                    </div>
                </div>
                <div class = "profilebox">
                    <div class = "profileboxtext">Interested Events</div>
                    <hr class="line"></hr>
                    <div class = "flex_vertical">
                        <div class = "eventitem">
                            <p class="eventText">Event Title</p>
                            <p class="eventText">Date</p>
                            <p class = "eventText">Location</p>
                            <button type = "button" class = "topbutton">No Longer Interested</button>
                        </div>
                            
                        <div class = "eventitem">
                        <p class="eventText">Event Title</p>
                            <p class="eventText">Date</p>
                            <p class = "eventText">Location</p>
                            <button type = "button" class = "topbutton">No Longer Interested</button>
                        </div>
                        <div class = "eventitem">
                        <p class="eventText">Event Title</p>
                            <p class="eventText">Date</p>
                            <p class = "eventText">Location</p>
                            <button type = "button" class = "topbutton">No Longer Interested</button>
                        </div>
                        <button type = "button" class = "profilebutton">
                            <Link to="/feed">
                            <label class = "buttontext">Explore Events</label>
                            </Link>
                        </button>
                    
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Profile;