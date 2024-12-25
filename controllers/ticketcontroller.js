import Ticket from "../models/ticketmodel.js";

export const allTickets = async (req, res)=>{
    try{
    const tickets = await Ticket.find();

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
        return res.status(404).json({ message: 'No tickets found' });
    }}
    catch(error){
        return res.status(500).json({
            message: 'An error occurred while fetching tickets',
            error: error.message,
        });
    }
}

export const updateTicketStatus = async (req, res) => {
    const { ticketNumber } = req.params;
    const { status } = req.body;

    try {
        const ticket = await Ticket.findOne({ ticketNumber });

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found!" });
        }

        ticket.status = status;
        await ticket.save();

        return res.status(200).json({
            message: "Ticket status updated successfully",
            ticketNumber: ticket.ticketNumber,
            updatedStatus: ticket.status,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating ticket status" });
    }
};

