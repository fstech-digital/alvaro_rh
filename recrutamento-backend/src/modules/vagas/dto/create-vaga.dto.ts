import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateVagaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  loja: string;

  @IsDateString()
  dataExpiracao: Date;
}
