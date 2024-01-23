/* eslint-disable prettier/prettier */


import { Body, Controller, Delete, Get, Param, Post, Put,UseGuards  } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CategoryService } from './category.service';
import { BlogsCategories } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/roles';
import { RolesGuard } from 'src/role.guard';
import { UserRole } from 'src/auth/schemas/user.schema';

@Controller('blogscategories')
export class CategoryController {
    constructor(private categoryService:CategoryService){}
    @Get()
    @Roles(UserRole.Guest)
    @UseGuards(RolesGuard)
    async getAllCategories():Promise<BlogsCategories[]>{
        return this.categoryService.findAll()
    }

    @Post()
    @Roles(UserRole.Admin)
    @UseGuards(RolesGuard, AuthGuard)
    async createBlogs(
    @Body()
    Category:CreateCategoryDto,
    ):Promise<BlogsCategories>{
        return this.categoryService.create(Category)
    }

    @Get(':id') 
    @Roles(UserRole.Guest)
    async getBlogs(
        @Param('id')
        id:string
    ):Promise<BlogsCategories>{

        return this.categoryService.findById(id)
    }


    @Put(':id')
    @Roles(UserRole.Admin)
    @UseGuards(RolesGuard,AuthGuard)
    async updateBlogs(
        @Param('id')
        id:string,
        @Body()
    category:UpdateCategoryDto,
    ):Promise<BlogsCategories>{
        return this.categoryService.updateById(id,category)
    }
    @Delete(':id')
    @Roles(UserRole.Admin)
    @UseGuards(RolesGuard,AuthGuard)
    async deleteBlogs(
        @Param('id')
        id:string
    ):Promise<BlogsCategories>{

        return this.categoryService.deleteById(id)
    }

}
