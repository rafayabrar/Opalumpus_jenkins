import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true }, // Ensure this matches the form field name
    description: { type: String, required: true },
});

const tripModel = mongoose.models.trips || mongoose.model("trips", tripSchema);

export default tripModel;