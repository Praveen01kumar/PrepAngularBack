import PostQuery from '../Utils/posts.js';
import PostHelper from '../Utils/posthelper.js';

export default class postController {

    // create post 1
    createPost = (req, res) => {
        const post = { 
            title: (req?.body?.title).trim(),
            description: (req?.body?.description).trim(),
            image: req?.file?.filename,
            categories: req?.body?.categories,
        };
        this.addPost(post).then(result => {
            return PostHelper.postCreatedSuccess(res);
        })
        .catch(error => {
            return PostHelper.postCreateError(res);
        });
    };

    // Helper functions for create post
  
    async addPost(post) {
        const query = PostQuery?.addPost();
        return await PostHelper.createpostQueryPromise(query, post);
    }

    //getting all post 5
    postList = (req, res) => {
        this.getAllPostList()
            .then(results => {
                if (results?.length === 0) {
                    return PostHelper.postNotFound(res);
                } else {
                    return PostHelper.postList(res, results);
                }
            })
            .catch(error => {
                return PostHelper.errorInGetPost(res);
            });
    };

    // Helper functions for getting all users
    async getAllPostList() {
        const query = PostQuery?.getPostlist();
        return await PostHelper.queryPromise(query);
    }

    //getting post details 4
    postDetail = (req, res) => {
        this.getPostById(req?.body?.id)
            .then(results => {
                if (results?.length === 0) {
                    return PostHelper.postNotFound(res);
                } else {
                    return PostHelper.postList(res, results);
                }
            })
            .catch(error => {
                return PostHelper.errorInGetPost(res);
            });
    };
    // Helper functions for getting post details
    async getPostById(id) {
        const query = PostQuery?.getPostById(id);
        return await PostHelper.queryPromise(query);
    }





}
