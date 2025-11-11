import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userName: { type: String, required: true }, 
    userEmail: { type: String, required: true }, 
    numberOfPeople: { type: Number, required: true }, 
    bookingDate: { type: Date, default: Date.now }, 
    additionalNotes: { type: String }, 
});

const bookingModel = mongoose.models.bookings || mongoose.model("bookings", bookingSchema);

export default bookingModel;
