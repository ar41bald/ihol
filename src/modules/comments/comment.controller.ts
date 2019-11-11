import { Body, Controller, Get, Post } from '@nestjs/common';

import { Comment } from './comment.entity';
import { CommentService } from './services/comment.service';
import { CommentDto } from './comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private service: CommentService) {}

  @Get()
  async findAll(): Promise<Comment[]> {
    return await this.service.findAll();
  }

  @Post()
  async create(@Body() params: CommentDto): Promise<Comment> {
    return await this.service.create(params);
  }
}
