const jwt = require("jsonwebtoken")
const res_data = require('../helper/respons_data');

function getToken(authHeader) {
    let splitHeader = authHeader.split(' ');

    if (splitHeader.length > 1) {
        return splitHeader[1];
    }

    return splitHeader[0];
}

const authorized = (socket, next) => {
    let authHeader = socket.handshake.headers['authorization']

    if (authHeader !== undefined && typeof authHeader !== 'string') {
        return next(new Error(res_data.failed('unauthorized')));
    }
   
    let token = getToken(authHeader);
    let payload = null;

    try {
        payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
    } catch (err) {
        return next(new Error(res_data.failed('unauthorized')))
    }

    let auth = {
        user: payload.user,
        role_id: payload.role_id
    };
    socket.handshake.auth = auth
    next()

};
module.exports = authorized
