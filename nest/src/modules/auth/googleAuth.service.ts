import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../services/config.service';
import { google, Auth } from 'googleapis';
import { AuthProviderType } from './enums/authProviderType.enums';
import { ProfileDto } from './dtos/Profile.dto';
import { IAuthProviderInterface } from './interfaces/IAuthProvider.interface';

@Injectable()
export class GoogleAuthService implements IAuthProviderInterface {
  private readonly logger = new Logger(GoogleAuthService.name);

  oauthClient: Auth.OAuth2Client;
  constructor(private readonly _configService: ConfigService) {
    this.oauthClient = new google.auth.OAuth2(
      this._configService.googleCredentials.clientId,
      this._configService.googleCredentials.clientSecret,
    );
  }

  async authenticate(token: string): Promise<ProfileDto> {
    try {
      const ticket: Auth.LoginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
        audience: this._configService.googleCredentials.clientId,
      });
      const payload = ticket.getPayload();
      console.log(payload);
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
}
