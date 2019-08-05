INSERT INTO users( email, password, subscription)
values($1,$2, false)
returning user_id as "userId", email, is_admin as "isAdmin", subscription;
