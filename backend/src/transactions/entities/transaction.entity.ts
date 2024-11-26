import { CategoryGroup } from './../../categoryGroup/entity/categoryGroup.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  type: string;

  @Prop({ default: false })
  isReconciled: boolean;

  @Prop({ type: Types.ObjectId, ref: 'CategoryGroup', required: true })
  categoryGroup: CategoryGroup;

  @Prop({ type: Types.ObjectId, ref: 'Budget', required: true })
  budget: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);