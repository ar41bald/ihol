import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => configService.getDBConfig(),
    inject: [ConfigService],
  }), ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
