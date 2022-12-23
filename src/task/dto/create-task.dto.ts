import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Status } from '../interfaces/task'

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    code: number;

    @IsString()
    description: string;

    @IsString()
    status: Status
}
