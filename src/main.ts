import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Express } from 'express';
import { PrismaService } from 'nestjs-prisma';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { engine } from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: false }));
  app.setViewEngine('.hbs');
  app.setBaseViewsDir(path.join(__dirname, 'views'));

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  resolveHandler(await app.getHttpAdapter().getInstance());
}

let resolveHandler: (value: Express) => void;
let expressHandler: Express | Promise<Express> = new Promise(resolve => {
  resolveHandler = resolve;
});

export default async function handler(request: IncomingMessage, reply: ServerResponse) {
  if (expressHandler instanceof Promise) {
    expressHandler = await expressHandler;
  }

  expressHandler(request, reply);
}
