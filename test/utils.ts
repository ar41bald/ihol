import { of } from 'rxjs';

export const configServiceMock = {
  getDBConfig: () => {},
  getOMDbBaseUrl: () => {},
};
export const movieRepositoryMock = {
  create: () => {},
  insert: () => {},
  find: () => {},
};
export const httpServiceMock = {
  get: () => of(),
};
