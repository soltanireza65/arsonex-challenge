import { IQuery, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { RateIRRToUSDQuery } from '../queries/rate/rate-irr-to-usd.query';
import { ExchangeRateFacade } from './exchange-rate.facade';

describe('ExchangeRateFacade', () => {
  let facade: ExchangeRateFacade;
  let queryBus: QueryBus<IQuery>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeRateFacade, QueryBus],
    }).compile();

    facade = module.get<ExchangeRateFacade>(ExchangeRateFacade);
    queryBus = module.get<QueryBus<IQuery>>(QueryBus);
  });

  it('should be defined', () => {
    expect(facade).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of exchange rates', async () => {
      queryBus.execute = jest.fn().mockReturnValue([]);
      expect(await facade.findAll()).toEqual([]);
    });
  });


  describe('rateIRRToUSD', () => {
    it('should return an exchange rate', async () => {
      queryBus.execute = jest.fn().mockReturnValue(1);
      expect(await facade.rateIRRToUSD(new RateIRRToUSDQuery())).toEqual(1);
    });
  });

  describe('rateUSDToOther', () => {
    it('should return an exchange rate', async () => {
      queryBus.execute = jest.fn().mockReturnValue(1);
      expect(await facade.rateUSDToOther({ to: 'USD' })).toEqual(1);
    });
  });

  describe('rateCryptoToCrypto', () => {
    it('should return an exchange rate', async () => {
      queryBus.execute = jest.fn().mockReturnValue(1);
      expect(
        await facade.rateCryptoToCrypto({ from: 'BTC', to: 'USD' }),
      ).toEqual(1);
    });
  });

  describe('rateEURToCrypto', () => {
    it('should return an exchange rate', async () => {
      queryBus.execute = jest.fn().mockReturnValue(1);
      expect(await facade.rateEURToCrypto({ to: 'BTC' })).toEqual(1);
    });
  });
});
