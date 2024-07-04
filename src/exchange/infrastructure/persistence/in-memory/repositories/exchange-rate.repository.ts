import { ExchangeRateRepository } from '@/exchange/application/ports/exchange-rate.repository';
import { ExchangeRate } from '@/exchange/domain/exchange-rate';
import { Injectable } from '@nestjs/common';
import { ExchangeRateEntity } from '../entities/exchange-rate.entity';
import { ExchangeRateMapper } from '../mappers/exchange-rate.mapper';

@Injectable()
export class InMemoryExchangeRateRepository implements ExchangeRateRepository {
  private readonly exchangeRates = new Map<string, ExchangeRateEntity>();

  async findAll(): Promise<ExchangeRate[]> {
    const entities = Array.from(this.exchangeRates.values());

    return entities.map((x) => ExchangeRateMapper.toDomain(x));
  }

  async findOne(options: any): Promise<ExchangeRate> {
    const entities = this.exchangeRates.get(options.id);
    
    return ExchangeRateMapper.toDomain(entities);
  }

  async upsert(exchangeRate: ExchangeRate): Promise<ExchangeRate> {
    const persistenceModel = ExchangeRateMapper.toPersistence(exchangeRate);

    const exists = Array.from(this.exchangeRates).findIndex((x) => x[1].fromCurrency === persistenceModel.fromCurrency) > -1;

    if (exists) {
      this.exchangeRates[persistenceModel.id] = persistenceModel;
    } else {
      this.exchangeRates.set(persistenceModel.id, persistenceModel);
    }

    return ExchangeRateMapper.toDomain(persistenceModel);
  }

  async save(exchangeRate: ExchangeRate): Promise<ExchangeRate> {
    const persistenceModel = ExchangeRateMapper.toPersistence(exchangeRate);
    this.exchangeRates.set(persistenceModel.id, persistenceModel);

    const newEntity = this.exchangeRates.get(persistenceModel.id);
    return ExchangeRateMapper.toDomain(newEntity);
  }
}
