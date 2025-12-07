import userModel from "../models/userModel.js";

const addBooking = async (req, res) => {
    console.log("Add new booking request body: ", req.body);
    const boookingData = new userModel({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        numberOfPeople: req.body.numberOfPeople, 
        bookingDate: req.body.bookingDate,
        additionalNotes: req.body.additionalNotes,
    });
    try {
        const savedBooking = await boookingData.save();
        console.log("Bookings Saved:", savedBooking); 
        res.json({ success: true, message: "Booking added added", boookingData: savedBooking });
    } catch (error) {
        console.log("Error Saving Booking:", error); // Debugging line
        res.json({ success: false, message: "Error" });
    }
}
export {addBooking};
