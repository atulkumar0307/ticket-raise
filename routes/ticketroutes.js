import express from "express";
import { allTickets, updateTicketStatus } from "../controllers/ticketcontroller.js";

const router = express.Router();

router.patch("/tickets/:ticketNumber/status", updateTicketStatus);
router.get("/allTicket", allTickets )

export default router;
