import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Categoria } from '../categoria/categoria.entity';
import { Pedido } from '../pedido/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Categoria, Pedido])],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}

