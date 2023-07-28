import express from 'express';
import bodyParser from 'body-parser';
import conf from './Config/config.js';
import dbc from './Databases/dbcon.js';
import userRoute from './Routes/users.js';
import routeDef from './Services/route-def.js';
import errorMessage from './Services/error-msg.js';
import cors from 'cors';
import postRoute from './Routes/posts.js'

//app
const app = express();
// port 
const con = new conf();
//router
const route = new routeDef();
// error message
const errmsg = new errorMessage();
// MySQL database configuration
dbc.connectDB();
// CORS error message
app.use(cors());
// Middleware for parsing request body
app.use(bodyParser?.json());
// users Route
app.use(route?.user, userRoute);
// blog post Route
app.use(route?.post, postRoute);
// send iamge back to the user
// app.use('image', express.static('./asets/image/'));



// server listening
app.listen(con?.port, () => { console.log(`${errmsg?.serverStarted} ${con?.port}`) });
