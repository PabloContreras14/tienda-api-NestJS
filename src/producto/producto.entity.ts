import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';
import { Pedido } from '../pedido/pedido.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column('decimal')
  precio: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;

  @ManyToMany(() => Pedido, (pedido) => pedido.productos)
  pedidos: Pedido[];
}
