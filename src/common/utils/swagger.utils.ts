import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication<any>) {
  const options = new DocumentBuilder()
    .setTitle('Currency Exchange API')
    .setDescription('API for currency exchange rates')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}
