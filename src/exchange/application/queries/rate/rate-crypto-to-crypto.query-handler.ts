import { ExchangeRateRepository } from '@/exchange/application/ports/exchange-rate.repository';
import { ProviderCProvider } from '@/exchange/application/providers/provider';
import { ExchangeRateFactory } from '@/exchange/domain/factories/exchange-rate.factory';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RateCryptoTyCryptoQuery } from './rate-crypto-to-crypto.query';

@QueryHandler(RateCryptoTyCryptoQuery)
export class RateCryptoTyCryptoQueryHandler
  implements IQueryHandler<RateCryptoTyCryptoQuery, number>
{
  private readonly logger = new Logger(RateCryptoTyCryptoQueryHandler.name);
  constructor(
    protected readonly exchangeRateProvider: ProviderCProvider,
    protected readonly exchangeRateFactory: ExchangeRateFactory,
    protected readonly exchangeRateRepository: ExchangeRateRepository,
  ) {}
  async execute(query: RateCryptoTyCryptoQuery): Promise<number> {
    const { from, to } = query;

    try {
      const rate = await this.exchangeRateProvider.calculate(from, to);

      await this.exchangeRateRepository.upsert(
        this.exchangeRateFactory.create(from, to, rate),
      );

      return rate;
    } catch (error) {
      this.logger.error(error);
      // TODO: handle error
    }
  }
}
