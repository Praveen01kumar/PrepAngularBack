

class PostQuery {

    static addPost() {
        return `INSERT INTO blog_post SET ?`;
    }

    static getPostlist() {
        return `SELECT * FROM blog_post`;
    }

    static getPostById(id) {
        return `SELECT * FROM blog_post WHERE id = ${id}`;
    }

    // static getUserByUserName(user_name, callback) {
    //     return `SELECT * FROM users WHERE first_name = '${user_name}'`;
    // }

    // static getUserByEmail(user_name, callback) {
    //     return `SELECT * FROM users WHERE email = '${user_name}'`;
    // }

    

    // static getUserByEmailOrUsername(){
    //     return 'SELECT * FROM users WHERE first_name = ? OR email = ?';
    // }

    // static getUserById(id) {
    //     return `SELECT * FROM users WHERE id = ${id}`;
    // }

    // static deleteUserById(id) {
    //     return `DELETE FROM users WHERE id = ${id}`;
    // }

    // static updateUserById(userUpade) {
    //     console.log(userUpade);
    //  // return `UPDATE users SET first_name='${userUpade['first_name']}', last_name='${userUpade['last_name']}', email='${userUpade['email']}', phone='${userUpade['phone']}'  password='${userUpade['password']}', address='${userUpade['address']}', city='${userUpade['city']}', state='${userUpade['state']}', zip_code='${userUpade['zip_code']}', country='${userUpade['country']}', WHERE id=${userUpade['id']}`;
    //     return `UPDATE users SET first_name='${userUpade['first_name']}', last_name='${userUpade['last_name']}', password='${userUpade['password']}' WHERE id=${userUpade['id']}`;
    // }

    // static deleteMultipleUsers(id) {
    //     return `DELETE FROM users WHERE id IN (${id});`;
    // }

}

export default PostQuery;