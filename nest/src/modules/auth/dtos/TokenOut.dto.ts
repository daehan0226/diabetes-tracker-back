'use strict';

import { AuthProviderType } from '../enums/authProviderType.enums';

export class TokenOutDto {
  userId: string;
  email: string;
  username?: string;
  expiresIn: Date;
  accessToken: string;
  authProviderType: AuthProviderType;

  constructor(
    userId: string,
    email: string,
    authProviderType: AuthProviderType,
    accessToken: string,
    expiresIn: number,
    username?: string,
  ) {
    this.username = username ?? '';
    this.expiresIn = new Date(expiresIn * 1000);
    this.accessToken = accessToken;
    this.userId = userId;
    this.email = email;
    this.authProviderType = authProviderType;
  }
}
