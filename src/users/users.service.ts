import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.prisma.users.findMany({ where: { name: 'Juan Perez' } });
  }

  async findOne(id: string): Promise<User | null> {
    try {
      const idNumber = Number(id);
      return await this.prisma.users.findUnique({ where: { id: idNumber } });
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      Object.assign(user, updateUserDto);
      const idNumber = Number(id);
      return await this.prisma.users.update({
        where: { id: idNumber },
        data: user,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const idNumber = Number(id);
      await this.prisma.users.delete({ where: { id: idNumber } });
    } catch (error) {
      throw error;
    }
  }
}
