import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  describe('Test service', () => {
    it('should call findOne method with expected param', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');
      const findOneOptions = 'Id';
      service.findOne(findOneOptions);
      expect(findOneSpy).toHaveBeenCalledWith(findOneOptions);
    });

    it('calling create task method', async () => {
      const createSpy = jest.spyOn(service, 'create');
      const dto = new CreateTaskDto();
      service.create(dto);
      expect(createSpy).toHaveBeenCalledWith(dto);
    });

    it('should call update method with expected params', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const taskId = 'taskId';
      const dto = new UpdateTaskDto();
      service.update(taskId, dto);
      expect(updateSpy).toHaveBeenCalledWith(taskId, dto);
    });
  
    it('should call delete method with expected param', async () => {
      const removeSpy = jest.spyOn(service, 'remove');
      const taskId = 'taskId';
      service.remove(taskId);
      expect(removeSpy).toHaveBeenCalledWith(taskId);
    });
  })
});
