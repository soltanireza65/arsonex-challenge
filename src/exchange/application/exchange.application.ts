import {
  ProviderAProvider,
  ProviderBProvider,
  ProviderCProvider,
} from './providers/provider';
import { ConvertCryptoTyCryptoQueryHandler } from './queries/convert/convert-crypto-to-crypto.query-handler';
import { ConvertEURToCryptoQueryHandler } from './queries/convert/convert-eur-to-crypto.query-handler';
import { ConvertIRRToUSDQueryHandler } from './queries/convert/convert-irr-to-usd.query-handler';
import { ConvertUSDToFiatQueryHandler } from './queries/convert/convert-usd-to-fiat.query-handler';
import { GetAllRatesQueryHandler } from './queries/rate/get-all-rates.query-handler';
import { RateCryptoTyCryptoQueryHandler } from './queries/rate/rate-crypto-to-crypto.query-handler';
import { RateEURToCryptoQueryHandler } from './queries/rate/rate-eur-to-crypto.query-handler';
import { RateIRRToUSDQueryHandler } from './queries/rate/rate-irr-to-usd.query-handler';
import { RateUSDToFiatQueryHandler } from './queries/rate/rate-usd-to-fiat.query-handler';
import { ExchangeConvertService } from './services/exchange-convert.service';
import { ExchangeRateService } from './services/exchange-rate.service';

const ExchangeRateServices: any[] = [
  ExchangeRateService,
  ExchangeConvertService,
];
const ExchangeRateProviders: any[] = [
  ProviderAProvider,
  ProviderBProvider,
  ProviderCProvider,
];

const ExchangeRateQueryHandlers: any[] = [
  // Rate
  GetAllRatesQueryHandler,
  RateIRRToUSDQueryHandler,
  RateUSDToFiatQueryHandler,
  RateCryptoTyCryptoQueryHandler,
  RateEURToCryptoQueryHandler,
  // Convert
  ConvertIRRToUSDQueryHandler,
  ConvertUSDToFiatQueryHandler,
  ConvertCryptoTyCryptoQueryHandler,
  ConvertEURToCryptoQueryHandler,
];
const ExchangeRateCommandHandlers: any[] = [];
const ExchangeRateEventHandlers: any[] = [];

export const ExchangeRateApplications = [
  ...ExchangeRateServices,
  ...ExchangeRateProviders,
  ...ExchangeRateQueryHandlers,
  ...ExchangeRateCommandHandlers,
  ...ExchangeRateEventHandlers,
];
