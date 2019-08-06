insert into profiles
(user_id, first_name, last_name, username, bio)
values
( $1, $2, $3, $4, $5)
returning *;