import mongoose, { Schema, Document, Types } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking extends Document {
  expertId: Types.ObjectId;
  clientId: Types.ObjectId;
  date: Date; // exact datetime of the session
  duration: number; // in minutes (default: 45)
  status: BookingStatus;
  price: number;
  commission: number;
  meetingLink?: string;
  payoutStatus: "pending" | "released";
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<Booking> = new Schema(
  {
    expertId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      default: 45,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
    payoutStatus: {
      type: String,
      enum: ["pending", "released"],
      default: "pending",
    },
    meetingLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const BookingModel =
  (mongoose.models.Booking as mongoose.Model<Booking>) ||
  mongoose.model<Booking>("Booking", BookingSchema);

export default BookingModel;
