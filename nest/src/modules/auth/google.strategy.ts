import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: "275127594161-uv1nh0mq6e4iljajbr1i5h4437dp8f9e.apps.googleusercontent.com",  //process.env.OAUTH_GOOGLE_ID,
      clientSecret: "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", // process.env.OAUTH_GOOGLE_SECRET,
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ){
    const { id } = profile;

    return {
      provider: 'google',
      providerId: id,
    };
  }
}