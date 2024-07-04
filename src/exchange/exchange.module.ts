import { Module } from '@nestjs/common';
import { ExchangeService } from './application/services/exchange.service';
import { ExchangeController } from './interface/http/exchange.controller';

@Module({
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
