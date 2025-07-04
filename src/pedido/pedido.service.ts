import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Pedido } from './pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Usuario } from '../usuario/usuario.entity';
import { Producto } from '../producto/producto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido) private readonly repo: Repository<Pedido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  /* ---------- helpers ---------- */
  private async findUsuario(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  private async findProductos(ids: number[]): Promise<Producto[]> {
    const productos = await this.productoRepo.find({ where: { id: In(ids) } });
    if (productos.length !== ids.length) {
      throw new BadRequestException('Uno o más productos no existen');
    }
    return productos;
  }

  /* ---------- CRUD ---------- */
  async create(dto: CreatePedidoDto): Promise<Pedido> {
    const usuario = await this.findUsuario(dto.usuarioId);
    const productos = await this.findProductos(dto.productoIds);

    const pedido = this.repo.create({
      fecha: new Date(dto.fecha),
      usuario,
      productos,
    });

    return this.repo.save(pedido);
  }

  findAll(): Promise<Pedido[]> {
    return this.repo.find({ relations: ['usuario', 'productos'] });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.repo.findOne({
      where: { id },
      relations: ['usuario', 'productos'],
    });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);

    if (dto.fecha) pedido.fecha = new Date(dto.fecha);
    if (dto.usuarioId) pedido.usuario = await this.findUsuario(dto.usuarioId);
    if (dto.productoIds)
      pedido.productos = await this.findProductos(dto.productoIds);

    return this.repo.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.repo.delete(id);
    if (!affected) throw new NotFoundException('Pedido no encontrado');
  }
}
