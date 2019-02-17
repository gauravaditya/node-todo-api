const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1:27017/TodoApp', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://jitter:' +
                process.env.MONGO_ATLAS_PWD +
                '@cluster0-mkl74.azure.mongodb.net/test?retryWrites=true', 
                {useNewUrlParser: true}).then(() => {
                    console.log('Connected to Database Successfully!')
                }, (error) => {
                    console.log('Mongo DB Password: ' + process.env.MONGO_ATLAS_PWD);
                    console.log('Error Connecting to DB', error);
                });

module.exports = {
    mongoose: mongoose
}