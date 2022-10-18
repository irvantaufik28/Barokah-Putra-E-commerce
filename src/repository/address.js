const { Address, User } = require("../database/models");

class AddressRepository {
  constructor() {
    this.AddressModel = Address;
    this.UserModel = User;
  }
  async getAllAddress() {
   return await this.AddressModel.findAll({
      include: [
        {
          model: this.UserModel,
          attributes: { exclude: ["password", "role_id", "avatar"] }
        },
      ],
    });
  }
  async getAddressByUserID(user_id) {
    return await this.AddressModel.findAll({
      where : {user_id : user_id}
     });
   }
   async getAddressByID(id) {
    return await this.AddressModel.findOne({
      where: { id:id },
      
    });
  }
  async createAddress(address) {
    return await this.AddressModel.create(address);
  }
  async updateAddress(address, id) {
  return await this.AddressModel.update(address, {
      where: { id: id },
    });
  }
  async getMainAddress(user_id){
    return await this.AddressModel.findOne({
      where : {
        user_id : user_id,
        main_address : true
      }
    })
  }
  async deleteAddress(id) {
  return await this.AddressModel.destroy({
      where: { id: id },
    });
  }
}

module.exports = AddressRepository;
