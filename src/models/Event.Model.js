import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
        time: {
            type: Date
        },
        eventType: {
            type: String,
            trim: true,
            enum: ['online', 'physical', 'hybrid'],
            required: true,
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
    });

const EventModel = mongoose.model('Event', eventSchema);

export default EventModel;
