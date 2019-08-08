insert into posts
(user_id, post_photo, description, genre)
values
($1,$2,$3,$4);

select * from posts
where user_id = $1;