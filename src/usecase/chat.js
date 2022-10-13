class Chat {
    constructor(ChatRepositoy){
        this.ChatRepositoy = ChatRepositoy
    }
    async getChat(recipient_id){
        let result = {
            is_success : false,
            status : 404,
            reason : '',
            data : []
        }
        let chat = await this.ChatRepositoy.getChatByRecipientID(recipient_id)
        result.is_success = true
        result.status = 200
        result.data = chat
        return result
    }
    async insertChat(chat_data) {
        let result = await this.ChatRepositoy.insertChat(chat_data)
        if(result === null) {
            return null
        }

        return {
            ...result.get(),
            is_sender: true
        }
    }
}
module.exports = Chat