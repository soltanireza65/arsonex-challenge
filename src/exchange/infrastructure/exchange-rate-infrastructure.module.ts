import { Module } from '@nestjs/common';
import { TypeOrmExchangeRatePersistenceModule } from './persistence/typeorm/typeorm-persistence.module';
import { InMemoryExchangeRatePersistenceModule } from './persistence/in-memory/in-memory-persistence.module';
import { TDriver } from 'common/types/driver.type';

@Module({})
export class ExchangeRateInfrastructureModule {
  static use(driver: TDriver) {
    let persistenceModule = this.resolvePersistenceModule(driver);

    return {
      module: ExchangeRateInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }

  private static resolvePersistenceModule(driver: TDriver) {
    switch (driver) {
      case 'typeorm':
        return TypeOrmExchangeRatePersistenceModule;

      case 'in-memory':
        return InMemoryExchangeRatePersistenceModule;

      default:
        return InMemoryExchangeRatePersistenceModule;
    }
  }
}
