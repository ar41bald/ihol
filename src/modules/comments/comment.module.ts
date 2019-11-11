import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './comment.entity';
import { CommentService } from './services/comment.service';
import { CommentController } from './comment.controller';
import { MovieModule } from '../movies/movie.module';

@Module({
  imports: [MovieModule, TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
