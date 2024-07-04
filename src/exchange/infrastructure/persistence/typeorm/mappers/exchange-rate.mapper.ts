import { randomUUID } from 'crypto';
import { ExchangeRateEntity } from '../entities/exchange-rate.entity';
import { ExchangeRate } from 'exchange/domain/exchange-rate';

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
  static toPersistence(domainModel: ExchangeRate) {
    const { fromCurrency, rate, timestamp, toCurrency } = domainModel;
    const entity = new ExchangeRateEntity(
      randomUUID(), // TODO: check if it's needed, random id each time???
      fromCurrency,
      toCurrency,
      rate,
      timestamp,
    );

    return entity;
  }
}
