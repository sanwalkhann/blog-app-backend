/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/create-category.dto';
import { Category } from './schemas/category.schema';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Role } from 'src/auth/schemas/user.schema';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  // Getting all categories
  @Get()
  @UseGuards(AuthGuard())
  async getAllBooks(@Req() req: any): Promise<Category[]> {
    // Retrieve user role from req.user
    const userRole: Role = req.user.role;

    // Check if the user has the admin role
    if (userRole === Role.ADMIN) {
      // Only admin users can access
      return this.categoryService.findAll();
    } else {
      // Handle unauthorized access
      throw new UnauthorizedException('You do not have permission to access this resource.');
    }
  }

  //creating a new category
  @Post()
  @UseGuards(AuthGuard())
  async createCategory(
    @Req() req: any,
    @Body() category: CategoryDto,
  ): Promise<Category> {
    const userRole: Role = req.user.role;

    if (userRole === Role.ADMIN) {
      return this.categoryService.create(category);
    } else {
      // Handle unauthorized access
      throw new UnauthorizedException('You do not have permission to access this resource.');
    }
  }


   // Getting category by ID
   @Get(':id')
   @UseGuards(AuthGuard())
   async getBook(
     @Req() req: any,
     @Param('id') id: string,
   ): Promise<Category> {
     const userRole: Role = req.user.role;
 
     // Check if the user has the admin role
     if (userRole === Role.ADMIN) {
       return this.categoryService.findById(id);
     } else {
       // Handle unauthorized access
       throw new UnauthorizedException('You do not have permission to access this resource.');
     }
   }

  //update category by id
  @Put(':id')
  @UseGuards(AuthGuard())
  async updateCategory(
    @Req() req: any,
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<Category> {
    const userRole: Role = req.user.role;

    // Check if the user has the admin role
    if (userRole === Role.ADMIN) {
      return this.categoryService.updateById(id, category);
    } else {
      // Handle unauthorized access
      throw new UnauthorizedException('You do not have permission to access this resource.');
    }
  }

  //delete category by id
  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteCategory(
    @Req() req: any,
    @Param('id') id: string,
  ): Promise<Category> {
    const userRole: Role = req.user.role;

    // Check if the user has the admin role
    if (userRole === Role.ADMIN) {
      return this.categoryService.deleteById(id);
    } else {
      // Handle unauthorized access
      throw new UnauthorizedException('You do not have permission to access this resource.');
    }
  }
}
