import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vaga extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  loja: string;

  @Prop({ default: Date.now })
  dataCriacao: Date;

  @Prop()
  dataExpiracao: Date;

  @Prop({ required: true })
  criadorId: string;

  @Prop({ default: true })
  ativo: boolean;
}

export const VagaSchema = SchemaFactory.createForClass(Vaga);
