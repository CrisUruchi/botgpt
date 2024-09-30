import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Queue } from "../entities/queue.entity";
import { Channel } from "../entities/channel.entity";
import { WaapiService } from "./waapi.service";
import { Function } from "../entities/function.entity";
import { FunctionService } from "./function.service";
import { WebService } from "./web.service";

@Injectable()
export class QueueService {
    constructor(
        @InjectRepository(Queue) private readonly queueRepository: Repository<Queue>,
        @InjectRepository(Channel) private readonly channelRepository: Repository<Channel>,
        @InjectRepository(Function) private readonly functionRepository: Repository<Function>,
        private readonly waapiService: WaapiService,
        private readonly webService: WebService,
        private readonly functionService: FunctionService,
    ) {}

    async processTask(task: any): Promise<void> {
        const taskPayload = JSON.stringify(task);
        let myqueue = await this.queueRepository.create({ redisId: task.id, payload: taskPayload});
        myqueue = await this.queueRepository.save(myqueue);
        console.log("cola guardada", myqueue);
        let channel: Channel;
        let myFunctions: Function[] = [];
        channel = await this.channelRepository.findOne({ where: { code: task.channel }});
        console.log("channel", channel);
        if (!channel) {
            console.log("problema con el channel", channel);
            myqueue.errorReason = `Channel ${task.channel} not found`;
            myqueue.status = 'ERROR';
            await this.queueRepository.save(myqueue);
            console.log("cola guardada", myqueue);
            return;
        }
        console.log("task.type", task.type);
        if (task.type === 'function') {
            console.log("tipo funcion");
            for (const f of task.functions) {
                const myFunction = await this.functionRepository.findOne( { where: { name: f.name }});

                if (!myFunction) {
                    console.log("problema con la funcion", myFunction);
                    myqueue.errorReason = `Function ${f.name} not found`;
                    myqueue.status = 'ERROR';
                    await this.queueRepository.save(myqueue);
                    console.log("cola guardada", myqueue);
                    return;
                }
                myFunctions.push(myFunction);
            }
        }
        try {
            await this.execute(task.type === 'function' ? 'function' : channel.code, task.type === 'function' ? myFunctions : JSON.parse(channel.config), task);
        } catch (error) {
            console.log('ERROR!!!!!', error);
            myqueue.errorReason = error.message;
            myqueue.status = 'ERROR';
            await this.queueRepository.save(myqueue);
            return;
        }
        myqueue.status = 'PROCESSED';
        await this.queueRepository.save(myqueue);
        console.log("guardadoooo", myqueue);
    }

    private async execute(channel: string, configOrFunction: any, taskPayload: any): Promise<void> {
        switch(channel) {
            case 'waapi': 
                this.waapiService.execute(configOrFunction, taskPayload);
                break;
            case 'web': 
                this.webService.execute(configOrFunction, taskPayload);
                break;
            case 'function': 
                this.functionService.execute(configOrFunction, taskPayload);
                break;
            default:
                throw new Error(`Service ${channel} not found`);
        }
    }
}