import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MpkModule } from './resource/mpk/mpk.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StopEntity } from './resource/mpk/entities/stop.entity';

@Module({
  imports: [
    MpkModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'bus',
      entities: [StopEntity],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
