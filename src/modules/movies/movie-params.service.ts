import { Injectable } from '@nestjs/common';
import {ValidateIf, IsNotEmpty} from "class-validator";

@Injectable()
export class MovieParams {
  i: string;

  @ValidateIf(o => o.i === undefined)
  @IsNotEmpty()
  t: string;
}
