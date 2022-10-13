const jwt = require('jsonwebtoken');
const res_data = require('../helper/respons_data');

function getToken(authHeader) {
  let splitHeader = authHeader.split(' ');

  if (splitHeader.length > 1) {
    return splitHeader[1];
  }

  return splitHeader[0];
}

const authorized = (authorization, role_id) => {
  try {
    
  if (authorization !== undefined && typeof authorization !== 'string') {
    return null;
  }

  let token = getToken(authorization);
  let payload = null;

  
    payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
  

  if (payload.role_id !== role_id) {
    return null;
  }

  const user = {
    id: payload.id,
    username: payload.username,
    email: payload.email,
  };

  return user;

  } catch (err) {
    return null;
  }
};

const admin = (req, res, next) => {
  const { authorization } = req.headers;
  const role_id = 1;
  const getAuthorization = authorized(authorization, role_id);

  if (getAuthorization === null) {
    return res.status(401).json(res_data.failed('unauthorized'));
  }

  req.user = getAuthorization;

  next();
};

const customer = (req, res, next) => {
  const { authorization } = req.headers;
  const role_id = 2;
  const getAuthorization = authorized(authorization, role_id);

  if (getAuthorization === null) {
    return res.status(401).json(res_data.failed('unauthorized'));
  }

  req.user = getAuthorization;

  next();
};


function socket_io (socket, next) {
  let authHeader = socket.handshake.headers['authorization']

  if (typeof authHeader !== 'string') {
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
      username: payload.username,
      role_id: payload.role_id
  };
  socket.handshake.auth = auth
  next()

};

module.exports = { customer, admin, socket_io };