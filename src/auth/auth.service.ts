import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  sinUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.userRepository.createUser(userCredentialsDto);
  }
}
