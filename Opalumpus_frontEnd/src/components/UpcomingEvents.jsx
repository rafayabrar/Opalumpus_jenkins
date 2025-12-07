import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpcomingEvents.css";
import { useNavigate } from "react-router-dom";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch upcoming events from the server
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/trips`)
      .then(response => {
        console.log("Fetched events:", response.data.trips); // Debugging line
        setEvents(response.data.trips);
      })
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const handleBookNow = () => {
    navigate("/book-now");
  }
  return (
    <div className="upcoming-events-container">
      <h2>Upcoming Trips</h2>
      {events.length === 0 ? (
        <p>No upcoming events available.</p>
      ) : (
        events.map(event => (
          <div key={event._id} className="event-item">
            <h3>{event.destination}</h3>
            <p>Duration: {event.duration}</p>
            <p>Price: {event.price}</p>
            <p>Description: {event.description}</p>
            <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
          </div>
        ))
      )}
    </div>
  );
}

export default UpcomingEvents;