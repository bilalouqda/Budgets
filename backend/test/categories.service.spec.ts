import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let mockCategoryModel: any;

  beforeEach(async () => {
    mockCategoryModel = {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      new: jest.fn().mockResolvedValue({
        save: () => Promise.resolve({
          _id: 'testId',
          name: 'Test Category',
          budget: 'budgetId',
        }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Category.name),
          useValue: mockCategoryModel,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto = {
        name: 'Test Category',
        budget: 'budgetId',
        totalAllocated: 0,
        totalSpent: 0
      };

      const result = await service.create(createCategoryDto);

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('name', createCategoryDto.name);
    });
  });

  describe('findOne', () => {
    it('should find a category by id', async () => {
      const mockCategory = {
        _id: 'testId',
        name: 'Test Category',
        budget: 'budgetId',
      };

      mockCategoryModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockCategory),
        }),
      });

      const result = await service.findOne('testId');
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException when category not found', async () => {
      mockCategoryModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(service.findOne('nonexistentId')).rejects.toThrow(NotFoundException);
    });
  });
});
