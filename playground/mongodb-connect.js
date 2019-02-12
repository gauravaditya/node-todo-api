const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodosApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to the Mondo DB server', err);
    }

    const db = client.db('TodoApp');
    console.log('Successfully connected to the MondoDB Server!');

    // db.collection('Todos').insertOne({
    //     text: 'Do something',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Gaurav',
    //     age: 29,
    //     location: 'Mumbai'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err);
    //     }

    //     console.log(result.ops);        
    // });

    client.close();
});