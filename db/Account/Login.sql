select * from users
join profiles
on users.user_id = profiles.user_id
where users.email = $1;