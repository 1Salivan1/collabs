create TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE,
    email VARCHAR UNIQUE,
    password VARCHAR,
    tags VARCHAR[],
    about VARCHAR,
    telegram VARCHAR,
    linkedin VARCHAR,
    discord VARCHAR,
    avatarurl VARCHAR
);

create TABLE projects(
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    tags VARCHAR[],
    text VARCHAR,
    telegram VARCHAR,
    linkedin VARCHAR,
    discord VARCHAR,
    creator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);