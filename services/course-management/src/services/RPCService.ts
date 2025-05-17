import {connect, Connection, Channel, ConsumeMessage} from 'amqplib';
import env from "../config";
import CourseService from "./CourseService";
import {v4 as uuid4} from "uuid";

const {
    MSG_QUEUE_URL,
} = env

let amqplibConnection: Connection | null = null;

export const getChannel = async (): Promise<Channel> => {
    if (!amqplibConnection) {
        amqplibConnection = await connect(MSG_QUEUE_URL);
    }
    return await amqplibConnection.createChannel();
};

export const RPCObserver = async (RPC_QUEUE_NAME: string, service: CourseService) => {
    const channel = await getChannel();
    await channel.assertQueue(RPC_QUEUE_NAME, {
        durable: false,
    });
    await channel.prefetch(1);
    await channel.consume(
        RPC_QUEUE_NAME,
        async (msg: ConsumeMessage | null) => {
            if (msg && msg.content) {
                const response = await service.SubscribeRPCObserver(msg.content.toString());// call DB operation

                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify(response)),
                    {
                        correlationId: msg.properties.correlationId,
                    }
                );
                channel.ack(msg);
            }
        },
        {
            noAck: false,
        }
    );
};

export const requestData = async (
    RPC_QUEUE_NAME: string,
    requestPayload: { event: string; data: {} },
    uuid: string
): Promise<any> => {
    try {
        const channel = await getChannel();
        const q = await channel.assertQueue("", {exclusive: true});

        channel.sendToQueue(
            RPC_QUEUE_NAME,
            Buffer.from(JSON.stringify(requestPayload)),
            {
                replyTo: q.queue,
                correlationId: uuid,
            }
        );

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                channel.close();
                resolve("API could not fulfill the request!");
            }, 8000);

            channel.consume(
                q.queue,
                (msg: ConsumeMessage | null) => {
                    if (msg && msg.properties.correlationId === uuid) {
                        clearTimeout(timeout);
                        resolve(JSON.parse(msg.content.toString()));
                    }
                },
                {noAck: true}
            );
        });
    } catch (error) {
        console.error("RPC Request Error:", error);
        return "error";
    }
};

export const RPCRequest = async (
    RPC_QUEUE_NAME: string,
    requestPayload: { event: string; data: {} }
) => {
    const uuid = uuid4();
    return await requestData(RPC_QUEUE_NAME, requestPayload, uuid);
};
