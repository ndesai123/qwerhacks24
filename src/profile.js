import "./styles/index.css"
import { Link } from "react-router-dom";

function Profile(){
    return(
        <div>
            <div class = "flex-container">
                <div class="headerBackground">
                    <div class = "flex-container">
                        <label class = "headerText">My Profile</label>
                        <div class ="profilepic"></div>
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