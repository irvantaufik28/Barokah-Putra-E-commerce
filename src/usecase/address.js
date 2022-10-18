class Address {
  constructor(addressRepositroy, userRepository) {
    this.addressRepository = addressRepositroy
    this.userRepository = userRepository
  }
  async getAddressByUserID(user_id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let address = await this.addressRepository.getAddressByUserID(user_id)
    if (address == null) {
      result.reason = "address not found"
      result.is_success = false
      return
    }
    result.is_success = true
    result.status = 200
    result.data = address
    return result

  }

  async addNewAddress(data_address) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let address = null
    let main_address = await this.addressRepository.getMainAddress(data_address.user_id)
    if(main_address === null){
       address = await this.addressRepository.createAddress(data_address)
    } else {
      data_address.main_address = false
      address = await this.addressRepository.createAddress(data_address)
    }

    result.is_success = true;
    result.status = 200
    result.data = address
    return result
  }
  async updateAddress(address_data, id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
  
    }
    let existUser = await this.userRepository.getUserByID(address_data.user_id);
    if (existUser == null) {
      result.reason = "failed add address, address not found"
      return result
    }
    let existAddress = await this.addressRepository.getAddressByID(id);
    if (existAddress === null) {
      result.reason = "failed add address, address not found"
      return result
    }
     await this.addressRepository.updateAddress(address_data, id)
  
    result.is_success = true;
    result.status = 200
    return result

  }
  async deleteAddress(id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      
    }
    let existAddress = await this.addressRepository.getAddressByID(id);
    if (existAddress == null) {
      result.reason = "failed delete address, address not found"
      return result
    }
    await this.addressRepository.deleteAddress(id)
    
    result.is_success = true;
    result.status = 200
  
    return result
  }
  async changeMainAddress (address_data ,id){
    let result = {
      is_success: false,
      reason: "",
      status: 404
  }
  let address = await this.addressRepository.getMainAddress(address_data.user_id)
  console.log(address)
  if(address === null){
    result.reason = "customer not have address"
    return result
  }
    address.main_address = false  
    let changeMainAddressToFasle = address.main_address
    await this.addressRepository.updateAddress(changeMainAddressToFasle, address.id)
    
    await this.addressRepository.updateAddress(address_data, id)

    result.is_success = true
    result.status = 200
    return result

}

}
module.exports = Address