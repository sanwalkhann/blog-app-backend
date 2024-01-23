/* eslint-disable prettier/prettier */


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BlogsCategories {
  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type CategoryDocument = BlogsCategories & Document;

export const CategorySchema = SchemaFactory.createForClass(BlogsCategories);