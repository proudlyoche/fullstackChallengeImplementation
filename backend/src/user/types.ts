import { Document } from "mongoose";

/**
 *
 * This is a generic type for a user
 *
 * @interface UserType
 *
 * @typeParam name type string
 * @typeParam email type string
 * @typeParam role type  "super" | "admin" | "admin-plus" | "user" | "user-plus" | "user-pro"
 *
 * @template string name
 *
 * @example var user: UserType;
 *
 */

export interface UserType extends Document {
  name: string;
  email: string;
  role: "Admin" | "User";
  createdAt: Date;
  lastModified: Date;
}
