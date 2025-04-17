import { Test, TestingModule } from '@nestjs/testing';
import { ProblemDefinitionController } from './problem-definition.controller';
import { ProblemDefinitionService } from './problem-definition.service';
import { CreateProblemDefinitionResponseDto } from './dto/create-problem-definition-response.dto';
import { ProblemDefinitionType } from './entities/problem-definition-response.entity';

describe('ProblemDefinitionController', () => {
  let controller: ProblemDefinitionController;
  let service: ProblemDefinitionService;

  const mockProblemDefinitionService = {
    createResponse: jest.fn(),
    createResponses: jest.fn(),
    findAllResponsesByProject: jest.fn(),
    getResponsesByType: jest.fn(),
    findOneResponse: jest.fn(),
    upvoteResponse: jest.fn(),
    removeUpvoteResponse: jest.fn(),
    toggleResponseSelection: jest.fn(),
    getSelectedResponsesByProject: jest.fn(),
    deleteResponse: jest.fn(),
    updateResponse: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemDefinitionController],
      providers: [
        {
          provide: ProblemDefinitionService,
          useValue: mockProblemDefinitionService,
        },
      ],
    }).compile();

    controller = module.get<ProblemDefinitionController>(
      ProblemDefinitionController,
    );
    service = module.get<ProblemDefinitionService>(ProblemDefinitionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createResponse', () => {
    it('should create a response', async () => {
      const createDto: CreateProblemDefinitionResponseDto = {
        type: ProblemDefinitionType.MAIN_QUESTION,
        content: 'Test content',
        userId: 1,
        projectId: 1,
      };

      mockProblemDefinitionService.createResponse.mockResolvedValue(createDto);

      const result = await controller.createResponse(createDto);

      expect(service.createResponse).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(createDto);
    });
  });

  describe('createResponses', () => {
    it('should create multiple responses', async () => {
      const createDto = {
        responses: [
          {
            type: ProblemDefinitionType.MAIN_QUESTION,
            content: 'Test content 1',
            userId: 1,
            projectId: 1,
          },
          {
            type: ProblemDefinitionType.TARGET_AUDIENCE,
            content: 'Test content 2',
            userId: 1,
            projectId: 1,
          },
        ],
      };

      mockProblemDefinitionService.createResponses.mockResolvedValue(
        createDto.responses,
      );

      const result = await controller.createResponses(createDto);

      expect(service.createResponses).toHaveBeenCalledWith(createDto.responses);
      expect(result).toEqual(createDto.responses);
    });
  });

  describe('findAllResponsesByProject', () => {
    it('should find all responses by project', async () => {
      const projectId = '1';
      const userId = '1';
      const responses = [
        {
          id: 1,
          type: ProblemDefinitionType.MAIN_QUESTION,
          content: 'Test content',
          userId: 1,
          projectId: 1,
        },
      ];

      mockProblemDefinitionService.findAllResponsesByProject.mockResolvedValue(
        responses,
      );

      const result = await controller.findAllResponsesByProject(
        projectId,
        userId,
      );

      expect(service.findAllResponsesByProject).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual(responses);
    });
  });

  describe('getResponsesByType', () => {
    it('should get responses by type', async () => {
      const projectId = '1';
      const type = ProblemDefinitionType.MAIN_QUESTION;
      const responses = [
        {
          id: 1,
          type: ProblemDefinitionType.MAIN_QUESTION,
          content: 'Test content',
          userId: 1,
          projectId: 1,
        },
      ];

      mockProblemDefinitionService.getResponsesByType.mockResolvedValue(
        responses,
      );

      const result = await controller.getResponsesByType(projectId, type);

      expect(service.getResponsesByType).toHaveBeenCalledWith(1, type);
      expect(result).toEqual(responses);
    });
  });

  describe('upvoteResponse', () => {
    it('should upvote a response', async () => {
      const id = '1';
      const userId = '1';
      const response = {
        id: 1,
        upvotes: 1,
        hasVoted: true,
      };

      mockProblemDefinitionService.upvoteResponse.mockResolvedValue(response);

      const result = await controller.upvoteResponse(id, userId);

      expect(service.upvoteResponse).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual(response);
    });
  });

  describe('removeUpvoteResponse', () => {
    it('should remove upvote from a response', async () => {
      const id = '1';
      const userId = '1';
      const response = {
        id: 1,
        upvotes: 0,
        hasVoted: false,
      };

      mockProblemDefinitionService.removeUpvoteResponse.mockResolvedValue(
        response,
      );

      const result = await controller.removeUpvoteResponse(id, userId);

      expect(service.removeUpvoteResponse).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual(response);
    });
  });

  describe('toggleResponseSelection', () => {
    it('should toggle response selection', async () => {
      const id = '1';
      const response = {
        id: 1,
        isSelected: true,
      };

      mockProblemDefinitionService.toggleResponseSelection.mockResolvedValue(
        response,
      );

      const result = await controller.toggleResponseSelection(id);

      expect(service.toggleResponseSelection).toHaveBeenCalledWith(1);
      expect(result).toEqual(response);
    });
  });

  describe('deleteResponse', () => {
    it('should delete a response', async () => {
      const id = '1';
      const userId = '1';

      await controller.deleteResponse(id, userId);

      expect(service.deleteResponse).toHaveBeenCalledWith(1, 1);
    });
  });

  describe('updateResponse', () => {
    it('should update a response', async () => {
      const id = '1';
      const userId = '1';
      const content = 'Updated content';
      const response = {
        id: 1,
        content: 'Updated content',
      };

      mockProblemDefinitionService.updateResponse.mockResolvedValue(response);

      const result = await controller.updateResponse(id, userId, content);

      expect(service.updateResponse).toHaveBeenCalledWith(1, 1, content);
      expect(result).toEqual(response);
    });
  });
});
