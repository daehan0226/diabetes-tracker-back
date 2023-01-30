import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AuthProviderType } from '../modules/auth/enums/authProviderType.enums'

@Injectable()
export class AuthProviderTypePipe implements PipeTransform {
    transform(value: any, _: ArgumentMetadata) {
        console.log(Object.values(AuthProviderType))
        if (!Object.values(AuthProviderType).includes(value)) {
            throw new BadRequestException('Wrong Auth provider')
        }
        return value;
    }
}
