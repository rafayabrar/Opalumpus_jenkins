import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import About from "./Routes/About";
import Trips from "./Routes/Trips";
import ContactUs from "./Routes/ContactUs";
import SignIn from "./components/SignIn";
import TripForm from "./components/TripForm";
import TripsPage from "./components/TripsPage";
import BookingPage from "./components/bookingpage";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/trips" element={<Trips />} />
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-signin" element={<SignIn />} />
        <Route path="/trip-form" element={<TripForm />} />
        <Route path="/book-now" element={<BookingPage />}/>
      </Routes>
    </div>
  );
}