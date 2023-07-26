import mysql from 'mysql';
import env from 'dotenv';
import errorMessage from '../Services/error-msg.js';

const errmsg = new errorMessage();
const envcon = env?.config()?.parsed;

const connection = () => { db?.connect(err => { if (err) { console.log(errmsg?.dbCoError);console.log(err) } else { console.log(errmsg?.dbSuccess) } }) };
const db = mysql?.createConnection({ host: envcon?.HOST, user: envcon?.DB_USER, password: envcon?.DB_PASSWORD, database: envcon?.DATABASE });

const dbc = { connectDB: connection, db: db, }

export default dbc;