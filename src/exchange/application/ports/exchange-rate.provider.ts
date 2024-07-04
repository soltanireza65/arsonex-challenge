import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

export abstract class ExchangeRateProvider {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {}

  abstract calculate(from: string, to: string): Promise<number>;
}
