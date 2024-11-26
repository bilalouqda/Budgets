import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CategoryGroup, CategoryGroupDocument } from './entity/categoryGroup.entity';
import { CreateCategoryGroupDto } from './dto/create-category-group.dto';
import { UpdateCategoryGroupDto } from './dto/update-category-group.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class CategoryGroupsService {
  constructor(
    @InjectModel(CategoryGroup.name)
    private categoryGroupModel: Model<CategoryGroupDocument>,
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryGroupDto: CreateCategoryGroupDto): Promise<CategoryGroup> {
    const createdCategoryGroup = new this.categoryGroupModel(createCategoryGroupDto);
    const savedGroup = await createdCategoryGroup.save();

    // Update category totals
    await this.updateCategoryTotals(createCategoryGroupDto.category);

    return savedGroup;
  }

  async findAll(): Promise<CategoryGroup[]> {
    return this.categoryGroupModel.find().exec();
  }

  async findOne(id: string): Promise<CategoryGroup> {
    return this.categoryGroupModel.findById(id).exec();
  }

  async update(id: string, updateCategoryGroupDto: UpdateCategoryGroupDto): Promise<CategoryGroup> {
    const updatedGroup = await this.categoryGroupModel
      .findByIdAndUpdate(id, updateCategoryGroupDto, { new: true })
      .populate('category')
      .exec();
    console.log(updatedGroup);
    // Update category totals
    if (updatedGroup && updatedGroup.category) {
      await this.updateCategoryTotals(new Types.ObjectId(updatedGroup.category.toString()));
    }

    return updatedGroup;
  }

  async remove(id: string): Promise<CategoryGroup> {
    return this.categoryGroupModel.findByIdAndDelete(id).exec();
  }

  private async updateCategoryTotals(categoryId: Types.ObjectId): Promise<void> {
    const groups = await this.categoryGroupModel.find({ category: categoryId });
    
    const totals = groups.reduce((acc, group) => ({
      totalAllocated: acc.totalAllocated + (group.allocated || 0),
      totalSpent: acc.totalSpent + (group.spent || 0)
    }), { totalAllocated: 0, totalSpent: 0 });

    await this.categoryModel.findByIdAndUpdate(categoryId, {
      totalAllocated: totals.totalAllocated,
      totalSpent: totals.totalSpent
    });
  }

  async findByCategory(categoryId: string): Promise<CategoryGroup[]> {
    return this.categoryGroupModel
      .find({ category: new Types.ObjectId(categoryId) })
      .populate('transactions')
      .exec();
  }
}
