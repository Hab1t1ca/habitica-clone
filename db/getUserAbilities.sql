select * from classes
join users on users.class = classes.class
where userid = $1;