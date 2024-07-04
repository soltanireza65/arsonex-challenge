import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExchangeRateRepository } from 'exchange/application/ports/exchange-rate.repository';
import { ProviderCProvider } from 'exchange/application/providers/provider';
import { ExchangeRateFactory } from 'exchange/domain/factories/exchange-rate.factory';
import { ConvertCryptoTyCryptoQuery } from './convert-crypto-to-crypto.query';

@QueryHandler(ConvertCryptoTyCryptoQuery)
export class ConvertCryptoTyCryptoQueryHandler
  implements IQueryHandler<ConvertCryptoTyCryptoQuery, number>
{
  constructor(
    protected readonly exchangeRateProvider: ProviderCProvider,

    protected readonly exchangeRateFactory: ExchangeRateFactory,
    protected readonly exchangeRateRepository: ExchangeRateRepository,
  ) {}
  async execute(query: ConvertCryptoTyCryptoQuery): Promise<number> {
    const { amount, from, to } = query;

    try {
      const res = await this.exchangeRateRepository.findOne({
        where: {
          fromCurrency: from,
          toCurrency: to,
        },
      });

      return amount * res.rate;
    } catch (error) {
      const rate = await this.exchangeRateProvider.calculate(from, to);

      await this.exchangeRateRepository.upsert(
        this.exchangeRateFactory.create(from, to, rate),
      );

      return amount * rate;
    }
  }
}
