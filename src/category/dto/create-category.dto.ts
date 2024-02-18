/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  readonly name: string;
}
