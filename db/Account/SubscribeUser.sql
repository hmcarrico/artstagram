update users 
set subscription = true
where user_id = ${userId}
returning user_id as "userId", firstname as "firstName", lastname as "lastName", email, is_admin as "isAdmin", subscription