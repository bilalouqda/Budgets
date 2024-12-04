import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CategoryGroup, CategoryGroupDocument } from '../categoryGroup/entity/categoryGroup.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(CategoryGroup.name)
    private categoryGroupModel: Model<CategoryGroupDocument>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const newTransaction = new this.transactionModel(createTransactionDto);
    const createdTransaction = await newTransaction.save();

    // Update the spent amount in the associated CategoryGroup
    const categoryGroup = await this.categoryGroupModel.findById(createdTransaction.categoryGroup);
    
    if (categoryGroup) {
        categoryGroup.spent += createdTransaction.amount;
        await categoryGroup.save();
    }

    return createdTransaction.populate(['categoryGroup', 'budget']);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find()
      .populate('categoryGroup')
      .populate('budget')
      .exec();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id)
      .populate('categoryGroup')
      .populate('budget')
      .exec();
    
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const updatedTransaction = await this.transactionModel
      .findByIdAndUpdate(id, updateTransactionDto, { new: true })
      .populate('categoryGroup')
      .populate('budget')
      .exec();
    
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return updatedTransaction;
  }

  async remove(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();
    
    if (!transaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    // Update the spent amount in the associated CategoryGroup
    const categoryGroup = await this.categoryGroupModel.findById(transaction.categoryGroup);
    if (categoryGroup) {
        categoryGroup.spent -= transaction.amount;
        await categoryGroup.save();
    }
    const deletedTransaction = await this.transactionModel.findByIdAndDelete(id).exec();
    return deletedTransaction;
  }

  async findByBudget(budgetId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ budget: budgetId })
      .populate('categoryGroup')
      .populate('budget')
      .exec();
  }

  async findByCategoryGroup(categoryGroupId: string): Promise<Transaction[]> {
    console.log(categoryGroupId);
    return this.transactionModel.find({ categoryGroup: categoryGroupId })
      .populate('categoryGroup')
      .populate('budget')
      .exec();
  }
}
