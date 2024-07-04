import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RateIRRToUSDQuery } from '../queries/rate/rate-irr-to-usd.query';

@Injectable()
export class ExchangeRateService {
  constructor(private readonly queryBus: QueryBus) {}

  findAll() {
    throw new Error('Method not implemented.');
  }

  async rateIRRToUSD() {
    return this.queryBus.execute(new RateIRRToUSDQuery());
  }

  async rateUSDToOther() {
    throw new Error('Method not implemented.');
  }
  async rateCryptoToCrypto() {
    throw new Error('Method not implemented.');
  }
  async rateEURToCrypto() {
    throw new Error('Method not implemented.');
  }
}
