import { auth, googleProvider } from '../firebase.js';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Avatar, Button, Menu, MenuItem, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import AdventureBuddiesImage from '../styles/images/AdventureBuddies.png';
import SearchBar from './searchBar.js';

function Welcome() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // setUser(result.user); // you may not need this line as you're already using onAuthStateChanged
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signOutGoogle = () => {
    signOut(auth);
    setUser(null);
  };

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

  const handleSearch = () => {

  };

  return (
<div class="background">
    <div className="MainInterface">
      <div className='header'>
        {user ? (
          <div>
            <Avatar alt={user.displayName} src={user.photoURL} onClick={handleMenuOpen} sx={{ borderRadius: '50%', marginLeft: 'auto' }} />
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
        ) : (
          <div className="button-spacing">
            <Button className="button-style buttontext" variant='standard' onClick={googleSignIn}>
              Sign Up!
            </Button>
            <label class = "padding"></label>
            <Button className="button-style buttontext" variant='standard' onClick={googleSignIn}>
              Sign In!
            </Button>
          </div>
        )}
      </div>
      <div className="greeting">
        <h1 class="titletext"> welcome! </h1>
        <img
              src={AdventureBuddiesImage}
              alt="Adventure Buddies"
            />
      </div>
      <div class = "searchbargrid"> 
        {/* <TextField className="search-bar" variant = "standard" InputProps={{ disableUnderline: true }}/> */}
        <input className="search-bar" placeholder="Enter Your Location" />
        {/* <SearchBar onSearch={handleSearch} /> */}
        <Link to="/feed">
          <Button class = "searchbutton buttontext">Search</Button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Welcome;