/* eslint-disable prettier/prettier */


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
// import { ControllerModule } from './controller/controller.module';
// import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    BlogsModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
