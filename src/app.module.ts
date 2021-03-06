import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { MovieModule } from './modules/movies/movie.module';
import { CommentModule } from './modules/comments/comment.module';

const entities = [__dirname + '/**/*.entity{.ts,.js}'];

@Module({
  imports: [ConfigModule, TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      ...configService.getDBConfig(),
      entities,
    }) as any,
    inject: [ConfigService],
  }), MovieModule, CommentModule],
  controllers: [AppController],
})
export class AppModule {}
