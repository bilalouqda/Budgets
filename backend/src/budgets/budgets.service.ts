import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget, BudgetDocument } from './entities/budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel(Budget.name)
    @InjectModel('Budget') private budgetModel: Model<Budget>,
    @InjectModel('User') private userModel: Model<User>, // Add User model injectio
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const createdBudget = new this.budgetModel(createBudgetDto);
    const savedBudget = await createdBudget.save();
    
    // Update the user's budgets array
    await this.userModel.findByIdAndUpdate(
      createBudgetDto.owner,
      { $push: { budgets: savedBudget._id } },
      { new: true }
    );

    return savedBudget;
  }

  async findAll(): Promise<Budget[]> {
    return this.budgetModel.find()
      .populate('categories')
      .populate('transactions')
      .populate('owner')
      .exec();
  }

  async findOne(id: string): Promise<Budget> {
    const budget = await this.budgetModel.findById(id)
      .populate({
        path: 'categories',
        populate: {
          path: 'categoryGroups'
        }
      })
      .populate({
        path: 'transactions',
        populate: {
          path: 'categoryGroup'
        }
      })
      .populate('owner')
      .exec();
    
    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return budget;
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const updatedBudget = await this.budgetModel
      .findByIdAndUpdate(id, updateBudgetDto, { new: true })
      .populate('categories')
      .populate('transactions')
      .populate('owner')
      .exec();
    
    if (!updatedBudget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return updatedBudget;
  }

  async remove(id: string): Promise<Budget> {
    const deletedBudget = await this.budgetModel
      .findByIdAndDelete(id)
      .exec();
    
    if (!deletedBudget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return deletedBudget;
  }

  async findByOwner(ownerId: string): Promise<Budget[]> {
    return this.budgetModel.find({ owner: ownerId })
      .populate('categories')
      .populate('transactions')
      .populate('owner')
      .exec();
  }
}
