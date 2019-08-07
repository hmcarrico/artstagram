select * from posts
join profiles
on profiles.user_id = profiles.user_id
where profiles.username = $1;