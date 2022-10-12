class Auth {
    constructor(authRepository, userRepository) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
    }
    async register(user_data) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
            data: null
        }
       let user = await this.userRepository.getUserByUsername(user_data.username);
        if (user != null) {
            result.reason = "username already exist"
            return result
        }
        user = await this.userRepository.getUserByEmail(user_data.email);
        if (user != null) {
            result.reason = "email already exist"
            return result
        }
        user = await this.userRepository.getUserByPhone(user_data.phone);
        if (user != null) {
            result.reason = "phone already exist"
            return result
        }
        result.is_success = true;
        result.status = 200
        result.data = user
        return result
    }

    async login(username, password) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
            data: null
        }
        let user = await this.authRepository.loginUser(username, password)
        if (user == null) {
            result.reason = "incorect username or password"
            result.status = 404
            return result
        }
        result.is_success = true;
        result.status = 200
        result.data = user
        return result
    }
}


module.exports = Auth;
