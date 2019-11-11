import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(QueryFailedError, EntityNotFoundError)
export class QueryFailedErrorFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(HttpStatus.BAD_REQUEST)
      .json({
        message: exception.message,
      });
  }
}
