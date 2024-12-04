import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CategoryGroup, CategoryGroupDocument } from './entity/categoryGroup.entity';
import { CreateCategoryGroupDto } from './dto/create-category-group.dto';
import { UpdateCategoryGroupDto } from './dto/update-category-group.dto';
import { Category } from '../categories/entities/category.entity';
import { Budget } from '../budgets/entities/budget.entity';
import { group } from 'console';

@Injectable()
export class CategoryGroupsService {
  constructor(
    @InjectModel(CategoryGroup.name)
    private categoryGroupModel: Model<CategoryGroupDocument>,
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
    @InjectModel(Budget.name)
    private budgetModel: Model<Budget>,
  ) {}

  async create(createCategoryGroupDto: CreateCategoryGroupDto): Promise<CategoryGroup> {
    // Ensure the category and budget exist
    const category = await this.categoryModel.findById(createCategoryGroupDto.category);
    if (!category) {
        throw new NotFoundException(`Category with ID ${createCategoryGroupDto.category} not found`);
    }

    const budget = await this.budgetModel.findById(createCategoryGroupDto.budget);
    if (!budget) {
        throw new NotFoundException(`Budget with ID ${createCategoryGroupDto.budget} not found`);
    }

    const createdCategoryGroup = new this.categoryGroupModel(createCategoryGroupDto);
    const savedGroup = await createdCategoryGroup.save();
console.log(createCategoryGroupDto.category);

    await this.updateCategoryTotals(createCategoryGroupDto.category);

    return savedGroup;
  }

  async findAll(): Promise<CategoryGroup[]> {
    const groups = await this.categoryGroupModel.find().exec();
    // // Update category totals for each unique category
      const uniqueCategories = [...new Set(groups.map(group => group.category.toString()))];
      for (const categoryId of uniqueCategories) {
          await this.updateCategoryTotals(new Types.ObjectId(categoryId));
      }
    return groups;
  }

  async findOne(id: string): Promise<CategoryGroup> {
    return this.categoryGroupModel.findById(id).exec();
  }

  async update(id: string, updateCategoryGroupDto: UpdateCategoryGroupDto): Promise<CategoryGroup> {
    const updatedGroup = await this.categoryGroupModel
      .findByIdAndUpdate(id, updateCategoryGroupDto, { new: true })
      .populate('category')
      .exec();
    // Update category totals
    if (updatedGroup && updatedGroup.category) {
      await this.updateCategoryTotals(new Types.ObjectId(updatedGroup.category.toString()));
    }

    return updatedGroup;
  }

  async remove(id: string): Promise<CategoryGroup> {
    const group = await this.categoryGroupModel.findByIdAndDelete(id).exec();
    if (group && group.category) {
      await this.updateCategoryTotals(new Types.ObjectId(group.category.toString()));
    }
    return group;
  }

  async updateCategoryTotals(categoryId: Types.ObjectId): Promise<void> {
    const groups = await this.categoryGroupModel.find({ category: categoryId.toString() });
    console.log(categoryId.toString());
    console.log(groups);
    
    const totals = groups.reduce((acc, group) => {
      acc.totalAllocated += group.allocated || 0;
      acc.totalSpent += group.spent || 0;
      return acc;
    }, { totalAllocated: 0, totalSpent: 0 });
      console.log(totals.totalAllocated);
      console.log(totals.totalSpent);
    
    await this.categoryModel.findByIdAndUpdate(categoryId, {
      totalAllocated: totals.totalAllocated,
      totalSpent: totals.totalSpent
    });
  }

  // async findByCategory(categoryId: string): Promise<CategoryGroup[]> {
  //   console.log(categoryId);

  //   return this.categoryGroupModel
  //     .find({ category: new Types.ObjectId(categoryId) })
  //     .populate('transactions')

  //     .exec();
  // }

  async findByCategory(categoryId: string): Promise<CategoryGroup[]> {
    const res = await this.categoryGroupModel.find({ category: categoryId })
      .populate('category')
      .exec();
    // Update category totals for the specified category
    // await this.findAll();
    return res;
  }
}
