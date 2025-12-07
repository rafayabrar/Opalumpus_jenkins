import React from "react";
import "./TripsStyles.css";

function TripsData(props) {
  return (
    <div className="t-card">
      <div className="t-img">
        <img src={props.image} alt="image" />
      </div>
      <h4>{props.heading}</h4>
      <p>{props.text}</p>
    </div>
  );
}
export default TripsData;