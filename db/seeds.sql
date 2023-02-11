USE employee_db;
INSERT INTO department (name)
VALUES
('IT'),
('Finance'),
('Sales'),
('Project');

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'Full Stack Developer', 80000, 1),
(2, 'Repair Technician', 70000, 1),
(3, 'Financial Person', 150000, 2),
(4, 'Accountant', 70000, 2),
(5, 'Head of Sales', 65000, 3),
(6, 'Sales Lead', 60000, 3),
(7, 'Project Manager', 100000, 4),
(8, 'Organization Specialist', 80000, 4);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(7, 'Freddy', 'Kruger', 1, 1),
(4, 'Jason', 'Vorhees', 2, null),
(1, 'Leather', 'Face', 3, 3),
(8, 'Michael', 'Myers', 4, null),
(5, 'Chucky', 'Doll', 1, 5),
(3, 'Pin', 'Head', 2, null),
(2,'Pumpkin', 'Head', 3, 7),
(6, 'Beetle', 'Juice', 4, null);

