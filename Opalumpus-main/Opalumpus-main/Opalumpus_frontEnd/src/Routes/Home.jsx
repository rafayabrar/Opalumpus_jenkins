import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";
import HeroImage from "../assets/Hero Images/home-hero.jpg";
import Destinations from "../components/Destinations";
import Trip from "../components/Trip";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <NavBar />
      <HeroSection
        cName="hero"
        heroImg={HeroImage}
        title="Opalumpus - Travel and Tour Agency"
        text="Your partner to every adventure"
        url="/trips"
        btnText="Travel Plan"
        btnClass="travelBtnClass"
      />
      <Destinations />
      <Trip />
      <Footer />
      <style>
        {`
          .upcoming-events-container {
            display: none;
          }
        `}
      </style>
    </>
  );
}

export default Home;
