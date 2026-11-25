 CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
 );

 CREATE TABLE IF NOT EXISTS post(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    image TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
 );

 CREATE TABLE IF NOT EXISTS like(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (post_id) REFERENCES post(id),

    UNIQUE(post_id, user_id)
 );

 CREATE TABLE IF NOT EXISTS comment(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (post_id) REFERENCES post(id),


    CHECK(length(trim(content)) > 0)
 );

 CREATE TABLE IF NOT EXISTS follow(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    following_id INTEGER NOT NULL,
    owner_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL  DEFAULT 'REQUESTED' CHECK(status IN ('REQUESTED', 'ACCEPTED', 'CANCELLED')),
    
    FOREIGN KEY (following_id) REFERENCES user(id),
    FOREIGN KEY (owner_id) REFERENCES user(id),

    UNIQUE(following_id, owner_id),
    CHECK(following_id != owner_id)
);