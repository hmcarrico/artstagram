select * from posts
join users
on posts.user_id = users.user_id
join profiles
on profiles.user_id = users.user_id
where post_id = $1;