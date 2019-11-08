import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ConfigService } from '../../config/config.service';

@Injectable()
export class OmdbService {
  private readonly OMDB_BASE_API: string;
  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.OMDB_BASE_API = configService.getOMDbBaseUrl();
  }

  public fetchMovieInfo(params: {[key: string]: string}): Observable<any> {
    return this.httpService.get(`${this.OMDB_BASE_API}`, { params });
  }
}
