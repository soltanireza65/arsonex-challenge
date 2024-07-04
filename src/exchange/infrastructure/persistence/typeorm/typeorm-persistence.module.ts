import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateRepository } from 'exchange/application/ports/exchange-rate.repository';
import { ExchangeRateEntity } from './entities/exchange-rate.entity';
import { TypeOrmExchangeRateRepository } from './repositories/exchange-rate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeRateEntity])],
  providers: [
    {
      provide: ExchangeRateRepository,
      useClass: TypeOrmExchangeRateRepository,
    },
  ],
  exports: [ExchangeRateRepository],
})
export class TypeOrmExchangeRatePersistenceModule {}
