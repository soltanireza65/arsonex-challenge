import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ExchangeConvertService } from "exchange/application/services/exchange-convert.service";


@ApiTags('exchange-convertion')
@Controller('exchange/convert')
export class ExchangeConvertionController {
  constructor(private readonly service: ExchangeConvertService) {}

  
}
