const { Chat } = require("../database/models")
const Op = require('sequelize').Op
class ChatRepository {
    constructor() {
        this.modelChat = Chat
    }
    async getChatByRecipientID(recipient_id) {
        return await this.modelChat.findAll({
            where: {
                [Op.or]: [{recipient_id: recipient_id}, {sender_id: recipient_id}]
            },
            order: [
                ["createdAt", "ASC"]
            ]
        })
    }
    async insertChat (chat_data){
        return await this.modelChat.create(chat_data)
    }
}

module.exports = ChatRepository