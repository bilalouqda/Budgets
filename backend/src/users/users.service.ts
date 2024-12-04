import { Injectable, ConflictException, UnauthorizedException, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  // Injection des dépendances : le modèle User et le service JWT
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, email, password, role } = createUserDto;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();
    
    // Génération du token JWT pour l'authentification
    const token = this.generateToken(savedUser);

    // Retourne les informations de l'utilisateur et son token
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

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Génération du token JWT
    const token = this.generateToken(user);
    
    // Retourne les informations de l'utilisateur et son token
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

  // Récupération de tous les utilisateurs
  async getUsers() {
    try {
      const users = await this.userModel
        .find()
        .populate('budgets')
        .select('username email role createdAt')
        .exec();      
      return {
        status: 'success',
        data: { users }
      };
    } catch (error) {
      throw new BadRequestException('Error fetching users');
    }
  }

  // Mise à jour du rôle d'un utilisateur
  async updateUserRole(userId: string, newRole: UserRole, requestUser: any) {
    try {
      // Vérifie que l'utilisateur ne peut pas modifier son propre rôle
      if (userId === requestUser.sub) {
        throw new ForbiddenException('Cannot modify your own role');
      }

      // Validation du rôle
      const validRoles = ['user', 'admin'];
      if (!validRoles.includes(newRole)) {
        throw new BadRequestException('Invalid role');
      }

      // Recherche de l'utilisateur
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Mise à jour du rôle
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

  // Suppression d'un utilisateur
  async removeUser(userId: string, requestUser: any) {
    try {
      // Vérifie que l'utilisateur ne peut pas se supprimer lui-même
      if (userId === requestUser.sub) {
        throw new ForbiddenException('Cannot delete your own account');
      }

      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Empêche la suppression du dernier administrateur
      if (user.role === 'admin') {
        const adminCount = await this.userModel.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
          throw new BadRequestException('Cannot delete the last admin user');
        }
      }

      // Suppression de l'utilisateur
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

  // Méthode utilitaire pour générer un token JWT
  private generateToken(user: UserDocument) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  // Ajout d'une méthode pour vérifier le token
  async validateToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}