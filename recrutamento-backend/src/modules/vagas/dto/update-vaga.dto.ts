import { PartialType } from '@nestjs/mapped-types';
import { CreateVagaDto } from './create-vaga.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateVagaDto extends PartialType(CreateVagaDto) {
  @ApiPropertyOptional({ description: 'Nome da vaga', example: 'Caixa' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ description: 'Descrição detalhada da vaga', example: 'Responsável por operação de caixa e atendimento ao cliente.' })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiPropertyOptional({ description: 'Identificador da loja', example: 'Filial Zona Norte' })
  @IsOptional()
  @IsString()
  loja?: string;

  @ApiPropertyOptional({ description: 'Data de expiração da vaga', example: '2025-12-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  dataExpiracao?: Date;
}
