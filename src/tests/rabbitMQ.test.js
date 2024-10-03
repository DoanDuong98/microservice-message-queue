'use strict'

const { connectToRabbitMQForTest } = require("../dbs/init.rabbit")

describe('Rabbit Connection', () => {
    it('should connect to successful RbMQ', async() => {
        const result = await connectToRabbitMQForTest();
        expect(result).toBeUndefined();
    })
})
