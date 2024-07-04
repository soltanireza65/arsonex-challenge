import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExchangeConvertService } from 'exchange/application/services/exchange-convert.service';
import { ConvertCryptoTyCrypto } from './dto/convert/convert-crypto-to-crypto.dto';
import { ConvertEURToCrypto } from './dto/convert/convert-eur-to-crypto.dto';
import { ConvertIRRToUSD } from './dto/convert/convert-irr-to-usd.dto';
import { ConvertUSDToFiat } from './dto/convert/convert-usd-to-fiat.dto';

@ApiTags('exchange-convertion')
@Controller('exchange/convert')
export class ExchangeConvertionController {
  constructor(private readonly service: ExchangeConvertService) {}

  @ApiOperation({ summary: 'Convert IRR to USD' })
  @ApiResponse({ status: 200, description: 'The conversion was successful.' })
  @Get('irr-to-usd')
  async convertIRRToUSD(@Query() args: ConvertIRRToUSD) {
    throw new Error('Not implemented');
  }

  @ApiOperation({ summary: 'Convert USD to other Fiat currencies' })
  @ApiResponse({ status: 200, description: 'The conversion was successful.' })
  @Get('usd-to-other')
  async convertUSDToOther(@Query() args: ConvertUSDToFiat) {
    throw new Error('Not implemented');
  }

  @ApiOperation({ summary: 'Convert Crypto to Crypto' })
  @ApiResponse({ status: 200, description: 'The conversion was successful.' })
  @Get('crypto-to-crypto')
  async convertCryptoToCrypto(@Query() args: ConvertCryptoTyCrypto) {
    throw new Error('Not implemented');
  }

  @ApiOperation({ summary: 'Convert EUR to Crypto' })
  @ApiResponse({ status: 200, description: 'The conversion was successful.' })
  @Get('eur-to-crypto')
  async convertEURToCrypto(@Query() args: ConvertEURToCrypto) {
    throw new Error('Not implemented');
  }
}
