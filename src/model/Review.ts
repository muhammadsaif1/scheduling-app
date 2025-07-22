import mongoose, { Schema, Document, Types } from "mongoose";

export interface Review extends Document {
  bookingId: Types.ObjectId;
  clientId: Types.ObjectId;
  expertId: Types.ObjectId;
  rating: number; // 1 to 5 stars
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema<Review> = new Schema({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expertId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ReviewModel =
  (mongoose.models.Review as mongoose.Model<Review>) ||
  mongoose.model<Review>("Review", ReviewSchema);

export default ReviewModel;
