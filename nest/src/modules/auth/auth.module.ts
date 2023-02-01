import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/services/config.service';
import { AuthContoller } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './googleAuth.service';
import { JwtStrategy } from './jwt.strategy';
import { IAuthProviderInterface } from './interfaces/IAuthProvider.interface';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => ConfigService),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtSecretKey,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthContoller],
  providers: [
    JwtStrategy,
    AuthService,
    {
      provide: 'GoogleAuthService',
      useClass: GoogleAuthService,
    },
  ],
  exports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthService,
    {
      provide: 'GoogleAuthService',
      useClass: GoogleAuthService,
    },
  ],
})
export class AuthModule {}
