insert into comments
(post_id, user_id, comment)
values
( $1, $2, $3);

select * from comments
join users
on users.user_id = comments.user_id
join profiles
on profiles.user_id = users.user_id
where post_id = $1;