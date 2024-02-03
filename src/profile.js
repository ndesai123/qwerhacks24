import "./index.css"

function Profile(){
    return(
        <div>

                <div class="headerBackground">
                    <div class = "flex-container">
                        <label class = "headerText">My Profile</label>
                        <div class ="profilepic"></div>
                    </div>
                    
                </div>
                
                


            <div class = "flex-container">
                <div class = "profilebox">
                    <div class = "profileboxtext">My Events</div>
                    <hr class="line"></hr>
                    <div class = "eventitem">Event 1</div>
                    <div class = "eventitem">Event 1</div>
                    <div class = "eventitem">Event 1</div>
                    <button type = "button" class = "profilebutton">
                        <label class = "buttontext">Create Event</label>
                    </button>
                    
                </div>
                <div class = "profilebox">
                    <div class = "profileboxtext">Interested Events</div>
                    <hr class = "line"></hr>
                    <div class = "eventitem">Event 1</div>
                    <div class = "eventitem">Event 1</div>
                    <div class = "eventitem">Event 1</div>
                    <button class = "profilebutton">
                        <label class = "buttontext">Explore Events</label>
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Profile;