import 'reflect-metadata';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Movie } from '../movies/movie.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({name: 'id'})
  id: string;

  @Column({name: 'author'})
  author: string;

  @Column({name: 'text'})
  text: string;

  @Column({ nullable: true })
  movieImdbID: string;

  @ManyToOne(type => Movie)
  @JoinColumn()
  movie: Movie;
}
