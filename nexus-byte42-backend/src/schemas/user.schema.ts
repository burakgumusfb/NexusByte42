import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String },
  password: { Type: String },
});

export interface User {
  email: string;
  password: string;
} 