import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';          // (lo crearemos luego)

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 150, unique: true })
  correo: string;

  @Column({ length: 60 })
  password: string;

  @OneToMany(() => Pedido, (pedido) => pedido.usuario)
  pedidos: Pedido[];
}
