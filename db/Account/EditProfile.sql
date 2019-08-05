update users 
set firstname = ${firstName}, 
lastname = ${lastName}, 
phone = ${phone}, 
prefix = ${prefix}, 
suffix = ${suffix}, 
address1 = ${address1}, 
address2 = ${address2}, 
city = ${city}, 
state = ${state}, 
zipcode = ${zipcode} 
where user_id = ${userId}