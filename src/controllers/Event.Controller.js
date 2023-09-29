import { eventRegisterValidator } from "../validators/Event.Validator.js";
import EventModel from "../models/Event.Model.js";
import UserModel from '../models/User.Model.js';
// import { createEvent} from 'ics';
import { handleMissingParamsError, handleValidationError, handleUserRegisterEventExist, handleEventExists, handleUserNotFound, handleSuccess, handleEventNotFound, handleFutureEventNotFound, handlePastEventNotFound, tryCatchWrapper, } from "../factory/Factory.js";
import { generateGoogleLink, sendRegistrationEmail } from '../helperFunctions/HelperFunctions.js';

export const createEvent = async (req, res) => {
  const handler = async (req, res) => {
    const { error } = eventRegisterValidator(req.body);
    if (error) {
      handleValidationError(error, res);
      return;
    }
    const { name, description, posterURL, location, date, startTime, endTime, eventType, isDisabled, } = req.body;
    if (!name && !description && !posterURL && !location && !date && !startTime && !endTime && !eventType && !isDisabled
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
    const event = await EventModel.create({ name, description, posterURL, location, date, startTime, endTime, eventType, isDisabled, });
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
    pastEvents.length > 0
      ? res.status(200).json(pastEvents)
      : handlePastEventNotFound(res);
  };
  tryCatchWrapper(handler, req, res);
};

export const getFutureEvents = async (req, res) => {
  const handler = async (req, res) => {
    const currentDate = new Date();
    const futureEvents = await EventModel.find({ date: { $gt: currentDate } });
    futureEvents.length > 0
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
    const { name, description, location, date, startTime, endTime, eventType, isDisabled, } = req.body;
    if (!name && !description && !location && !date && !startTime && !endTime && !eventType && !isDisabled
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

export const registerUserForEvent = async (req, res) => {
  const handler = async (req, res) => {
    const { eventId, userId } = req.body;
    const event = await EventModel.findById(eventId);
    const user = await UserModel.findById(userId);
    if (!event) {
      return handleEventNotFound(res);
    }
    if (!user) {
      return handleUserNotFound(res);
    }
    // Check if the user has already registered for the event

    if (event.registeredUsers.includes(userId)) {
      return handleUserRegisterEventExist(res);
    }
    // Create a registration object containing user information
    const registrationInfo = { userId: user._id, fullName: user.fullName, email: user.email, };
    let respose = generateGoogleLink(event)
    event.registeredUsers.push(registrationInfo);
    await event.save();
    if (user) {
      const userEmail = user.email;
      const eventName = event.name;
      const googleCalendarLink = respose;
      const emailResponse = await sendRegistrationEmail(userEmail, eventName, googleCalendarLink);
      return handleSuccess(res, emailResponse)
    }
  };
  tryCatchWrapper(handler, req, res);
};

export const registeredUsersForEvent = async (req, res) => {
  const handler = async (req, res) => {
    const { eventId } = req.params;
    const event = await EventModel.findById(eventId);
    if (!event) {
      return handleFutureEventNotFound(res);
    }
    const userEmails = event.registeredUsers.map((user) => user.email);
    const userFullNames = event.registeredUsers.map((user) => user.fullName);
    const formattedResponse = {
      event: {
        _id: event._id,
        name: event.name,
        description: event.description,
        date: event.date,
      },
      registeredUsers: {
        total: event.registeredUsers.length,
        emails: userEmails,
        fullName: userFullNames,
      },
    };
    formattedResponse ? res.status(200).json(formattedResponse) : handleServerError(res);
  };
  tryCatchWrapper(handler, req, res);
};


