import mongoose from "mongoose";
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
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
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
    registeredUsers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        fullName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
      },
    ],
  });

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;