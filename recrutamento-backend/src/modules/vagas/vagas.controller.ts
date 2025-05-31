import {
  Controller, Get, Post, Patch, Param, Body, Query, UseGuards, Request
} from '@nestjs/common';
import { VagasService } from './vagas.service';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('vagas')
@UseGuards(JwtAuthGuard)
export class VagasController {
  constructor(private readonly vagasService: VagasService) {}

  @Post()
  async create(@Body() dto: CreateVagaDto, @Request() req) {
    return this.vagasService.create(dto, req.user.userId);
  }

  @Get()
  async findAll(@Query('ativo') ativo?: string) {
    return this.vagasService.findAll(ativo === 'true');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vagasService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateVagaDto) {
    return this.vagasService.update(id, dto);
  }

  @Patch(':id/desativar')
  async deactivate(@Param('id') id: string) {
    return this.vagasService.deactivate(id);
  }
}
