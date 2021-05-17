const {MongoClient, ObjectID} = require('mongodb');


// COMMANDS
// --------
// mongo
// use demo_native
// db.find()
// db.users.find({name: "Paul"}).explain()

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'demo_native';
const collectionName = 'demo_collection';

// Use connect method to connect to the server
(async function () {
  const connection = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = connection.db(dbName);
  const collection = db.collection(collectionName);
  // await db.dropDatabase();

  /**
   * @type {InsertOneWriteOpResult}
   * @link http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~insertOneWriteOpResult
   */
  const insertResult = await collection.insertOne({ foo: 2, date: new Date() });
  console.log('Insert result = ');
  console.dir(Object.keys(insertResult), { colors: true });
  
  const insertedId = insertResult.insertedId;
  console.log('Insert id = %s', insertedId);
  console.log(typeof insertedId);

  // const document = await collection.findOne({_id: ObjectID("6066194b6a768262169abcc0")});
  const document = await collection.findOne({foo: 2});
  console.log('findOne: ');
  console.dir(document, {colors: true});

  /**
   * @type {UpdateWriteOpResult}
   * @link http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~updateWriteOpResult
   */
  // updateOne - принимает 3 аргумента: 1 - фильтр, 2 - команда что сделать и данные, 3 - опции
  // upsert: true если не найдёт foo: 2 то добавит объект в коллекцию с обновляемыми данными
  const updateResult = await collection.updateOne({ foo: 2 }, { $set: { bar: 42 } }, { upsert: true });
  console.log('Update result = ');
  console.dir(Object.keys(updateResult), {colors: true});

  /** 
   * @type {DeleteWriteOpResultObject}
   * @link http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~deleteWriteOpResult
   */
  const deleteResult = await collection.deleteOne({_id: insertedId});
  console.log('Delete result = ');
  console.dir(Object.keys(deleteResult), {colors: true});
  // await collection.deleteMany({});

  await connection.close();
})();
