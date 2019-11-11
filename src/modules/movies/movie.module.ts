import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OmdbService } from './services/omdb.service';
import { MovieService } from './services/movie.service';
import { Movie } from './movie.entity';
import { MovieController } from './controllers/movie.controller';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [OmdbService, MovieService],
  exports: [TypeOrmModule],
})
export class MovieModule {}
