drop table if exists profiles;
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
    bio text,
    profile_picture text default 'https://cdn3.vectorstock.com/i/thumb-large/56/67/human-head-isolated-on-white-abstract-vector-8295667.jpg'
);

select * from users;
select * from profiles;

select * from users
join profiles
on users.user_id = profiles.user_id;