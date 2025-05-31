import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class UpdateVagaDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  loja?: string;

  @IsDateString()
  @IsOptional()
  dataExpiracao?: Date;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
