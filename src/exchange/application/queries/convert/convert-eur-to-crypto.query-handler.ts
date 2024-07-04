import { ExchangeRateRepository } from '@/exchange/application/ports/exchange-rate.repository';
import { ProviderCProvider } from '@/exchange/application/providers/provider';
import { ExchangeRateFactory } from '@/exchange/domain/factories/exchange-rate.factory';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConvertEURToCryptoQuery } from './convert-eur-to-crypto.query';

@QueryHandler(ConvertEURToCryptoQuery)
export class ConvertEURToCryptoQueryHandler
  implements IQueryHandler<ConvertEURToCryptoQuery, number>
{
  private readonly logger = new Logger(ConvertEURToCryptoQueryHandler.name);
  constructor(
    private readonly exchangeRateProvider: ProviderCProvider,

    private readonly exchangeRateFactory: ExchangeRateFactory,
    private readonly exchangeRateRepository: ExchangeRateRepository,
  ) {}

  async execute(query: ConvertEURToCryptoQuery): Promise<number> {
    const { to, amount } = query;

    try {
      const res = await this.exchangeRateRepository.findOne({
        where: {
          fromCurrency: 'EUR',
          toCurrency: to,
        },
      });

      if (res) {
        return amount * res.rate;
      }

      const rate = await this.exchangeRateProvider.calculate('EUR', to);

      await this.exchangeRateRepository.upsert(
        this.exchangeRateFactory.create('EUR', to, rate),
      );

      return amount * rate;
    } catch (error) {
      this.logger.error(error);
      // TODO: handle error
    }
  }
}
