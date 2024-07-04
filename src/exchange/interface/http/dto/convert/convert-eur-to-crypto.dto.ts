import { ApiProperty } from '@nestjs/swagger';

export class ConvertEURToCrypto {
  @ApiProperty({ example: 'USDT' })
  to: string;

  @ApiProperty({ example: 10 })
  amount: number;
}
