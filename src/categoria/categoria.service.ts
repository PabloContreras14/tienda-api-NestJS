import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const exists = await this.repo.findOne({ where: { nombre: dto.nombre } });
    if (exists) throw new ConflictException('La categoría ya existe');
    const categoria = this.repo.create(dto);
    return this.repo.save(categoria);
  }

  findAll(): Promise<Categoria[]> {
    return this.repo.find({ relations: ['productos'] });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.repo.findOne({
      where: { id },
      relations: ['productos'],
    });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, dto);
    return this.repo.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.repo.delete(id);
    if (!affected) throw new NotFoundException('Categoría no encontrada');
  }
}
