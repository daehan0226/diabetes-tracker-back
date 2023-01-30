'use strict';

import { AuthProviderType } from "../enums/authProviderType.enums";

export class TokenOutDto {
    expiresIn: number;
    accessToken: string;
    userId: string;
    authProviderType: AuthProviderType;

    constructor(
        userId: string,
        authProviderType: AuthProviderType,
        accessToken: string,
        expiresIn: number,
    ) {
        this.expiresIn = expiresIn;
        this.accessToken = accessToken;
        this.userId = userId;
        this.authProviderType = authProviderType;
    }
}
