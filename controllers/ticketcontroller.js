import Ticket from "../models/ticketmodel.js";

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
