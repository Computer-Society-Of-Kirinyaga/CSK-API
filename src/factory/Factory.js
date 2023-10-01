//COMMON FACTORY FUNCTIONS
export const handleValidationError = (error, res) => {
  res.status(400).json({ error: error.details[0].message });
};
export const handleMissingParamsError = (res) => {
  res.status(400).json({ error: "Missing URL Params" });
};
export const handleServerError = (error, res) => {
  res.status(500).json({ error: `An error occurred: ${error.message}` });
};
export const tryCatchWrapper = async (handler, req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    handleServerError(error, res);
  }
};

//USER FACTORY FUNCTIONS
export const handleInvalidUser = (res) => {
  res.status(401).json({ message: "User account disabled. Contact the admin" });
};
export const handleUserNotFound = (res) => {
  res.status(404).json({ message: "User not found" });
};
export const handleUserExists = (res) => {
  res.status(401).json({
    message: "User already exists. Choose a unique username or email.",
  });
};
export const handleWrongCredentials = (res) => {
  res.status(401).json({ message: "Wrong credentials." });
};

//EVENT FACTORY FUNCTIONS
export const handleEventExists = (res) => {
  res.status(401).json({
    error: "Event already exists. Choose a unique name to your Event.",
  });
};
export const handleGalleryNameExists = (res) => {
  res.status(401).json({
    error: "GalleryName already exists. Choose a unique name to your Galleryname.",
  });
};
export const handleEventNotFound = (res) => {
  res.status(404).json({ message: "Event not found" });
};
export const handleGalleryNotFound = (res) => {
  res.status(404).json({ message: "Gallery not found" });
};
export const handleBlogNotFound = (res) => {
  res.status(404).json({ message: "Blog not found" });
};
export const handleFutureEventNotFound = (res) => {
  res.status(404).json({ message: "No Future Event found" });
};
export const handlePastEventNotFound = (res) => {
  res.status(404).json({ message: "No past Event found" });
};
export const handleUserRegisterEventExist = (res) => {
  res
    .status(401)
    .json({ message: "User is already registered for this event" });
};
export const handleSuccess = (res, response) => {
  res.status(200).json({ message: response });
};

//LIBRARY FACTORY FUNCTIONS
export const handleLibraryExists = (res) => {
  res.status(401).json({
    error: "Library already exists. Choose a unique name to your Library.",
  });
};
export const handleLibraryNotFound = (res) => {
  res.status(404).json({ message: "Library not found" });
};

//WEEKLY CHALLENGE FACTORY FUNCTIONS
export const handleWeeklyChallengeExists = (res) => {
  res.status(401).json({
    error:
      "Weekly Challenge already exists. Choose a unique name to your Weekly Challenge.",
  });
};
export const handleWeeklyChallengeNotFound = (res) => {
  res.status(404).json({ message: "Weekly Challenge not found" });
};
