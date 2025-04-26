import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFile, FileStepType } from './entities/uploaded-file.entity';
import { UploadFileDto } from './dto/upload-file.dto';

// Interface para representar arquivos do Multer
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Injectable()
export class FileService {
  // Tamanho máximo de arquivo permitido (1MB)
  private readonly MAX_FILE_SIZE = 1024 * 1024;

  constructor(
    @InjectRepository(UploadedFile)
    private readonly uploadedFileRepository: Repository<UploadedFile>,
  ) {}

  /**
   * Salva um arquivo enviado e registra os metadados no banco de dados
   */
  async uploadFile(
    file: MulterFile,
    uploadFileDto: UploadFileDto,
  ): Promise<UploadedFile> {
    const { projectId, userId, stepType, groupId } = uploadFileDto;

    // Verificar tamanho do arquivo
    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException(
        `Tamanho do arquivo excede o limite máximo de ${
          this.MAX_FILE_SIZE / 1024 / 1024
        }MB`,
      );
    }

    // Criar registro no banco de dados com o conteúdo binário
    const uploadedFile = this.uploadedFileRepository.create({
      originalName: file.originalname,
      content: file.buffer,
      size: file.size,
      mimeType: file.mimetype,
      userId,
      projectId,
      groupId,
      stepType,
    });

    return this.uploadedFileRepository.save(uploadedFile);
  }

  /**
   * Obtém um arquivo pelo ID
   */
  async getFileById(id: number): Promise<UploadedFile> {
    const file = await this.uploadedFileRepository.findOne({ where: { id } });
    if (!file) {
      throw new NotFoundException(`Arquivo com ID ${id} não encontrado`);
    }
    return file;
  }

  /**
   * Obtém arquivos por projeto e tipo de etapa
   */
  async getFilesByProject(
    projectId: number,
    stepType: FileStepType,
  ): Promise<UploadedFile[]> {
    return this.uploadedFileRepository.find({
      where: { projectId, stepType },
      order: { createdAt: 'DESC' },
      // Não retornar o conteúdo binário na listagem para economizar banda
      select: [
        'id',
        'originalName',
        'size',
        'mimeType',
        'userId',
        'projectId',
        'groupId',
        'stepType',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  /**
   * Obtém arquivos por usuário, projeto e tipo de etapa
   */
  async getFilesByUser(
    userId: number,
    projectId: number,
    stepType: FileStepType,
  ): Promise<UploadedFile[]> {
    return this.uploadedFileRepository.find({
      where: { userId, projectId, stepType },
      order: { createdAt: 'DESC' },
      // Não retornar o conteúdo binário na listagem para economizar banda
      select: [
        'id',
        'originalName',
        'size',
        'mimeType',
        'userId',
        'projectId',
        'groupId',
        'stepType',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  /**
   * Obtém arquivos por grupo e tipo de etapa
   */
  async getFilesByGroup(
    groupId: number,
    stepType: FileStepType,
  ): Promise<UploadedFile[]> {
    return this.uploadedFileRepository.find({
      where: { groupId, stepType },
      order: { createdAt: 'DESC' },
      // Não retornar o conteúdo binário na listagem para economizar banda
      select: [
        'id',
        'originalName',
        'size',
        'mimeType',
        'userId',
        'projectId',
        'groupId',
        'stepType',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  /**
   * Remove um arquivo
   */
  async deleteFile(id: number, userId: number): Promise<void> {
    const file = await this.getFileById(id);

    // Verificar se o usuário é o proprietário do arquivo
    if (file.userId !== userId) {
      throw new NotFoundException(
        'Você não tem permissão para excluir este arquivo',
      );
    }

    // Remover do banco de dados
    await this.uploadedFileRepository.remove(file);
  }
}
