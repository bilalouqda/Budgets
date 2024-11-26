import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Budget } from 'src/budgets/entities/budget.entity';

export type UserDocument = User & Document;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class User {
    // Basic property
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('budgets', {
  ref: 'Budget',
  localField: '_id',
  foreignField: 'owner'
});