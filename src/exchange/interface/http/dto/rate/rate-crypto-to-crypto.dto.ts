import { ApiProperty } from '@nestjs/swagger';

export class RateCryptoTyCrypto {
  @ApiProperty({ example: 'BTC' })
  from: string;

  @ApiProperty({ example: 'USDT' })
  to: string;
}
