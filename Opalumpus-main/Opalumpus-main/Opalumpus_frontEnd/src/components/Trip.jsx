import "./TripsStyles.css";
import TripsData from "./TripsData";
import HunzaTrip from "../assets/Cities Images/hunzao.jpg";
import NaranTrip from "../assets/Cities Images/naran1.jpg";
import KelTrip from "../assets/Cities Images/arangkel.jpg";
import UpcomingEvents from "./UpcomingEvents";

function Trips() {
  return (
    <><div className="trip">
      <h1>Recent Trips</h1>
      <p>Our some of successful trips so far</p>
      <div className="tripcard">
        <TripsData
          image={HunzaTrip}
          heading="Trip to Hunza Valley"
          text="An adventure through lush meadows and crystal rivers. Key spots were Saif-ul-Malook Lake and the scenic Babusar Pass." />
        <TripsData
          image={NaranTrip}
          heading="Trip to Naran Valley"
          text="An adventure through lush meadows and crystal rivers. Key spots were Saif-ul-Malook Lake and the scenic Babusar Pass." />
        <TripsData
          image={KelTrip}
          heading="Trip to Arang Kel"
          text="A picturesque hike to the Pearl of Neelum Valley, offering panoramic views of green meadows and snow-clad peaks." />
      </div>
    </div><div>
        <UpcomingEvents />
      </div></>
  );
}

export default Trips;
