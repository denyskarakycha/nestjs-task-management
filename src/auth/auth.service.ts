import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.userRepository.createUser(userCredentialsDto);
  }

  async signIn(userCredentialsDto: UserCredentialsDto): Promise<string> {
    const { username, password } = userCredentialsDto;
    const user = await this.userRepository.findOne({ where: { username } });

    const isEqual = await bcrypt.compare(password, user.password);
    if (user && isEqual) {
      return 'succes';
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }
}
