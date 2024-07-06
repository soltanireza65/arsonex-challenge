import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllRatesQuery } from '../queries/rate/get-all-rates.query';
import { RateCryptoTyCryptoQuery } from '../queries/rate/rate-crypto-to-crypto.query';
import { RateEURToCryptoQuery } from '../queries/rate/rate-eur-to-crypto.query';
import { RateIRRToUSDQuery } from '../queries/rate/rate-irr-to-usd.query';
import { RateUSDToFiatQuery } from '../queries/rate/rate-usd-to-fiat.query';

@Injectable()
export class ExchangeRateFacade {
  constructor(private readonly queryBus: QueryBus) {}

  findAll() {
    return this.queryBus.execute(new GetAllRatesQuery());
  }

  async rateIRRToUSD(query: RateIRRToUSDQuery): Promise<number> {
    return this.queryBus.execute(new RateIRRToUSDQuery());
  }

  async rateUSDToOther({ to }: RateUSDToFiatQuery) {
    return this.queryBus.execute(new RateUSDToFiatQuery(to));
  }
  async rateCryptoToCrypto({ from, to }: RateCryptoTyCryptoQuery) {
    return this.queryBus.execute(new RateCryptoTyCryptoQuery(from, to));
  }
  async rateEURToCrypto({ to }: RateEURToCryptoQuery) {
    return this.queryBus.execute(new RateEURToCryptoQuery(to));
  }
}
