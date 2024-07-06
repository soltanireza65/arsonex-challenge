import { ExchangeRateFacade } from '@/exchange/application/facades/exchange-rate.facade';
import { RateIRRToUSDQuery } from '@/exchange/application/queries/rate/rate-irr-to-usd.query';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RateCryptoTyCrypto } from './dto/rate/rate-crypto-to-crypto.dto';
import { RateEURToCrypto } from './dto/rate/rate-eur-to-crypto.dto';
import { RateIRRToUSD } from './dto/rate/rate-irr-to-usd.dto';
import { RateUSDToFiat } from './dto/rate/rate-usd-to-fiat.dto';

@ApiTags('exchange-rate')
@Controller('exchange/rate')
export class ExchangeRateController {
  constructor(private readonly facade: ExchangeRateFacade) {}

  @Get('get-all-rates')
  findAll() {
    return this.facade.findAll();
  }

  @ApiOperation({ summary: 'Rate IRR to USD' })
  @ApiResponse({ status: 200, description: 'The conversion was successful.' })
  @Get('irr-to-usd')
  async rateIRRToUSD(@Query() args: RateIRRToUSD) {
    return this.facade.rateIRRToUSD(new RateIRRToUSDQuery());
  }

  @ApiOperation({ summary: 'Rate USD to other Fiat currencies' })
  @ApiResponse({ status: 200, description: 'The conversion was successful.' })
  @Get('usd-to-other')
  async rateUSDToOther(@Query() args: RateUSDToFiat) {
    return this.facade.rateUSDToOther(args);
  }

  @ApiOperation({ summary: 'Rate Crypto to Crypto' })
  @ApiResponse({ status: 200, description: 'The conversion was successful.' })
  @Get('crypto-to-crypto')
  async rateCryptoToCrypto(@Query() args: RateCryptoTyCrypto) {
    return this.facade.rateCryptoToCrypto(args);
  }

  @ApiOperation({ summary: 'Rate EUR to Crypto' })
  @ApiResponse({ status: 200, description: 'The conversion was successful.' })
  @Get('eur-to-crypto')
  async rateEURToCrypto(@Query() args: RateEURToCrypto) {
    return this.facade.rateEURToCrypto(args);
  }
}
