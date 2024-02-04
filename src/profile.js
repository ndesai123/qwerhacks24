import "./styles/index.css"
import { Link } from "react-router-dom";
import AdventureBuddiesImage1 from './styles/images/AdventureBuddies1.png'
import { Avatar, Menu, MenuItem } from '@mui/material';
import { auth, db } from './firebase.js'; 
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import {collection, getDocs} from "firebase/firestore";

function Profile(){
    const user = auth.currentUser;
    const [events, setEvents] = useState([]);
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

      async function getData() {
        // const docRef = doc(db, "event", "JT2DqJFA0FOjHTZLUZ2j");
    
        const querySnapshot = await getDocs(collection(db, "event"));
        // console.log(querySnapshot);
    
        const temp = [];
        querySnapshot.forEach(async (doc) => {
          let data = doc.data();
          let obj = {};
          obj['id'] = data.id;
          obj['user'] = data.username;
          obj['title'] = data.eventName;
          let date = new Date(data.date * 1000);
          obj['date'] = date.toString();
          obj['location'] = data.eventLocation;
          obj['description'] = data.eventDescription;
    
          temp.push(obj);
          // console.log(doc.id, "=>", doc.data());
        })
    
        return temp;
        // const docSnap = await getDoc(docRef);
        // console.log(docSnap.data());
      }
      const handleToggleInterest = (eventId) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, interested: !event.interested } : event
          )
        );
      };

      useEffect(() => {
        // In a real-world scenario, you might fetch events from a server here.
        // For simplicity, we're using dummy data.
        async function callData() {
          console.log(await getData());
          setEvents(await getData());
        }
        callData();
    
        // getData();
      }, []);

    return(
        
        
        <div>
            <div class = "flex-container">
                <div class="headerBackground">
                    <div class = "flex-container">
                        <label class = "headerText">My Profile</label>
                        <Avatar alt={auth.currentUser === null ? "" : auth.currentUser.displayName} 
                                            src={auth.currentUser === null ? "" : auth.currentUser.photoURL} 
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
                            <Link to="/">
                            <MenuItem onClick={signOutGoogle}>Sign Out</MenuItem>
                            </Link>
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
                            <ul class="centering">
                                {events.filter((event)=>{
                                    if(auth.currentUser) {
                                        return event.user === auth.currentUser.email
                                    }
                                    return true;
                                }).map((event) => (
                                    <div class = "eventitem">
                                    <p class="eventText">Event: {event.title}</p>
                                        <p class="eventText">Date: {event.date}</p>
                                        <p class = "eventText">Place: {event.location}</p>
                                    </div>
                                ))}
                            </ul>
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