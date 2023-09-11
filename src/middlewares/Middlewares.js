import jsonwebtoken from 'jsonwebtoken';
import rateLimit from 'express-rate-limit'

export const authMiddleware = (app) => {
    app.use((req, res, next) => {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            // console.log(req.user);
            jsonwebtoken.verify(req.headers.authorization.split(' ')[1], `${process.env.JWT_SECRET}`, (err, decode) => {
                if (err) req.user = undefined;
                req.user = decode;
                next();
            });
        } else {
            req.user = undefined;
            next();
        }
    });
}

export const rateLimiterMiddleware = (app) => {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 400, // limit each IP to 100 requests per windowMs
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        // store: ... , // Use an external store for more precise rate limiting
    });
    app.use(limiter);
}