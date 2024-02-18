/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from './schemas/blog.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: mongoose.Model<Blog>,
  ) {}

  // Creating blog
  async create(blogDto: CreateBlogDto): Promise<Blog> {
    const res = await this.blogModel.create(blogDto);
    return res;
  }

  // Getting all blogs
 // BlogService.ts
 async findAll(): Promise<Blog[]> {
  const blog = await this.blogModel
    .find()
    .populate({ path: 'category', select: 'name' });
  return blog;
}

  // Findbyid

  async findAllByUserId(userId: string): Promise<Blog[]> {
    const blogs = await this.blogModel
      .find({ user: userId })
      .populate({ path: 'category', select: 'name' });

    return blogs;
  }


   // Getting blogs by user ID
   async findByUserId(userId: string): Promise<Blog[]> {
    const blogs = await this.blogModel
      .find({ user: userId })
      .populate({ path: 'category', select: 'name' });

    return blogs;
  }



  // Getting blog by id
  async findById(id: string): Promise<Blog> {
    const blog = await this.blogModel
      .findById(id)
      .populate({ path: 'category', select: 'name' });

    if (!blog) {
      throw new NotFoundException('Category not found');
    }
    return blog;
  }
  // Update blog by id
  async updateById(id: string, blogDto: UpdateBlogDto): Promise<Blog> {
    return await this.blogModel.findByIdAndUpdate(id, blogDto, {
      new: true,
      runValidators: true,
    });
  }

  // Delete blog by id
  async isUserBlogOwner(blogId: string, userId: string): Promise<boolean> {
    const blog = await this.blogModel.findOne({ _id: blogId, user: userId });
    return !!blog; // Returns true if the blog exists and the user is the owner
  }

  async deleteById(id: string): Promise<Blog> {
    return await this.blogModel.findByIdAndDelete(id);
  }
}
