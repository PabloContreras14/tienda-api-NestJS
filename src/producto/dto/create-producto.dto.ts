import { IsString, IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsInt()
  @IsPositive()
  categoriaId: number;
}
