import {
  Controller, Get, Post, Patch, Param, Body, Query, UseGuards, Request
} from '@nestjs/common';
import { VagasService } from './vagas.service';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Vagas')
@ApiBearerAuth('jwt-auth')
@UseGuards(JwtAuthGuard)
@Controller('vagas')
export class VagasController {
  constructor(private readonly vagasService: VagasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova vaga' })
  @ApiResponse({ status: 201, description: 'Vaga criada com sucesso' })
  async create(@Body() dto: CreateVagaDto, @Request() req) {
    return this.vagasService.create(dto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vagas' })
  @ApiQuery({ name: 'ativo', required: false, type: Boolean, description: 'Filtrar por vagas ativas (true/false)' })
  @ApiResponse({ status: 200, description: 'Lista de vagas retornada com sucesso' })
  async findAll(@Query('ativo') ativo?: string) {
    return this.vagasService.findAll(ativo === 'true');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar vaga por ID' })
  @ApiParam({ name: 'id', description: 'ID da vaga' })
  @ApiResponse({ status: 200, description: 'Vaga encontrada' })
  @ApiResponse({ status: 404, description: 'Vaga não encontrada' })
  async findOne(@Param('id') id: string) {
    return this.vagasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar vaga' })
  @ApiParam({ name: 'id', description: 'ID da vaga' })
  @ApiResponse({ status: 200, description: 'Vaga atualizada com sucesso' })
  async update(@Param('id') id: string, @Body() dto: UpdateVagaDto) {
    return this.vagasService.update(id, dto);
  }

  @Patch(':id/desativar')
  @ApiOperation({ summary: 'Desativar vaga' })
  @ApiParam({ name: 'id', description: 'ID da vaga' })
  @ApiResponse({ status: 200, description: 'Vaga desativada com sucesso' })
  async deactivate(@Param('id') id: string) {
    return this.vagasService.deactivate(id);
  }
}
