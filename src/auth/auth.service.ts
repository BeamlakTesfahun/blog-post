import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService, // injecting config service
  ) {}

  async signup(username: string, email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10); // Set a saltRounds value
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userService.create({
      username,
      email,
      password: hashedPassword,
      role: 'user',
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // retrieving jwt secret
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error(
        'JWT secret is not defined in the environment variables.',
      );
    }

    // generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '1h' },
    );

    return { token };
  }
}
