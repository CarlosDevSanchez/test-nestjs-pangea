import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task/schema/task.schema';
import { TaskSeeder } from './seeders/task.seeder';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pangea-test'),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
}).run([TaskSeeder]);