import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Your frontend URL (e.g., React Dev Server)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you're sending cookies/auth headers
  });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
