import { IApplicationBootstrapOptions } from '@/common/interfaces/application-bootstrap-option.interface';
import { CoreModule } from '@/core/core.module';
import { ExchangeRateInfrastructureModule } from '@/exchange/infrastructure/exchange-rate-infrastructure.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [CqrsModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {
  static register(options: IApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        ExchangeModule.withInfrastructure(
          ExchangeRateInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
