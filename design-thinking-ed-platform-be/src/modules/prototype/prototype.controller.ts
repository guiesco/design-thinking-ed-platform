import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { PrototypeService } from './prototype.service';
import { CreatePrototypeDto } from './dto/create-prototype.dto';
import { UpdatePrototypeDto } from './dto/update-prototype.dto';

@Controller('prototype')
export class PrototypeController {
  constructor(private readonly prototypeService: PrototypeService) {}

  @Post()
  async create(@Body() createPrototypeDto: CreatePrototypeDto) {
    return this.prototypeService.create(createPrototypeDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prototypeService.findById(id);
  }

  @Get('project/:projectId')
  async findByProject(@Param('projectId', ParseIntPipe) projectId: number) {
    const prototype = await this.prototypeService.findByProjectId(projectId);
    if (!prototype) {
      throw new NotFoundException(
        `Protótipo para o projeto ${projectId} não encontrado`,
      );
    }
    return prototype;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrototypeDto: UpdatePrototypeDto,
  ) {
    return this.prototypeService.update(id, updatePrototypeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.prototypeService.remove(id);
    return { message: 'Protótipo removido com sucesso' };
  }
}
