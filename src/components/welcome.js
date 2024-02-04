import { auth, googleProvider } from '../firebase.js';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Avatar, Button, Menu, MenuItem, TextField } from '@mui/material';
import { Link, useSearchParams } from "react-router-dom";
import AdventureBuddiesImage from '../styles/images/AdventureBuddies.png';
import SearchBar from './searchBar.js';
import {doc, getDoc, collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";

function Welcome() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [searchParams] = useSearchParams();

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

  const handleSearch = (query) => {
    // async function search(query) {}
    //   async function getData() {
    //     // const docRef = doc(db, "event", "JT2DqJFA0FOjHTZLUZ2j");
    
    //     const querySnapshot = await getDocs(collection(db, "event"));
    //     // console.log(querySnapshot);
    
    //     const temp = [];
    //     querySnapshot.forEach(async (doc) => {
    //       let data = doc.data();
    //       let obj = {};
    //       obj['id'] = data.id;
    //       obj['user'] = data.username;
    //       obj['title'] = data.eventName;
    //       let date = new Date(data.date * 1000);
    //       obj['date'] = date.toString();
    //       obj['location'] = data.eventLocation;
    //       obj['description'] = data.eventDescription;
    
    //       temp.push(obj);
    //       // console.log(doc.id, "=>", doc.data());
    //     })
    
    //     return temp;
    //     // const docSnap = await getDoc(docRef);
    //     // console.log(docSnap.data());
    //   }
    //   let data = await getData();
    //   let out = data.filter((event) => {

    //   })
    //   setResults(out);
    // }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
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
            <Button className="button-style buttontext topbutton" variant='standard' onClick={googleSignIn}>
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
        <input className="search-bar" id="user-input" placeholder="Enter Your Event Preference, or Hit Search" value={userInput} onChange={handleInputChange}/>
        {/* <SearchBar onSearch={handleSearch} /> */}
        <Link to={"/feed?q="+encodeURIComponent(userInput)}>
          <Button class = "searchbutton buttontext" onClick={handleSearch}>Search</Button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Welcome;