-- grant all privileges on *.* to wibuslayer@hieudai1998 identified by 'hieudai1998';
create database IF NOT EXISTS pet_project;
create user 'wibuslayer'@'hieudai1998' identified by 'hieudai1998';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `pet_project`.* TO 'wibuslayer'@'hieudai1998';
flush privileges;