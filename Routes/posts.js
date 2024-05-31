import { Router } from 'express';
import postCont from '../Controllers/posts.js';
import { blog_upload } from '../Services/store.js';

const post = new postCont();
const postRoute = Router();

// Route for create a new user
postRoute?.post('/create', blog_upload.single('image'), post?.createPost);

// get post list
postRoute?.post('/list', post?.postList);

// get post detail
postRoute?.post('/detail', post?.postDetail);


export default postRoute;