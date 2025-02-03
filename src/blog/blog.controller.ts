import { Controller, Get, Post, Body } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Post()
  create(@Body() blog) {
    return this.blogService.create(blog);
  }
}
