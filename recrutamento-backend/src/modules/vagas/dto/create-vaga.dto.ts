import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVagaDto {
  @ApiProperty({ description: 'Nome da vaga', example: 'Atendente de Loja' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Descrição detalhada da vaga', example: 'Responsável pelo atendimento ao cliente e organização da loja.' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ description: 'Identificador da loja', example: 'Loja Central' })
  @IsString()
  @IsNotEmpty()
  loja: string;

  @ApiProperty({ description: 'Data de expiração da vaga', example: '2025-12-31T23:59:59.000Z' })
  @IsDateString()
  @IsNotEmpty()
  dataExpiracao: Date;
}
