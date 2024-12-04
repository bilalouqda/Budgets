import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CategoryGroupsService } from 'src/categoryGroup/categoryGroup.service';
import { CategoryGroup } from 'src/categoryGroup/entity/categoryGroup.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Types } from 'mongoose';

describe('CategoryGroupsService', () => {
  let service: CategoryGroupsService;
  let mockCategoryGroupModel: any;
  let mockCategoryModel: any;

  beforeEach(async () => {
    mockCategoryGroupModel = {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      new: jest.fn().mockResolvedValue({
        save: () => Promise.resolve({
          _id: 'testId',
          name: 'Test Group',
          category: 'categoryId',
        }),
      }),
    };

    mockCategoryModel = {
      findByIdAndUpdate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryGroupsService,
        {
          provide: getModelToken(CategoryGroup.name),
          useValue: mockCategoryGroupModel,
        },
        {
          provide: getModelToken(Category.name),
          useValue: mockCategoryModel,
        },
      ],
    }).compile();

    service = module.get<CategoryGroupsService>(CategoryGroupsService);
  });

  describe('create', () => {
    it('should create a new category group', async () => {
      const createCategoryGroupDto = {
        name: 'Test Group',
        category: new Types.ObjectId('categoryId'),
        budget: new Types.ObjectId('budgetId'),
        allocated: 0,
        spent: 0,
        order: 0,
        isHidden: false,
      };

      const result = await service.create(createCategoryGroupDto);

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('name', createCategoryGroupDto.name);
    });
  });

  describe('findByCategory', () => {
    it('should find category groups by category id', async () => {
      const mockGroups = [
        { _id: '1', name: 'Group 1' },
        { _id: '2', name: 'Group 2' },
      ];

      mockCategoryGroupModel.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockGroups),
      });

      const result = await service.findByCategory('categoryId');
      expect(result).toEqual(mockGroups);
    });
  });
});
