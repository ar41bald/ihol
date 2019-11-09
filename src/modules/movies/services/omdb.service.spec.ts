import { HttpService } from '@nestjs/common';
import { of } from 'rxjs';

import { OmdbService } from './omdb.service';
import { ConfigService } from '../../config/config.service';

const httpServiceMock = {
  get: () => of(),
} as any as HttpService;
const configServiceMock = {
  getOMDbBaseUrl: () => '',
} as any as ConfigService;

describe('OmdbService', () => {
  let omdbService: OmdbService;

  beforeEach(() => {
    omdbService = new OmdbService(httpServiceMock, configServiceMock);
  });

  describe('fetchMovieInfo', () => {
    it('should return an movie object', async () => {
      const result = { i: 'ssdf3434', title: 'Roundhay Garden Scene'};

      jest.spyOn(httpServiceMock, 'get').mockImplementation(() => of({data: result}));

      expect(await omdbService.fetchMovieInfo({})).toBe(result);

    });
  });
});
