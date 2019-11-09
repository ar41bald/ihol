import { Global, Module } from '@nestjs/common';

import { ConfigService } from './config.service';
import { ENV_TYPES } from './config.types';

@Global()
@Module({
  providers: [{
    provide: ConfigService,
    useValue: new ConfigService(`${process.env.NODE_ENV || ENV_TYPES.development}.env`),
  }],
  exports: [ConfigService],
})
export class ConfigModule {}
