const app = require('./app');

const dotenv = require('dotenv');
const connectDatabase = require("./config/database");



//Config 

dotenv.config({path:"backend/config/config.env"});


//Connect to database
connectDatabase()



app.listen(process.env.PORT,() => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//Unhandled Promise Rejection
process.on('unhandleRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=> {
        process.exit(1);
    });
});