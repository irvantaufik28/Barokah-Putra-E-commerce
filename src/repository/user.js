const { User } = require("../database/models");
const { Address } = require("../database/models");


class UserRepository {
  constructor() {
    this.UserModel = User;
    this.AddressModel = Address;
  }
  async getAllUser() {
    return await this.UserModel.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: this.AddressModel,
        },
      ],
    });
  }
  async getUserByUsername(username) {
    return await this.UserModel.findOne({
      where: { username: username },
    });
  }

  async getUserByEmail(email) {
    return await this.UserModel.findOne({
      where: { email: email },
    });
  }

  async getUserByPhone(phone) {
    return await this.UserModel.findOne({
      where: { phone: phone },
    });
  }

  async getUserByID(id) {
    return await this.UserModel.findOne({
      attributes: { exclude: ["password"] },
      where: { id: id },
      include: [
        {
          model: this.AddressModel,
        },
      ],
    });
  }

  async updateUser(user, id) {
    return await this.UserModel.update(user, {
      where: { id: id },
    });
  }

  async updatePassword(user, id) {
    return await this.UserModel.update(user, {
      where: { id: id },
    });
  }
}

module.exports = UserRepository;
