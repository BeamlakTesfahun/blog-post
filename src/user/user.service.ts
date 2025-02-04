import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Method to create a new user
  async create(createUserDto: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  // Method to find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
