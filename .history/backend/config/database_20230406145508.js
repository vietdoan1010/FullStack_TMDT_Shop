const mongoose = require('mongoose');





mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, 
useCreateIndex:true}).then((data)=>{
    console.log(`Mongodb conected with server: ${data.connection.host}`);
}).catch((error)=>{
    console.error(error);
})