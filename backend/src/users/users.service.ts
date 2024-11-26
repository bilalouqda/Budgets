import { Injectable, ConflictException, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, email, password ,role} = createUserDto;

    // Check if user exists
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();
    
    // Generate JWT token
    const token = this.generateToken(savedUser);

    return {
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
      },
      access_token: token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user);
    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      access_token: token,
    };
  }

  async getUsers() {
    try {
      const users = await this.userModel
        .find()
        .populate('budgets')
        .select('username email role createdAt') // Select only needed fields
        .exec();      
      return {
        status: 'success',
        data: { users }
      };
    } catch (error) {
      throw new BadRequestException('Error fetching users');
    }
  }

  async updateUserRole(userId: string, newRole: UserRole) {
    try {
      // Validate role
      const validRoles = ['user', 'admin'];
      if (!validRoles.includes(newRole)) {
        throw new BadRequestException('Invalid role');
      }

      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Update role
      user.role = newRole;
      await user.save();

      return {
        status: 'success',
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error updating user role');
    }
  }

  async removeUser(userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Prevent deleting the last admin
      if (user.role === 'admin') {
        const adminCount = await this.userModel.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
          throw new BadRequestException('Cannot delete the last admin user');
        }
      }

      await this.userModel.findByIdAndDelete(userId);

      return {
        status: 'success',
        message: 'User successfully deleted',
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error deleting user');
    }
  }

  // Helper method to generate JWT token
  private generateToken(user: UserDocument) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}