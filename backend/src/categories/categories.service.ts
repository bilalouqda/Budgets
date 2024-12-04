import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// Define the Budget interface if not already defined
interface Budget {
  _id: string;
}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find()
      .populate('budget')
      .populate({
        path: 'categoryGroups',
        populate: {
          path: 'transactions'
        }
      })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id)
      .populate('budget')
      .populate('categoryGroups')
      .exec();
    
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .populate('budget')
      .populate('categoryGroups')
      .exec();
    
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updatedCategory;
  }

  async remove(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .exec();
    
    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return deletedCategory;
  }

  async findByBudget(budgetId: string): Promise<Category[]> {   
    if (!budgetId) {
      throw new Error('Invalid budget ID');
    }
    const res = await this.categoryModel.find()
      .populate('budget')
      .populate('categoryGroups')
      .lean()
      .exec();
    
    const categories = res.filter(category => (category.budget as unknown as Budget)._id.toString() === budgetId);

    console.log(`Found ${categories.length} categories for budget ID: ${budgetId}`);

    if (categories.length === 0) {
      console.warn(`No categories found for budget ID: ${budgetId}`);
    }

    return categories;
  }
}
