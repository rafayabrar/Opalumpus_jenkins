import "./CRUD.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function CRUDform() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    price: "",
    description: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    // Fetch existing events from the server
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/trips`)
      .then(response => setEvents(response.data.trips))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdating) {
      axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/trips/${updateId}`, formData)
        .then(response => {
          setEvents(events.map(event => (event._id === updateId ? response.data : event)));
          setIsUpdating(false);
          setUpdateId(null);
          setFormData({ destination: "", duration: "", price: "", description: "" });
        })
        .catch(error => console.error("Error updating event:", error));
    } else {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/trips/add`, formData)
        .then(response => {
          setEvents([...events, response.data.trip]);
          setFormData({ destination: "", duration: "", price: "", description: "" });
        })
        .catch(error => console.error("Error adding event:", error));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/trips/${id}`)
      .then(() => setEvents(events.filter(event => event._id !== id)))
      .catch(error => console.error("Error deleting event:", error));
  };

  const handleUpdate = (id) => {
    const eventToUpdate = events.find(event => event._id === id);
    setFormData({
      destination: eventToUpdate.destination,
      duration: eventToUpdate.duration,
      price: eventToUpdate.price,
      description: eventToUpdate.description,
    });
    setIsUpdating(true);
    setUpdateId(id);
  };

  return (
    <>
      <div className="trips-container">
        <form className="trips-form" onSubmit={handleSubmit}>
          <h2>{isUpdating ? "Update Trip" : "CRUD Trips"}</h2>
          <div className="form-group">
            <label htmlFor="destination">Trip Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              placeholder="Enter trip destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Trip Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              placeholder="Enter trip duration (e.g., 5 days)"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Trip Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter trip price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Trip Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter trip description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="trips-button">{isUpdating ? "Update" : "Submit"}</button>
        </form>
      </div>
      <div className="events-list">
        <h2>Created Events</h2>
        {events.map(event => (
          <div key={event._id} className="event-item">
            <h3>{event.destination}</h3>
            <p>Duration: {event.duration}</p>
            <p>Price: {event.price}</p>
            <p>Description: {event.description}</p>
            <button className="update-button" onClick={() => handleUpdate(event._id)}>Update</button>
            <button className="delete-button" onClick={() => handleDelete(event._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CRUDform;