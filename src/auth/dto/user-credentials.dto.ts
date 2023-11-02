import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserCredentialsDto {
  @Length(5, 20)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Length(5, 8)
  @IsNotEmpty()
  password: string;
}
