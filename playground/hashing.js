const jwt = require('jsonwebtoken');

let data = {
    id: 10
}

token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, "123abc");
console.log(decoded);