import { ApiProperty } from '@nestjs/swagger';

export class ConvertIRRToUSD {
  @ApiProperty({ example: 100000 })
  amount: number;
}
