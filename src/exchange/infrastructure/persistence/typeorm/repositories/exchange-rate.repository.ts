import { ExchangeRateRepository } from '@/exchange/application/ports/exchange-rate.repository';
import { ExchangeRate } from '@/exchange/domain/exchange-rate';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ExchangeRateEntity } from '../entities/exchange-rate.entity';
import { ExchangeRateMapper } from '../mappers/exchange-rate.mapper';

@Injectable()
export class TypeOrmExchangeRateRepository implements ExchangeRateRepository {
  constructor(
    @InjectRepository(ExchangeRateEntity)
    private readonly repository: Repository<ExchangeRateEntity>,
  ) {}

  async findAll(): Promise<ExchangeRate[]> {
    const entities = await this.repository.find();

    return entities.map((x) => ExchangeRateMapper.toDomain(x));
  }



  async findOne(
    options: FindOneOptions<ExchangeRateEntity>,
  ): Promise<ExchangeRate> {
    return this.repository.findOne(options);
  }

  async upsert(exchangeRate: ExchangeRate): Promise<ExchangeRate> {
    const persistenceModel = ExchangeRateMapper.toPersistence(exchangeRate);

    await this.repository.upsert(persistenceModel, ['fromCurrency']);

    return ExchangeRateMapper.toDomain(persistenceModel);
  }

  async save(exchangeRate: ExchangeRate): Promise<ExchangeRate> {
    const persistenceModel = ExchangeRateMapper.toPersistence(exchangeRate);
    const entity = await this.repository.save(persistenceModel);
    return ExchangeRateMapper.toDomain(entity);
  }
}
