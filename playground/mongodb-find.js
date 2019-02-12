// Using Object Re-structuring i.e. {property} = obj
// The above give the avialable property from the 'obj' object into a variable
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MondoDB Server', err);
    }

    console.log('Successfully connected to the mongoDB Server!');

    // const db = client.db('TodoApp');

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log(docs);
    // }, (err) => {
    //     console.log('Unable to fetch Todo', err);
    // });
    // client.close();
})