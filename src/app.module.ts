import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { MoviesModule } from './modules/movies/services/movies.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => configService.getDBConfig(),
    inject: [ConfigService],
  }), ConfigModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
