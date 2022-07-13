import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverPort = app.get(ConfigService).get('serverPort');
  await app.listen(serverPort);
}
bootstrap();
