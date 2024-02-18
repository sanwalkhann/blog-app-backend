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
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './schemas/blog.schema';
import { AuthGuard } from '@nestjs/passport';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Role } from 'src/auth/schemas/user.schema';


@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) { }

  // Creating a new blog
  @Post()
  @UseGuards(AuthGuard())
  async createBlog(
    @Req() req: any,
    @Body() blog: CreateBlogDto,
  ): Promise<Blog> {
    const userRole: Role = req.user.role;
    const userId: string = req.user.id;
    if (userRole === Role.WRITER) {
      return this.blogService.create({ ...blog, user: userId });
    } else {
      throw new UnauthorizedException(
        'You do not have permission to access this resource.',
      );
    }
  }

  // Getting all blogs
  // BlogController.ts
  @Get()
  //   @Roles(Role.ADMIN)
  //   @UseGuards(AuthGuard(), RolesGuard)
  @UseGuards(AuthGuard())
  async getAllBlogs(): Promise<Blog[]> {
    return this.blogService.findAll();
  }




  // Get single user all-blogs
  // @Get(':userId/blogs')
  // @UseGuards(AuthGuard())
  // async getAllBlogsByUserId(@Req() req: any, @Param('userId') targetUserId: string): Promise<Blog[]> {
  //   const userId = req.user && req.user.id;
  //   const userRole = req.user && req.user.role;

  //   if (!userId) {
  //     throw new UnauthorizedException('User ID not available');
  //   }

  //   if (userRole === 'admin') {
  //     // Admins can get all blogs of the specified user by providing the user ID in the URL
  //     return this.blogService.findAll(targetUserId);
  //   } else {
  //     throw new UnauthorizedException('Unauthorized access');
  //   }
  // }

  @Get('user-blogs/:userId')
  @UseGuards(AuthGuard())
  async getUserBlogs(@Req() req: any, @Param('userId') targetUserId: string): Promise<Blog[]> {

    return this.blogService.findAllByUserId(targetUserId);
  }


  // Getting blog by id
  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Blog> {
    return this.blogService.findById(id);
  }

  // Update blog by id
  @Put(':id')
  @UseGuards(AuthGuard())
  async updateBlog(
    @Param('id') id: string,
    @Body() blogDto: UpdateBlogDto,
    @Req() req: any,
  ): Promise<Blog> {
    const userId = req.user.id;
    return this.blogService.updateById(id, { ...blogDto, user: userId });
  }

  // Delete blog by id
  //delete blog by id
  @Delete(':id')
  async deleteBlog(
    @Param('id')
    id: string,
  ): Promise<Blog> {
    return this.blogService.deleteById(id);
  }


}
