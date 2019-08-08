insert into followers
(person_who_follows, person_who_is_followed, approved)
values
($1, $2, false);