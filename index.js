import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";

// create a method to connect to db, run this method
( async ()=>{
    try {
        await mongoose.connect(config.MONGODB_URL);
        console.log("DB Connected!");

        app.on('error', (err)=>{
            console.error('Express error:', err);
            throw err;
        })

        const onListening = () =>{
            console.log("Listening on port: 5000");
        }        
        app.listen(config.PORT, onListening);
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
})();