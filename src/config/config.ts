import dotenv from "dotenv";

dotenv.config();

// const MONGO_URL = process.env.MONGO_URL;
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8888;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: PORT,
  },
};
