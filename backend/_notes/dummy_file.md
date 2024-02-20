
// ###################################################################

UPDATE users SET is_admin = True WHERE username = 'testuser';

SELECT username, email, is_admin FROM users;


SELECT * FROM favorite_cups;
SELECT * FROM favorite_teams;
SELECT * FROM leagues limit 10;
SELECT id, name, type FROM leagues limit 10;
SELECT * FROM teams limit 10;
SELECT id, 
       name, 
       code, 
       country, 
       founded AS fndd, 
       national AS natnl, 
       venue_id 
  FROM teams 
  LIMIT 10;

SELECT ft.username, ft.team_id, fl.league_id, fc.cup_id 

SELECT ft.username, 
       t.name AS "fav teams", 
       l.name AS "fav leagues", 
       c.name AS "fav cups" 
  FROM favorite_teams ft
  JOIN favorite_leagues fl
  ON ft.username = fl.username
  JOIN favorite_cups fc
  ON ft.username = fc.username
  LEFT JOIN teams t
  ON ft.team_id = t.id
  LEFT JOIN leagues l
  ON l.id = fl.league_id
  LEFT JOIN leagues c
  ON c.id = fc.cup_id
  ;



// ###################################################################

{
	"username": "testuser",
	"password": "password"
}


{
	"username": "mete",
	"password": "mete123"
}

{
	"username": "papi",
	"password": "papi123", 
	"email": "papi@email.co",
	"continent": "Europe",
	"city": "Lisbon"
}


{
	"email": "papi@email.co",
	"timezone": "Europe/Warsaw"
}


{
	"email": "zozo@email.co",
	"timezone": "Europe/Frankfurt"
}


{
  "username": "zozo",
  "email": "papi@email.co",
  "timezone": "Europe/Warsaw",
  "isAdmin": false
}

{
  "username": "zozo",
	"password": "zozo123", 
  "email": "zozo@email.co",
	"continent": "Europe",
	"city": "Helsinki"
}



// ###################################################################

{
  "favorite_id": "1",
  "type": "league"
}

// ###################################################################

/locals/team:

{ 
  "id": 1, 
  "name": "BVB Dortmund", 
  "code": "BVB", 
  "country": "Germany", 
  "founded": 1909, 
  "national": false, 
  "logoUrl": "https://www.bvb.de", 
  "venueId": 1 
}


// ###################################################################



// ###################################################################



// ###################################################################



// ###################################################################



// ###################################################################


{
	"username": "rikardo",
	"password": "riko123", 
	"email": "ri@kar.do",
	"continent": "Europe", 
	"city": "Istanbul"
}


{
	"username": "john",
	"password": "john123", 
	"email": "john@smith.co.uk",
	"continent": "Europe", 
	"city": "London"
}


{
	"email": "ri@kar.do.uk",	
	"timezone": "Europe/Riga"
}


// ###################################################################


async function createToken(user) {
  console.assert(user.isAdmin !== undefined, 
      "createToken passed user without isAdmin property");

  let userInfo = {
    // 'exp': int(time()) + 3600,
    'username': user.username, 
    'isAdmin': user.isAdmin || false,
  };

  const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
    .setProtectedHeader({ alg: 'HS256', ...userInfo })
    .sign(SECRET_KEY)

  return jwt;
}


// ###################################################################


const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
)
const jwt =
  'eyJhbGciOiJIUzI1NiJ9.eyJ1cm46ZXhhbXBsZTpjbGFpbSI6dHJ1ZSwiaWF0IjoxNjY5MDU2MjMxLCJpc3MiOiJ1cm46ZXhhbXBsZTppc3N1ZXIiLCJhdWQiOiJ1cm46ZXhhbXBsZTphdWRpZW5jZSJ9.C4iSlLfAUMBq--wnC6VqD9gEOhwpRZpoRarE0m7KEnI'

// ###################################################################

const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
  issuer: 'urn:example:issuer',
  audience: 'urn:example:audience',
})

console.log(protectedHeader)
console.log(payload)


// ###################################################################

let u1Token, u2Token, adminToken;

async function generateTokens() {
  try {
    [u1Token, u2Token, adminToken] = await Promise.all([
      createToken({ username: "u1", isAdmin: false }),
      createToken({ username: "u2", isAdmin: false }),
      createToken({ username: "admin", isAdmin: true }),
    ]);

    // Tokens are assigned to global variables
  } catch (error) {
    console.error("Error creating tokens:", error);
    // Handle the error appropriately
  }
}

// Call the function to generate tokens concurrently
generateTokens();

// Now u1Token, u2Token, and adminToken are available globally
console.log("u1Token:", u1Token);
console.log("u2Token:", u2Token);
console.log("adminToken:", adminToken);


// ###################################################################


jest -t --detectOpenHandles helpers/sql.test.js helpers/tokens.test.js middleware/auth.test.js models/favorite.test.js models/local.test.js models/user.test.js routes/auth.test.js /routes/favorites.test.js


// ###################################################################

// Assuming your module has an asynchronous export
// Example module (myModule.js)
// export const fetchData = async () => { ... }

// Main file
async function myAsyncFunction() {
  try {
    // Import the module asynchronously
    const { fetchData } = await import('./myModule');

    // Use the imported function
    const result = await fetchData();

    // Continue with the result
    console.log(result);
  } catch (error) {
    console.error('Error importing module:', error);
  }
}

// Call the async function
myAsyncFunction();


// ###################################################################

this test code:

'''
const request = require("supertest");
const app = require("./app");
const db = require("./db");

test("not found for site 404", async function () {
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
});

afterAll(async function () {
  await db.end();
});
'''

returns this error message:

'''
Test suite failed to run
error: expected SASL response, got message type 88
'''













// ###################################################################


// ###################################################################


// ###################################################################


// ###################################################################
