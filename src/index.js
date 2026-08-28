//require('dotenv').config({path: './env'})
import dns from "dns"
import dotenv from "dotenv"


dotenv.config({
    path: './.env'
})

dns.setServers(["1.1.1.1"]);

const { default: connectDB } = await import("./db/index.js");

console.log(
    "Mongo URI:",
    process.env.MONGODB_URI?.replace(/:([^:@]+)@/, ":*****@")
);

connectDB()












/*
import express from "express"
const app = express()

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        app.on("error:", (error) => {
            console.log("Error: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listeninig on port ${process.env.PORT}`);
            
        })

    } catch(error){
        console.error("Error:", error);
        throw err
    }
})()
*/