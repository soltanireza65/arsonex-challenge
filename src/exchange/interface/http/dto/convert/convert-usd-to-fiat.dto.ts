import { ApiProperty } from '@nestjs/swagger';

export class ConvertUSDToFiat {
  @ApiProperty({ example: 'EUR' })
  to: string;

  @ApiProperty({ example: 100000 })
  amount: number;
}
