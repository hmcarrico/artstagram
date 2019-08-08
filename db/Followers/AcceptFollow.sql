update followers
set approved = true
where person_who_is_followed = $1 and person_who_follows = $2
returning *;