import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExchangeRateRepository } from 'exchange/application/ports/exchange-rate.repository';
import { ProviderBProvider } from 'exchange/application/providers/provider';
import { ExchangeRateFactory } from 'exchange/domain/factories/exchange-rate.factory';
import { ConvertUSDToFiatQuery } from './convert-usd-to-fiat.query';

@QueryHandler(ConvertUSDToFiatQuery)
export class ConvertUSDToFiatQueryHandler
  implements IQueryHandler<ConvertUSDToFiatQuery, number>
{
  private readonly logger = new Logger(ConvertUSDToFiatQueryHandler.name);

  constructor(
    private readonly exchangeRateProvider: ProviderBProvider,
    private readonly exchangeRateFactory: ExchangeRateFactory,
    private readonly exchangeRateRepository: ExchangeRateRepository,
  ) {}

  async execute(query: ConvertUSDToFiatQuery): Promise<number> {
    const { to, amount } = query;
    try {
      const res = await this.exchangeRateRepository.findOne({
        where: {
          fromCurrency: 'USD',
          toCurrency: to,
        },
      });

      if (res) {
        return amount * res.rate;
      }
      const rate = await this.exchangeRateProvider.calculate('USD', to);

      await this.exchangeRateRepository.upsert(
        this.exchangeRateFactory.create('USD', to, rate),
      );

      return amount * rate;
    } catch (error) {
      this.logger.error(error);
      // TODO: handle error
    }
  }
}
