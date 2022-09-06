class User {
    constructor (userRepository){
        this.userRepository = userRepository
    }
    async getUserByUsername(username) {
        return await this.userRepository.getUserByUsername(username)
    }

    async getUserByID(id) {
        return await this.userRepository.getUserByID(id)
    }

    async createUser(user){
        return await this.userRepository.createUser(user)
    }
}

module.exports= User