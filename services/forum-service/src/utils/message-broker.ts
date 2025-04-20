// src/utils/message-broker.ts
import amqp from "amqplib";

let channel: amqp.Channel;

export const connectToBroker = async () => {
  const connection = await amqp.connect(process.env.MSG_QUEUE_URL!);
  channel = await connection.createChannel();
};

export const sendRPCMessage = async (
  queue: string,
  message: any
): Promise<any> => {
  const correlationId = generateUuid();
  const replyQueue = await channel.assertQueue("", { exclusive: true });

  return new Promise((resolve) => {
    channel.consume(
      replyQueue.queue,
      (msg) => {
        if (msg?.properties.correlationId === correlationId) {
          resolve(JSON.parse(msg.content.toString()));
        }
      },
      { noAck: true }
    );

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      correlationId,
      replyTo: replyQueue.queue,
    });
  });
};

const generateUuid = () => Math.random().toString() + Math.random().toString();
