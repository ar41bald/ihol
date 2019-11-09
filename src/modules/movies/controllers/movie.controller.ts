import { Body, Controller, Get, Post } from '@nestjs/common';

import { MovieService } from '../services/movie.service';
import { Movie } from '../movie.entity';
import { MovieParams } from '../movie-params.service';

@Controller('movies')
export class MovieController {
  constructor(private service: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return await this.service.findAll();
  }

  @Post()
  async create(@Body() params: MovieParams): Promise<Movie> {
    return await this.service.create(params);
  }
}
