// const jwt = require("jsonwebtoken");  // old
const jose = require("jose");  // new

const { createToken } = require("./tokens");
const { ALG_TYPE, SECRET_KEY } = require("../config");


describe("createToken", function () {
  test("works: not admin", async function () {
    const token = await createToken({ username: "test", is_admin: false });
    const { payload, protectedHeader } = await jose.jwtVerify(token, SECRET_KEY);
    expect(protectedHeader).toEqual({
      alg: ALG_TYPE, 
      username: "test", 
      isAdmin: false, 
    });
  });

  test("works: admin", async function () {
    const token = await createToken({ username: "test", isAdmin: true });
    const { payload, protectedHeader } = await jose.jwtVerify(token, SECRET_KEY);
    expect(protectedHeader).toEqual({
      alg: ALG_TYPE, 
      username: "test", 
      isAdmin: true,
    });
  });

  test("works: default no admin", async function () {
    // given the security risk if this didn't work, checking this specifically
    const token = await createToken({ username: "test" });
    const { payload, protectedHeader } = await jose.jwtVerify(token, SECRET_KEY);
    expect(protectedHeader).toEqual({
      alg: ALG_TYPE, 
      username: "test", 
      isAdmin: false, 
    });
  });
});
