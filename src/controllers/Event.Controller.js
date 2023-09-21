import { eventRegisterValidator } from "../validators/Event.Validator.js";
import EventModel from "../models/Event.Model.js";
import {
  handleMissingParamsError,
  handleValidationError,
  handleEventExists,
  handleEventNotFound,
  handleFutureEventNotFound,
  handlePastEventNotFound,
  tryCatchWrapper,
} from "../factory/Factory.js";

export const createEvent = async (req, res) => {
  const handler = async (req, res) => {
    const { error } = eventRegisterValidator(req.body);
    if (error) {
      handleValidationError(error, res);
      return;
    }
    const {
      name,
      description,
      posterURL,
      location,
      date,
      startTime,
      endTime,
      eventType,
      isDisabled,
    } = req.body;
    if (
      !name &&
      !description &&
      !posterURL &&
      !location &&
      !date &&
      !startTime &&
      !endTime &&
      !eventType &&
      !isDisabled
    ) {
      handleValidationError(
        { details: [{ message: "At least one property must be updated" }] },
        res
      );
      return;
    }
    const existingEvent = await EventModel.findOne({ name: name });
    if (existingEvent) {
      handleEventExists(res);
      return;
    }
    const event = await EventModel.create({
      name,
      description,
      posterURL,
      location,
      date,
      startTime,
      endTime,
      eventType,
      isDisabled,
    });
    res.status(201).json(req.body);
  };
  tryCatchWrapper(handler, req, res);
};

export const getEvents = async (req, res) => {
  const handler = async (req, res) => {
    const eventsResponse = await EventModel.find();
    eventsResponse.length > 0
      ? res.status(200).json(eventsResponse)
      : res.status(404).json({ message: "No Events found" });
  };
  tryCatchWrapper(handler, req, res);
};

export const getEvent = async (req, res) => {
  const handler = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      handleMissingParamsError(res);
      return;
    }
    const event = await EventModel.findById(id);
    event ? res.status(200).json(event) : handleEventNotFound(res);
  };

  tryCatchWrapper(handler, req, res);
};

export const getPastEvents = async (req, res) => {
  const handler = async (req, res) => {
    const currentDate = new Date();
    const pastEvents = await EventModel.find({ date: { $lt: currentDate } });
    pastEvents.length < 0
      ? res.status(200).json(pastEvents)
      : handlePastEventNotFound(res);
  };
  tryCatchWrapper(handler, req, res);
};

export const getFutureEvents = async (req, res) => {
  const handler = async (req, res) => {
    const currentDate = new Date();
    const futureEvents = await EventModel.find({ date: { $gt: currentDate } });
    futureEvents.length < 0
      ? res.status(200).json(futureEvents)
      : handleFutureEventNotFound(res);
  };
  tryCatchWrapper(handler, req, res);
};

export const updateEvent = async (req, res) => {
  const handler = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      handleMissingParamsError(res);
      return;
    }
    const {
      name,
      description,
      location,
      date,
      startTime,
      endTime,
      eventType,
      isDisabled,
    } = req.body;
    if (
      !name &&
      !description &&
      !location &&
      !date &&
      !startTime &&
      !endTime &&
      !eventType &&
      !isDisabled
    ) {
      handleValidationError(
        { details: [{ message: "At least one property must be updated" }] },
        res
      );
      return;
    }
    const event = await EventModel.findById(id);
    if (!event) {
      handleEventNotFound(res);
      return;
    }
    // Update only the available event properties
    name && (event.name = name);
    description && (event.description = description);
    location && (event.location = location);
    date && (event.date = date);
    startTime && (event.startTime = startTime);
    endTime && (event.endTime = endTime);
    eventType && (event.eventType = eventType);
    isDisabled && (event.isDisabled = isDisabled);
    await event.save();
    res.status(200).json(event);
  };
  tryCatchWrapper(handler, req, res);
};

export const deleteEvent = async (req, res) => {
  const handler = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      handleMissingParamsError(res);
      return;
    }
    const event = await EventModel.findByIdAndDelete(id);
    event
      ? res.status(200).json({ message: "Event deleted successfully" })
      : handleEventNotFound(res);
  };
  tryCatchWrapper(handler, req, res);
};
