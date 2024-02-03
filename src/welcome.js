import { auth, googleProvider } from './firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { Button } from '@mui/material';

function Welcome() {

  function googleSignIn(){
    try {
      signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error.message);
    }
  };

//   {
//     user ? (
//       <button>
//   Profile
// </button>

//     ) : (
//       <Button variant='outlined' onClick={googleSignIn}>
//       Join!
//     </Button>

//     )}
    return (
      <div className="App">
        <div>
          <Button variant='outlined' onClick={googleSignIn}>
              Join!
          </Button>
        </div>
        <header className="App-header">
            <h1> Welcome! </h1>
        </header>
      </div>
    );
  }
  
  export default Welcome;