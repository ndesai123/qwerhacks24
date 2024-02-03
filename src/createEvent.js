// eventPage.js
import React from 'react';
import './createEvent.css';
import { db } from './firebase.js'; 

function EventPage() {
  const createEvent = async () => {
    // Get form values and perform actions
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventTime = document.getElementById("eventTime").value;
    const eventLocation = document.getElementById("eventLocation").value;
    const eventDescription = document.getElementById("eventDescription").value;

    // Create an object to store the event details
    const eventData = {
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      description: eventDescription
    };

    // You can perform further actions with the eventData, such as sending it to a server or displaying it.
    console.log(eventData);
    try {
      // Store the event data in Firestore
      await db.collection('events').add(eventData);
      console.log('Event data stored successfully:', eventData);
    } catch (error) {
      console.error('Error storing event data:', error);
    }
  };

  return (
    <div>
      <header>
        <div>
          {/* <div class = "overlay" onclick="toggleOverlay()">
            <label class = "overlayText">Your Response Has Been Submitted :D</label>
          </div> */}
          <form id="eventForm" class="box">
              <button class="button-box" type="button">
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
                <button type="button" class="submit-button" onClick="createEvent(); toggleOverlay();">
                    <label class="button-text">Submit</label>
                </button>
              </div>
          </form>
        </div>
      </header>
    </div>
  );

  function toggleOverlay() {
    var overlay = document.getElementsByClassName("overlay")[0];
    overlay.style.display = (overlay.style.display === "flex") ? "none" : "flex";
  }
}

export default EventPage;
