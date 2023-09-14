export const handleValidationError = (error, res) => {
    res.status(400).json({ error: error.details[0].message });
};

export const handleUserExists = (res) => {
    res.status(401).json({ message: 'User already exists. Choose a unique username or email.' });
};
export const handleWrongCredentials = (res) => {
    res.status(401).json({ message: 'Wrong credentials.' });
};


export const handleUserNotFound = (res) => {
    res.status(404).json({ message: 'User not found' });
};

export const handleServerError = (error, res) => {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
};
export const handleInvalidUser = (res) => {
    res.status(401).json({ message: "User account disabled. Contact the admin" });
};

export const tryCatchWrapper = async (handler, req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        handleServerError(error, res);
    }
};
//Event Factory
export const handleEventExists = (res) => {
    res.status(401).json({ error: 'Event already exists. Choose a unique name to your Event.' });
};

export const handleEventNotFound = (res) => {
    res.status(404).json({ message: 'Event not found' });
};

export const handleFutureEventNotFound = (res) => {
    res.status(404).json({ message: 'No Future Event found' });
};

export const handlePastEventNotFound = (res) => {
    res.status(404).json({ message: 'No past Event found' });
};
