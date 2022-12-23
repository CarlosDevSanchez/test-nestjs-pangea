import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../task/schema/task.schema';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class TaskSeeder implements Seeder {
    constructor(@InjectModel(Task.name) private readonly task: Model<Task>) {}

    async seed(): Promise<any> {
        const tasks = DataFactory.createForClass(Task).generate(20);

        return this.task.insertMany(tasks);
    }

    async drop(): Promise<any> {
        return this.task.deleteMany({});
    }
}