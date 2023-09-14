import { createAdmin, deleteAdmin, getAdmin, getAdmins, loginAdmin, updateAdmin, resetAdminLoginCredentials } from '../controllers/Admin.Controller.js';
import { bothAdminsLoginRequired, superAdminLoginRequired } from '../middlewares/Middlewares.js';
const userRoutes = (app) => {
    app.get("/admins", superAdminLoginRequired, getAdmins);
    app.get("/admins/:id", bothAdminsLoginRequired, getAdmin);
    app.post("/admins", superAdminLoginRequired, createAdmin);
    app.patch("/admins/:id", bothAdminsLoginRequired, updateAdmin);
    app.delete("/admins/:id", superAdminLoginRequired, deleteAdmin);

    // //auth routes
    app.post("/admins/auth/login", loginAdmin);
    app.post("/admins/auth/reset", resetAdminLoginCredentials);
}

export default userRoutes;