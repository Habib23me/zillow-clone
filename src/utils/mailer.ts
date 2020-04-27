import nodemailer from "nodemailer";
import config from "./config";

//Send Email function for recovering forgotten password
const sendPasswordEmail = async (
  email: string,
  token: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.GMAIL_EMAIL,
        pass: config.GMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: '"Zillow-Clone" <fitsumayalew047@example.com>', // sender address
      to: email, // list of receivers
      subject: "Zillow-Clone reset password", // Subject line
      html:
        `<b>Zillow-Clone Reset Password</b>
            <p>Enter this token when asked: ` +
        token +
        "</p>", // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
};

//Send Email function for verifying an email
const sendVerifyEmail = async (email: string, token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.GMAIL_EMAIL,
        pass: config.GMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: '"Zillow-Clone" <fitsumayalew047@example.com>', // sender address
      to: email, // list of receivers
      subject: "Zillow-Clone verify email", // Subject line
      html:
        `<b>Zillow-Clone Verify Email</b>
            <p>Enter this token when asked: ` +
        token +
        "</p>", // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
};

export { sendPasswordEmail, sendVerifyEmail };
