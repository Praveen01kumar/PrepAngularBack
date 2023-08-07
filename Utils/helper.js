
import errorMessage from '../Services/error-msg.js';
import dbc from '../Databases/dbcon.js';
import bcpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv';

const errmsg = new errorMessage();

export default class UserHelper {

    static userAlrExist(res) {
        res?.status(401)?.json({ status: 0, message: errmsg?.userAlrExist });
    }
    static emailAlrExist(res) {
        res?.status(401)?.json({ status: 0, message: errmsg?.emailAlrExist });
    }
    static registerSuccess(res) {
        res?.status(200)?.json({ status: 1, message: errmsg?.userRegisSuccess });
    }
    static registerError(res) {
        res?.status(500)?.json({ status: 0, error: errmsg?.errorRegisUser });
    }
    static registerQueryPromise(query, params) {
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
    static useByNameOrEmail(results, password) {
        return results?.filter(user => bcpt?.compareSync(password, user?.password));
    }
    static userNotFound(res) {
        res?.status(401)?.json({ status: 0, errors: { message: errmsg?.userNotFound } });
    }
    static generateToken(username, password, role, id) {
        const payload = role ? { username, password, role, id } : { username, password };
        return jwt?.sign(payload, env?.config()?.parsed?.JWT_KEY, { expiresIn: '1h' });
    }
    static wrongPassword(res) {
        res?.status(401)?.json({ status: 0, message: errmsg?.wrongPassword });
    }
    static loginSuccess(res, token) {
        res?.status(200)?.json({ status: 1, token: token, message: errmsg?.loginSuccess });
    }
    static loginError(res) {
        res?.status(500)?.json({ status: 0, error: errmsg?.errorInLogin });
    }
    static updateSuccess(res) {
        res?.status(200)?.json({ message: errmsg?.userUpdatedSuccess });
    }
    static errorInGetUser(res) {
        res?.status(404)?.json({ error: errmsg?.errorInGetUser });
    }
    static userList(res, results) {
        res?.status(200)?.json({ data: results, results:results[0]?.password, status: 1 });
    }
    static deletedSuccess(res) {
        res?.status(200)?.json({ message: errmsg?.userDeletedSuccess });
    }
    static updateProfileSuccess(res) {
        res?.status(200)?.json({ message: errmsg?.userProfileUpdatedSuccess, status: 1 });
    }

    static ProfileQueryPromise(query, updateData) {
        return new Promise((resolve, reject) => {
            dbc?.db?.query(query, [updateData?.profile, updateData?.id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static BasicInfoQueryPromise(query, updateData) {
        return new Promise((resolve, reject) => {
            dbc?.db?.query(query, updateData, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static userPasswodUpdate(res,data) {
        res?.status(200)?.json({ new_password:data, message: errmsg?.userPasswordSuccess, status: 1 });
    }

    static PasswordPromise(query, updateData) {
        return new Promise((resolve, reject) => {
            dbc?.db?.query(query, updateData, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

}

