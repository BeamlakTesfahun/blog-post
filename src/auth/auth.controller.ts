import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authentication') // for grouping endpoints
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({
    description: 'User signup details',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_doe' },
        email: { type: 'string', example: 'john@example.com' },
        password: { type: 'string', example: 'P@ssw0rd123' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'User already exists.' })
  async signup(
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.authService.signup(body.username, body.email, body.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiBody({
    description: 'User login details',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'test@example.com' },
        password: { type: 'string', example: 'P@ssw0rd123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully. Returns a JWT token.',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
