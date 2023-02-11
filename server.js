const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql2 = require('mysql2');
const mysql = require('mysql');

const connect = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'password',
    database: 'employee_db',
});

//establish the database and give the intro title
connect.connect((err) => {
    if (err) throw err;
    console.log('\n WELCOME TO EMPLOYEE SNITCH TRACKER \n');
    mainMenu();
})

//should be displayed on the main menu?
function mainMenu() {
    inquirer.prompt ([
        {
            name: 'choices',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 
                      'View all roles', 
                      'View all employees', 
                      'Add a department', 
                      'Add a role', 
                      'Add an employee', 
                      'Update an employee role',
                      'Update an employee manager',
                      'Delete a department',
                      'Delete a role',
                      'Delete an employee',
                      'Exit']
        }
    ])

    .then((answers) => {

        let {choices} = answers;
        if (choices === 'View all departments') {
            showDepartments();
        }

        if (choices === 'View all roles') {
            showRoles();
        }

        if (choices === 'View all employees') {
            showEmployees();
        }

        if (choices === 'Add a department') {
            addDepartments();
        }

        if (choices === 'Add a role') {
            addRole();
        }

        if (choices === 'Add an employee') {
            addEmployees();
        }

        if (choices === 'Update an employee role') {
            updateEmployee();
        }

        if (choices === 'Update an employee manager') {
            updateManager();
        }

        if (choices === 'Delete a department') {
            deleteDepartment();
        }

        if (choices === 'Delete a role') {
            deleteRole();
        }

        if (choices === 'Delete an employee') {
            deleteEmployee();
        }

        if (choices === 'Exit') {
            connection.end()
        };

    });
};

function viewDepartment () {
    console.log('Departments are being displayed');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;
    connection.promise().query(sql, (err, rows) => {
        if(err) return err;
        console.table(rows);
        promptUser();
    });
};

function viewRole () {
    console.log('Roles are being displayed');
    const sql = `SELECT role.id role.title, department.name AS department FROM role INNER JOIN department ON 
    role.department_id = department.id`;
    connection.promise().query(sql, (err, rows) => {
        if(err) return err;
        console.table(rows);
        promptUser();
    });
};

function viewEmployee () {
    console.log(`Employees are being displayed`);           
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department. role.salary`;
    connection.promise().query(sql, (err, rows) => {
        if (err) return err;
        console.table(rows);
        promptUser();
    });
};

function addDepartment () {
    addDepartment = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'addDepartment',
                message: 'What department would you like to add?',
                validate: addDepartment => {
                    if (addDepartment) {
                        return true;
                    } else {
                        console.log('Please enter a department');
                        return false;
                    }
                }
            }
        ])

        .then(answer => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            connection.query(sql, answer.addDepartment, (err, result) => {
                if (err) return err;
                console.log('Added ' + answer.addDepartment + 'to departments');
                showDepartments();
            });
        });
    };

    function addRole () {
        inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What rrole would you like to add?',
                validate: addRole => {
                    if (addRole) {
                        return true;
                    } else {
                        console.log('Please enter a role');
                        return false;
                    }
                }
            }, 
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary range you would like to enter?',
                validate: addSalary => {
                    if (isNaN(addSalary)) {
                        return true;
                    } else {
                        console.log('Please ener a valid salary');
                        return false;
                    }
                }
            }
        ])

        .then(answer => {
            const params = [answer.role, answer.salary];
            const rolesql = `SELECT name, id FROM department`;
            connection.promise().query(roleSql, (err, data) => {
                if (err) return err;
                const department = data.map(({ name, id}) => ({ name: name, value: id }));

                inquirer.prompt ([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'What department is this role for?',
                        choices: department
                    }
                ])
                then(departmentChoice => {
                    const department = departmentChoice.department;
                    params.push(department);

                    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                    connection.query(sql, params, (err, result) => {
                        if (err) return err;
                        console.log('Added ' + answer.role + 'to roles');
                        showRoles();
                    });
                });
            });
        });
    };

    function addEmployee () {
        inquirer.prompt([
           {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee first name?',
            validate: addFirst => {
                if (addFirst) {
                    return true;
                } else {
                    console.log('Please enter a first name');
                    return false;
                }
            }
           },
           {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee last name?',
            validate: addLast => {
                if (addLast) {
                    return true;
                } else {
                    console.log('Please enter a last name');
                    return false;
                }
            }
           }
        ])
        .then(anwer => {
            const params = [answer.firstname, answer.lastName]
            const rolesql = `SELECT role.id, role.title, FROM role`;
            connection.promise().query(rolesql, (err, data) => {
                if (err) return err;
                const roles = data.map(({ id, title}) => ({ name: title, value: id}));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee role?',
                        choices: roles
                    }
                ])
                .then(roleChoice => {
                    const role = roleChoice.role;
                    params.push(role);
                    const managerSql = `SELECT * FROM employee`;
                    connecton.promise().query(managerSql, (err, data) => {
                        if (err) return err;
                        const managers = data.map(({id, first_name, last_name }) => ({ name: first_name + '' + last_name, value: id}));
                        console.log(managers);

                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                message: 'Who is the employee manager?',
                                choices: managers
                            }
                        ])
                        .then(managerChoice => {
                            const manager = managerChoice.manager;
                            params.push(manager);
                            const sql = `INSERT INTO employee (first_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                            connection.query(sql, params, (err, result) => {
                                if (err) return err;
                                console.log('Employee has been added');
                                showEmployees();
                            })
                        })
                    })
                })
            })
        })
    };
}