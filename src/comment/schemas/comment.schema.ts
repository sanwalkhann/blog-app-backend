/* eslint-disable prettier/prettier */
// comment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Blog } from 'src/blog/schemas/blog.schema';

@Schema({
  timestamps: true,
})
export class Comment extends Document {
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

}

export const CommentSchema = SchemaFactory.createForClass(Comment);
