const default_Image = require("../internal/constants/defaultImage")

class Auth {
    constructor(authRepository, userRepository,otpRepository, bcrypt, cloudinary, generateToken, _) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.cloudinary = cloudinary;
        this.token = generateToken;
        this._ = _;
        this.bcrypt = bcrypt;
    }
    
    async register(user_data) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
            data: null,
            token: null
        }
        
        let otp = await this.otpRepository.getOTP(user_data.email, user_data.otp_code, "REGISTRATION")
        if(otp === null){
            result.reason = "invalid otp code"
            return result
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
        if (user_data.password !== user_data.confrimPassword) {
            result.reason = "password and confrim password not match"
            return result
        }

        user_data.password = this.bcrypt.hashSync(user_data.password, 10)

        if (user_data.avatar !== default_Image.DEFAULT_AVATAR) {
            let image = await this.cloudinary.uploadCloudinaryAvatar(user_data.avatar)
            user_data.avatar = image
            user = await this.authRepository.registerUser(user_data)
        } else {
            user = await this.authRepository.registerUser(user_data)
        }
        let newUser = this._.omit(user.dataValues, ['password'])
        let token = this.token(newUser)

        await this.otpRepository.deleteAllOtp(user_data.email)

        result.is_success = true;
        result.status = 200
        result.data = newUser
        result.token = token
        return result
    }

    async login(username, password) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
            data: null,
            token: null,
        }
        let user = await this.authRepository.loginUser(username)
        if (user == null) {
            result.reason = "incorect username or password"
            return result
        }
        if (!this.bcrypt.compareSync(password, user.password)) {
            result.reason = "incorect username or password"
            return result
        }
        let newUser = this._.omit(user.dataValues, ['password'])
        let token = this.token(newUser)

        result.is_success = true;
        result.status = 200
        result.data = newUser
        result.token = token
        return result
    }
}


module.exports = Auth;
