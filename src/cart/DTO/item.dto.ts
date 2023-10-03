import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createItemDTO {
  @IsString()
  productId?: string;
  @IsString()
  name?: string;
  @IsNumber()
  price?: number;
  @IsNumber()
  quantity?: number;
}
export class updateItemDTO{
  @IsString()
  @IsOptional()
  productId?: string;
  @IsString()
  @IsOptional()
  name?: string;
  @IsNumber()
  @IsOptional()
  price?: number;
  @IsNumber()
  @IsOptional()
  qunatity?: number;
}
