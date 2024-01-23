/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BlogsCategories } from 'src/category/schemas/category.schema';
// import { BlogsCategories } from '../../category/schemas/category.schema';


export type BlogDocument = Blog & Document;






@Schema()
export class Blog {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'BlogsCategories', required: true })
    category: BlogsCategories;

}

export const BlogSchema = SchemaFactory.createForClass(Blog);