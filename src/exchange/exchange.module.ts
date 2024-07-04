import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module, Type } from '@nestjs/common';
import { ExchangeRateApplications } from './application/exchange.application';
import { ExchangeConvertionController } from './interface/http/exchange-convert.controller';
import { ExchangeRateController } from './interface/http/exchange-rate.controller';

@Module({
  imports: [HttpModule],
  controllers: [ExchangeRateController, ExchangeConvertionController],
  providers: [...ExchangeRateApplications],
})
export class ExchangeModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
  ): DynamicModule {
    return {
      module: ExchangeModule,
      imports: [infrastructureModule],
    };
  }
}
