import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AllExceptionsFilter } from '@/common/exceptions/all-exception.filter';
import { setupSwagger } from '@/common/utils/swagger.utils';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({ driver: 'typeorm' }),
  );


  const srv = app.get<ConfigService>(ConfigService);
  const PORT = srv.get<number>('PORT');
  
  setupSwagger(app);

  app.useGlobalPipes();

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(PORT);
}
bootstrap();
