import { createUser, getUsers, getUser, updateUser, deleteUser } from '../controllers/User.Controller.js';

const userRoutes = (app) => {
    app.get("/users", getUsers);
    app.get("/users/:id", getUser);
    app.post("/users", createUser);
    app.patch("/users/:id", updateUser);
    app.delete("/users/:id", deleteUser);
}

export default userRoutes;