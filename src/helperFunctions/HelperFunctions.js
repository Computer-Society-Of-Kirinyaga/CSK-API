import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

// utils.js
export function formatDate(inputDateStr) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const inputDate = new Date(inputDateStr);
  return inputDate.toLocaleDateString("en-US", options);
}

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

export const capitalizeWords = (str) => {
  return str.replace(/\b\w+\b/g, function (match) {
    return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase(); // capitalize first letter of each word
  });
};

// function to send emails
export const sendEmail = async (
  email,
  subject,
  message,
  googleCalendarLink
) => {
  // for this to work go to this link and create an app by providing an app name and copy the generated password => https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4MAyZMTo4Iu6mJAeW1ZhLXbUgJpVRUsRnEsDAM4Nfk5lQHlWRP-1ovJgOhbcFqQ0Kx-a_oAtdUYxjFpXR3Lgiu6_2E5sw
  // more info here => https://nodemailer.com/usage/using-gmail/
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: `🙏${subject}🙏`,
      text: message,
      html: `<h3>${message},${googleCalendarLink}</h3>`,
    };
    const mailRes = await transporter.sendMail(mailOptions);
    let mailResponse = "";
    if (mailRes.accepted.length > 0) {
      mailResponse = "Email sent successfully";
    } else if (mailRes.rejected.length > 0) {
      mailResponse = "Email not sent, please try again";
    } else {
      mailResponse = "Email server error";
    }
    return mailResponse;
  } catch (error) {
    console.log(error);
  }
};
export const sendRegistrationEmail = async (
  userEmail,
  eventName,
  googleCalendarLink
) => {
  try {
    const subject = `Registration Confirmation for ${eventName} Event`;
    const message = `Thank you for registering for the event "${eventName}". We look forward to seeing you there! Add to caledar ${googleCalendarLink}`;
    // const googleLink = `Add to google caledar ${googleCalendarLink}`;
    const emailResponse = await sendEmail(
      userEmail,
      subject,
      message,
      googleCalendarLink
    );

    return emailResponse;
  } catch (error) {
    throw error;
  }
};

// Function to generate the .ics file content
export const generateGoogleLink = (event) => {
  const encodedSummary = encodeURIComponent(event.name);
  const encodedDescription = encodeURIComponent(event.description);
  const encodedLocation = encodeURIComponent(event.location);
  const encodedStart = event.startTime
    .toISOString()
    .replace(/[-:.]/g, "")
    .slice(0, -1);
  const encodedEnd = event.endTime
    .toISOString()
    .replace(/[-:.]/g, "")
    .slice(0, -1);

  // Generate the Google Calendar link
  const googleCalendarLink = `https://www.google.com/calendar/event?action=TEMPLATE&text=${encodedSummary}&details=${encodedDescription}&location=${encodedLocation}&dates=${encodedStart}/${encodedEnd}`;
  return googleCalendarLink;
};
