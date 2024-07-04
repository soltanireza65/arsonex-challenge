import { ExchangeRateRepository } from '@/exchange/application/ports/exchange-rate.repository';
import { Module } from '@nestjs/common';
import { InMemoryExchangeRateRepository } from './repositories/exchange-rate.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: ExchangeRateRepository,
      useClass: InMemoryExchangeRateRepository,
    },
  ],
  exports: [ExchangeRateRepository],
})
export class InMemoryExchangeRatePersistenceModule {}
