import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vaga } from './vaga.schema';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';

@Injectable()
export class VagasService {
  constructor(@InjectModel(Vaga.name) private vagaModel: Model<Vaga>) {}

  async create(createDto: CreateVagaDto, userId: string): Promise<Vaga> {
    const vaga = new this.vagaModel({
      ...createDto,
      dataCriacao: new Date(),
      ativo: true,
      criadorId: userId,
    });
    return vaga.save();
  }

  async findAll(ativo?: boolean): Promise<Vaga[]> {
    const filter = ativo !== undefined ? { ativo } : {};
    return this.vagaModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Vaga> {
    const vaga = await this.vagaModel.findById(id).exec();
    if (!vaga) throw new NotFoundException('Vaga não encontrada');
    return vaga;
  }

  async update(id: string, updateDto: UpdateVagaDto): Promise<Vaga> {
    const vaga = await this.vagaModel.findByIdAndUpdate(id, updateDto, { new: true });
    if (!vaga) throw new NotFoundException('Vaga não encontrada');
    return vaga;
  }

  async deactivate(id: string): Promise<Vaga> {
    const vaga = await this.vagaModel.findByIdAndUpdate(id, { ativo: false }, { new: true });
    if (!vaga) throw new NotFoundException('Vaga não encontrada');
    return vaga;
  }
}
