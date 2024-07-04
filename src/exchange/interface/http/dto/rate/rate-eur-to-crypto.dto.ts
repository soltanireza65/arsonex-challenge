import { ApiProperty } from '@nestjs/swagger';

export class RateEURToCrypto {
  @ApiProperty({ example: 'USDT' })
  to: string;
}
