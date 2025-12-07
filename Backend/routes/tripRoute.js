import express from "express";
import { addTrip, getTrip, updateTrip, deleteTrip } from "../controllers/tripController.js";

const tripRouter = express.Router();

tripRouter.get("/", getTrip);
tripRouter.post("/add", addTrip);
tripRouter.put("/:id", updateTrip);
tripRouter.delete("/:id", deleteTrip);

export default tripRouter;