import mongoose, { Document, Schema } from "mongoose";

export interface SessionT extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  deviceInfo?: string;
  lastActive: Date;
}

const SessionSchema = new Schema<SessionT>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    token: { 
      type: String, 
      required: true, 
      unique: true 
    },
    expiresAt: { 
      type: Date, 
      required: true 
    },
    deviceInfo: { 
      type: String 
    },
    lastActive: { 
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

// Index for automatic cleanup of expired sessions
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.model<SessionT>("Session", SessionSchema);