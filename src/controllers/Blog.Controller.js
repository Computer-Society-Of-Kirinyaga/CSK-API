import { handleMissingParamsError, handleValidationError, handleSuccess, tryCatchWrapper, handleBlogNotFound, } from "../factory/Factory.js";
import { blogRegisterValidator } from "../validators/Blog.Validator.js";
import BlogModel from "../models/Blog.Model.js";

export const createBlog = async (req, res) => {
    const handler = async (req, res) => {
        const { error } = blogRegisterValidator(req.body);
        if (error) {
            handleValidationError(error, res);
            return;
        }
        const { title, description, tags, bannerURL, authorName, categories, } = req.body;
        if (!title && !description && !tags && !bannerURL && !authorName && !categories
        ) {
            handleValidationError(
                { details: [{ message: "At least one property must be updated" }] },
                res
            );
            return;
        }
        const blog = await BlogModel.create({ title, description, tags, bannerURL, authorName, categories });
        res.status(201).json(blog);
    };
    tryCatchWrapper(handler, req, res);
};
export const getBlogs = async (req, res) => {
    const handler = async (req, res) => {
        const blogsResponse = await BlogModel.find();
        blogsResponse.length > 0
            ? res.status(200).json(blogsResponse)
            : res.status(404).json({ message: "No Blogs found" });
    };
    tryCatchWrapper(handler, req, res);
};
export const getBlog = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            handleMissingParamsError(res);
            return;
        }
        const blog = await BlogModel.findById(id);
        blog ? res.status(200).json(blog) : handleBlogNotFound(res);
    };

    tryCatchWrapper(handler, req, res);
};
export const updateBlog = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            handleMissingParamsError(res);
            return;
        }
        const { title, description, tags, bannerURL, authorName, categories, } = req.body;
        if (!title && !description && !tags && !bannerURL && !authorName && !categories) {
            handleValidationError(
                { details: [{ message: "At least one property must be updated" }] },
                res
            );
            return;
        }
        const blog = await BlogModel.findById(id);
        if (!blog) {
            handleBlogNotFound(res);
            return;
        }
        // Update only the available event properties
        title && (blog.title = title);
        description && (blog.description = description);
        tags && (blog.tags = tags);
        bannerURL && (blog.bannerURL = bannerURL);
        authorName && (blog.authorName = authorName);
        categories && (blog.categories = categories);
        await blog.save();
        res.status(200).json(blog);
    };
    tryCatchWrapper(handler, req, res);
};
export const deleteBlog = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            handleMissingParamsError(res);
            return;
        }
        const blog = await BlogModel.findByIdAndDelete(id);
        blog
            ? res.status(200).json({ message: "Blog deleted successfully" })
            : handleBlogNotFound(res);
    };
    tryCatchWrapper(handler, req, res);
};


