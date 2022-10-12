const res_data = require("../helper/respons_data")
module.exports = {
    getChat : async (req, res, next) =>{
        let recipient_id = req.user.id
        try {
            
            let res_chat = await req.chatUC.getChat(recipient_id)
            if(res_chat.is_success !== true){
                return res
                .status(res_chat.status)
                .json(res_data.failed(res_chat.reason))
            }
            res.status(res_chat.status).json(res_data.success(res_chat.data))
        } catch (e) {
            next(e)
        }
    }
    
}