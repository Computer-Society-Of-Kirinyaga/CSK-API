import { createBlog, getBlog, getBlogs, updateBlog, deleteBlog } from '../controllers/Blog.Controller.js';
import { bothAdminsLoginRequired, AnyLoginRequired } from '../middlewares/Middlewares.js';
const blogRoutes = (app) => {
    app.post("/blogs", createBlog);
    app.get("/blogs", getBlogs);
    app.get("/blogs/:id", getBlog);
    app.patch("/blogs/:id", updateBlog);
    app.delete("/blogs/:id", deleteBlog);
}
export default blogRoutes;