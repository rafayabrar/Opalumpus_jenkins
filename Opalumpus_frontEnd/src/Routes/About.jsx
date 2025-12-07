import NavBar from "../components/NavBar";
import AboutImage from "../assets/Hero Images/tour.jpg";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";

function About() {
  return (
    <>
      <NavBar />
      <HeroSection cName="hero" heroImg={AboutImage} title="About Us" />
      <AboutUs />
      <Footer />
    </>
  );
}
export default About;
