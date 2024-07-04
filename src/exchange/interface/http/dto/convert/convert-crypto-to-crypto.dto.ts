import { ApiProperty } from '@nestjs/swagger';

export class ConvertCryptoTyCrypto {
  @ApiProperty({ example: 'BTC' })
  from: string;

  @ApiProperty({ example: 'USDT' })
  to: string;

  @ApiProperty({ example: 100000 })
  amount: number;
}
