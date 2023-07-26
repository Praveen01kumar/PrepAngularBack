import bcpt from 'bcrypt';
import UserQuery from '../Utils/users.js';
import errorMessage from '../Services/error-msg.js';
import UserHelper from '../Utils/helper.js';

const errmsg = new errorMessage();

export default class userController {

    // registering 1
    registerUser = (req, res) => {
        const user = { first_name: (req?.body?.first_name).trim(), last_name: (req?.body?.last_name).trim(), email: (req?.body?.email).trim(), phone: (req?.body?.phone).trim(), password: bcpt?.hashSync(req?.body?.password, 10), address: (req?.body?.address).trim(), city: (req?.body?.city).trim(), state: (req?.body?.state).trim(), zip_code: (req?.body?.zip_code).trim(), country: (req?.body?.country).trim(), };
        this.getUserByEmailOrUsername(user.first_name, user.email)
            .then(allUser => {
                const matched_User = allUser?.find(el => el?.first_name === user?.first_name);
                const matched_Email = allUser?.find(el => el?.email === user?.email);
                if (matched_User) {
                    return UserHelper.userAlrExist(res);
                } else if (matched_Email) {
                    return UserHelper.emailAlrExist(res);
                } else {
                    return this.addUser(user);
                }
            })
            .then(result => {
                return UserHelper.registerSuccess(res);
            })
            .catch(error => {
                return UserHelper.registerError(res);
            });
    };
    // Helper functions for registering
    async getUserByEmailOrUsername(first_name, email) {
        const query = UserQuery?.getUserByEmailOrUsername();
        const params = [first_name, email];
        return await UserHelper.registerQueryPromise(query, params);
    }
    async addUser(user) {
        const query = UserQuery?.addUser();
        return await UserHelper.registerQueryPromise(query, user);
    }

    // logging 2
    userLogin = async (req, res) => {
        try {
            const { user_name, password } = req?.body;
            const results = await this.getUserByUserName(user_name);
            if (results?.length === 0) {
                const userData = await this.getUserByEmail(user_name);
                if (userData?.length === 0) {
                    return UserHelper.userNotFound(res);
                }
                const userByEmail = UserHelper.useByNameOrEmail(userData, password);
                if (userByEmail?.length === 0) {
                    return UserHelper.wrongPassword(res);
                }
                const token = UserHelper.generateToken(userByEmail[0]?.first_name, userByEmail[0]?.password, 'user');
                return UserHelper.loginSuccess(res, token);
            } else {
                const userByName = UserHelper.useByNameOrEmail(results, password);
                if (userByName?.length === 0) {
                    return UserHelper.wrongPassword(res);
                }
                const token = UserHelper.generateToken(userByName[0]?.first_name, userByName[0]?.password);
                return UserHelper.loginSuccess(res, token);
            }
        } catch (error) {
            return UserHelper.loginError(res);
        }
    };
    // Helper functions for logging in
    async getUserByUserName(user_name) {
        const query = UserQuery?.getUserByUserName(user_name);
        return await UserHelper.queryPromise(query);
    }
    async getUserByEmail(user_name) {
        const query = UserQuery.getUserByEmail(user_name);
        return await UserHelper.queryPromise(query);
    }

    // Editing a user 3
    editUser = (req, res) => {
        const updateData = { ...req?.body, password: bcpt?.hashSync(req?.body?.password, 10), id: parseInt(req?.body?.id) };
        this.updateUserById(updateData)
            .then(() => {
                return UserHelper.updateSuccess(res);
            })
            .catch(error => {
                return UserHelper.errorInGetUser(res);
            });
    };
    // Helper functions for editing a user details
    async updateUserById(updateData) {
        const query = UserQuery?.updateUserById(updateData);
        return await UserHelper.queryPromise(query);
    }

    //getting user details 4
    userDetail = (req, res) => {
        this.getUserById(req?.body?.id)
            .then(results => {
                if (results?.length === 0) {
                    return UserHelper.userNotFound(res);
                } else {
                    return UserHelper.userList(res, results);
                }
            })
            .catch(error => {
                return UserHelper.errorInGetUser(res);
            });
    };
    // Helper functions for getting user details
    async getUserById(id) {
        const query = UserQuery?.getUserById(id);
        return await UserHelper.queryPromise(query);
    }

    //getting all users 5
    usersList = (req, res) => {
        this.getAllUsersList()
            .then(results => {
                if (results?.length === 0) {
                    return UserHelper.userNotFound(res);
                } else {
                    return UserHelper.userList(res, results);
                }
            })
            .catch(error => {
                console.log(error);
                return UserHelper.errorInGetUser(res);
            });
    };
    // Helper functions for getting all users
    async getAllUsersList() {
        const query = UserQuery?.getAllUsers();
        return await UserHelper.queryPromise(query);
    }

    //deleting a user by id 6
    deleteById = (req, res) => {
        this.getAllUsersDeleteById()
            .then(allUser => {
                const id = allUser?.find(el => el?.id === +req?.body?.id);
                if (id) {
                    return this.deleteUserById(req?.body?.id);
                } else {
                    return UserHelper.userNotFound(res);
                }
            })
            .then(results => {
                if (results?.length === 0) {
                    return UserHelper.userNotFound(res);
                } else {
                    return UserHelper.deletedSuccess(res);
                }
            })
            .catch(error => {
                return UserHelper.errorInGetUser(res);
            });
    };
    // Helper functions for deleting a user by id
    async getAllUsersDeleteById() {
        const query = UserQuery?.getAllUsers();
        return await UserHelper.queryPromise(query);
    }
    async deleteUserById(id) {
        const query = UserQuery?.deleteUserById(id);
        return await UserHelper.queryPromise(query);
    }
    
    //dedeleting by id params 7
    deleteByIdParam = (req, res) => {
        this.getAllUsersDeleteByIdParam()
            .then(allUser => {
                const id = allUser?.find(el => el?.id === +req?.params?.id);
                if (id) {
                    return this.deleteUserByIdDeleteByIdParam(parseInt(req?.params?.id));
                } else {
                    return UserHelper.userNotFound(res);
                }
            })
            .then(results => {
                if (results?.length === 0) {
                    return UserHelper.userNotFound(res);
                } else {
                    return UserHelper.deletedSuccess(res);
                }
            })
            .catch(error => {
                console.log(error);
                return UserHelper.errorInGetUser(res);
            });
    };
    // Helper functions dedeleting by id params
    async getAllUsersDeleteByIdParam() {
        const query = UserQuery?.getAllUsers();
        return await UserHelper.queryPromise(query);
    }
    async deleteUserByIdDeleteByIdParam(id) {
        const query = UserQuery?.deleteUserById(id);
        return await UserHelper.queryPromise(query);
    }

    //dedeleting by id in body 8
    deleteUsers = (req, res) => {
        this.deleteMultipleUsers(req?.body?.id)
            .then(results => {
                if (results?.length === 0) {
                    return UserHelper.userNotFound(res);
                } else {
                    return UserHelper.deletedSuccess(res);
                }
            })
            .catch(error => {
                console.log(error);
                return UserHelper.errorInGetUser(res);
            });
    };
    // Helper functions dedeleting by id in body
    async deleteMultipleUsers(ids) {
        const query = UserQuery?.deleteMultipleUsers(ids?.join());
        return await UserHelper.queryPromise(query);
    }
}
