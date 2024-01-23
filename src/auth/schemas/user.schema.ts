/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Blog } from 'src/blog/schemas/blog.schema';


export type UserDocument = HydratedDocument<User>

export enum UserRole {
  Admin = 'admin',
  Writer = 'writer',
  Guest = 'guest',
}

@Schema()
export class User {
  @Prop({})
  username: string;

  @Prop({ })
  email: string;

  @Prop({  })
  password: string;

  @Prop({})
  role: UserRole;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Blog' })
  blogId: [Blog]; 
}

export const UserSchema = SchemaFactory.createForClass(User);
