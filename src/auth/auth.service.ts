/* eslint-disable prettier/prettier */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import  { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { LoginDto } from './Dto/login.dto';
import * as bcrypt from 'bcrypt';




@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private userModel:Model<User>,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  // async login(user: User): Promise<{ accessToken: string }> {
  //   const payload = { sub: user.email};
  //   return {
  //     accessToken: this.jwtService.sign(payload),

  //   };

  // }
  async login(LogInDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = LogInDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }


  async create(username: string, email: string, password: string): Promise<User> {
    const user = new this.userModel({ username, email, password, });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password= hashedPassword;
    return user.save();
  }


  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

}