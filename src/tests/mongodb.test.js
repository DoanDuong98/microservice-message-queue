'use strict'

const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/shopDEV';

const TestSchema = new mongoose.Schema({ name: String })

const Test = mongoose.model('Test', TestSchema);

describe('Mongo connection', () => {
    let connection;
    beforeAll(async() => {
        connection = await mongoose.connect(connectionString)
    });

    afterAll(async() => {
        await connection.disconnect();
    })

    it('should connect to mongo', () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it('should save a document to mongo', async () => {
        const user = new Test({ name: 'D' });
        await user.save();
        expect(user.isNew).toBe(false);
    })

    it('should find a document', async () => {
        const user = new Test.findOne({ name: 'D' });
        expect(user).toBeDefined();
    })
})
