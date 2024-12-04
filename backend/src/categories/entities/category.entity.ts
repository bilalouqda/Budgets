import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Budget } from 'src/budgets/entities/budget.entity';
import { CategoryGroup } from 'src/categoryGroup/entity/categoryGroup.entity';

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Budget', required: true })
  budget: Budget;

  @Prop({ default: 0 })
  totalAllocated: number;

  @Prop({ default: 0 })
  totalSpent: number;

  @Prop({ default: false })
  isHidden: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CategoryGroup' }] })
  categoryGroups: CategoryGroup[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// CategorySchema.virtual('categoryGroups', {
//   ref: 'CategoryGroup',
//   localField: '_id',
//   foreignField: 'category'
// });