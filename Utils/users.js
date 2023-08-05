

class UserQuery {

    static addUser() {
        return `INSERT INTO users SET ?`;
    }

    static getUserByUserName(username, callback) {
        return `SELECT * FROM users WHERE username = '${username}'`;
    }

    static getUserByEmail(email, callback) {
        return `SELECT * FROM users WHERE email = '${email}'`;
    }

    static getAllUsers() {
        return `SELECT * FROM users`;
    }

    static getUserByEmailOrUsername(){
        return 'SELECT * FROM users WHERE username = ? OR email = ?';
    }

    static getUserById(id) {
        return `SELECT * FROM users WHERE id = ${id}`;
    }

    static deleteUserById(id) {
        return `DELETE FROM users WHERE id = ${id}`;
    }

    static updateUserById(userUpade) {
        return `UPDATE users SET first_name='${userUpade['first_name']}', last_name='${userUpade['last_name']}', password='${userUpade['password']}' WHERE id=${userUpade['id']}`;
    }

    static deleteMultipleUsers(id) {
        return `DELETE FROM users WHERE id IN (${id});`;
    }

    static updateUserProfileQr(updateData) {
        return `UPDATE users SET profile = ? WHERE id = ${updateData?.id};`;
    }

    static updateUserBasicQr(updateData) {
        return `UPDATE users SET first_name = ?, last_name = ?, gender = ?, created_at = ?, site_url = ?, address = ?, city = ?, state = ?, country = ? WHERE id = ${updateData};`;
    }



}

export default UserQuery;