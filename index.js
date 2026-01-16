require('dotenv').config();
const express = require('express')
const path = require('path')
const routes = require("./routes/user.js")
const staticRoutes = require("./routes/static.js")
const DBconnection = require("./connection/connection.js")
const cookieParser = require('cookie-parser');
const {restrictToUser} = require('./middlewares/auth.js')


const app = express()
const PORT = process.env.PORT || 7000;

app.use(cookieParser());
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use(express.urlencoded({extended : false }))
DBconnection(process.env.MongoDB_URL)


// Tell Express we are using EJS as our template engine
app.set('view engine', 'ejs');

// Tell Express where our 'views' folder is located
app.set('views', path.join(__dirname, 'views'));
app.use(restrictToUser('uid'))

app.use(express.static(path.resolve("./public")));

app.use("/",routes)
app.use('/',staticRoutes)



app.listen(PORT,()=>{
    console.log("Server is conneted at",PORT)
})