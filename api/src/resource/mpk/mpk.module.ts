import { Module } from '@nestjs/common';
import { MpkService } from './mpk.service';
import { MpkController } from './mpk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StopEntity } from './entities/stop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StopEntity])],
  controllers: [MpkController],
  providers: [MpkService],
})
export class MpkModule {}
