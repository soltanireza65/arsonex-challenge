import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IApplicationBootstrapOptions } from 'common/interfaces/application-bootstrap-option.interface';
import * as Joi from 'joi';

@Module({})
export class CoreModule {
  static forRoot(options: IApplicationBootstrapOptions) {
    return {
      module: CoreModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            PORT: Joi.number().default(8000),
            POSTGRES_PORT: Joi.number().required(),
            POSTGRES_USER: Joi.string().required(),
            POSTGRES_PASSWORD: Joi.string().required(),
            POSTGRES_DB: Joi.string().required(),
            EXCHANGE_RATE_BASE_URL: Joi.string().required(),
            EXCHANGE_RATE_API_KEY: Joi.string().required(),
            COINGATE_BASE_URL: Joi.string().required(),
          }),
        }),
        ...(options.driver === 'typeorm' && [
          TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
              return {
                type: 'postgres',
                host: configService.get<string>('POSTGRES_HOST'),
                port: configService.get<number>('POSTGRES_PORT'),
                password: configService.get<string>('POSTGRES_PASSWORD'),
                username: configService.get<string>('POSTGRES_USER'),
                autoLoadEntities: true,
                synchronize: true,
              };
            },
            inject: [ConfigService],
          }),
        ]),
      ],
    };
  }
}
