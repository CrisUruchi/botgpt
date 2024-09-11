import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3004;
  await app.listen(3004);
  console.log('app running on port :', port);
}
bootstrap();

//npm install -g @nestjs/cli
//npm install -g @nestjs/config
