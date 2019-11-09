import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { OmdbService } from './omdb.service';
import { Movie } from '../movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepo: Repository<Movie>,
    private readonly omdbService: OmdbService,
  ) {}

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepo.find();
  }

  async create(movieParam: any): Promise<Movie> {
    const movieDto = await this.omdbService.fetchMovieInfo(movieParam);
    const movieEntity = await this.moviesRepo.create(movieDto);
    await this.moviesRepo.insert(movieEntity);

    return movieEntity;
  }
}
