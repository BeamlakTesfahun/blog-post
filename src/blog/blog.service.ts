import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  findAll() {
    return this.blogRepository.find();
  }

  create(blog: Partial<Blog>) {
    return this.blogRepository.save(blog);
  }
}
