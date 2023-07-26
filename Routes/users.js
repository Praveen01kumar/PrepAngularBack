import { Router } from 'express';
import userCont from '../Controllers/users.js';

const user = new userCont();
const userRoute = Router();

// Route for registering a new user
userRoute?.post('/register', user?.registerUser);

// Route for logging in user
userRoute?.post('/login', user?.userLogin);

// Route for get all users
userRoute?.get('/users', user?.usersList);

// Route for get single user
userRoute?.post('/detail', user?.userDetail);

// Route for delete single user
userRoute?.delete('/delete', user?.deleteById);

// Route for delete single user by user id in params 
userRoute?.delete('/delete/:id', user?.deleteByIdParam);

// Route for delete single user by user ids array in body 
userRoute?.delete('/deleteusers', user?.deleteUsers);

// Route for update single user by user id in params 
userRoute?.put('/edit', user?.editUser);

export default userRoute;