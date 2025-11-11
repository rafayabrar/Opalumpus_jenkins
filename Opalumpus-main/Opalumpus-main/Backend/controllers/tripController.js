import tripModel from "../models/tripModels.js";

const addTrip = async (req, res) => {
    console.log("Add Trip Request Body:", req.body); // Debugging line
    const trip = new tripModel({
        destination: req.body.destination,
        duration: req.body.duration,
        price: req.body.price, // Ensure this matches the schema field name
        description: req.body.description,
    });
    try {
        const savedTrip = await trip.save();
        console.log("Trip Saved:", savedTrip); // Debugging line
        res.json({ success: true, message: "Trip added", trip: savedTrip });
    } catch (error) {
        console.log("Error Saving Trip:", error); // Debugging line
        res.json({ success: false, message: "Error" });
    }
};

const getTrip = async (req, res) => {
    try {
        const trips = await tripModel.find();
        console.log("Trips Fetched:", trips); // Debugging line
        res.status(200).json({ trips });
    } catch (error) {
        console.log("Error Fetching Trips:", error); // Debugging line
        res.json({ success: false, message: error });
    }
};

const updateTrip = async (req, res) => {
    try {
        const updatedTrip = await tripModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTrip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteTrip = async (req, res) => {
    try {
        await tripModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Trip deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addTrip, getTrip, updateTrip, deleteTrip };