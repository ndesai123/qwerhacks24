import { auth, googleProvider } from '../firebase.js';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Avatar, Button, TextField } from '@mui/material';

function Welcome() {

  const [user, setUser] = useState(null);



  function googleSignIn(){
      signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        onAuthStateChanged(auth, (user) => {
          setUser(user)});
        }
      ).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
  function signOutGoogle(){
    signOut(auth);
    setUser(null);
  }

    return (
      <div className="MainInterface">
        <div className='header'>
          {
            user ? (
              <div>
                <Avatar alt={user.displayName} src={user.photoURL} />
                <Button variant='outlined' onClick={signOutGoogle}>
                  signOut!
                </Button>
              </div>
            ) : (
              <Button variant='outlined' onClick={googleSignIn}>
                Join!
              </Button>
            )
          }
        </div>
        <div className="greeting">
            <h1> Welcome! </h1>
        </div>
        <div>
          <TextField />
        </div>
      </div>
    );
  }
  
  export default Welcome;