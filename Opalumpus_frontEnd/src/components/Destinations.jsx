import "./Destinations.css";
import HunzaOne from "../assets/Cities Images/hunza1.jpg";
import HunzaTwo from "../assets/Cities Images/hunza2.jpg";
import SkarduOne from "../assets/Cities Images/skardunew.jpg";
import SkarduTwo from "../assets/Cities Images/skardu2.jpg";
import KashmirOne from "../assets/Cities Images/kashmir1.jpg";
import KashmirTwo from "../assets/Cities Images/kashmir2.jpg";
import GwadarOne from "../assets/Cities Images/gwadar1.jpg";
import GwadarTwo from "../assets/Cities Images/gwadar2.jpg";
import DestinationsData from "./DestinationsData";

const Destinations = () => {
  return (
    <div className="destinations">
      <h1>Popular Destinations</h1>
      <p>Top-rated destinations handpicked for you</p>

      <DestinationsData
        heading="Hunza Valley, Gilgit-Baltistan"
        text="A stunning mountainous valley known for its picturesque landscapes, terraced fields, and snow-capped peaks. It is surrounded by majestic mountains like Rakaposhi and Ultar Sar. Popular attractions include Attabad Lake and the historic Baltit and Altit Forts."
        img1={HunzaOne}
        img2={HunzaTwo}
      />
      <DestinationsData
        heading="Azad Kashmir"
        text="Famous for its lush green meadows, sparkling rivers, and scenic valleys, Azad Kashmir offers breathtaking destinations like Neelum Valley, Rawalakot, and Ratti Gali Lake. The region is also rich in culture and natural beauty, making it a must-visit for nature lovers."
        img1={KashmirOne}
        img2={KashmirTwo}
      />
      <DestinationsData
        heading="Skardu, Gilgit-Baltistan"
        text="Known as the gateway to some of the world’s highest peaks, Skardu is famous for its serene lakes like Shangrila and Sheosar, the vast Deosai National Park, and stunning views of the Karakoram Range. It is a hub for adventurers heading toward K2."
        img1={SkarduOne}
        img2={SkarduTwo}
      />
      <DestinationsData
        heading="Gwadar, Balochistan"
        text="A coastal gem in Pakistan, Gwadar boasts pristine beaches like Gwadar Beach and Astola Island. The city is known for its turquoise waters, the iconic Hammerhead, and its importance in the China-Pakistan Economic Corridor (CPEC)."
        img1={GwadarOne}
        img2={GwadarTwo}
      />
    </div>
  );
};

export default Destinations;
