import { ExchangeRateRepository } from '@/exchange/application/ports/exchange-rate.repository';
import { ExchangeRate } from '@/exchange/domain/exchange-rate';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllRatesQuery } from './get-all-rates.query';

@QueryHandler(GetAllRatesQuery)
export class GetAllRatesQueryHandler
  implements IQueryHandler<GetAllRatesQuery, ExchangeRate[]>
{
  constructor(
    private readonly exchangeRateRepository: ExchangeRateRepository,
  ) {}
  execute(query: GetAllRatesQuery): Promise<any> {
    return this.exchangeRateRepository.findAll();
  }
}
