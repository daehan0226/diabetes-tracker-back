
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../services/config.service';
import { google, Auth } from 'googleapis';
import { TokenOutDto } from './dtos/TokenOut.dto'
import { AuthProviderType } from './enums/authProviderType.enums';
 
@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly configService: ConfigService,
    private readonly _jwtService: JwtService,
  ) {
    const clientID = "275127594161-uv1nh0mq6e4iljajbr1i5h4437dp8f9e.apps.googleusercontent.com" // this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = "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" // this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');
 
    this.oauthClient = new google.auth.OAuth2(
      clientID,
      clientSecret
    );
  }
 
  async authenticate(token: string): Promise<string> {
    try {
        const ticket: Auth.LoginTicket = await this.oauthClient.verifyIdToken({
          idToken: token,
          audience: "275127594161-uv1nh0mq6e4iljajbr1i5h4437dp8f9e.apps.googleusercontent.com",
        });
        const sub = ticket.getPayload().sub;
        console.log(sub) 
        return sub
    } catch (e) {
        console.log(e)
    }
  }
  
  async createToken(uid: string, authProviderType: AuthProviderType): Promise<TokenOutDto> {
    const exp = 10000000000
    const accessToken = await this._jwtService.signAsync({
      exp,
      authProviderType,
      uid,
    })

    return new TokenOutDto(
      uid,
      authProviderType,
      accessToken,
      exp,
    )
  };
}
