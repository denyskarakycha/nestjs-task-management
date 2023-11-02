import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  sinUp(@Body() userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.authService.signUp(userCredentialsDto);
  }

  @Post('/signin')
  sinIn(@Body() userCredentialsDto: UserCredentialsDto): Promise<string> {
    return this.authService.signIn(userCredentialsDto);
  }
}
