import 'dotenv/config';

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
};

export const DATABASE_URL = config.DATABASE_URL;
export const PORT = config.PORT;

export default config;