import { IsNotEmpty, MaxLength } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @MaxLength(50, {
    message: 'Author is too long',
  })
  author: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty({
    message: 'Movie should be an existing imdbID',
  })
  movie: string;
}
