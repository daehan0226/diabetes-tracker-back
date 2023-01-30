import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/services/config.service';
import { AuthContoller } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthenticationService } from './googleAuth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => ConfigService),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.jwtSecretKey
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [ AuthContoller ],
    providers: [JwtStrategy, GoogleAuthenticationService, GoogleStrategy],
    exports: [PassportModule.register({ defaultStrategy: 'jwt' }), GoogleAuthenticationService],
})
export class AuthModule {}
