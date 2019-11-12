import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { QueryFailedErrorFilter } from './exceptions/query-failed.exception-filter';
import { TransformerInterceptor } from './interceptors/transformer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.useGlobalFilters(new QueryFailedErrorFilter());
  app.useGlobalInterceptors(new TransformerInterceptor());
  const port = process.env.PORT || 3000;
  console.log('IHOL app is runnning on port: ', port, ' ($PORT):', process.env.$PORT);
  await app.listen(port);
}
bootstrap();
