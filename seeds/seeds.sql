INSERT INTO department (name)
VALUES
('IT'),
('Finance'),
('Sales'),
('Project');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 80000, 1),
('Repair Technician', 70000, 1),
('Financial Person', 150000, 2),
('Accountant', 70000, 2),
('Head of Sales', 65000, 3),
('Sales Lead', 60000, 3),
('Project Manager', 100000, 4),
('Organization Specialist', 80000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Freddy', 'Kruger', 1, ),
('Jason', 'Vorhees', 2, ),
('Leather', 'Face', 3, ),
('Michael', 'Myers', 4, ),
('Chucky', 'Doll', 1, ),
('Pin', 'Head', 2,),
('Pumpkin', 'Head', 3,),
('Beetle', 'Juice', 4,);


/*is the role_id the employee the number you match will the role? Also what is done will manager_id?*/
