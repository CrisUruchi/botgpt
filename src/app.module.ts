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
        const caPath = path.resolve(__dirname, '..', configService.get<string>('DATABASE_CA'));
        const caCert = fs.readFileSync(caPath, 'utf8').toString().replace(/\r?\n|\r/g, '\n');

        return {
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Queue, Instance, Channel, Thread, Message],
        synchronize: true, // Usar con precaución en producción
        logging: false,
        timezone: 'Z', //fuerza UTC
        ssl: {//rejectUnauthorized: false,
        ca: caCert, 
        },
      };
    } catch(error){
      console.error('Error loading CA file or connecting to DB:', error.message);
      throw error; // Rethrow the error to allow retry or further investigation
    }
    },
      inject: [ConfigService],
    }),
    MessengerModule
  ],
  
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

//npm run start:dev