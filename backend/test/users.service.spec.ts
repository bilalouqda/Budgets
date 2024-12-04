import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { User, UserRole } from '../src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: any;
  let mockJwtService: any;

  beforeEach(async () => {
    mockUserModel = {
      findOne: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      countDocuments: jest.fn(),
      findByIdAndDelete: jest.fn(),
      save: jest.fn(),
      new: jest.fn().mockResolvedValue({
        save: () => Promise.resolve({
          _id: 'testId',
          username: 'testUser',
          email: 'test@test.com',
          role: UserRole.USER,
        }),
      }),
    };

    mockJwtService = {
      sign: jest.fn().mockReturnValue('testToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      const createUserDto = {
        username: 'testUser',
        email: 'test@test.com',
        password: 'password123',
        role: UserRole.USER,
      };

      const result = await service.register(createUserDto);
      console.log(result);
      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('user');
      expect(result.user).toHaveProperty('username', createUserDto.username);
    });

    it('should throw ConflictException if user already exists', async () => {
      mockUserModel.findOne.mockResolvedValue({ username: 'existingUser' });
      const createUserDto = {
        username: 'existingUser',
        email: 'test@test.com',
        password: 'password123',
        role: UserRole.USER,
      };

      await expect(service.register(createUserDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should successfully login a user', async () => {
      const mockUser = {
        _id: 'testId',
        email: 'test@test.com',
        password: await bcrypt.hash('password123', 10),
        username: 'testUser',
        role: UserRole.USER,
      };

      mockUserModel.findOne.mockResolvedValue(mockUser);

      const loginDto = {
        email: 'test@test.com',
        password: 'password123',
      };

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('user');
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      const loginDto = {
        email: 'wrong@test.com',
        password: 'wrongpassword',
      };

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
