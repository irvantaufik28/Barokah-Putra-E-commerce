const email_message = {
    REGISTATION: {
        text_value: "your otp code : {otp}",
        html_value: "<b>your otp code: {otp} </b>"
    }
}
class Otp {
    constructor(otpRepository, emailRepository) {
        this.otpRepository = otpRepository
        this.emailRepository = emailRepository
    }
    async generateOTP(email, otp_type) {
        let result = {
            is_success: false,
            status: 400,
            reason: ''
        }
        let otp = await this.getOTPByEmail(email)
        if (otp !== null) {
            result.reason = "wait until : " + otp.expired_at
            return result
        }

        let content = email_message[otp_type.toUpperCase()]
        if (typeof content === undefined) {
           
            return result
        }

        otp = await this.otpRepository.generateOTP(email, otp_type)
        let text = content.text_value.replace('{otp}', otp.otp_code)
        let html = content.html_value.replace('{otp}', otp.otp_code)
        await this.emailRepository.sendEmail('OTP Code', email, text, html)

        result.is_success = true
        result.status = 200,
        result.reason = "check your email"
        return result
    }
    async verifyOTP(email, otp_code, otp_type) {
        let result = {
            is_success: false,
            status: 400,
            reason: ''
        }
    
     let otp = await this.otpRepository.getOTP(email, otp_code, otp_type)
     if(otp === null){
        result.reason = "invalid otp"
        return result
     }
     result.is_success = true
     result.status = 200
     result.reason = "otp valid"
     return result
    }
    async getOTPByEmail(email) {
        return await this.otpRepository.getOTPByEmail(email)
    }
    async deleteAllIOTP(email) {
        await this.otpRepository.deleteAllIotp(email)
    }
}
module.exports = Otp