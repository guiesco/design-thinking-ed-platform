import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UploadedFile } from './entities/uploaded-file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';

/**
 * Módulo para gerenciamento de arquivos
 *
 * Armazenamento de arquivos:
 * - Os arquivos são armazenados diretamente no PostgreSQL usando o tipo bytea
 * - Adequado para arquivos pequenos (~1MB)
 * - Limite de tamanho configurado no FileService (MAX_FILE_SIZE)
 * - Não requer infraestrutura adicional para armazenamento de arquivos
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([UploadedFile]),
    MulterModule.register({
      dest: process.env.UPLOAD_DIR || 'uploads',
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
