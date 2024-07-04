export class ExchangeRateEntity {
  constructor(
    public id: string,
    public fromCurrency: string,
    public toCurrency: string,
    public rate: number,
    public timestamp: Date,
  ) {}
}
