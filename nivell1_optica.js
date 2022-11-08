const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const nomDB = 'optica';

async function deleteDB(){
    try {
        await client.connect();
        await client.db(nomDB);
        await client.deleteMany();
    } finally {
        await client.close();
    }
}

deleteDB().catch(console.dir);

const nomDB = 'optica';