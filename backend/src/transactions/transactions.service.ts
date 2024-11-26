import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return createdTransaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find()
      .populate('category')
      .populate('budget')
      .exec();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id)
      .populate('category')
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
      .populate('category')
      .populate('budget')
      .exec();
    
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return updatedTransaction;
  }

  async remove(id: string): Promise<Transaction> {
    const deletedTransaction = await this.transactionModel
      .findByIdAndDelete(id)
      .exec();
    
    if (!deletedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return deletedTransaction;
  }

  async findByBudget(budgetId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ budget: budgetId })
      .populate('category')
      .populate('budget')
      .exec();
  }

  async findByCategory(categoryId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ category: categoryId })
      .populate('category')
      .populate('budget')
      .exec();
  }
}
