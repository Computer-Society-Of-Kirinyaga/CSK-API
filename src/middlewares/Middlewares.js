import jsonwebtoken from "jsonwebtoken";
import rateLimit from "express-rate-limit";
//default auth middleware function
export const authMiddleware = (app) => {
  app.use((req, res, next) => {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "JWT"
    ) {
      jsonwebtoken.verify(
        req.headers.authorization.split(" ")[1],
        `${process.env.JWT_SECRET}`,
        (err, decode) => {
          if (err) req.user = undefined;
          req.user = decode;
          next();
        }
      );
    } else {
      req.user = undefined;
      next();
    }
  });
};

//user levels-auth middleware function [superAdmin, admin, user, disabledUser]
export const userTypeLoginRequired = (userType) => (req, res, next) => {
  //check if user is not undefined and user type is equal to userType
  if (req.user) {
    if (req.user.userType === userType) {
      next();
    } else if (
      userType === "both" &&
      (req.user.userType === "admin" || req.user.userType === "superAdmin")
    ) {
      next();
    } else if (
      userType === "all" &&
      (req.user.userType === "admin" ||
        req.user.userType === "superAdmin" ||
        req.user.userType === "user")
    ) {
      next();
    } else if (req.user.userType === "disabledUser") {
      return res.status(401).json({ message: "disabled user Account!" });
    } else {
      return res.status(401).json({ message: "Unauthorized user!" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user, invalid or missing token!" });
  }
};

export const userLoginRequired = userTypeLoginRequired("user"); //only user can access the route
export const adminLoginRequired = userTypeLoginRequired("admin"); // only admin can access the route
export const superAdminLoginRequired = userTypeLoginRequired("superAdmin"); // only superAdmin can access the route
export const bothAdminsLoginRequired = userTypeLoginRequired("both"); // superAdmin and admin can access the route
export const AnyLoginRequired = userTypeLoginRequired("all"); // all access the route

export const rateLimiterMiddleware = (app) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 400, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // store: ... , // Use an external store for more precise rate limiting
  });
  app.use(limiter);
};
