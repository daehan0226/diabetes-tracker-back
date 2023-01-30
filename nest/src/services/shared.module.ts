import { Global, Module } from '@nestjs/common';
import { AwsService } from './aws/aws.service';
import { ConfigService } from './config.service';
import { JwtModule } from '@nestjs/jwt';



@Global()
@Module({
    imports: [ JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
            secret: configService.jwtSecretKey
        }),
        inject: [ConfigService],
    }), ],
    exports: [ AwsService, ConfigService ],
    providers: [ AwsService, ConfigService ],
})
export class SharedModule {}
