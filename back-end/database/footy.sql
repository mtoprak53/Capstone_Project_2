\echo 'Delete and recreate footy db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE footy;
CREATE DATABASE footy;
\connect footy

\i database/footy-schema.sql
-- \i database/footy-seed.sql
\i database/footy-seed-timezones.sql
\i database/footy-seed-users.sql
\i database/footy-seed-countries.sql
\i database/footy-seed-leagues.sql
-- \i database/footy-seed-venues-tr.sql
-- \i database/footy-seed-venues-de.sql
-- \i database/footy-seed-venues-it.sql
-- \i database/footy-seed-venues-en.sql
-- \i database/footy-seed-venues-es.sql
-- \i database/footy-seed-teams-tr.sql
-- \i database/footy-seed-teams-de.sql
-- \i database/footy-seed-teams-it.sql
-- \i database/footy-seed-teams-en.sql
-- \i database/footy-seed-teams-es.sql
-- \i database/footy-seed-favorites.sql

\echo 'Delete and recreate footy_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE footy_test;
CREATE DATABASE footy_test;
\connect footy_test

\i database/footy-schema.sql
\i database/footy-seed-timezones.sql
\i database/footy-seed-users.sql
\i database/footy-seed-countries.sql
\i database/footy-seed-leagues.sql