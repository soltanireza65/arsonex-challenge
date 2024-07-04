import {
  ProviderAProvider,
  ProviderBProvider,
  ProviderCProvider,
} from './providers/provider';
import { RateIRRToUSDQueryHandler } from './queries/rate/rate-irr-to-usd.query-handler';
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

const ExchangeRateQueryHandlers: any[] = [RateIRRToUSDQueryHandler];
const ExchangeRateCommandHandlers: any[] = [];
const ExchangeRateEventHandlers: any[] = [];

export const ExchangeRateApplications = [
  ...ExchangeRateServices,
  ...ExchangeRateProviders,
  ...ExchangeRateQueryHandlers,
  ...ExchangeRateCommandHandlers,
  ...ExchangeRateEventHandlers,
];
