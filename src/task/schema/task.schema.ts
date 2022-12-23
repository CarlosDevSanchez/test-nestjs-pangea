import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from "nestjs-seeder";

export type TaskDocument = Task & Document; 

@Schema() 
export class Task extends Document{
    @Factory(
        () => {
            const min = 11111;
            const max = 999999;
            return Math.round(Math.random() * (max - min) + min);
        }
    )
    @Prop({ unique: true })
    code: number;

    @Factory(faker => faker.name.jobTitle())
    @Prop()
    name: string;

    @Factory(faker => faker.lorem.paragraph())
    @Prop()
    description: string;

    @Factory(faker => faker.helpers.arrayElement(['PENDING', 'IN_PROGRESS', 'DONE']))
    @Prop({
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'DONE']
    })
    state: string;

}

const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ name: 'text' });

export { TaskSchema }