# Employee-snitch-tracker-

# Table of Contents
- Description
- Installation
- License
- Screenshot
- Walkthrough Video

# Description
Using the command line the user will be able to access and manage a company's
employee database. This program uses Node.js, Javascript, Inquirer, and MySQL.

# Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

# Installation
In order to use the program, the user needs to clone the repository from Github to
the terminal. The program also requires the use of node.js, inquirer and MySQL. 
Enter the following command in the terminal to run: mysql -u root -p.

# License
This program is licensed under MIT

# Walkthrough Video: 
https://drive.google.com/file/d/1J7gQUX-OrgqwdEkRqv2LqDT_p3AG5y_L/view