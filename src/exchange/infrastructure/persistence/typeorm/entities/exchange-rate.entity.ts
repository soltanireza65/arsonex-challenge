import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'exchange_rate' })
export class ExchangeRateEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  fromCurrency: string;

  @Column()
  toCurrency: string;

  @Column('decimal')
  rate: number;

  @Column()
  timestamp: Date;

  constructor(
    id: string,
    fromCurrency: string,
    toCurrency: string,
    rate: number,
    timestamp: Date,
  ) {
    this.id = id;
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.rate = rate;
    this.timestamp = timestamp;
  }
}
