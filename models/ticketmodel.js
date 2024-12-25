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
    status: {
        type: String,
        enum: ['pending', 'in progress', 'resolved'],
        default: 'pending',
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
    image: {
        path: { type: String },   // Path to the uploaded image
        filename: { type: String }, // Filename of the image
        contentType: { type: String }, // MIME type of the image
    }
}, { timestamps: true });

const TicketRaised = mongoose.model("TicketRaised", ticketSchema);

export default TicketRaised;
