/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { BlogsService } from './blog.service';
import { BlogsController } from './blog.controller';
import { BlogSchema } from './schemas/blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name:'Blog',schema:BlogSchema}])],
  providers: [BlogsService,JwtService],
  controllers: [BlogsController]
})
export class BlogsModule {}
