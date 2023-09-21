import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  loginAdmin,
  updateAdmin,
  resetAdminLoginCredentials,
  superLoginAdmin,
  superResetAdminLoginCredentials,
} from "../controllers/Admin.Controller.js";
import {
  bothAdminsLoginRequired,
  superAdminLoginRequired,
} from "../middlewares/Middlewares.js";
const userRoutes = (app) => {
  // adm routes
  app.get("/admins", superAdminLoginRequired, getAdmins);
  app.get("/admins/:id", bothAdminsLoginRequired, getAdmin);
  app.post("/admins", superAdminLoginRequired, createAdmin);
  app.patch("/admins/:id", bothAdminsLoginRequired, updateAdmin);
  app.delete("/admins/:id", superAdminLoginRequired, deleteAdmin);
  app.post("/admins/auth/login", loginAdmin);
  app.post("/admins/auth/reset", resetAdminLoginCredentials);

  //superAdmin routes
  app.post("/sadmins/auth/login", superLoginAdmin);
  app.post("/sadmins/auth/reset", superResetAdminLoginCredentials);
  app.patch("/sadmins/:id", superAdminLoginRequired, updateAdmin);
};

export default userRoutes;
