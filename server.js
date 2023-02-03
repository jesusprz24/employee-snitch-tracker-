const conTable = require('console.table');
const inquirer = require('inquirer');
const sql2 = require('mysql2');
const sql = require('mysql');

const connect = mysql.createConnection({
    host: 'localhost', 
    user: 'User id or root', 
    password: 'Password',
    database: 'employee_snitch_tracker_db',
});

//establish the database and give the intro title
connection.connect((err) => {
    if (err) throw err;
    console.log('\n WELCOME TO EMPLOYEE SNITCH TRACKER \n');
    mainMenu();
})

//should be displayed on the main menu
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
    ]);

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
    conncetion.promise().query(sql, (err, rows) => {
        if(err) return err;
        console.table(rows);
        promptUser();
    });
};

function viewRole () {
    console.log('Roles are being displayed');
    const sql = `SELECT role.id role.title, department.name AS department FROM role INNER JOIN department ON 
    role.department_id = department.id`;
    conncetion.promise().query(sql, (err, rows) => {
        if(err) return err;
        console.table(rows);
        promptUser();
    });
};

function viewEmployee () {
    console.log(`Employees are being displayed`);           //CHECK TO SEE IF THIS IS THE RIGHT WAY TO DO THIS, IT SEEMS LIKE I'M MISSING SOMETHING!!!
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
        inquirer.promt([
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
                    if (isNaN(addSalary)) {                                     //isNaN checks to see if it's a number or not, return true is is NaN
                        return true;
                    } else {
                        console.log('Please ener a valid salary');
                        return false;
                    }
                }
            }, 

        ])
    }
}

