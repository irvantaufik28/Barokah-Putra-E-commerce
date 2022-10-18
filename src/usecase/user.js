
class User {
  constructor(userRepository, otpRepository,bcrypt) {
    this.userRepository = userRepository;
    this.otpRepository = otpRepository,
    this.bcrypt = bcrypt
  }
  async getAllUser() {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let user = await this.userRepository.getAllUser();
    if (user == null) {
      result.reason = "list empty"
      return result
    }
    result.is_success = true
    result.status = 200
    result.data = user
    return result
  }
  async getUserByID(id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let user = await this.userRepository.getUserByID(id);
    if (user == null) {
      result.reason = "user not found"
      return result
    }
    result.is_success = true
    result.status = 200
    result.data = user
    return result
  }
  async updateUserProfile(user_data, id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let user = null
    user = await this.userRepository.getUserByUsername(user_data.username);
    if (user != null) {
      result.reason = "username already exist"
      return result
    }
   
    user = await this.userRepository.getUserByPhone(user_data.phone);
    if (user != null) {
      result.reason = "phone already exist"
      return result
    }
    user = await this.userRepository.updateUser(user_data, id);

    result.is_success = true
    result.status = 200
    result.data = user
    return result
  }
  async updatePassword(user_data, id){
    let result = {
      is_success : false,
      reason : "",
      status : 400,
    }

    if(user_data.newPassword !== user_data.confrimNewPassword){
      result.reason = "confrim new password not match"
      return result
    }
    

   let user = await this.userRepository.getUserByID(id)
    if(user === null){
      result.reason = "user not found"
      result.status = 404
      return result
    }
    
    if(!this.bcrypt.compareSync(user_data.oldPassword, user.password)){
      result.reason = "old password not match"
      return result
    }
    user_data.password = user_data.newPassword
    user_data.password = this.bcrypt.hashSync(user_data.password, 10)
    await this.userRepository.updatePassword(user_data, id)
    result.is_success = true,
    result.status = 200
    return result
    
  }
  async updateEmail (user_data , id ){
    let result = {
      is_success : false,
      reason : '',
      status : 400,
    }
    let user = await this.userRepository.getUserByID(id)
    if(user === null){
      result.reason = "user not found"
      result.status = 404
      return result
    }
    let otp = await this.otpRepository.getOTP(user_data.email , user_data.otp_code,"UPDATEEMAIL" )
    if(otp === null){
      result.reason = "invalid otp code"
      return result
    }
    await this.userRepository.updateUser(user_data, id)
    await this.otpRepository.deleteAllOtp(user_data.email)
    
    result.is_success =true
    result.status = 200
    return result
  }

  async resetPassword (user_data, email) {
    let result = {
      is_success : false,
      reason : '',
      status : 400
    }
    if(user_data.newPassword !== user_data.confrimNewPassword){
      result.reason = "confrim new password not match"
      return result
    }
    let user = await this.userRepository.getUserByEmail(email)
    if(user === null){
      result.reason = "user not found"
      result.status = 400
      return result
    }
    let otp = await this.otpRepository.getOTP(email , user_data.otp_code,"RESETPASSWORD" )
    if(otp === null){
      result.reason = "invalid otp code"
      return result
    }
    user_data.password = user_data.newPassword
    user_data.password = this.bcrypt.hashSync(user_data.password, 10)
    await this.userRepository.updatePassword(user_data, user.id)
    await this.otpRepository.deleteAllOtp(email)

    result.is_success = true,
    result.status = 200
    return result
  }
}


module.exports = User;
