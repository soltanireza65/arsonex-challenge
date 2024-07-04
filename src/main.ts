import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({ driver: 'in-memory' }),
  );

  const options = new DocumentBuilder()
    .setTitle('Currency Exchange API')
    .setDescription('API for currency exchange rates')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const srv = app.get<ConfigService>(ConfigService);
  const PORT = srv.get<number>('PORT');

  app.useGlobalPipes();
  await app.listen(PORT);
}
bootstrap();
