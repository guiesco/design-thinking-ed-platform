import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { FileService } from './file.service';
import { FileStepType } from './entities/uploaded-file.entity';
import { UploadFileDto } from './dto/upload-file.dto';
import * as fs from 'fs';
import * as path from 'path';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: any,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    return this.fileService.uploadFile(file, uploadFileDto);
  }

  @Get(':id')
  async getFile(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.getFileById(id);
  }

  @Get(':id/download')
  async downloadFile(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const file = await this.fileService.getFileById(id);

    // Verificar se o arquivo existe
    if (!fs.existsSync(file.path)) {
      throw new NotFoundException('Arquivo não encontrado no servidor');
    }

    // Definir headers para download
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(file.originalName)}"`,
    );
    res.setHeader('Content-Type', file.mimeType);

    // Enviar o arquivo como stream
    const fileStream = createReadStream(file.path);
    fileStream.pipe(res);
  }

  @Get('project/:projectId')
  async getFilesByProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('stepType') stepType: FileStepType,
  ) {
    if (!Object.values(FileStepType).includes(stepType)) {
      throw new NotFoundException('Tipo de etapa inválido');
    }
    return this.fileService.getFilesByProject(projectId, stepType);
  }

  @Get('user/:userId/project/:projectId')
  async getFilesByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('stepType') stepType: FileStepType,
  ) {
    if (!Object.values(FileStepType).includes(stepType)) {
      throw new NotFoundException('Tipo de etapa inválido');
    }
    return this.fileService.getFilesByUser(userId, projectId, stepType);
  }

  @Get('group/:groupId')
  async getFilesByGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Query('stepType') stepType: FileStepType,
  ) {
    if (!Object.values(FileStepType).includes(stepType)) {
      throw new NotFoundException('Tipo de etapa inválido');
    }
    return this.fileService.getFilesByGroup(groupId, stepType);
  }

  @Delete(':id')
  async deleteFile(
    @Param('id', ParseIntPipe) id: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    await this.fileService.deleteFile(id, userId);
    return { message: 'Arquivo excluído com sucesso' };
  }
}
