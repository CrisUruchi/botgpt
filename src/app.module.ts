import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MessengerModule } from './messenger/messenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { Channel } from './messenger/entities/channel.entity';
import { Queue } from './messenger/entities/queue.entity';
import { Instance } from './messenger/entities/instance.entity';
import { Thread } from './messenger/entities/thread.entity';
import { Message } from './messenger/entities/message.entity';
import { Assistant } from './messenger/entities/assistant.entity';
import { InstanceAssistant } from './messenger/entities/instance-assistant.entity';
import { AuthModule } from './auth/auth.module';
import { Function } from './messenger/entities/function.entity';
import { FunctionCall } from './messenger/entities/functioncall.entity';
import { Permission } from './auth/entities/permission.entity';
import { Role } from './auth/entities/role.entity';
import { User } from './auth/entities/user.entity';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? '.env.${process.env.NODE_ENV}':'.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) =>{
        try { // Leer el archivo CA
          // const caPath = path.resolve(__dirname, '..', configService.get<string>('DATABASE_CA'));
          // const caCert = fs.readFileSync(caPath, 'utf8').toString().replace(/\r?\n|\r/g, '\n');
          // console.log('Resolved CA Path:', caPath);
          return {
            type: 'postgres',
            host: configService.get<string>('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT'),
            username: configService.get<string>('DATABASE_USERNAME'),
            password: configService.get<string>('DATABASE_PASSWORD'),
            database: configService.get<string>('DATABASE_NAME'),
            entities: [Queue, Instance, Channel, Thread, Message, 
                        Assistant, InstanceAssistant, Function, 
                        FunctionCall, Permission, Role, User,
                      ],
            synchronize: true, // Usar con precaución en producción
            logging: false,
            //connectTimeoutMS: 10000, 
            timezone: 'Z', //fuerza UTC
            ssl: {rejectUnauthorized: false,
//            ca: caCert, 
            },
          };
        } catch(error){
          console.error('Error loading CA file or connecting to DB:', error.message);
          throw error; // Rethrow the error to allow retry or further investigation
        }
      },
      inject: [ConfigService],
    }),
    MessengerModule,
    AuthModule
  ],
  
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

//npm run start:dev
//http://3.134.77.67:3004/queue/in/waapi/1