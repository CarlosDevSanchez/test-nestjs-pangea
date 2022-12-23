import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({ 
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 2000
     }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST || 'mongo'}:${process.env.MONGO_PORT || '27017'}/pangea-test`),
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
