import { parsePhoneNumberFromString } from "libphonenumber-js";
import * as EmailValidator from "email-validator";
import { UserInputError } from "apollo-server-express";
import validUrl from "valid-url";

//checks if email is valid and returns the email
//else it throws an error
const validateEmail = (email: string): string => {
  if (!EmailValidator.validate(email)) {
    throw new UserInputError("Invalid Email!");
  }
  return email;
};

//checks if phone number is valid and returns the sanitized
//number if it is correct else it throws an error
const validatePhone = (phone: string): string => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (!phoneNumber || !phoneNumber.isValid()) {
    throw new UserInputError("Invalid Phone Number!");
  }
  return phoneNumber.number.toString();
};

//checks if the value is positive
const isPositive = (value: number, errorMsg: string): boolean => {
  if (value && value <= 0) {
    throw Error(errorMsg);
  }
  return true;
};

//checks if the value is greater than zero
const isGreaterThanZero = (value: number, errorMsg: string): boolean => {
  if (value && value < 0) {
    throw Error(errorMsg);
  }
  return true;
};

//Checks the if the input date is in the future or past
const isDateInTheFuture = (date: Date, errorMsg: string): boolean => {
  if (new Date() > date) {
    throw Error(errorMsg);
  }
  return true;
};

const isValidUrl = (url: string, errorMsg: string): boolean => {
  if (url && !validUrl.isUri(url)) {
    throw Error(errorMsg);
  }
  return true;
};

export {
  validatePhone,
  validateEmail,
  isDateInTheFuture,
  isGreaterThanZero,
  isPositive,
  isValidUrl,
};
