select * from users
join profiles
on users.user_id = profiles.user_id
join followers
on users.user_id = followers.person_who_follows
where followers.approved = true and users.user_id = $1;