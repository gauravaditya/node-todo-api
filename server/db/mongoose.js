const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// if (process.env.MONGO_ATLAS_PWD) {
//     mongoose.connect('mongodb+srv://jitter:' +
//                 process.env.MONGO_ATLAS_PWD +
//                 '@cluster0-mkl74.azure.mongodb.net/node-todo-api?retryWrites=true', 
//                 {useNewUrlParser: true}).then(() => {
//                     console.log('Connected to Database Successfully!')
//                 }, (error) => {
//                     console.log('Error Connecting to DB', error);
//                 });

// } else {
//     mongoose.connect('mongodb://127.0.0.1:27017/TodoApp', {useNewUrlParser: true});
// }

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}).then(() => {
                        console.log('Connected to Database Successfully!')
                    }, (error) => {
                        console.log('Error Connecting to DB', error);
                    });

module.exports = {
    mongoose: mongoose
}