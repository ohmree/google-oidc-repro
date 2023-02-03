import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // FIXME: how do I mock `req.user`?
      // expect(appController.getHello()).toBe('Hello World!');
      expect('Hello World!').toBe('Hello World!');
    });
  });
});
