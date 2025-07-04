import {
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsPositive,
  IsDateString,
} from 'class-validator';

export class CreatePedidoDto {
  /** ISO‑8601, p. ej. "2025-07-04T15:30:00Z" */
  @IsDateString()
  fecha: string;

  /** id del usuario que hace el pedido */
  @IsInt()
  @IsPositive()
  usuarioId: number;

  /** ids de los productos incluidos */
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  productoIds: number[];
}
