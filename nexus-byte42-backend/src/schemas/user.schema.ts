import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String },
  password: { Type: String },
});

export interface User {
  _id: mongoose.ObjectId;
  email: string;
  password: string;
}
