import { getLibraries, getLibrary, createLibrary, updateLibrary, deleteLibrary } from '../controllers/Library.Controller.js';
import { bothAdminsLoginRequired, userLoginRequired, AnyLoginRequired } from '../middlewares/Middlewares.js';
const userRoutes = (app) => {

    app.get("/libraries", AnyLoginRequired, getLibraries);
    app.get("/library/:id", AnyLoginRequired, getLibrary);
    app.post("/library", bothAdminsLoginRequired, createLibrary);
    app.patch("/library/:id", bothAdminsLoginRequired, updateLibrary);
    app.delete("/library/:id", bothAdminsLoginRequired, deleteLibrary);

}

export default userRoutes;