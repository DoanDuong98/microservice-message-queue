'use strict'

const { consumerQueue, consumerQueueFail, consumerQueueNormal } = require("./src/services/consumerQueue.service")

const queueName = '';

// consumerQueue(queueName).then().catch();
consumerQueueFail(queueName).then().catch();
consumerQueueNormal(queueName).then().catch();
