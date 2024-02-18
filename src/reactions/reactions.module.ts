/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactionSchema } from './schemas/reaction.schema';
import { ReactionService } from './reactions.service';
import { BlogSchema } from 'src/blog/schemas/blog.schema';
import { BlogService } from 'src/blog/blog.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Reaction', schema: ReactionSchema },{ name: 'Blog', schema: BlogSchema } ]),
  ],
  controllers: [ReactionsController],
  providers: [ReactionService , BlogService]
})
export class ReactionsModule {}
