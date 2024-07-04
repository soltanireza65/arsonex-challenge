import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ConvertCryptoTyCryptoQuery } from '../queries/convert/convert-crypto-to-crypto.query';
import { ConvertEURToCryptoQuery } from '../queries/convert/convert-eur-to-crypto.query';
import { ConvertIRRToUSDQuery } from '../queries/convert/convert-irr-to-usd.query';
import { ConvertUSDToFiatQuery } from '../queries/convert/convert-usd-to-fiat.query';

@Injectable()
export class ExchangeConvertService {
  constructor(private readonly queryBus: QueryBus) {}

  async convertIRRToUSD(query: ConvertIRRToUSDQuery): Promise<number> {
    return this.queryBus.execute(new ConvertIRRToUSDQuery(query.amount));
  }

  async convertUSDToOther(query: ConvertUSDToFiatQuery) {
    const { to, amount } = query;
    return this.queryBus.execute(new ConvertUSDToFiatQuery(to, amount));
  }
  async convertCryptoToCrypto(query: ConvertCryptoTyCryptoQuery) {
    const { from, to, amount } = query;
    return this.queryBus.execute(
      new ConvertCryptoTyCryptoQuery(from, to, amount),
    );
  }
  async convertEURToCrypto(query: ConvertEURToCryptoQuery) {
    const { to, amount } = query;
    return this.queryBus.execute(new ConvertEURToCryptoQuery(to, amount));
  }
}
