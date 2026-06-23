// app.js is the engine
// configure express and middleware

//import packages
//create express app
//       client->app->route->response
//configure middleware
//middleware is the function that runs between the request and response(it runs before route handles)
//       req->middleware->route->res
//export the app

const express = require("express")
const app = express()

const cors = require("cors")
//these are middlewares
app.use(cors());
app.use(express.json())

//this line of code allow other files can use app.js(server.js file willl use this app.js)
module.exports=app


