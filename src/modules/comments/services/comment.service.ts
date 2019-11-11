import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Comment } from '../comment.entity';
import { CommentDto } from '../comment.dto';
import { Movie } from '../../movies/movie.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentRepo.find();
  }

  async create(commentDto: CommentDto): Promise<Comment> {
    await this.movieRepo.findOneOrFail({where: {imdbID: commentDto.movieImdbID}});
    const commentEntity = await this.commentRepo.create(commentDto as DeepPartial<Comment>);
    await this.commentRepo.insert(commentEntity);

    return commentEntity;
  }
}
