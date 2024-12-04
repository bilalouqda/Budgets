import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from '../src/transactions/transactions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Transaction } from 'src/transactions/entities/transaction.entity';

describe('TransactionsService', () => {
  let service: TransactionsService;

  const mockTransactionModel = {
    new: jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue({ _id: 'someId', ...dto }),
    })),
    find: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getModelToken(Transaction.name),
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  describe('create', () => {
    it('should create a new transaction', async () => {
      const createTransactionDto = {
        amount: 100,
        description: 'Test Transaction',
        date: new Date(),
        type: 'expense',
        categoryGroup: 'categoryGroupId',
        budget: 'budgetId',
        category: 'categoryId',
      };

      const result = await service.create(createTransactionDto);

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('amount', createTransactionDto.amount);
    });
  });

  describe('findByBudget', () => {
    it('should find transactions by budget id', async () => {
      const mockTransactions = [
        { _id: '1', amount: 100 },
        { _id: '2', amount: 200 },
      ];

      mockTransactionModel.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockTransactions),
        }),
      });

      const result = await service.findByBudget('budgetId');
      expect(result).toEqual(mockTransactions);
    });
  });

  describe('findOne', () => {
    it('should find a transaction by id', async () => {
      const mockTransaction = { _id: '1', amount: 100 };
      mockTransactionModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockTransaction),
        }),
      });

      const result = await service.findOne('1');
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('update', () => {
    it('should update a transaction', async () => {
      const updateDto = { amount: 150, description: 'Updated Transaction' };
      const mockUpdatedTransaction = { _id: '1', ...updateDto };
      
      mockTransactionModel.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockUpdatedTransaction),
        }),
      });

      const result = await service.update('1', updateDto);
      expect(result).toEqual(mockUpdatedTransaction);
    });
  });

  describe('remove', () => {
    it('should delete a transaction', async () => {
      const mockTransaction = { _id: '1', amount: 100 };
      mockTransactionModel.findByIdAndDelete.mockResolvedValue(mockTransaction);

      const result = await service.remove('1');
      expect(result).toEqual(mockTransaction);
    });
  });
});
