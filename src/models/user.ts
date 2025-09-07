import mongoose, { Document, Schema } from "mongoose";

export interface UserT extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserT>(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: 
    { type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserT>("User", UserSchema);