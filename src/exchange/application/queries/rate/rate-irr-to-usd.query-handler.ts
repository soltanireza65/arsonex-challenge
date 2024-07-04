import { ExchangeRateRepository } from '@/exchange/application/ports/exchange-rate.repository';
import { ProviderAProvider } from '@/exchange/application/providers/provider';
import { ExchangeRateFactory } from '@/exchange/domain/factories/exchange-rate.factory';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RateIRRToUSDQuery } from './rate-irr-to-usd.query';

@QueryHandler(RateIRRToUSDQuery)
export class RateIRRToUSDQueryHandler
  implements IQueryHandler<RateIRRToUSDQuery, number>
{
  private readonly logger = new Logger(RateIRRToUSDQueryHandler.name);

  constructor(
    private readonly exchangeRateProvider: ProviderAProvider,
    private readonly exchangeRateFactory: ExchangeRateFactory,
    private readonly exchangeRateRepository: ExchangeRateRepository,
  ) {}
  async execute(query: RateIRRToUSDQuery): Promise<number> {
    try {
      const rate = await this.exchangeRateProvider.calculate('IRR', 'USD');

      await this.exchangeRateRepository.upsert(
        this.exchangeRateFactory.create('IRR', 'USD', rate),
      );

      return rate;
    } catch (error) {
      this.logger.error(error);
      // TODO: handle error
    }
  }
}
