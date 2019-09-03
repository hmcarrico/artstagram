select * from users
join followers
on users.user_id = followers.person_who_is_followed
join profiles
on followers.person_who_follows = profiles.user_id
where followers.approved = false and users.user_id = $1;