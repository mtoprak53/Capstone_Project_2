-- test user has the password "password"
-- mete has the password "password"

INSERT INTO users (username, password, email, timezone, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'joel@joelburton.com', 
        'America/New_York',
        FALSE),
        ('mete',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'mete@kagan.tc', 
        'Europe/Istanbul',
        TRUE);
