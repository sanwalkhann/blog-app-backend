/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {}

  //creating categories
  async create(category: Category): Promise<Category> {
    const res = await this.categoryModel.create(category);
    return res;
  }

  //getting all categories
  async findAll(): Promise<Category[]> {
    const books = await this.categoryModel.find();
    return books;
  }

  //getting category by id
  async findById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  //update category by id
  async updateById(id: string, category: Category): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
  }

  //delete category by id
  async deleteById(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
