

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

}

export default PostQuery;