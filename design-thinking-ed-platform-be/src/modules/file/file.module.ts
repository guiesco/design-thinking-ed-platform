import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UploadedFile } from './entities/uploaded-file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';

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
