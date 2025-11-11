import express from "express";
import {addBooking} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/booknow", addBooking);

export default userRouter;