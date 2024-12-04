import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Budget } from '../../budgets/entities/budget.entity';
import { Category } from '../../categories/entities/category.entity';

export type CategoryGroupDocument = CategoryGroup & Document;

@Schema()
export class CategoryGroup {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Budget', required: true })
  budget: Budget;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category;

  @Prop({ default: 0 })
  allocated: number;

  @Prop({ default: 0 })
  spent: number;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: false })
  isHidden: boolean;
}

export const CategoryGroupSchema = SchemaFactory.createForClass(CategoryGroup);