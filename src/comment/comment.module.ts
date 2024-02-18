/* eslint-disable prettier/prettier */
// comments/comment.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ReplyService } from './reply.service';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Reply, ReplySchema } from './schemas/reply.schema';
import { Blog, BlogSchema } from 'src/blog/schemas/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Reply.name, schema: ReplySchema },
      { name: Blog.name, schema: BlogSchema },

    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, ReplyService],
})
export class CommentModule {}
