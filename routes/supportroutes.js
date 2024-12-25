import express from "express";
import { createTicket, checkTicketStatus, userHistory } from "../controllers/supportcontroller.js";
import { protect } from "../middleware/authmiddleware.js";
import upload from "../middleware/multer.js";

const supportRouter = express.Router();

// supportRouter.post("/support", protect, createTicket);
supportRouter.get("/history", protect, userHistory);
supportRouter.post("/check-status", checkTicketStatus);
supportRouter.post("/support", protect, upload.single('image'), createTicket);

export default supportRouter;
