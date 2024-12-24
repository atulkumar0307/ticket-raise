import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer, // Path to the image (could be URL or file path)
        contentType: String,
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'resolved'],
        default: 'pending', // Default status is "pending"
    },
    ticketNumber: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        required: true,
    },
});

const TicketRaised = mongoose.model("TicketRaised", ticketSchema);

export default TicketRaised;
