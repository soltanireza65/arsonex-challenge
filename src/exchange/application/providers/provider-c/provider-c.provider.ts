import { ExchangeRateProvider } from '@/exchange/application/ports/exchange-rate.provider';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProviderCProvider extends ExchangeRateProvider {
  private baseURL: string;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {
    super(httpService, configService);

    this.baseURL = configService.get<string>('COINGATE_BASE_URL');
  }

  async calculate(from: string, to: string): Promise<number> {
    try {
      const obs = await this.httpService.get(
        `api/v2/rates/merchant/${from}/${to}`,
        {
          baseURL: this.baseURL,
          params: {
            vs_currencies: from,
            ids: to,
          },
        },
      );

      const response = await lastValueFrom(obs);

      return response.data;
    } catch (error) {}
  }
}
