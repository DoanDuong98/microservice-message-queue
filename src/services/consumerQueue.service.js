'use strict'

const { connectToRabbitMQ, consumerQueue } = require("../dbs/init.rabbit")

const messageService = {
    consumerQueue: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            await consumerQueue(channel, queueName)
        } catch (error) {
            console.log('consumerQueue', error);
        }
    },
    // case processing
    consumerQueueNormal: async() => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            const notiQueue = 'notiQueueProcess';
            // set timeout to check TTL
            setTimeout(()=> {
                channel.consume(notiQueue, mes => {
                    console.log(mes.content.toString());
                })
            }, 15000)
        } catch (error) {
            
        }
    },
    // case fail
    consumerQueueFail: async() => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            const notiExchangeDLX = 'notiExchangeDLX'; // direct
            const notiRoutingKeyDLX = 'notiRoutingKeyDLX';

            const notiQueueHandler = 'notiQueueHotfix';
            await channel.assertExchange(notiExchangeDLX, 'direct', {
                durable: true
            })

            const queueResult = await channel.assertExchange(notiQueueHandler, {
                exclusive: false
            })
            await channel.bindQueue(queueResult.queue, notiExchangeDLX, notiRoutingKeyDLX);
            await channel.consume(queueResult.queue, msgFaild => {
                console.log(msgFaild.content.toString());
            }, { noAck: true })
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

module.exports = messageService
