import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Task } from './interfaces/task';

@Controller('task')
export class TaskController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiQuery({ name: 'searchQuery', required: false, type: String })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('searchQuery') searchQuery?: string,
  ) {
    const cache_data = await this.cacheManager.get<string>(
      `${page}-${limit}-${searchQuery}`
    );

    if(cache_data){
      const tasks: Task[] = JSON.parse(cache_data);
      return tasks;
    }

    const data = this.taskService.findAll(page, limit, searchQuery);
    await this.cacheManager.set(`${page}-${limit}-${searchQuery}`, JSON.stringify(data));

    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cache_data = await this.cacheManager.get<string>(id);

    if(cache_data){
      const task: Task = JSON.parse(cache_data);
      return task;
    }

    const data = this.taskService.findOne(id);
    await this.cacheManager.set(id, JSON.stringify(data));

    return data;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    await this.cacheManager.del(id);
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.cacheManager.del(id);
    return this.taskService.remove(id);
  }
}
