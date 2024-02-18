/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Comment } from './comment.schema';
import { Blog } from 'src/blog/schemas/blog.schema';

@Schema({
  timestamps: true,
})
export class Reply extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  })
  blog: Blog;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Comment',
    required: true,
  })
  parentComment: Comment; 
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
