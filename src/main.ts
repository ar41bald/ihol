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
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
