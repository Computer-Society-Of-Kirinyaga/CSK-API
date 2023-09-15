import { createEvent, getEvents, getEvent, updateEvent, deleteEvent, getPastEvents, getFutureEvents } from '../controllers/Event.Controller.js';
import { bothAdminsLoginRequired, AnyLoginRequired } from '../middlewares/Middlewares.js';
const userRoutes = (app) => {
    app.get("/events", AnyLoginRequired, getEvents);
    app.get("/events-past", AnyLoginRequired, getPastEvents);
    app.get("/events-future", getFutureEvents);
    app.get("/events/:id", AnyLoginRequired, getEvent);
    app.post("/events", bothAdminsLoginRequired, createEvent);
    app.patch("/events/:id", bothAdminsLoginRequired, updateEvent);
    app.delete("/events/:id", bothAdminsLoginRequired, deleteEvent);
}
export default userRoutes;