import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateRepository } from '../../ports/exchange-rate.repository';
import { GetAllRatesQuery } from './get-all-rates.query';
import { GetAllRatesQueryHandler } from './get-all-rates.query-handler';

describe('GetAllRatesQueryHandler', () => {
  let queryHandler: GetAllRatesQueryHandler;
  let repository: ExchangeRateRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllRatesQueryHandler,
        {
          provide: ExchangeRateRepository,
          useValue: {},
        },
      ],
    }).compile();

    queryHandler = module.get<GetAllRatesQueryHandler>(GetAllRatesQueryHandler);
    repository = module.get<ExchangeRateRepository>(ExchangeRateRepository);
  });

  it('should be defined', () => {
    expect(queryHandler).toBeDefined();
  });

  describe('execute', () => {
    it('should return an array of exchange rates', async () => {
      repository.findAll = jest.fn().mockReturnValue([]);
      expect(await queryHandler.execute(new GetAllRatesQuery())).toEqual([]);
    });
  });
});
