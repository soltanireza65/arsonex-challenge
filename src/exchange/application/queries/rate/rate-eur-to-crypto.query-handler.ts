import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExchangeRateRepository } from 'exchange/application/ports/exchange-rate.repository';
import { ProviderCProvider } from 'exchange/application/providers/provider';
import { ExchangeRateFactory } from 'exchange/domain/factories/exchange-rate.factory';
import { RateEURToCryptoQuery } from './rate-eur-to-crypto.query';

@QueryHandler(RateEURToCryptoQuery)
export class RateEURToCryptoQueryHandler
  implements IQueryHandler<RateEURToCryptoQuery, number>
{
  constructor(
    private readonly exchangeRateProvider: ProviderCProvider,

    private readonly exchangeRateFactory: ExchangeRateFactory,
    private readonly exchangeRateRepository: ExchangeRateRepository,
  ) {}

  async execute(query: RateEURToCryptoQuery): Promise<number> {
    const { to } = query;

    const rate = await this.exchangeRateProvider.calculate('EUR', to);

    await this.exchangeRateRepository.upsert(
      this.exchangeRateFactory.create('EUR', to, rate),
    );

    return rate;
  }
}
