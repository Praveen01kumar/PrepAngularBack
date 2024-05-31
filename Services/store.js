import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: '../PrepAngular/src/assets/avatar',
    filename: (req, file, cd) => {
        return cd(null, `profile_image_${Date.now()}${path.extname(file.originalname)}`)
    }
});

export const profile_upload = multer({ storage: storage });

const storage1 = multer.diskStorage({
    destination: '../PrepAngular/src/assets/postimages',
    filename: (req, file, cd) => {
        return cd(null, `post_image_${Date.now()}${path.extname(file.originalname)}`)
    }
});

export const blog_upload = multer({ storage: storage1 });
