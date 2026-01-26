import { Polar } from "@polar-sh/sdk";
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: "sandbox", // or "https://api.polar.com" for production
});
