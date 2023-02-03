import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getHello(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.appService.getHello(req.user);
  }
}
