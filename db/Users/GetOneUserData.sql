select * from users
join profiles
on users.user_id = profiles.user_id
where profiles.username = $1;