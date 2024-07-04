import { ApiProperty } from '@nestjs/swagger';

export class RateUSDToFiat {
  @ApiProperty({ example: 'EUR' })
  to: string;
}
