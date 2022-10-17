const { User } = require("../database/models");
class AuthRepository {
  constructor() {
    this.UserModel = User;
  }

  
  async registerUser(user_data) {
    return await this.UserModel.create(user_data);
  }

  async loginUser(username) {
    return await this.UserModel.findOne({
      where: { username : username},
      
    });
  }
}

module.exports = AuthRepository;