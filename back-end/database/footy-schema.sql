-- NOT EDITABLE
CREATE TABLE timezones (
  code VARCHAR(35) PRIMARY KEY,
  continent VARCHAR(25), 
  city VARCHAR(25)
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL 
    CHECK (position('@' IN email) > 1),
  timezone VARCHAR(35) NOT NULL
    REFERENCES timezones ON DELETE CASCADE,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- NOT EDITABLE
CREATE TABLE countries (
  name VARCHAR(25) PRIMARY KEY,
  code VARCHAR(2) CHECK (code = upper(code)),
  flag_url TEXT 
);

-- NOT EDITABLE
CREATE TABLE leagues (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(10),
  logo_url TEXT, 
  country VARCHAR(25)
    REFERENCES countries ON DELETE CASCADE 
);

CREATE TABLE leagues_seasons (
  league_id INTEGER NOT NULL
    REFERENCES leagues ON DELETE CASCADE, 
  season INTEGER, 
  PRIMARY KEY (league_id, season)
);

-- NOT EDITABLE
CREATE TABLE venues (
  id INTEGER PRIMARY KEY, 
  name VARCHAR(100), 
  address TEXT,
  city VARCHAR(50),
  country VARCHAR(35),
  capacity INTEGER, 
  surface VARCHAR(25), 
  image_url TEXT
);

CREATE TABLE teams (
  id INTEGER PRIMARY KEY, 
  name VARCHAR(35) NOT NULL, 
  code VARCHAR(3) CHECK (code = upper(code)),
  country VARCHAR(25) NOT NULL, 
  founded INTEGER,
  national BOOLEAN NOT NULL, 
  logo_url TEXT,
  venue_id INTEGER 
    -- REFERENCES venues ON DELETE CASCADE
);

CREATE TABLE favorite_leagues (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  league_id INTEGER 
    REFERENCES leagues ON DELETE CASCADE,
  PRIMARY KEY (username, league_id)
);

CREATE TABLE favorite_cups (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  cup_id INTEGER 
    REFERENCES leagues ON DELETE CASCADE,
  PRIMARY KEY (username, cup_id)
);

CREATE TABLE favorite_teams (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  team_id INTEGER 
    REFERENCES teams ON DELETE CASCADE,
  PRIMARY KEY (username, team_id)
);
