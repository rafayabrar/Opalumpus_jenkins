import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import HeroImage from "../assets/Hero Images/trips-hero.jpg";
import Trip from "../components/Trip";
import Footer from "../components/Footer";
import TripsPage from "../components/TripsPage";

function Trips() {
  return (
    <>
      <NavBar />
      <HeroSection cName="hero" heroImg={HeroImage} title="Explore Trips" />
      <Trip />
      <Footer />
    </>
  );
}
export default Trips;
