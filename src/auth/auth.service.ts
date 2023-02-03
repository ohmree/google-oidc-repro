import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) {}

  generateJwt<T extends string | object | Buffer>(payload: T) {
    return this.jwtService.sign(payload);
  }

  async signIn(userData?: User) {
    if (userData == null) {
      throw new BadRequestException('Unauthenticated');
    }

    try {
      const { email, id: sub } = await this.prisma.user.upsert({
        create: userData,
        update: {},
        where: { email: userData.email },
        select: { email: true, id: true },
      });

      return this.generateJwt({
        email,
        sub,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
