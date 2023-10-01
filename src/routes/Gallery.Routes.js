import {
    createGallery,
    getGallery,
    getGalleries,
    updateGallery,
    deleteGallery,
} from "../controllers/Gallery.Controller.js";
import {
    bothAdminsLoginRequired,
    AnyLoginRequired,
} from "../middlewares/Middlewares.js";
const galleryRoutes = (app) => {
    app.post("/gallery", createGallery);
    app.get("/gallery", getGalleries);
    app.get("/gallery/:id", getGallery);
    app.patch("/gallery/:id", updateGallery);
    app.delete("/gallery/:id", deleteGallery);
};
export default galleryRoutes;
