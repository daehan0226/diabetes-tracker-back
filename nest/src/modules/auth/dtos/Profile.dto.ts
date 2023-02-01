'use strict';

import { AuthProviderType } from '../enums/authProviderType.enums';

export class ProfileDto {
  userId: string;
  email: string;
  authProviderType: AuthProviderType;
  username?: string;

  constructor(
    userId: string,
    email: string,
    authProviderType: AuthProviderType,
    username?: string,
  ) {
    this.userId = userId;
    this.email = email;
    this.authProviderType = authProviderType;
    this.username = username ?? '';
  }
}
