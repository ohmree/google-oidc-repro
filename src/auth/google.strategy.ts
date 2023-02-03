import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Prisma } from '@prisma/client';
import { Strategy } from 'passport-google-verify-token';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
    });
  }

  validate(parsedToken: any, googleId: string, done: (...args: any[]) => void) {
    const { email, name } = parsedToken;
    const user: Prisma.UserCreateInput = {
      googleId,
      email,
      name,
    };

    done(null, user);
  }
}
