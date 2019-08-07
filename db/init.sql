drop table if exists followers;
drop table if exists comment_likes;
drop table if exists comments;
drop table if exists post_likes;
drop table if exists posts;
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
    private default false,
    profile_picture text default 'https://cdn3.vectorstock.com/i/thumb-large/56/67/human-head-isolated-on-white-abstract-vector-8295667.jpg'
);


create table posts (
    post_id serial primary key,
    user_id integer references users(user_id),
    post_photo text,
    description text,
    private boolean,
    genre text
);

insert into posts
(user_id, post_photo, description, private, genre)
VALUES
(1, 'https://art.ebsqart.com/Art/Bayou-Paintings-and-Landscapes/oils-on-canvas/680795/650/650/Abstract-Lilies-2-SOLD.jpg', 'Missing my flower a little extra right now', false, 'abstract');
insert into posts
(user_id, post_photo, description, private, genre)
VALUES
(1, 'https://ih1.redbubble.net/image.387870060.7766/poster,840x830,f8f8f8-pad,750x1000,f8f8f8.jpg', 'Slushies are underrated', false, 'drawing');
insert into posts
(user_id, post_photo, description, private, genre)
VALUES
(1, 'https://cdn.evbuc.com/eventlogos/187969492/dutchlove.jpg', 'Dutch really hits the spot', false, 'painting');

create table post_likes(
    post_like_id serial primary key,
    post_id integer references posts(post_id),
    user_id integer references users(user_id)
);

insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);
insert into post_likes(post_id, user_id)values(1,1);

create table comments(
    comment_id serial primary key,
    post_id integer references posts(post_id),
    user_id integer references users(user_id),
    comment text
);

insert into comments(post_id, user_id, comment)values(1,1, 'Test Comment hehe');
insert into comments(post_id, user_id, comment)values(1,1, 'Test Comment Two lol');

create table comment_likes(
    post_comment_id serial primary key,
    comment_id integer references comments(comment_id),
    user_id integer references users(user_id)
);

insert into comment_likes(comment_id, user_id)values(1,1);
insert into comment_likes(comment_id, user_id)values(1,1);
insert into comment_likes(comment_id, user_id)values(1,1);
insert into comment_likes(comment_id, user_id)values(1,1);
insert into comment_likes(comment_id, user_id)values(1,1);
insert into comment_likes(comment_id, user_id)values(1,1);


create table followers(
    follow_id serial primary key,
    person_who_follows integer references users(user_id),
    person_who_is_followed integer references users(user_id),
    approved boolean
);

select * from users;
select * from profiles;
select * from followers;
select * from comment_likes;
select * from comments;
select * from post_likes;
select * from posts;

select * from users
join profiles
on users.user_id = profiles.user_id;