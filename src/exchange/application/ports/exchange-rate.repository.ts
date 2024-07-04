import { ExchangeRate } from 'exchange/domain/exchange-rate';

export abstract class ExchangeRateRepository {
  abstract findAll(): Promise<ExchangeRate[]>;
  abstract findOne(options: any /** TEMP */): Promise<ExchangeRate>;
  abstract save(exchangeRate: ExchangeRate): Promise<ExchangeRate>;
  abstract upsert(exchangeRate: ExchangeRate): Promise<ExchangeRate>;
}
