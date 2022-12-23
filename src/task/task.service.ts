import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schema/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task>{
    return await this.taskModel.create(createTaskDto);
  }

  async findAll(page: number, limit: number, searchQuery: string): Promise<Task[]>{
    const filters: FilterQuery<TaskDocument> = {};
 
    if (searchQuery) {
      filters.$text = {
        $search: searchQuery,
      };
    }
 
    const findQuery = this.taskModel
      .find(filters)
      .sort({ _id: 1 })
      .skip(limit * page);
  
    if (limit) {
      findQuery.limit(limit);
    }
 
    return await findQuery;
  }

  async findOne(id: string): Promise<Task>{
    return await this.taskModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>{
    return await this.taskModel.findOneAndUpdate({ _id: id }, updateTaskDto, {
      new: true
    });
  }

  async remove(id: string) {
    return await this.taskModel.findOneAndRemove({ _id: id }).exec();
  }
}
