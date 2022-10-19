// ./src/database/ads.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'ads';

async function insertGuest(guestobj) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(guestobj);
  return insertedId;
}

async function getGuest() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteGuest(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
      _id: new ObjectID(id),
    });
  }
  
  async function updateGuest(id, guestobj) {
    const database = await getDatabase();
    delete ad._id;
    await database.collection(collectionName).update(
      { _id: new ObjectID(id), },
      {
        $set: {
          ...guestobj,
        },
      },
    );
  }

module.exports = {
  insertGuest,
  getGuest,
  deleteGuest,
  updateGuest,
};