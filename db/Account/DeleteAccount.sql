delete from users 
where email = ${email};

delete from user_login
where email = ${email}