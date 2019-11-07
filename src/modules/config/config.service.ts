import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { ConnectionOptions } from 'typeorm';

import { DB_PROPS, ENV_TYPES } from './config.types';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(...[ENV_TYPES.development, ENV_TYPES.production])
        .default(ENV_TYPES.development),
      [DB_PROPS.TYPEORM_CONNECTION]: Joi.string().required(),
      [DB_PROPS.TYPEORM_HOST]: Joi.string().required(),
      [DB_PROPS.TYPEORM_USERNAME]: Joi.string().required(),
      [DB_PROPS.TYPEORM_PASSWORD]: Joi.string().required(),
      [DB_PROPS.TYPEORM_DATABASE]: Joi.string().required(),
      [DB_PROPS.TYPEORM_PORT]: Joi.string().required(),
      [DB_PROPS.TYPEORM_SYNCHRONIZE]: Joi.string().required(),
      [DB_PROPS.TYPEORM_LOGGING]: Joi.string().required(),
      OMD_API_URL: Joi.string().required(),
      OMD_API_KEY: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  private getString(name: string): string {
    return this.envConfig[name];
  }

  private getBoolean(name: string): boolean {
    return Boolean(this.getString(name));
  }

  private getNumber(name: string): number {
    return Number(this.getString(name));
  }

  public getDBConfig(): Partial<ConnectionOptions> {
    return {
      type: this.getString(DB_PROPS.TYPEORM_CONNECTION) as any,
      host: this.getString(DB_PROPS.TYPEORM_HOST),
      port: this.getNumber(DB_PROPS.TYPEORM_PORT),
      username: this.getString(DB_PROPS.TYPEORM_USERNAME),
      password: this.getString(DB_PROPS.TYPEORM_PASSWORD),
      database: this.getString(DB_PROPS.TYPEORM_DATABASE),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: this.getBoolean(DB_PROPS.TYPEORM_SYNCHRONIZE),
    };
  }
}
