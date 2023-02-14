import {
  Controller,
  Post,
  Headers,
  UseGuards,
  Param,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Logger,
  Inject,
} from '@nestjs/common';
import { AuthProviderType } from './enums/authProviderType.enums';
import { AuthProviderTypePipe } from '../../pipes/authProviderType.pipe';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { TokenOutDto } from './dtos/TokenOut.dto';
import { AuthUser } from '@decorators/authUser.decorator';
import { ProfileDto } from './dtos/Profile.dto';
import { IAuthProviderInterface } from './interfaces/IAuthProvider.interface';

@Controller('auth')
export class AuthContoller {
  private readonly logger = new Logger(AuthContoller.name);
  constructor(
    private readonly _authService: AuthService,
    @Inject('GoogleAuthService')
    private readonly _googleAuthService: IAuthProviderInterface,
  ) {}

  @Post('/me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async me(
    @AuthUser() { userId, email, username, authProviderType },
  ): Promise<ProfileDto> {
    return new ProfileDto(userId, email, authProviderType, username);
  }

  @Post(':provider')
  async createToken(
    @Headers() headers,
    @Param('provider', new AuthProviderTypePipe()) provider: AuthProviderType,
  ): Promise<TokenOutDto> {
    try {
      const token = headers.authorization.replace('Bearer ', '');
      const data = await this._googleAuthService.authenticate(token);
      if (data) {
        const authToken = await this._authService.createToken(data, provider);
        return authToken;
      }
    } catch (e) {
      this.logger.debug(`fail to create token: ${e}`);
    }
    throw new UnauthorizedException();
  }
}
