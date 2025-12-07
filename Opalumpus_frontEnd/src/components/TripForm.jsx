import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import FormImage from "../assets/Hero Images/formpage.jpg";
import Footer from "./Footer";
import CRUDform from "./CRUDform";

function TripForm() {
    const navigate = useNavigate()
    useEffect(() => {
        const isAdmin = localStorage.getItem('admin') === "true";
        
        if (!isAdmin) {
            navigate('/')
        }
    }, [])
    return (
        <>
        <HeroSection 
            cName="hero"
            heroImg={FormImage}
            title="Admin Panel to handle trips"
            />
        <CRUDform/>
        {/* <TripList/> */}
        <Footer />
        </>
    );
};
export default TripForm;