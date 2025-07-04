import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from '../categoria/categoria.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly repo: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  private async getCategoria(id: number): Promise<Categoria> {
    const cat = await this.categoriaRepo.findOne({ where: { id } });
    if (!cat) throw new BadRequestException('Categoría no válida');
    return cat;
  }

  async create(dto: CreateProductoDto): Promise<Producto> {
    const categoria = await this.getCategoria(dto.categoriaId);
    const producto = this.repo.create({
      nombre: dto.nombre,
      precio: dto.precio,
      categoria,
    });
    return this.repo.save(producto);
  }

  findAll(): Promise<Producto[]> {
    return this.repo.find({ relations: ['categoria', 'pedidos'] });
  }

  async findOne(id: number): Promise<Producto> {
    const prod = await this.repo.findOne({
      where: { id },
      relations: ['categoria', 'pedidos'],
    });
    if (!prod) throw new NotFoundException('Producto no encontrado');
    return prod;
  }

  async update(id: number, dto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);

    if (dto.nombre) producto.nombre = dto.nombre;
    if (dto.precio) producto.precio = dto.precio;
    if (dto.categoriaId)
      producto.categoria = await this.getCategoria(dto.categoriaId);

    return this.repo.save(producto);
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.repo.delete(id);
    if (!affected) throw new NotFoundException('Producto no encontrado');
  }
}
