import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import HeroImage from "../assets/Hero Images/contact-hero.jpg";
import Footer from "../components/Footer";


function ContactUs() {
  return (
    <>
      <NavBar />
      <HeroSection
        cName="hero"
        heroImg={HeroImage}
        title="Contact Us"
        url="/"
        btnText="Book Your Appointment"
        btnClass="travelBtnClass"
      />
      <Footer />
    </>
  );
}
export default ContactUs;
