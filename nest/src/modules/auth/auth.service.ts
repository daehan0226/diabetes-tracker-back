import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../services/config.service';
import { google, Auth } from 'googleapis';
import { TokenOutDto } from './dtos/TokenOut.dto';
import { AuthProviderType } from './enums/authProviderType.enums';
import { ProfileDto } from './dtos/Profile.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
  ) {
    this.oauthClient = new google.auth.OAuth2(
      this._configService.googleCredentials.clientId,
      this._configService.googleCredentials.clientSecret,
    );
  }

  // TODO: provider cases - extract google service
  async authenticate(token: string): Promise<ProfileDto> {
    try {
      const ticket: Auth.LoginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
        audience: this._configService.googleCredentials.clientId,
      });
      const payload = ticket.getPayload();
      return {
        userId: payload.sub,
        email: payload.email,
        authProviderType: AuthProviderType.GOOGLE,
        username: payload.name ?? '',
      };
    } catch (e) {
      this.logger.error(`authenticate: ${e}`);
      return null;
    }
  }

  async createToken(
    { email, userId, username }: ProfileDto,
    authProviderType: AuthProviderType,
  ): Promise<TokenOutDto> {
    const expIn = this._configService.jwtExpIn;
    const exp = Math.floor(Date.now() / 1000) + expIn;
    const accessToken = await this._jwtService.signAsync({
      exp,
      authProviderType,
      userId,
      email,
      username,
    });
    return new TokenOutDto(
      userId,
      email,
      authProviderType,
      accessToken,
      exp,
      username,
    );
  }
}
