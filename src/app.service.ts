import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async getHello(user?: Express.User) {
    const { name } =
      (await this.prisma.user.findUnique({ where: { id: user?.id }, select: { name: true } })) ??
      {};
    return `Hello ${name ?? 'User'}!`;
  }
}
