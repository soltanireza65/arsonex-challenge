import { Module } from '@nestjs/common';
import { ExchangeRateController } from './interface/http/exchange-rate.controller';
import { ExchangeConvertionController } from './interface/http/exchange-convert.controller';
import { ExchangeConvertService } from './application/services/exchange-convert.service';
import { ExchangeRateService } from './application/services/exchange-rate.service';
import { ExchangeRateApplications } from './application/exchange.application';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ExchangeRateController, ExchangeConvertionController],
  providers: [...ExchangeRateApplications],
})
export class ExchangeModule {}
