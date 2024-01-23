/* eslint-disable prettier/prettier */

import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './Dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
  private usersService:AuthService) {}

  // @Post('login')
  // async login(@Request() req): Promise<any> {
  //   const user = req.user;
  //   const token = await this.authService.login(user);
  //   return { token };
  // }
  @Post('/login')
  login(@Body() Logindto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(Logindto);
  }

  @Post('register')

  async register(@Request() req): Promise<any> {
    const { username,email, password } = req.body;
    const user = await this.usersService.create(username,email, password);
    return { user };
  }

}
