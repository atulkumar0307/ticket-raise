import Ticket from "../models/ticketmodel.js";
import { v4 as uuidv4 } from "uuid";

export const createTicket = async (req, res) => {
    const { title, description } = req.body;
    const { email, uniqueId } = req.user;
    const image = req.file;

    try {
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        // Generate a unique ticket number
        let ticketNumber = uuidv4().slice(0, 8);

        // Ensure the ticket number is unique
        const existingTicket = await Ticket.findOne({ ticketNumber });
        if (existingTicket) {
            ticketNumber = uuidv4().slice(0, 8);  // Generate again if ticketNumber already exists
        }

        
        let imageData = null;
        if (image) {
            // Construct the path to the saved image
            imageData = {
                path: `uploads/${image.filename}`,
                filename: image.filename,
                contentType: image.mimetype,
            };
        }
        const newTicket = new Ticket({
            title,
            description,
            status: "pending",
            ticketNumber,
            email,
            uniqueId,
            image: imageData,
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
    const { ticketNumber } = req.body;

    if (!ticketNumber) {
        return res.status(400).json({ message: "Ticket number is required." });
    }

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

export const userHistory = async (req, res) => {
    const { email } = req.user;

    try {
        // Fetch tickets based on the user's email
        const tickets = await Ticket.find({ email });

        if (tickets.length > 0) {
            // Map through tickets to include image paths as URL
            const ticketsWithImages = tickets.map(ticket => ({
                _id: ticket._id,
                title: ticket.title,
                description: ticket.description,
                status: ticket.status,
                ticketNumber: ticket.ticketNumber,
                email: ticket.email,
                uniqueId: ticket.uniqueId,
                createdAt: ticket.createdAt,
                updatedAt: ticket.updatedAt,
                // Construct full URL for image path
                image: ticket.image
                    ? `http://localhost:${process.env.PORT}/${ticket.image.path}` // Full URL without using express.static
                    : null,
            }));

            return res.status(200).json({
                message: 'Tickets fetched successfully',
                tickets: ticketsWithImages,
            });
        } else {
            return res.status(404).json({ message: 'No tickets found for this user' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching tickets' });
    }
};
