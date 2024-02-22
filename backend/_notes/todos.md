

TO RUN BACKEND IN DESKTOP LOCALLY:
----------------------------------
PGPASSWORD=mete1234 npm run dev

- OR -

put "PGPASSWORD=mete1234" in .env file in backend folder without quotes


ROUTES:
-------
POST  - /auth/token
POST  - /auth/register
--------------------------
POST  - /users/  (special)
GET   - /users/  (special)
GET   - /users/:username
PATCH - /users/:username
DELETE- /users/:username
--------------------------
POST  - /favorites/:username
GET   - /favorites/:username/:type
DELETE- /favorites/:username/:type/:favorite_id
--------------------------
POST  - /locals/team
GET   - /locals/team/:id
GET   - /locals/timezones/:continent
GET   - /locals/countries
GET   - /locals/leagues/:country
GET   - /locals/cups/:id
--------------------------


TESTS:
------
/helpers/sql.test.js
/helpers/tokens.test.js
/middleware/auth.test.js
/models/_testCommon.js
/models/favorite.test.js
/models/local.test.js
/models/user.test.js
/routes/auth.test.js
/routes/favorites.test.js
/routes/locals.test.js
/routes/users.test.js
app.test.js
config.test.js
--------------------------


DATABASE TABLES:
----------------
countries        (filled)
favorite_cups    (empty)   
favorite_leagues (empty)
favorite_teams   (empty)
leagues          (filled)
leagues_seasons  (empty)
teams            (empty)
timezones        (filled)
users            
venues           (empty)



NOTES:
--------
[SOLVED]
12-20-23: In app.test.js if there is only one test it returns a DB error, but ifthere are two tests there is no error!

[??]
How to avoid Brute Force attacks for user passwords?


11-04-23/Sat
------------
1. Check how frontend and backend works?


12-19-23/Tue
------------
1. Finish the jose-implamantation branch duties and merge it to the main.
    1.1. Update all jwt stuff in all tests with JOSE.

2. Complete all the tests.

3. Clean obsolete comments.

4. Write necessary comments.




> return of /locals/countires should be { countries: [ { country }, ... ] }
> return of /locals/leagues/:country should be 
    { leagues: [ { id, name, logoUrl, type }, ... ] }
    



railway run psql < db/scripts/footy.sql



















