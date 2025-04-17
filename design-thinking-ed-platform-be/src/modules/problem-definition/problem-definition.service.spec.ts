import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProblemDefinitionService } from './problem-definition.service';
import {
  ProblemDefinitionResponse,
  ProblemDefinitionType,
} from './entities/problem-definition-response.entity';
import { UserVoteService } from '../user-vote/user-vote.service';
import { VoteableEntityType } from '../user-vote/enums/voteable-entity-type.enum';

describe('ProblemDefinitionService', () => {
  let service: ProblemDefinitionService;
  let repository: Repository<ProblemDefinitionResponse>;
  let userVoteService: UserVoteService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockUserVoteService = {
    getVoteCount: jest.fn(),
    hasVoted: jest.fn(),
    createVote: jest.fn(),
    removeVote: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemDefinitionService,
        {
          provide: getRepositoryToken(ProblemDefinitionResponse),
          useValue: mockRepository,
        },
        {
          provide: UserVoteService,
          useValue: mockUserVoteService,
        },
      ],
    }).compile();

    service = module.get<ProblemDefinitionService>(ProblemDefinitionService);
    repository = module.get<Repository<ProblemDefinitionResponse>>(
      getRepositoryToken(ProblemDefinitionResponse),
    );
    userVoteService = module.get<UserVoteService>(UserVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createResponse', () => {
    it('should create a response', async () => {
      const createDto = {
        type: ProblemDefinitionType.MAIN_QUESTION,
        content: 'Test content',
        userId: 1,
        projectId: 1,
      };

      const response = { ...createDto, id: 1 };

      mockRepository.create.mockReturnValue(response);
      mockRepository.save.mockResolvedValue(response);

      const result = await service.createResponse(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(response);
      expect(result).toEqual(response);
    });
  });

  describe('createResponses', () => {
    it('should create multiple responses', async () => {
      const responses = [
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
      ];

      const savedResponses = responses.map((r, i) => ({ ...r, id: i + 1 }));

      mockRepository.create.mockReturnValue(savedResponses);
      mockRepository.save.mockResolvedValue(savedResponses);

      const result = await service.createResponses(responses);

      expect(repository.create).toHaveBeenCalledWith(responses);
      expect(repository.save).toHaveBeenCalledWith(savedResponses);
      expect(result).toEqual(savedResponses);
    });
  });

  describe('findAllResponsesByProject', () => {
    it('should find all responses by project with vote info', async () => {
      const projectId = 1;
      const userId = 1;
      const responses = [
        {
          id: 1,
          type: ProblemDefinitionType.MAIN_QUESTION,
          content: 'Test content',
          userId: 1,
          projectId: 1,
        },
      ];

      mockRepository.find.mockResolvedValue(responses);
      mockUserVoteService.getVoteCount.mockResolvedValue(1);
      mockUserVoteService.hasVoted.mockResolvedValue(true);

      const result = await service.findAllResponsesByProject(projectId, userId);

      expect(repository.find).toHaveBeenCalledWith({
        where: { projectId },
        relations: ['user'],
      });
      expect(userVoteService.getVoteCount).toHaveBeenCalledWith(
        VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
        1,
      );
      expect(userVoteService.hasVoted).toHaveBeenCalledWith(
        userId,
        VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
        1,
      );
      expect(result[0].upvotes).toBe(1);
      expect(result[0]['hasVoted']).toBe(true);
    });
  });

  describe('upvoteResponse', () => {
    it('should upvote a response', async () => {
      const id = 1;
      const userId = 1;
      const response = {
        id,
        type: ProblemDefinitionType.MAIN_QUESTION,
        content: 'Test content',
        userId: 1,
        projectId: 1,
      };

      mockRepository.findOne.mockResolvedValue(response);
      mockUserVoteService.createVote.mockResolvedValue(undefined);
      mockUserVoteService.getVoteCount.mockResolvedValue(1);
      mockRepository.save.mockResolvedValue({ ...response, upvotes: 1 });

      const result = await service.upvoteResponse(id, userId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['user'],
      });
      expect(userVoteService.createVote).toHaveBeenCalledWith(
        userId,
        VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
        id,
      );
      expect(result.upvotes).toBe(1);
      expect(result.hasVoted).toBe(true);
    });
  });

  describe('removeUpvoteResponse', () => {
    it('should remove upvote from a response', async () => {
      const id = 1;
      const userId = 1;
      const response = {
        id,
        type: ProblemDefinitionType.MAIN_QUESTION,
        content: 'Test content',
        userId: 1,
        projectId: 1,
      };

      mockRepository.findOne.mockResolvedValue(response);
      mockUserVoteService.removeVote.mockResolvedValue(undefined);
      mockUserVoteService.getVoteCount.mockResolvedValue(0);
      mockRepository.save.mockResolvedValue({ ...response, upvotes: 0 });

      const result = await service.removeUpvoteResponse(id, userId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['user'],
      });
      expect(userVoteService.removeVote).toHaveBeenCalledWith(
        userId,
        VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
        id,
      );
      expect(result.upvotes).toBe(0);
      expect(result.hasVoted).toBe(false);
    });
  });

  describe('toggleResponseSelection', () => {
    it('should toggle response selection', async () => {
      const id = 1;
      const response = {
        id,
        isSelected: false,
      };

      mockRepository.findOne.mockResolvedValue(response);
      mockRepository.save.mockResolvedValue({ ...response, isSelected: true });

      const result = await service.toggleResponseSelection(id);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['user'],
      });
      expect(result.isSelected).toBe(true);
    });
  });

  describe('deleteResponse', () => {
    it('should delete a response if user is owner', async () => {
      const id = 1;
      const userId = 1;
      const response = {
        id,
        userId,
      };

      mockRepository.findOne.mockResolvedValue(response);
      mockRepository.remove.mockResolvedValue(undefined);

      await service.deleteResponse(id, userId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['user'],
      });
      expect(repository.remove).toHaveBeenCalledWith(response);
    });

    it('should not delete a response if user is not owner', async () => {
      const id = 1;
      const userId = 2;
      const response = {
        id,
        userId: 1,
      };

      mockRepository.findOne.mockResolvedValue(response);

      await service.deleteResponse(id, userId);

      expect(repository.remove).not.toHaveBeenCalled();
    });
  });

  describe('updateResponse', () => {
    it('should update a response if user is owner', async () => {
      const id = 1;
      const userId = 1;
      const content = 'Updated content';
      const response = {
        id,
        userId,
        content: 'Original content',
      };

      mockRepository.findOne.mockResolvedValue(response);
      mockRepository.save.mockResolvedValue({ ...response, content });

      const result = await service.updateResponse(id, userId, content);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['user'],
      });
      expect(result.content).toBe(content);
    });

    it('should not update a response if user is not owner', async () => {
      const id = 1;
      const userId = 2;
      const content = 'Updated content';
      const response = {
        id,
        userId: 1,
        content: 'Original content',
      };

      mockRepository.findOne.mockResolvedValue(response);

      const result = await service.updateResponse(id, userId, content);

      expect(repository.save).not.toHaveBeenCalled();
      expect(result).toEqual(response);
    });
  });
});
