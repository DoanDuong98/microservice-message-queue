"use strict";

const amqp = require("amqplib");

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:guest@localhost");
    if (!connection) throw new Error("Connect RMB fail");

    const channel = await connection.createChannel();
    return { channel, connection };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const connectToRabbitMQForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();
    const queue = "test-queue";
    const message = "Hello";
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));

    // close
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};


const consumerQueue = async (queue, channel) => {
  try {
    await channel.assertQueue(queue, { durable: true });
    console.log("Waiting...");
    channel.consume(queue, (msg) => {
        console.log(msg.content.toString())
        // find user follow shop
        // send mes to user
        // if error: setup DLX
        // DLX: mes bi tu choi (if/else), het han mes, full length queue
    }, {
      noAck: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectToRabbitMQ,
  connectToRabbitMQForTest,
  consumerQueue
};
