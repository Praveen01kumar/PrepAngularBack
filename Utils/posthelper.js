

import dbc from '../Databases/dbcon.js';
import errorMessage from '../Services/error-msg.js';

const errmsg = new errorMessage();

export default class PostHelper {

    static createpostQueryPromise(query, params) {
        return new Promise((resolve, reject) => {
            dbc?.db?.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    static queryPromise(query) {
        return new Promise((resolve, reject) => {
            dbc?.db?.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static postCreateError(res) {
        console.log(res);
        res?.status(401)?.json({ status: 0, message: errmsg?.someThingWentWrong });
    }

    static postCreatedSuccess(res) {
        res?.status(200)?.json({ status: 1, message: errmsg?.postCreted, data:{
            title:res?.req?.body?.title,
            description:res?.req?.body?.description,
            categories:res?.req?.body?.categories,
            image:`${res?.req?.protocol}://${res?.req?.headers?.host}/${res?.req?.file?.path.replace(/\\/g, "/")}`,
        }}); 
    }

    static postNotFound(res) {
        res?.status(401)?.json({ status: 0, errors: { message: errmsg?.postNotFound } });
    }

    static postList(res, results){
        res?.status(200)?.json({ data: results });
    }

    static errorInGetPost(res){
        res?.status(404)?.json({ error: errmsg?.errorInGetPost });
    }
}