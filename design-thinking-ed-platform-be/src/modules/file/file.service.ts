import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFile, FileStepType } from './entities/uploaded-file.entity';
import { UploadFileDto } from './dto/upload-file.dto';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const unlinkAsync = promisify(fs.unlink);
const existsAsync = promisify(fs.exists);
const mkdirAsync = promisify(fs.mkdir);

// Interface para representar arquivos do Multer
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination?: string;
  filename?: string;
  path?: string;
  buffer: Buffer;
}

@Injectable()
export class FileService {
  private readonly uploadDir: string;

  constructor(
    @InjectRepository(UploadedFile)
    private readonly uploadedFileRepository: Repository<UploadedFile>,
  ) {
    this.uploadDir = process.env.UPLOAD_DIR || 'uploads';
    this.ensureUploadDirExists();
  }

  /**
   * Garante que o diretório de upload exista
   */
  private async ensureUploadDirExists(): Promise<void> {
    try {
      const exists = await existsAsync(this.uploadDir);
      if (!exists) {
        await mkdirAsync(this.uploadDir, { recursive: true });
      }
    } catch (error) {
      console.error('Erro ao criar diretório de upload:', error);
    }
  }

  /**
   * Salva um arquivo enviado e registra os metadados no banco de dados
   */
  async uploadFile(
    file: MulterFile,
    uploadFileDto: UploadFileDto,
  ): Promise<UploadedFile> {
    const { projectId, userId, stepType, groupId } = uploadFileDto;

    // Gerar nome único para o arquivo
    const storedName = `${uuidv4()}-${file.originalname}`;
    const filePath = path.join(this.uploadDir, storedName);

    // Criar diretório específico para o projeto, se necessário
    const projectDir = path.join(this.uploadDir, `project-${projectId}`);
    if (!(await existsAsync(projectDir))) {
      await mkdirAsync(projectDir, { recursive: true });
    }

    // Caminho final do arquivo
    const finalPath = path.join(projectDir, storedName);

    // Mover o arquivo para o diretório específico do projeto
    fs.writeFileSync(finalPath, file.buffer);

    // Criar registro no banco de dados
    const uploadedFile = this.uploadedFileRepository.create({
      originalName: file.originalname,
      storedName,
      path: finalPath,
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

    // Remover o arquivo físico
    try {
      await unlinkAsync(file.path);
    } catch (error) {
      console.error(`Erro ao excluir arquivo ${file.path}:`, error);
      // Continua mesmo se falhar a exclusão do arquivo físico
    }

    // Remover do banco de dados
    await this.uploadedFileRepository.remove(file);
  }
}
