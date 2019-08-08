insert into comments
(post_id, user_id, comment)
values
( $1, $2, $3);

select * from comments
where post_id = $1;