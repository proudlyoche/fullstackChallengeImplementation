import { Schema, model } from "mongoose";
import { UserType } from "./types";

const schema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  lastModified: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

/**
 *
 * User modal for mongodb
 * @interface Model<UserType, {}, {}>
 * @type UserType
 */
export const userModel = model<UserType>("user", schema);
