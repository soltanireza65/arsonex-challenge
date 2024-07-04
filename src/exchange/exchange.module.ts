import { Module } from '@nestjs/common';
import { ExchangeRateController } from './interface/http/exchange-rate.controller';
import { ExchangeConvertionController } from './interface/http/exchange-convert.controller';
import { ExchangeConvertService } from './application/services/exchange-convert.service';
import { ExchangeRateService } from './application/services/exchange-rate.service';

@Module({
  controllers: [ExchangeRateController, ExchangeConvertionController],
  providers: [ExchangeConvertService, ExchangeRateService],
})
export class ExchangeModule {}
