import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow<string>('POSTGRES_HOST'),
  port: configService.getOrThrow<number>('POSTGRES_PORT'),
  password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
  username: configService.getOrThrow<string>('POSTGRES_USER'),
  database: configService.getOrThrow<string>('POSTGRES_DB'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['migrations/**'],
});
