import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  describe('Task controller test', () => {

    it("calling create method", () => {
      const dto = new CreateTaskDto();
      expect(controller.create(dto)).not.toEqual(null);
    })
  
    it("calling create method", () => {
      const dto = new CreateTaskDto();
      controller.create(dto);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(dto);
    })
  
    it("calling getAll method", () => {
      controller.findAll(1, 10);
      expect(service.findAll).toHaveBeenCalled();
    })
  
    it("calling find findOne method", () => {
      const id = 'Id';
      controller.findOne(id);
      expect(service.findOne).toHaveBeenCalled();
    })

  });
});
