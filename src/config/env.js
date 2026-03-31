import dotenv from "dotenv";
dotenv.config();

const required = (key) => {
  if (!process.env[key]) {
    throw new Error(`Missing env: ${key}`);
  }
  return process.env[key];
};

const validateNumber = (key, defaultValue = null) => {
  const value = process.env[key];
  if (!value) return defaultValue;
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`Invalid env ${key}: must be a number`);
  }
  return num;
};

const validateBoolean = (key, defaultValue = false) => {
  const value = process.env[key];
  if (!value) return defaultValue;
  return value === "true" || value === "1";
};

if (!process.env.JWT_SECRET) {
  throw new Error("Missing env: JWT_SECRET is required for authentication");
}
if (process.env.JWT_SECRET.length < 32) {
  console.warn(
    "Warning: JWT_SECRET should be at least 32 characters long for security",
  );
}

export const config = {
  PORT: validateNumber("PORT", 5002),
  JWT_SECRET: required("JWT_SECRET"),
  SEQUELIZE: {
    DB_NAME: required("DB_NAME"),
    DB_USER: required("DB_USER"),
    DB_PASS: process.env.DB_PASS || "",
    DB_HOST: required("DB_HOST"),
    DB_PORT: validateNumber("DB_PORT"),
    DB_TIMEZONE: process.env.DB_TIMEZONE || "+00:00",
  },

  // MONGOOSE: {
  //   USER: process.env.MONGO_USERNAME,
  //   PASSWORD: process.env.MONGO_PASSWORD,
  //   DATABASE: process.env.MONGO_DATABASE,
  //   PORT: process.env.MONGO_PORT,
  //   HOST: process.env.MONGO_HOST,
  // },

  // REDIS: {
  //   HOST: process.env.REDIS_HOST || '127.0.0.1',
  //   PORT: validateNumber('REDIS_PORT', 6379),
  //   CONNECT_TIMEOUT: validateNumber('REDIS_CONNECT_TIMEOUT', 10000),
  //   MAX_RETRIES: validateNumber('REDIS_MAX_RETRIES', 10),
  // },

  // ELASTIC: {
  //   API_KEY: process.env.ELASTIC_API_KEY || '',
  //   FROM: process.env.ELASTIC_FROM || '',
  // },
};
