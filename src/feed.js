// FeedPage.js
import React, { useState, useEffect } from 'react';
import './styles/feed.css'
import AdventureBuddiesImage1 from './styles/images/AdventureBuddies1.png'
import { Link } from "react-router-dom";
import {doc, getDoc, collection, getDocs} from "firebase/firestore";
import {db} from "./firebase.js";
import { Avatar, Menu, MenuItem } from '@mui/material';
import { auth} from './firebase.js'; 
import { signOut } from 'firebase/auth';

function FeedPage() {
  const [events, setEvents] = useState([]);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = useState(null);
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

  // Simulated data for demonstration purposes
  const dummyEvents = [
    {
      id: 1,
      user: 'Natalie',
      title: 'Event 1',
      date: '2022-02-15',
      time: '15:00',
      location: 'Venue A',
      description: 'Description for Event 1',
    },
    {
      id: 2,
      user: 'Shenran',
      title: 'Event 2',
      date: '2022-02-20',
      time: '18:30',
      location: 'Venue B',
      description: 'Description for Event 2',
    },
    {
      id: 3,
      user: 'Esha',
      title: 'Event 3',
      date: '2022-02-20',
      time: '18:30',
      location: 'Venue B',
      description: 'Description for Event 2',
    },
    // Add more events as needed
  ];

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

  return (
    <div>
      <div class="top-bar">
        <label class="main-title">Events Near You</label>
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
        <div >
          <Link to="/">
              <img src={AdventureBuddiesImage1} height="100"></img>
          </Link>
        </div>
      </div>

      <ul>
        {events.map((event) => (
          <div class="rows">
            <div class="event-box column" key={event.id}>
              <h2 class="event-title">{event.title}</h2>

              {/* user */}
              <div class="event-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <g clip-path="url(#clip0_32_25)">
                    <path d="M7.99997 9.14286C9.57792 9.14286 10.8571 7.86367 10.8571 6.28572C10.8571 4.70776 9.57792 3.42857 7.99997 3.42857C6.42201 3.42857 5.14282 4.70776 5.14282 6.28572C5.14282 7.86367 6.42201 9.14286 7.99997 9.14286Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.12 13.6C3.62998 12.7629 4.34675 12.071 5.20138 11.591C6.05601 11.1108 7.01976 10.8587 8 10.8587C8.98024 10.8587 9.94398 11.1108 10.7986 11.591C11.6533 12.071 12.37 12.7629 12.88 13.6" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.99998 15.4286C12.1027 15.4286 15.4286 12.1027 15.4286 8C15.4286 3.89731 12.1027 0.571426 7.99998 0.571426C3.8973 0.571426 0.571411 3.89731 0.571411 8C0.571411 12.1027 3.8973 15.4286 7.99998 15.4286Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_32_25">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <label class="event-subheading">{event.user}</label>
              </div>

              {/* location */}
              <div class="event-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <g clip-path="url(#clip0_32_14)">
                    <path d="M7.99998 15.4286C12.1027 15.4286 15.4286 12.1027 15.4286 8C15.4286 3.89731 12.1027 0.571426 7.99998 0.571426C3.8973 0.571426 0.571411 3.89731 0.571411 8C0.571411 12.1027 3.8973 15.4286 7.99998 15.4286Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.57143 12L10.8571 5.14285L4 7.42857L6.85714 9.14285L8.57143 12Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_32_14">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <label class="event-subheading">{event.location}</label>
              </div>

              {/* date and time */}
              <div class="event-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 5.92308V9L12.1262 12.6431" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <label class="event-subheading">{event.date}</label>
              </div>

              {/* description */}
              <div class="event-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <g clip-path="url(#clip0_32_18)">
                    <path d="M2.14969 5.43275L0.69395 14.6525C0.63344 15.0357 0.964273 15.3665 1.34751 15.3061L10.5672 13.8503C11.0759 13.7699 11.468 13.3594 11.5249 12.8477L12 8.57143L7.42855 4L3.15236 4.47513C2.64056 4.532 2.23 4.92411 2.14969 5.43275Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.42859 4L9.7143 0.571426" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 8.57143L15.4286 6.28571" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.14282 14.8571L5.71425 10.2857" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.57141 9.14285L6.85713 11.4286" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_32_18">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <label class="event-subheading">{event.description}</label>
              </div>

              {/* interested button */}
              <button type="button" class="button-box-feed" style={{ background: event.interested ? '#436850' : 'rgba(67, 104, 80, 0.20)' }} onClick={() => handleToggleInterest(event.id)}>
                <label class="button-text" style={{ color: event.interested ? '#FAF8ED' : '#436850' }}>{event.interested ? 'No Longer Interested' : 'Interested!'}</label>
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FeedPage;
