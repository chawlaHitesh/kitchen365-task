import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // strips unknown fields
    forbidNonWhitelisted: true, // throws error if unknown field is sent
    transform: true,        // auto-transform payloads to DTO classes
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map(err => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));
      return new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
