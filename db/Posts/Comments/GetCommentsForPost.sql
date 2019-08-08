select * from comments
join users
on users.user_id = comments.user_id
join profiles
on profiles.user_id = users.user_id
where post_id = $1;