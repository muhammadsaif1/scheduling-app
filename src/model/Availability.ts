import mongoose, { Schema, Document, Types } from "mongoose";

export interface Availability extends Document {
  expertId: Types.ObjectId;
  dayOfWeek: number; // 0 (Sunday) - 6 (Saturday)
  timeSlots: string[]; // e.g., ["10:00", "10:45"]
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

const AvailabilitySchema: Schema<Availability> = new Schema(
  {
    expertId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dayOfWeek: {
      type: Number,
      required: true,
      min: 0,
      max: 6,
    },
    timeSlots: [
      {
        type: String, // Format: "HH:mm" (e.g., "14:00")
        required: true,
      },
    ],
    timezone: {
      type: String,
      required: true,
      default: "Asia/Karachi",
    },
  },
  { timestamps: true }
);

const AvailabilityModel =
  (mongoose.models.Availability as mongoose.Model<Availability>) ||
  mongoose.model<Availability>("Availability", AvailabilitySchema);

export default AvailabilityModel;
