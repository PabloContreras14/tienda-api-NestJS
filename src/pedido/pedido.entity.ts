import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Producto } from '../producto/producto.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  usuario: Usuario;

  @ManyToMany(() => Producto, (producto) => producto.pedidos)
  @JoinTable()
  productos: Producto[];
}
