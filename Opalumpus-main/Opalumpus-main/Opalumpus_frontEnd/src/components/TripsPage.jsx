import React from "react";
import TripsData from "./TripsData";
import UpcomingEvents from "./UpcomingEvents";
import "./TripsPage.css";

function TripsPage() {
  return (
    <div>
      <TripsData />
      <UpcomingEvents />
    </div>
  );
}

export default TripsPage;