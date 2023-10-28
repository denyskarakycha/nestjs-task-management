import { IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
  @Length(5, 20)
  @IsNotEmpty()
  title: string;

  @Length(5, 20)
  @IsNotEmpty()
  description: string;
}
