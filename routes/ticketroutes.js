import express from "express";
import { updateTicketStatus } from "../controllers/ticketcontroller.js";

const router = express.Router();

router.patch("/tickets/:ticketNumber/status", updateTicketStatus);

export default router;
