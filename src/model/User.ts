import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "admin" | "expert" | "client";

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  profileImage?: string;
  // Expert-specific fields
  bio?: string;
  expertise?: string;
  hourlyRate?: number;
  rating?: number;
  totalReviews?: number;
  createdAt: Date;
}

const UserSchema: Schema<User> = new Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: { type: String, required: [true, "Password is required"] },

  role: {
    type: String,
    enum: ["admin", "expert", "client"],
    required: true,
    default: "client",
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  profileImage: {
    type: String,
    default: "", // Optional profile image URL
  },

  // Expert-only fields (optional for client/admin)
  bio: {
    type: String,
    default: "",
  },
  expertise: {
    type: String,
    default: "",
  },
  hourlyRate: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
