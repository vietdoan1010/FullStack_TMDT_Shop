const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Ecommerce', {useNewUrlParser: true, useUnifiedTopology: true, 
useCreateIndex:true}).then((data)=>{
    console.log(`Mongodb conected with server: ${data.connection.host}`);
}).catch((error)=>{
    console.error(error);
})