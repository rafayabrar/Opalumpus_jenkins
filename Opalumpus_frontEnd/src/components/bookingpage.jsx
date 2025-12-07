import React, { useState } from "react";
import axios from "axios";
import "./bookingpage.css";
import { useNavigate } from "react-router-dom";

function BookingPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    tripId: "",
    numberOfPeople: "",
    totalPrice: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReturn = () => {
    navigate("/trips");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/booknow`, formData)
      .then(response => {
        alert("Booking successfully created!");
        setFormData({
          userName: "",
          userEmail: "",
          numberOfPeople: "",
          additionalNotes: "",
        });
      })
      .catch(error => {
        console.error("Error creating booking:", error);
        alert("There was an error creating the booking. Please try again.");
      });
  };

  return (
    <>
    <div className="booking-container">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Book Your Trip</h2>
        <div className="form-group">
          <label htmlFor="userName">Your Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter your name"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">Your Email</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            placeholder="Enter your email"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfPeople">Number of People</label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            placeholder="Enter the number of people"
            value={formData.numberOfPeople}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            placeholder="Enter any additional notes (optional)"
            rows="4"
            value={formData.additionalNotes}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="booking-button">Book Now</button>
      </form>
      <button className="return-btn" onClick={handleReturn}>Return to Trips Page</button>
    </div>
    </>
  );
}

export default BookingPage;
