export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}

export const capitalizeWords = (str) => {
    return str.replace(/\b\w+\b/g, function (match) {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();  // capitalize first letter of each word
    });
}

