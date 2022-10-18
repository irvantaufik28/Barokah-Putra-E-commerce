const res_data = require('../helper/respons_data')
module.exports = {
    generateOTP: async (req, res, next) => {
        let otp_type = req.body.otp_type
        let email = req.body.email

        try {

            let res_otp = await req.otpUC.generateOTP(email, otp_type)
            if (res_otp.is_success !== true) {
                return res.
                    status(res_otp.status).json(res_data.failed(res_otp.reason))
            }
            res.status(res_otp.status).json(res_data.success(res_otp.reason))
        } catch (e) {
            next(e)
        }
    },
    verifyOTP: async (req, res, next) => {
        let otp_code = req.query.otp_code
        let otp_type = req.query.otp_type
        let email = req.query.email

        let res_otp = await req.otpUC.verifyOTP(email, otp_code, otp_type)
        try {

            if (res_otp.is_success !== true) {
                return res
                    .status(res_otp.status).json(res_data.failed(res_otp.reason))
            }
            res.status(res_otp.status).json(res_data.success(res_otp.reason))
        } catch (e) {
            next(e)
        }
    }
}