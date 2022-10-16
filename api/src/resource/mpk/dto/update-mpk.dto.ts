import { PartialType } from '@nestjs/swagger';
import { CreateMpkDto } from './create-mpk.dto';

export class UpdateMpkDto extends PartialType(CreateMpkDto) {}
