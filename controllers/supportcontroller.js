import Ticket from "../models/ticketmodel.js";
import { v4 as uuidv4 } from "uuid";

export const createTicket = async (req, res) => {
    const { title, description } = req.body;
    const { email } = req.user;
    const image = req.file;

    try {
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        // Generate a unique ticket number
        let ticketNumber = uuidv4().slice(0, 8);
        const existingTicket = await Ticket.findOne({ ticketNumber });
        if (existingTicket) {
            ticketNumber = uuidv4().slice(0, 8);
        }

        // Store image data
        let imageData = null;
        if (image) {
            imageData = {
                data: image.buffer,
                contentType: image.mimetype,
            };
        }

        const newTicket = new Ticket({
            title,
            description,  // Use the normalized description here
            image: imageData,
            status: "pending",
            ticketNumber,
            email,
        });

        await newTicket.save();

        return res.status(201).json({
            ticketNumber: newTicket.ticketNumber,
            status: newTicket.status,
            email,
            message: "Ticket created successfully.",
        });
    } catch (err) {
        console.error("Error creating ticket:", err);
        return res.status(500).json({ message: err.message || "Error creating ticket" });
    }
};


export const checkTicketStatus = async (req, res) => {
    const { ticketNumber } = req.params;

    try {
        const ticket = await Ticket.findOne({ ticketNumber });

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found!" });
        }

        return res.status(200).json({
            ticketNumber: ticket.ticketNumber,
            status: ticket.status,
            message: "Ticket found successfully.",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error retrieving ticket status" });
    }
};

export const getImage = async (req, res) => {
    const { ticketNumber } = req.params; // Retrieve the ticket number from the URL

    try {
        const ticket = await Ticket.findOne({ ticketNumber });

        if (!ticket || !ticket.image || !ticket.image.data) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.set("Content-Type", ticket.image.contentType); // Set the correct content type
        res.send(ticket.image.data); // Send the image buffer
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving image" });
    }
};