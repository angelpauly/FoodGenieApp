// start the server

const app = require("./app")
const connectDatabase = require("./config/database")

const dotenv = require("dotenv")

//load env variable
dotenv.config({path: "./config/config.env"})
//connec to db
connectDatabase();


//start server


app.listen(process.env.PORT, ()=>{
    console.log(`server started on PORT: ${process.env.PORT}`)
})