export class ConvertUSDToFiatQuery {
  constructor(
    public readonly to: string,
    public readonly amount: number,
  ) {}
}
