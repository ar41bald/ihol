import 'reflect-metadata';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryColumn({name: 'imdb_id'})
  imdbID: string;

  @Column({name: 'title'})
  Title: string;

  @Column({name: 'year'})
  Year: string;

  @Column({name: 'rated'})
  Rated: string;

  @Column({name: 'released'})
  Released: string;

  @Column({name: 'runtime'})
  Runtime: string;
}
