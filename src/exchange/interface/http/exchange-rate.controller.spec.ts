import { ExchangeRateFacade } from '@/exchange/application/facades/exchange-rate.facade';
import { QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateController } from './exchange-rate.controller';

describe('ExchangeRateController', () => {
  let controller: ExchangeRateController;
  let facade: Partial<ExchangeRateFacade>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeRateController],
      providers: [ExchangeRateFacade, QueryBus],
    }).compile();

    controller = module.get<ExchangeRateController>(ExchangeRateController);
    facade = module.get<ExchangeRateFacade>(ExchangeRateFacade);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of exchange rates', async () => {
      facade.findAll = jest.fn().mockReturnValue([]);
      expect(await controller.findAll()).toEqual([]);
    });
  });

  describe('rateIRRToUSD', () => {
    it('should return an exchange rate', async () => {
      facade.rateIRRToUSD = jest.fn().mockReturnValue(1);
      expect(await controller.rateIRRToUSD({})).toEqual(1);
    });
  });

  describe('rateUSDToOther', () => {
    it('should return an exchange rate', async () => {
      facade.rateUSDToOther = jest.fn().mockReturnValue(1);
      expect(await controller.rateUSDToOther({ to: 'USD' })).toEqual(1);
    });
  });

  describe('rateCryptoToCrypto', () => {
    it('should return an exchange rate', async () => {
      facade.rateCryptoToCrypto = jest.fn().mockReturnValue(1);
      expect(
        await controller.rateCryptoToCrypto({ from: 'BTC', to: 'USD' }),
      ).toEqual(1);
    });
  });

  describe('rateEURToCrypto', () => {
    it('should return an exchange rate', async () => {
      facade.rateEURToCrypto = jest.fn().mockReturnValue(1);
      expect(await controller.rateEURToCrypto({ to: 'BTC' })).toEqual(1);
    });
  });
});
