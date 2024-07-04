import { ExchangeRate } from '@/exchange/domain/exchange-rate';
import { randomUUID } from 'crypto';
import { ExchangeRateEntity } from '../entities/exchange-rate.entity';

export class ExchangeRateMapper {
  static toDomain(entity: ExchangeRateEntity) {
    const model = new ExchangeRate(
      entity.fromCurrency,
      entity.toCurrency,
      entity.rate,
      entity.timestamp,
    );
    return model;
  }

  static toPersistence(domain: ExchangeRate) {
    const { fromCurrency, rate, timestamp, toCurrency } = domain;
    const entity = new ExchangeRateEntity(
      randomUUID(),
      fromCurrency,
      toCurrency,
      rate,
      timestamp,
    );

    return entity;
  }
}
