import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from 'src/services/config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ProfileDto } from './dtos/Profile.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(public readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecretKey,
    });
  }

  async validate({ userId, email, authProviderType, username }) {
    let result: ProfileDto = {
      userId,
      email,
      authProviderType,
      username,
    };
    return result;
  }
}
