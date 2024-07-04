import { ExchangeRateRepository } from '@/exchange/application/ports/exchange-rate.repository';
import { ProviderBProvider } from '@/exchange/application/providers/provider';
import { ExchangeRateFactory } from '@/exchange/domain/factories/exchange-rate.factory';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RateUSDToFiatQuery } from './rate-usd-to-fiat.query';

@QueryHandler(RateUSDToFiatQuery)
export class RateUSDToFiatQueryHandler
  implements IQueryHandler<RateUSDToFiatQuery, number>
{
  private readonly logger = new Logger(RateUSDToFiatQueryHandler.name);

  constructor(
    private readonly exchangeRateProvider: ProviderBProvider,

    private readonly exchangeRateFactory: ExchangeRateFactory,
    private readonly exchangeRateRepository: ExchangeRateRepository,
  ) {}

  async execute(query: RateUSDToFiatQuery): Promise<number> {
    const { to } = query;
    try {
      const rate = await this.exchangeRateProvider.calculate('USD', to);

      await this.exchangeRateRepository.upsert(
        this.exchangeRateFactory.create('USD', to, rate),
      );

      return rate;
    } catch (error) {
      this.logger.error(error);
      // TODO: handle error
    }
  }
}
