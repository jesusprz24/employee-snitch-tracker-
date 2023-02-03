const conTable = require('console.table');
const dotenv = require('dotenv');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const sql = require('sql');

const connect = mysql.createConnection({
    host: 'localhost', 
    user: 'User id or root', 
    password: 'Password',
    database: 'employee_snitch_tracker_db',
});

const prompt = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
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

    then((answers) => {
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

presentDepartments = () => {
    console.log('departments working');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;
    conncetion.promise().query(sql, (err, rows) => {
        if(err) throw err;
        console.table(rows);
        promptUser();
    });
};

presentRoles = () => {
    console.log('roles are being presented');
    const sql = `SELECT role.id role.title, department.name AS department FROM role INNER JOIN department ON 
    role.department_id = department.id`;
    conncetion.promise().query(sql, (err, rows) => {
        if(err) throw err;
        console.table(rows);
        promptUser();
    });
};

