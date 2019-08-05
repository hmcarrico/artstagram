SELECT user_id as "userId", firstname as "firstName", lastname as "lastName", phone, email, password, is_admin as "isAdmin", subscription FROM users 
WHERE email = $1;