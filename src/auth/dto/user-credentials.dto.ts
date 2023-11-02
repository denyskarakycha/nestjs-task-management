import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UserCredentialsDto {
  @Length(5, 20)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Length(5, 20)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
