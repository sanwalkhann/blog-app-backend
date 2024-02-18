/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';


@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: MongooseSchema.Types.ObjectId; 

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  user: MongooseSchema.Types.ObjectId;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
