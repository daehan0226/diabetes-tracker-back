import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "src/services/config.service";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ITokenInfo } from "./interfaces/IToken.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor(
        public readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.jwtSecretKey,
        });
    }

    /**
     * Validates jwt strategy
     * Passport 내부적으로 JWT 인증을 도와줌.
     * 시간이 지난 토큰이나 잘못된 토큰은 passport단에서 막힌다
     * 최소한 검증된 토큰으로 사용자 검사를 진행한다.
     
    * 토큰에 워크스페이스 아이디를 추가하여 프론트에서 요청시마다 Passport에 의해 검증되는 
    * 토큰에 담긴 워크스페이스에 대한 검증 후
    * AuthGuard handleRequest 에서 워크스페이스 에러 처리함
    */
    async validate({sub}) {
        let result: ITokenInfo = {
            sub: '',
        }
        return result    
    }
}
