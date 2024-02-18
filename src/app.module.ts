/* eslint-disable prettier/prettier */

  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';

  import { ConfigModule } from '@nestjs/config';
  import { MongooseModule } from '@nestjs/mongoose';
  import { AuthModule } from './auth/auth.module';
  import { BlogModule } from './blog/blog.module';
  import { CategoryModule } from './category/category.module';
  import { CommentModule } from './comment/comment.module';
  import { ReactionsModule } from './reactions/reactions.module';

  @Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.DB_URI),
      AuthModule,
      BlogModule,
      CategoryModule,
      CommentModule,
      ReactionsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
