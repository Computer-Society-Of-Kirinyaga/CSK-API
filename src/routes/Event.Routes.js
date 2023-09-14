import { createEvent, getEvents, getEvent, updateEvent, deleteEvent, getPastEvents, getFutureEvents } from '../controllers/Event.Controller.js';

const userRoutes = (app) => {
    app.get("/events", getEvents);
    app.get("/events-past", getPastEvents);
    app.get("/events-future", getFutureEvents);
    app.get("/events/:id", getEvent);
    app.post("/events", createEvent);
    app.patch("/events/:id", updateEvent);
    app.delete("/events/:id", deleteEvent);
}

export default userRoutes;