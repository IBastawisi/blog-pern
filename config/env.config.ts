import 'dotenv/config';

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT || 3001;
export const SECRET = process.env.SECRET;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export default {
  DATABASE_URL,
  PORT,
  SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
}