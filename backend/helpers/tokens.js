// const jwt = require("jsonwebtoken");  // old
const jose = require("jose");  // new
// import jose;

const { ALG_TYPE, SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

async function createToken(user) {
  console.assert(user.isAdmin !== undefined
                  || process.env.NODE_ENV === "test", 
      "createToken passed user without isAdmin property");

  let userInfo = {
    // 'exp': int(time()) + 3600,
    'username': user.username, 
    'isAdmin': user.isAdmin || false,
  };

  const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
    .setProtectedHeader({ alg: ALG_TYPE, ...userInfo })
    // .setIssuedAt()
    // .setIssuer('urn:example:issuer')
    // .setAudience('urn:example:audience')
    // .setExpirationTime('2h')
    .sign(SECRET_KEY)

  // claims = {
  //   'iss': 'http://www.example.com',
  //   'exp': int(time()) + 3600,
  //   'sub': 42,
  // };

  // jwk = {'k': 'password'};

  // jws = jose.sign(claims, jwk, alg='HS256');
  // jws = jose.sign(payload, jwk, alg='HS256');
  // jws = jose.sign(payload, jwk);
  // jwt = jose.serialize_compact(jws);


  // console.log("#####################################################");
  // console.log("jwt");
  // console.log(jwt);
  // console.log("#####################################################");
  
  return jwt;
}

module.exports = { createToken };
