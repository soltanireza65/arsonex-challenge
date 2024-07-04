import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'common/interfaces/application-bootstrap-option.interface';
import * as Joi from 'joi';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const staticImports = [
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
          PORT: Joi.number().default(8000),
          EXCHANGE_RATE_BASE_URL: Joi.string().required(),
          EXCHANGE_RATE_API_KEY: Joi.string().required(),
        }),
      }),
    ];

    const imports =
      options.driver === 'typeorm'
        ? [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              password: 'postgres',
              username: 'postgres',
              autoLoadEntities: true,
              synchronize: true,
            }),
            ...staticImports,
          ]
        : [...staticImports];

    return {
      module: CoreModule,
      imports: imports,
    };
  }
}
