/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, Param, Post, Put,UseGuards  } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BlogsService } from './blog.service';
import { Blog } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Roles } from 'src/roles';
import { RolesGuard } from 'src/role.guard';
import { UserRole } from 'src/auth/schemas/user.schema';
UserRole
@Controller('blogs')

export class BlogsController {
    constructor(private blogsService:BlogsService){}
    @Get()
    @Roles(UserRole.Guest)
    @UseGuards(RolesGuard)
    async getAllBlogs():Promise<Blog[]>{
        return this.blogsService.findAll()
    }

    @Post()
    @Roles(UserRole.Writer)
    @UseGuards(RolesGuard, AuthGuard)
    async createBlogs(
    @Body()
    blog:CreateBlogDto,
    ):Promise<Blog>{
        return this.blogsService.create(blog)
    }

    @Get(':id') 
    @Roles(UserRole.Guest)
    async getBlogs(
        @Param('id')
        id:string
    ):Promise<Blog>{

        return this.blogsService.findById(id)
    }


    @Put(':id')
    @Roles(UserRole.Writer)
    @UseGuards(RolesGuard,AuthGuard)
    async updateBlogs(
        @Param('id')
        id:string,
        @Body()
    blog:UpdateBlogDto,
    ):Promise<Blog>{
        return this.blogsService.updateById(id,blog)
    }
    @Delete(':id')
    @Roles(UserRole.Writer)
    @UseGuards(RolesGuard,AuthGuard)
    async deleteBlogs(
        @Param('id')
        id:string
    ):Promise<Blog>{

        return this.blogsService.deleteById(id)
    }

}
