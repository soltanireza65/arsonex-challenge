import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExchangeRateProvider } from 'exchange/application/ports/exchange-rate.provider';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProviderAProvider extends ExchangeRateProvider {
  private baseURL: string;
  private apiKey: string;
  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {
    super(httpService, configService);

    this.baseURL = configService.get<string>('EXCHANGE_RATE_BASE_URL');
    this.apiKey = configService.get<string>('EXCHANGE_RATE_API_KEY');
  }

  async calculate(from: string, to: string): Promise<number> {
    try {
      const obs = await this.httpService.get('exchangerates_data/latest', {
        baseURL: this.baseURL,
        headers: {
          apiKey: this.apiKey,
        },
        params: {
          base: from,
          symbols: to,
        },
      });

      const response = await lastValueFrom(obs);

      return response.data.rates[to];
    } catch (error) {
      throw new Error(`Failed to fetch ${from} to ${to} rate`);
    }
  }
}
