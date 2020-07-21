DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

-- name - department name --
CREATE TABLE departmentList (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roleList (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employeeList (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT DEFAULT NULL,
    isManager BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

INSERT INTO departmentList (name)
VALUES ('SALES'), ('ENGINEERING'), ('FINANCE'), ('LEGAL');

INSERT INTO roleList (title, salary, department_id)
VALUES ('SALES LEAD', 100000, 1), ('SALESPERSON', 80000, 1),
       ('LEAD ENGINEER', 150000, 2), ('SOFTWARE ENGINEER', 120000, 2),
       ('ACCOUNTANT', 125000, 3),
       ('LEGAL TEAM LEAD', 250000, 4), ('LAWYER', 190000, 4);
       
INSERT INTO employeeList(first_name, last_name, role_id, manager_id, isManager)
VALUES ('Allison', 'Andrews', 1, null, true), ('Brooke', 'Butler', 3, null, true), ('Christopher', 'Carpenter', 5, null, false),
       ('David', 'Dawkins', 6, null, true), ('Ethan', 'Eddison', 2, 1, false), ('Francis', 'Fullbright', 2, 1, false),
       ('Gerogia', 'Gains', 2, 1, false), ('Houston', 'Hightower', 4, 2, false), ('Isabella', 'Idleman', 4, 2, false),
       ('Jane', 'Johnson', 4, 2, false), ('Kelsey', 'Knight', 7, 4, false), ('Lauren', 'Longly', 7, 4, false);

