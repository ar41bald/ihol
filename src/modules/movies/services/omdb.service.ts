import { HttpService, Injectable } from '@nestjs/common';

import { ConfigService } from '../../config/config.service';
import { Movie } from '../movie.entity';

@Injectable()
export class OmdbService {
  private readonly OMDB_BASE_API: string;
  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.OMDB_BASE_API = configService.getOMDbBaseUrl();
  }

  public fetchMovieInfo(params: {[key: string]: string}): Promise<Movie> {
    return this.httpService.get(`${this.OMDB_BASE_API}`, { params }).toPromise()
      .then(({data}) => data);
  }
}
