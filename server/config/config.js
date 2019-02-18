const env = process.env.NODE_ENV || 'development';
console.log('env *******', env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp'
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest'
} else {
    process.env.MONGODB_URI = 'mongodb+srv://jitter:' +
                               process.env.MONGO_ATLAS_PWD +
                              '@cluster0-mkl74.azure.mongodb.net/node-todo-api?retryWrites=true'
}