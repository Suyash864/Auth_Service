const jwt = require('jsonwebtoken');
const bcrypt = requi('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error){
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user,JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token creation", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptPassword) {
        try{ 
            return bcrypt.compareSync(userInputPlainPassword, encryptPassword);
        } catch(error) {
            console.log("Soemthing went wrong in password comparison");
            throw error;
        }
    }
}

module.exports = UserService;