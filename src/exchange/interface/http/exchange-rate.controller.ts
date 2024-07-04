import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExchangeRateService } from 'exchange/application/services/exchange-rate.service';

@ApiTags('exchange-rate')
@Controller('exchange/rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}
}
