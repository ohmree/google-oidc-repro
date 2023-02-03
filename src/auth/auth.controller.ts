import { Controller, Get, Header, Post, Render, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import { GoogleAuthGuard } from './google-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login')
  @Render('login')
  login() {
    return { googleClientId: this.configService.get<string>('GOOGLE_CLIENT_ID') };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @UseGuards(GoogleAuthGuard)
  @Header('Content-Type', 'text/plain')
  @Post('google/callback')
  async googleCallback(@Req() req: Request) {
    const token = await this.authService.signIn(req.user);
    return token;
  }
}
