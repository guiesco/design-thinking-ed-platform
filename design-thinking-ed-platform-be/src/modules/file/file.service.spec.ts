import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UploadedFile, FileStepType } from './entities/uploaded-file.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('FileService', () => {
  let service: FileService;
  let repository: Repository<UploadedFile>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: getRepositoryToken(UploadedFile),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FileService>(FileService);
    repository = module.get<Repository<UploadedFile>>(
      getRepositoryToken(UploadedFile),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file and store as bytea', async () => {
      const mockFile = {
        originalname: 'test.pdf',
        buffer: Buffer.from('test content'),
        size: 1000, // 1KB
        mimetype: 'application/pdf',
      };

      const mockUploadDto = {
        userId: 1,
        projectId: 1,
        stepType: FileStepType.PROTOTYPE,
        groupId: 1,
      };

      const mockUploadedFile = {
        id: 1,
        originalName: 'test.pdf',
        content: Buffer.from('test content'),
        size: 1000,
        mimeType: 'application/pdf',
        userId: 1,
        projectId: 1,
        groupId: 1,
        stepType: FileStepType.PROTOTYPE,
      };

      mockRepository.create.mockReturnValue(mockUploadedFile);
      mockRepository.save.mockResolvedValue(mockUploadedFile);

      const result = await service.uploadFile(mockFile as any, mockUploadDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        originalName: 'test.pdf',
        content: Buffer.from('test content'),
        size: 1000,
        mimeType: 'application/pdf',
        userId: 1,
        projectId: 1,
        groupId: 1,
        stepType: FileStepType.PROTOTYPE,
      });

      expect(result).toEqual(mockUploadedFile);
    });

    it('should throw BadRequestException when file is too large', async () => {
      const mockFile = {
        originalname: 'large.pdf',
        buffer: Buffer.from('large content'),
        size: 2 * 1024 * 1024, // 2MB (above 1MB limit)
        mimetype: 'application/pdf',
      };

      const mockUploadDto = {
        userId: 1,
        projectId: 1,
        stepType: FileStepType.PROTOTYPE,
        groupId: 1,
      };

      await expect(
        service.uploadFile(mockFile as any, mockUploadDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getFileById', () => {
    it('should return a file when it exists', async () => {
      const mockFile = {
        id: 1,
        originalName: 'test.pdf',
        content: Buffer.from('test content'),
        size: 1000,
        mimeType: 'application/pdf',
      };

      mockRepository.findOne.mockResolvedValue(mockFile);

      const result = await service.getFileById(1);
      expect(result).toEqual(mockFile);
    });

    it('should throw NotFoundException when file does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.getFileById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFile', () => {
    it('should delete a file when authorized', async () => {
      const mockFile = {
        id: 1,
        userId: 1,
      };

      mockRepository.findOne.mockResolvedValue(mockFile);
      mockRepository.remove.mockResolvedValue(undefined);

      await service.deleteFile(1, 1);
      expect(mockRepository.remove).toHaveBeenCalledWith(mockFile);
    });

    it('should throw NotFoundException when deleting file by unauthorized user', async () => {
      const mockFile = {
        id: 1,
        userId: 1,
      };

      mockRepository.findOne.mockResolvedValue(mockFile);

      await expect(service.deleteFile(1, 2)).rejects.toThrow(NotFoundException);
    });
  });
});
