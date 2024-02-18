/* eslint-disable prettier/prettier */

import { User } from 'src/auth/schemas/user.schema';
import { Category } from 'src/category/schemas/category.schema';

export class UpdateBlogDto {
  readonly title: string;
  readonly content: string;
  readonly category: Category;
  readonly user:User
}
