import { Test, TestingModule } from '@nestjs/testing';
import { CategoryGroupController } from './category-group.controller';
import { CategoryGroupService } from './category-group.service';

describe('CategoryGroupController', () => {
  let controller: CategoryGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryGroupController],
      providers: [CategoryGroupService],
    }).compile();

    controller = module.get<CategoryGroupController>(CategoryGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
