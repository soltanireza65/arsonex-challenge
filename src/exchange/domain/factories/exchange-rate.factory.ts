import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../exchange-rate';

@Injectable()
export class ExchangeRateFactory {
  create(fromCurrency: string, toCurrency: string, rate: number): ExchangeRate {
    return new ExchangeRate(fromCurrency, toCurrency, rate, new Date());
  }
}
