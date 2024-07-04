import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExchangeRateRepository } from 'exchange/application/ports/exchange-rate.repository';
import { ProviderCProvider } from 'exchange/application/providers/provider';
import { ExchangeRateFactory } from 'exchange/domain/factories/exchange-rate.factory';
import { RateCryptoTyCryptoQuery } from './rate-crypto-to-crypto.query';

@QueryHandler(RateCryptoTyCryptoQuery)
export class RateCryptoTyCryptoQueryHandler
  implements IQueryHandler<RateCryptoTyCryptoQuery, number>
{
  constructor(
    protected readonly exchangeRateProvider: ProviderCProvider,

    protected readonly exchangeRateFactory: ExchangeRateFactory,
    protected readonly exchangeRateRepository: ExchangeRateRepository,
  ) {}
  async execute(query: RateCryptoTyCryptoQuery): Promise<number> {
    const { from, to } = query;

    const rate = await this.exchangeRateProvider.calculate(from, to);

    await this.exchangeRateRepository.upsert(
      this.exchangeRateFactory.create(from, to, rate),
    );

    return rate;
  }
}
