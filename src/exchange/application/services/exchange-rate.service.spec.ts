import { IQuery, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { RateIRRToUSDQuery } from '../queries/rate/rate-irr-to-usd.query';
import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let queryBus: QueryBus<IQuery>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeRateService, QueryBus],
    }).compile();

    service = module.get<ExchangeRateService>(ExchangeRateService);
    queryBus = module.get<QueryBus<IQuery>>(QueryBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of exchange rates', async () => {
      queryBus.execute = jest.fn().mockReturnValue([]);
      expect(await service.findAll()).toEqual([]);
    });
  });


  describe('rateIRRToUSD', () => {
    it('should return an exchange rate', async () => {
      queryBus.execute = jest.fn().mockReturnValue(1);
      expect(await service.rateIRRToUSD(new RateIRRToUSDQuery())).toEqual(1);
    });
  });

  describe('rateUSDToOther', () => {
    it('should return an exchange rate', async () => {
      queryBus.execute = jest.fn().mockReturnValue(1);
      expect(await service.rateUSDToOther({ to: 'USD' })).toEqual(1);
    });
  });

  describe('rateCryptoToCrypto', () => {
    it('should return an exchange rate', async () => {
      queryBus.execute = jest.fn().mockReturnValue(1);
      expect(
        await service.rateCryptoToCrypto({ from: 'BTC', to: 'USD' }),
      ).toEqual(1);
    });
  });

  describe('rateEURToCrypto', () => {
    it('should return an exchange rate', async () => {
      queryBus.execute = jest.fn().mockReturnValue(1);
      expect(await service.rateEURToCrypto({ to: 'BTC' })).toEqual(1);
    });
  });
});
