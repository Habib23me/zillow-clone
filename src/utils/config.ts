import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const WORKERS = process.env.WORKERS || 1;
const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME || "15m";
const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || "zillow";
const DATABASE_URL = process.env.DATABASE_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "";
const NODE_ENV = process.env.NODE_ENV || "production";
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";
const CLOUDINARY_USER_URL = process.env.CLOUDINARY_USER_URL || "";
const SALT_ROUNDS = 12;
const JWT_VERIFICATION_PASSWORD_SECRET =
  process.env.JWT_VERIFICATION_PASSWORD_SECRET || "";
const JWT_VERIFICATION_LIFE_TIME = process.env.JWT_VERIFICATION_LIFE_TIME || "";

const GMAIL_EMAIL = process.env.GMAIL_EMAIL || "";
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD || "";

export default {
  DATABASE_URL,
  PORT,
  WORKERS,
  NODE_ENV,
  JWT_SECRET,
  JWT_LIFE_TIME,
  CLOUDINARY_FOLDER,
  GOOGLE_MAPS_API_KEY,
  CLOUDINARY_USER_URL,
  SALT_ROUNDS,
  JWT_VERIFICATION_PASSWORD_SECRET,
  JWT_VERIFICATION_LIFE_TIME,
  GMAIL_EMAIL,
  GMAIL_PASSWORD,
};
