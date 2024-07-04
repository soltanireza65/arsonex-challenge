import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExchangeRateRepository } from 'exchange/application/ports/exchange-rate.repository';
import { ProviderAProvider } from 'exchange/application/providers/provider';
import { ExchangeRateFactory } from 'exchange/domain/factories/exchange-rate.factory';
import { ConvertIRRToUSDQuery } from './convert-irr-to-usd.query';

@QueryHandler(ConvertIRRToUSDQuery)
export class ConvertIRRToUSDQueryHandler
  implements IQueryHandler<ConvertIRRToUSDQuery, number>
{
  constructor(
    private readonly exchangeRateProvider: ProviderAProvider,
    private readonly exchangeRateFactory: ExchangeRateFactory,
    private readonly exchangeRateRepository: ExchangeRateRepository,
  ) {}
  async execute(query: ConvertIRRToUSDQuery): Promise<number> {
    const { amount } = query;

    try {
      const res = await this.exchangeRateRepository.findOne({
        where: {
          fromCurrency: 'IRR',
          toCurrency: 'USD',
        },
      });

      return amount * res.rate;
    } catch (error) {}
  }
}
