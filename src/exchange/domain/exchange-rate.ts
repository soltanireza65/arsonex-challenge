export class ExchangeRate {
  fromCurrency: string;

  toCurrency: string;

  rate: number;

  timestamp: Date;

  constructor(
    fromCurrency: string,
    toCurrency: string,
    rate: number,
    timestamp: Date,
  ) {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.rate = rate;
    this.timestamp = timestamp;
  }
}
