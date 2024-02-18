/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  readonly name: string;
}
