export class ConvertEURToCryptoQuery {
  constructor(
    public readonly to: string,
    public readonly amount: number,
  ) {}
}
