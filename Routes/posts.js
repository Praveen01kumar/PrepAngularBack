import { Router } from 'express';
import postCont from '../Controllers/posts.js';
import multer from 'multer';
import path from 'path';

const post = new postCont();
const postRoute = Router();

const storage = multer.diskStorage({
    destination: '../PrepAngular/src/assets/postimages',
    filename: (req, file, cd) => {
        return cd(null, `post_image_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

// Route for create a new user
postRoute?.post('/create', upload.single('image'), post?.createPost);

// get post list
postRoute?.post('/list', post?.postList);

// get post detail
postRoute?.post('/detail', post?.postDetail);


export default postRoute;