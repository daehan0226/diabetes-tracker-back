import { Controller, Post, Headers, Inject, UseGuards, Param, Res, Response } from '@nestjs/common';
import { AuthProviderType } from './enums/authProviderType.enums';
import { AuthProviderTypePipe } from '../../pipes/authProviderType.pipe'
import { GoogleAuthenticationService } from './googleAuth.service';
import { AuthGuard } from '@nestjs/passport';
import { TokenOutDto } from './dtos/TokenOut.dto';

@Controller('auth')
export class AuthContoller {
  constructor(
    private readonly _authService: GoogleAuthenticationService,
  ) {}

  @Post(':provider')
  // @UseGuards(AuthGuard('google'))
  async createToken(
    @Headers() headers,
    @Param('provider', new AuthProviderTypePipe()) provider: AuthProviderType,
    ): Promise<TokenOutDto> {
    const token = headers.authorization.replace('Bearer ', '')
    const uid = await this._authService.authenticate(token)
    const authToken = await this._authService.createToken(uid, provider);

    return authToken
  }
}
