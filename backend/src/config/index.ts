import { config as envConfig } from "dotenv";
const APP_CONFIG = process.env;

envConfig();

const config = {
  get db(): string {
    return APP_CONFIG["DATABASE"] || "mongodb+srv://challenge:password@123@cluster0.05gus.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  },
  get port() {
    return APP_CONFIG["PORT"] || 4455;
  },
  get secret() {
    return APP_CONFIG["SECRET"] || "NO SECRET YET";
  },
};

export default config;
