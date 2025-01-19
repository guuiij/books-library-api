import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   // Remove propriedades não definidas nos DTOs
    forbidNonWhitelisted: true, // Retorna erro se propriedades não permitidas forem enviadas
    transform: true,      //Converte os dados para entrar esperada -> usado no @Param

  }))
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
