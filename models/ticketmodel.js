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
        data: Buffer,
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
    email: {
        type: String,
        required: true,
    },
    uniqueId: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const TicketRaised = mongoose.model("TicketRaised", ticketSchema);

export default TicketRaised;
