/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reply } from './schemas/reply.schema';

@Injectable()
export class ReplyService {
  constructor(
    @InjectModel(Reply.name)
    private replyModel: Model<Reply>,
  ) {}

  async create(replyData: {
    content: string;
    userId: string;
    commentId: string;
    blogId: string;
  }): Promise<Reply> {
    const { content, userId, commentId, blogId } = replyData;
    const reply = await this.replyModel.create({ content, user: userId, parentComment: commentId, blog: blogId });
    return reply;
  }
}
