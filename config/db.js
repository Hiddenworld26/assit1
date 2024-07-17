const mongoose = require('mongoose');
const dotenv=require('dotenv');
const connectDB = async () =>
{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,
            {
                useUnifiedTopology : true,
                useNewUrlParser : true,
            
            });
            console.log(`Mongodb connected ${conn.connection.host}`)
    }

    catch (error)
    {
        console.log(error);
    }
}

module.exports = connectDB;