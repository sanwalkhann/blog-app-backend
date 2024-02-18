/* eslint-disable prettier/prettier */

import { Category } from 'src/category/schemas/category.schema';

export class CreateBlogDto {
  readonly title: string;
  readonly content: string;
  readonly category: Category;
  user: string;
}

