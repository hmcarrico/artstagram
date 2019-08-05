drop table if exists profile;
drop table if exists users;

create table users(
    user_id serial primary key,
    email text,
    password text
);

create table profiles(
    profile_id serial primary key,
    user_id integer references users(user_id),
    username text,
    first_name text,
    last_name text,
    bio text
);