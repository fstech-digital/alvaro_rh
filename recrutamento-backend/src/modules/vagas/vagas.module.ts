import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vaga, VagaSchema } from './vaga.schema';
import { VagasService } from './vagas.service';
import { VagasController } from './vagas.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vaga.name, schema: VagaSchema }])],
  providers: [VagasService],
  controllers: [VagasController],
})
export class VagasModule {}
