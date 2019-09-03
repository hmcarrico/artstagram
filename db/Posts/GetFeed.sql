select posts.post_photo, posts.description, posts.genre, posts.date from posts
join followers
on posts.user_id = followers.person_who_is_followed
join users
on users.user_id = followers.person_who_follows
where users.user_id = $1;