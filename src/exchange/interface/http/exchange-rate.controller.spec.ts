import { ExchangeRateService } from '@/exchange/application/services/exchange-rate.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateController } from './exchange-rate.controller';

describe('ExchangeRateController', () => {
  let controller: ExchangeRateController;
  let service: Partial<ExchangeRateService>;

  beforeEach(async () => {
    service = {
      findAll: () => {
        return Promise.resolve([]);
      },
      rateIRRToUSD: () => {
        return Promise.resolve(1);
      },
      rateUSDToOther: () => {
        return Promise.resolve(1);
      },
      rateCryptoToCrypto: () => {
        return Promise.resolve(1);
      },
      rateEURToCrypto: () => {
        return Promise.resolve(1);
      },
    } as Partial<ExchangeRateService>;

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeRateController],
      providers: [{ provide: ExchangeRateService, useValue: service }],
    }).compile();

    controller = app.get<ExchangeRateController>(ExchangeRateController);
  });

  describe('findAll', () => {
    it('should return an array of exchange rates', async () => {
      expect(await controller.findAll()).toEqual([]);
    });
  });

  describe('rateIRRToUSD', () => {
    it('should return an exchange rate', async () => {
      expect(await controller.rateIRRToUSD({})).toEqual(1);
    });
  });

  describe('rateUSDToOther', () => {
    it('should return an exchange rate', async () => {
      expect(await controller.rateUSDToOther({to:"USD"})).toEqual(1);
    });
  });

  describe('rateCryptoToCrypto', () => {
    it('should return an exchange rate', async () => {
      expect(await controller.rateCryptoToCrypto({from:"BTC",to:"USD"})).toEqual(1);
    });
  });

  describe('rateEURToCrypto', () => {
    it('should return an exchange rate', async () => {
      expect(await controller.rateEURToCrypto({to:"BTC"})).toEqual(1);
    });
  });
});
