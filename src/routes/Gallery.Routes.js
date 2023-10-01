import { createGallery, getGallery, getGallerys, updateGallery, deleteGallery } from '../controllers/Gallery.Contoller.js';
import { bothAdminsLoginRequired, AnyLoginRequired } from '../middlewares/Middlewares.js';
const galleryRoutes = (app) => {
    app.post("/gallery", createGallery);
    app.get("/gallery", getGallerys);
    app.get("/gallery/:id", getGallery);
    app.patch("/gallery/:id", updateGallery);
    app.delete("/gallery/:id", deleteGallery);
}
export default galleryRoutes;