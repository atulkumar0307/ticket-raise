import express from "express";
import { createTicket, checkTicketStatus } from "../controllers/supportcontroller.js";
import { protect } from "../middleware/authmiddleware.js";
import upload from "../middleware/multer.js";

const supportRouter = express.Router();

supportRouter.post("/support", protect, upload.single('image'), createTicket);

supportRouter.get("/check-status/:ticketNumber", checkTicketStatus);

export default supportRouter;
