import express from "express";
import { createTicket, checkTicketStatus, getImage, userHistory } from "../controllers/supportcontroller.js";
import { protect } from "../middleware/authmiddleware.js";
import upload from "../middleware/multer.js";

const supportRouter = express.Router();

supportRouter.post("/support", protect, upload.single('image'), createTicket);
supportRouter.get("/history", protect, userHistory);
supportRouter.get("/check-status/:ticketNumber", checkTicketStatus);
supportRouter.get("/image/:ticketNumber", getImage);

export default supportRouter;
