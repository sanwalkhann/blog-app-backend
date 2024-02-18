/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Blog } from 'src/blog/schemas/blog.schema';

export enum ReactionType {
  LIKE = 'like',
  LOVE = 'love',
  HAHA = 'haha',
  WOW = 'wow',
  SAD = 'sad',
  ANGRY = 'angry',
  EMPTY= ''
}

@Schema({
  timestamps: true,
})
export class Reaction {
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
    type: String,
    enum: Object.values(ReactionType),
    required: true,
  })
  type: ReactionType;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
